const express = require("express");
const app = express(); // Express uygulamasını app ye attık.Böylece app ile express deki tum fonksiyonları kullanabilirsin.
const morgan = require("morgan"); // Logging package

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

app.use(morgan("dev"));

// Routes which should handle request
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error); // Default olan hata mesajını next fonksiyonu ile eziyoruz. Request yapıyoruz burada altta yakalıyoz
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
