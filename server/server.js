const PORT = process.env.PORT || 8000;
const path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const publicPath = path.join(__dirname, "..", "public");
require("dotenv").config();

const app = express();

app.use(express.static(publicPath));

app.use(cors());

// Not sure if the below is needed for deployment - need further research on the below
// app.get("*", (req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"));
// });

// SYNTAX: METHOD => CALL WITH REQUEST & RESPONSE
app.get("/", (req, res) => {
  res.json("hi");
});

app.get("/weather", (req, res) => {
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
