const PORT = process.env.PORT || 8000;
const path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();

// app.use(cors());

/////////////////////////////////////
// PRODUCTION SOLUTION

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

////////////////////////////////////////
// API CALLS
app.get("/weather/", (req, res) => {
  console.log(req);

  const location = req.query.location;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API}`;

  axios
    .get(url)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(PORT, () => console.log(`Backend server is running on ${PORT}`));
