const { Expo } = require("expo-server-sdk");
const Notification = require("../models/notification");
const PushTicket = require("../models/pushTicket");
const UserModel = require("../models/user");

const expo = new Expo();

/**
 * Send a push notification to a single user (all their devices).
 * Saves a Notification document and sends push to all valid expoTokens.
 */
const sendPushNotification = async (
  userId,
  title,
  message,
  data = {},
  type = "system"
) => {
  try {
    // console.log(`\n--- [DIAGNOSTIC] sendPushNotification ---`);
    // console.log(`User ID: ${userId}, Title: "${title}"`);

    // Save notification to DB
    const notification = await Notification.create({
      user: userId,
      title,
      message,
      type,
      data,
    });

    // Get user's tokens
    const user = await UserModel.findById(userId);
    if (!user) {
      // console.log(`[DIAGNOSTIC] User ${userId} not found in DB`);
      return notification;
    }

    // console.log(`[DIAGNOSTIC] DB expoTokens for user:`, user.expoTokens);
    if (!user.expoTokens || user.expoTokens.length === 0) {
      // console.log(`[DIAGNOSTIC] No tokens found for user ${userId}`);
      return notification;
    }

    // Build messages for all valid tokens
    const messages = [];
    const tokenMap = []; // track which message index maps to which token

    for (const token of user.expoTokens) {
      const isValid = Expo.isExpoPushToken(token);
      // console.log(`[DIAGNOSTIC] Checking token: "${token}" -> isValid: ${isValid}`);
      
      if (isValid) {
        messages.push({
          to: token,
          sound: "default",
          title,
          body: message,
          data: { ...data, notificationId: notification._id.toString() },
        });
        tokenMap.push({ token, userId: user._id });
      } else {
        console.warn(`[DIAGNOSTIC] INVALID TOKEN SKIPPED: "${token}"`);
      }
    }

    if (messages.length === 0) {
      // console.log(`[DIAGNOSTIC] No valid messages to send after validation.`);
      return notification;
    }

    // // console.log(`[DIAGNOSTIC] Full messages payload to be chunked and sent:`, JSON.stringify(messages, null, 2));

    // Send in chunks
    const chunks = expo.chunkPushNotifications(messages);
    // console.log(`[DIAGNOSTIC] Created ${chunks.length} chunk(s) for sending.`);

    for (let chunkIdx = 0; chunkIdx < chunks.length; chunkIdx++) {
      const chunk = chunks[chunkIdx];
      // console.log(`[DIAGNOSTIC] Sending chunk ${chunkIdx + 1}/${chunks.length} containing ${chunk.length} messages...`);
      
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        // // console.log(`[DIAGNOSTIC] Ticket response for chunk ${chunkIdx + 1}:`, JSON.stringify(ticketChunk, null, 2));

        // Store tickets for receipt checking
        const ticketDocs = [];
        for (let i = 0; i < ticketChunk.length; i++) {
          const ticket = ticketChunk[i];
          if (ticket.status === "error") {
             console.error(`[DIAGNOSTIC] TICKET ERROR for token ${tokenMap[i]?.token}:`, ticket.message, ticket.details);
          } else if (ticket.id) {
            ticketDocs.push({
              ticketId: ticket.id,
              token: tokenMap[i]?.token,
              userId: tokenMap[i]?.userId,
            });
          }
        }
        if (ticketDocs.length > 0) {
          await PushTicket.insertMany(ticketDocs);
        }
      } catch (error) {
        console.error(`[DIAGNOSTIC] FATAL ERROR sending push notification chunk ${chunkIdx + 1}:`, error);
      }
    }

    // // console.log(`--- [DIAGNOSTIC] END sendPushNotification ---\n`);
    return notification;
  } catch (error) {
    console.error("Error in sendPushNotification:", error);
    throw error;
  }
};

