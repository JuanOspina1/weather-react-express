const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors);
// Have to find out how I can send the location here when the request is made

// SYNTAX: METHOD => CALL WITH REQUEST & RESPONSE
app.get("/", (req, res) => {
  res.json("hi");
});

app.get("/weather", (req, res) => {
  console.log(req);

  const location = req.data.location;
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
