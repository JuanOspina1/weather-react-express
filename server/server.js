const PORT = process.env.PORT || 8000;
const path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
// V1 Solution
// const publicPath = path.join(__dirname, "..", "public");
require("dotenv").config();

const app = express();

app.use(cors());
// V1 Solution
// app.use(express.static(publicPath));

// V2 Solution
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

// Not sure if the below is needed for deployment - need further research on the below
// app.get("*", (req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"));
// });

// SYNTAX: METHOD => CALL WITH REQUEST & RESPONSE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/weather/", (req, res) => {
  console.log(req);

  const location = req.query.location;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API}/`;

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
