/*Product ile ilgili routerlerin handle edildigi dosya*/
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // yeni nesne olustururken id icin ekledik

const Product = require("../models/product");

// Get all products
router.get("/", (req, res, next) => {
  Product.find() // Find a parametre vermezsen hepsini getirir. Ayrıca find().where() yada find().limit() yapaabilirsin Koşullu getirme
    .exec()
    .then(docs => {
      console.log(docs);
      // if (docs.length >= 0) {
        res.status(200).json(docs);
      // } else {
      //   res.status(404).json({
      //     message: "No entries found!"
      //   });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Create a new product
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST request to /products",
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({
        error: err
      });
    });
});

// Get a product
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log("From Database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valid entry for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Update a product
router.patch("/:productId", (req, res, next) => {
  //const id = req.params.productId; // $set yazılması zorunlu.$set den sonra key value şeklinde objenin yeni değerlerini yazıyoruz.
  //Product.update({_id:id}, { $set: {name: req.body.newName, price: req.body.newPrice}})
});

// Delete a product
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
