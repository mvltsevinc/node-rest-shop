const express = require("express");
const app = express(); // Express uygulamasını app ye attık.Böylece app ile express deki tum fonksiyonları kullanabilirsin.
const morgan = require("morgan"); // Logging package
const bodyParser = require("body-parser"); // url i ve body yi parcalamak icin
const mongoose = require("mongoose");

// import ediyoruz
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");

mongoose.connect(
  "mongodb+srv://admin:" +
    process.env.MONGO_ATLAS_PW +
    "@node-rest-shop-crzpa.mongodb.net/test?retryWrites=true",
  {
    useMongoClient: true,
    useNewUrlParser: true
  }
);

app.use(morgan("dev")); // Loglama için
app.use("/uploads",express.static("uploads")); // Upload klasöürünü public yapmak icin. boylece localhost:3000\uploads\1537651479855-3.PNG yazarak dosyayı görebiliyoruz
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Requestten json datayı kolay olarak çıkartmamıza yarıyor

app.use((req, res, next) => {
  // Diger domainlerin de bu api ye erisebilmesi icin headerları ekledik.
  res.header("Access-Control-Allow-Origin", "*"); // Ne zaman bir response göndereceğimiz zaman bunu ekler.Burada direkt olarak response göndermez. Handling CORS için bu.
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // Hangi headerların istekle birlikte gelecebilicegini belirliyosun. * hepsi demek.

  if (req.method === "OPTIONS") {
    // hangi seceneklerde method destekliyorsun diye soruyor browser her posttan yada puttan once.
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); // Browsera hangi istekleri gonderebilecegini soyluyoruz.
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle request
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user",userRoutes);

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
