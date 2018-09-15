const express = require("express");
const app = express(); // Express uygulamasını app ye attık.Böylece app ile express deki tum fonksiyonları kullanabilirsin.

app.use((req, res, next) => {
  res.status(200).json({
    message: "Hello World!"
  });
});

module.exports = app;