const sendBulkPushNotificationsAsync = async (
  userIds,
  title,
  message,
  data = {},
  type = "system",
  options = {}
) => {
  try {
    // console.log(`\n--- [DIAGNOSTIC] sendBulkPushNotificationsAsync ---`);
    // console.log(`Target User IDs: ${userIds.length}, Title: "${title}", RespectPrefs: ${options.respectPreferences}`);

    const { respectPreferences = false } = options;

    // Build user query
    const userQuery = { _id: { $in: userIds }, isDeleted: { $ne: true } };
    if (respectPreferences) {
      userQuery.notificationsEnabled = true;
    }

    const users = await UserModel.find(userQuery, "_id expoTokens");
    // // console.log(`[DIAGNOSTIC] Found ${users.length} matching users out of ${userIds.length} requested.`);

    // Create notification documents for all matching users
    const notificationDocs = users.map((user) => ({
      user: user._id,
      title,
      message,
      type,
      data,
    }));

    if (notificationDocs.length > 0) {
      await Notification.insertMany(notificationDocs);
    }

    // Collect all valid tokens with user mapping
    const messages = [];
    const tokenMap = [];

    for (const user of users) {
      if (!user.expoTokens || user.expoTokens.length === 0) continue;

      for (const token of user.expoTokens) {
        const isValid = Expo.isExpoPushToken(token);
        if (isValid) {
          messages.push({
            to: token,
            sound: "default",
            title,
            body: message,
            data,
          });
          tokenMap.push({ token, userId: user._id });
        } else {
          console.warn(`[DIAGNOSTIC] INVALID TOKEN SKIPPED (User ${user._id}): "${token}"`);
        }
      }
    }

    // // console.log(`[DIAGNOSTIC] Total valid messages to send: ${messages.length}`);
    if (messages.length === 0) {
      // // console.log(`[DIAGNOSTIC] No valid messages to send in bulk. Aborting.`);
      console.log(`--- [DIAGNOSTIC] END sendBulkPushNotificationsAsync ---\n`);
      return;
    }

    // Send in chunks
    const chunks = expo.chunkPushNotifications(messages);
    console.log(`[DIAGNOSTIC] Created ${chunks.length} chunk(s) for bulk sending.`);
    let globalIdx = 0;

    for (let chunkIdx = 0; chunkIdx < chunks.length; chunkIdx++) {
      const chunk = chunks[chunkIdx];
      // console.log(`[DIAGNOSTIC] Sending bulk chunk ${chunkIdx + 1}/${chunks.length} containing ${chunk.length} messages...`);
      
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        // console.log(`[DIAGNOSTIC] Ticket response for bulk chunk ${chunkIdx + 1}:`, JSON.stringify(ticketChunk, null, 2));

        const ticketDocs = [];
        for (let i = 0; i < ticketChunk.length; i++) {
          const ticket = ticketChunk[i];
          if (ticket.status === "error") {
            console.error(`[DIAGNOSTIC] BULK TICKET ERROR for token ${tokenMap[globalIdx + i]?.token}:`, ticket.message, ticket.details);
          } else if (ticket.id) {
            ticketDocs.push({
              ticketId: ticket.id,
              token: tokenMap[globalIdx + i]?.token,
              userId: tokenMap[globalIdx + i]?.userId,
            });
          }
        }
        globalIdx += chunk.length;

        if (ticketDocs.length > 0) {
          await PushTicket.insertMany(ticketDocs);
        }
      } catch (error) {
        console.error(`[DIAGNOSTIC] FATAL ERROR sending bulk push notification chunk ${chunkIdx + 1}:`, error);
      }
    }

    // // console.log(`[DIAGNOSTIC] Bulk push sent: ${messages.length} messages to ${users.length} users`);
    console.log(`--- [DIAGNOSTIC] END sendBulkPushNotificationsAsync ---\n`);
  } catch (error) {
    console.error("Error in sendBulkPushNotificationsAsync:", error);
  }
};

/**
 * Check Expo push receipts and remove stale tokens.
 * Should be called periodically (e.g., every 30 minutes).
 */
const checkReceipts = async () => {
  try {
    const tickets = await PushTicket.find({}).limit(1000);
    if (tickets.length === 0) return;

    const ticketIds = tickets.map((t) => t.ticketId);
    const ticketMap = {};
    for (const t of tickets) {
      ticketMap[t.ticketId] = t;
    }

    // Chunk receipt IDs (Expo recommends max 1000 per request)
    const receiptIdChunks = expo.chunkPushNotificationReceiptIds(ticketIds);

    for (const chunk of receiptIdChunks) {
      try {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk);

        for (const receiptId in receipts) {
          const receipt = receipts[receiptId];
          const ticket = ticketMap[receiptId];

          if (!ticket) continue;

          if (receipt.status === "error") {
            // If DeviceNotRegistered, remove the stale token
            if (
              receipt.details &&
              receipt.details.error === "DeviceNotRegistered"
            ) {
              // console.log(
              //   `Removing stale token for user ${ticket.userId}: ${ticket.token}`
              // );
              await UserModel.findByIdAndUpdate(ticket.userId, {
                $pull: { expoTokens: ticket.token },
              });
            }
          }

          // Remove processed ticket
          await PushTicket.findByIdAndDelete(ticket._id);
        }
      } catch (error) {
        console.error("Error checking push receipts chunk:", error);
      }
    }

    // // console.log(`Processed ${tickets.length} push receipts`);
  } catch (error) {
    console.error("Error in checkReceipts:", error);
  }
};

/**
 * Remove a specific push token from a user's expoTokens array.
 */
const removeToken = async (userId, pushToken) => {
  await UserModel.findByIdAndUpdate(userId, {
    $pull: { expoTokens: pushToken },
  });
};

module.exports = {
  sendPushNotification,
  sendBulkPushNotificationsAsync,
  checkReceipts,
  removeToken,
};
