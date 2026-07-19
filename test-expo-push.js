const { Expo } = require("expo-server-sdk");
const mongoose = require("mongoose");
const UserModel = require("./models/user");
require("dotenv").config();

// Create a new Expo SDK client
const expo = new Expo();

// HARDCODE YOUR WORKING TOKEN HERE
// Example: const WORKING_TOKEN = "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]";
let WORKING_TOKEN = ""; 

async function runDiagnosticTest() {
  console.log("=== STARTING EXPO PUSH DIAGNOSTIC SCRIPT ===");
  try {
    // 1. If no token provided, try to fetch one from DB
    if (!WORKING_TOKEN) {
      console.log("No token hardcoded. Connecting to MongoDB to fetch the latest token...");
      await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/nowshowing");
      console.log("Connected to MongoDB.");

      // Find a user with at least one expo token
      const user = await UserModel.findOne({ "expoTokens.0": { $exists: true } }).sort({ updatedAt: -1 });
      
      if (!user) {
        console.error("❌ CRITICAL: No users found in database with an expoTokens array containing at least 1 token.");
        console.log("Please hardcode WORKING_TOKEN in this script and run again.");
        process.exit(1);
      }

      WORKING_TOKEN = user.expoTokens[user.expoTokens.length - 1]; // take the most recently added token
      console.log(`Fetched latest token from DB for user ${user._id}: ${WORKING_TOKEN}`);
      mongoose.disconnect();
    } else {
      console.log(`Using hardcoded token: ${WORKING_TOKEN}`);
    }

    // 2. Validate format
    const isValid = Expo.isExpoPushToken(WORKING_TOKEN);
    console.log(`\nValidating token format via Expo.isExpoPushToken(): ${isValid}`);
    
    if (!isValid) {
      console.error("❌ ERROR: Token format is invalid. It must look like 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]'.");
    }

    // 3. Prepare payload
    const messages = [{
      to: WORKING_TOKEN,
      sound: "default",
      title: "Diagnostic Test",
      body: "If you receive this, expo-server-sdk is working correctly on the backend.",
      data: { source: "diagnostic_script" },
    }];

    console.log(`\nPayload to send:`, JSON.stringify(messages, null, 2));

    // 4. Send the message
    console.log("\nSending to Expo...");
    const chunks = expo.chunkPushNotifications(messages);
    
    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(`\n✅ RECEIVED TICKET RESPONSE:`, JSON.stringify(ticketChunk, null, 2));
      } catch (sendErr) {
        console.error(`\n❌ SDK SEND ERROR:`, sendErr);
      }
    }
    
    console.log("\n=== TEST FINISHED ===");
  } catch (error) {
    console.error("\n❌ UNEXPECTED ERROR:", error);
  }
}

runDiagnosticTest();
