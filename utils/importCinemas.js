const mongoose = require("mongoose");
const XLSX = require("xlsx");
const Cinema = require("../models/cinemaLocations"); 
require("dotenv").config({ path: require('path').resolve(__dirname, '../.env') });


const MONGODB_URI = process.env.MONGO_URI

async function importCinemas() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Load the Excel file
    const workbook = XLSX.readFile("cinemaList.xlsx");
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    // Format and insert data
    const formattedData = data.map((row) => ({
      name: row["Cinema Name"],
      address: row["Address"],
      city: row["City"],
      state: row["State"],
    }));

    await Cinema.insertMany(formattedData);
    console.log("Cinemas imported successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error importing cinemas:", error);
  }
}

importCinemas();