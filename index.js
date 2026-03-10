const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const loginRoute = require("./routes/auth/loginRoute");
const cinemaRoute = require("./routes/cinemaRoute");
const youtubeRoute = require("./routes/youtubeRoute");
const movieRoute = require("./routes/movieRoute");
const showtimeRoute = require("./routes/showtimeRoute");
const cinemaLocationsRoute = require("./routes/cinemaLocationsRoute");
const blogRoute = require("./routes/blogRoute");
const commentRoute = require("./routes/commentRoute");
const streamingRoute = require("./routes/streamingRoute");
const advertRoute = require("./routes/advertRoute");
const adminLoginRoute = require("./routes/adminLoginRoute");
const cookieParser = require("cookie-parser");
const adminRegisterRoute = require("./routes/adminRegisterRoute");
const connectDB = require("./config/dbConnection");
require("dotenv").config();

// database connection
connectDB();

// middelware
app.use(express.json());
app.use(cookieParser());
// cors middleware
app.use(
  cors({
    origin: [
      "https://nowshowing.ng",
      "https://nowshowing.onrender.com",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// auth routes 
app.use("/auth", loginRoute);
app.use("/auth", require("./routes/auth/registerRoute"));

// Movie API routes
app.use("/adminlogin", adminLoginRoute);
app.use("/adminregister", adminRegisterRoute);
app.use("/cinema", cinemaRoute);
app.use("/youtube", youtubeRoute);
app.use("/cinemalocations", cinemaLocationsRoute);
app.use("/blog", blogRoute);
app.use("/streaming", streamingRoute);
app.use("/movies", movieRoute);
app.use("/showtimes", showtimeRoute);
app.use("/advert", advertRoute);
app.use("/comments", commentRoute);

// VTU api routes
app.use("/vtu", require("./routes/VTU/Airtime/airtimeRoutes"));
app.use("/vtu", require("./routes/VTU/Data/dataRoutes"));
app.use("/vtu", require("./routes/VTU/Cable/cableRoutes"));
app.use("/vtu", require("./routes/VTU/Electricity/electricityRoutes"));

// wallet routes 
app.use("/wallet", require("./routes/wallet/virtualAccountRoute"));
app.use("/wallet", require("./routes/wallet/webhookRoute"));
app.use("/wallet", require("./routes/wallet/walletRoute"));
app.use("/wallet", require("./routes/wallet/transactionsRoute"));


// user routes
app.use("/user", require("./routes/user/passcodeRoute"));




// run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
