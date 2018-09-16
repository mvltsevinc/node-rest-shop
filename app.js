const express = require("express");
const app = express(); // Express uygulamasını app ye attık.Böylece app ile express deki tum fonksiyonları kullanabilirsin.


const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");


app.use("/products",productRoutes);
app.use("/orders",orderRoutes);

module.exports = app;
