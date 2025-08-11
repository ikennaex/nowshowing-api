const express = require("express");
const app = express();
const port = process.env.PORT || 4000; 
const cors = require("cors")
const loginRoute = require("./routes/loginRoute");
const cinemaRoute = require("./routes/cinemaRoute");
const youtubeRoute = require("./routes/youtubeRoute");
const movieRoute = require("./routes/movieRoute");
const showtimeRoute = require("./routes/showtimeRoute");
const cinemaLocationsRoute = require("./routes/cinemaLocationsRoute");
const blogRoute = require("./routes/blogRoute");
const streamingRoute = require("./routes/streamingRoute");
const advertRoute = require("./routes/advertRoute");
const connectDB = require("./config/dbConnection");
require('dotenv').config();

// database connection 
connectDB() 


// middelware 
app.use(express.json());
// cors middleware
app.use(
  cors({
    origin: [
      "https://nowshowing.onrender.com",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
    res.send("API is running...");
  });

app.use("/login", loginRoute)
app.use("/cinema", cinemaRoute)
app.use("/youtube", youtubeRoute)
app.use("/cinemalocations", cinemaLocationsRoute)
app.use("/blog", blogRoute)
app.use("/streaming", streamingRoute)
app.use("/movies", movieRoute)
app.use("/showtimes", showtimeRoute)
app.use("/advert", advertRoute)


// run server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });










app.listen(port, () => {
    console.log(`Server is running on port ${port}`);  
}); 