/*Product ile ilgili routerlerin handle edildigi dosya*/
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // Create yaparken id lazım onu kullanmak icin ekledim.

const Order = require("../models/order");

// Handle incoming GET request to /orders
router.get("/", (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// Create a new order
router.post("/", (req, res, next) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    product: req.body.productId,
    quantity: req.body.quantity
  });

  order
    .save()
    .then(result => {
      res.status(200).json({
        message: "Created Order Successfully!",
        createdOrder: {
          product: result.product,
          quantity: result.quantity,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/orders/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order details!",
    orderId: req.params.orderId
  });
});

router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order deleted!",
    orderId: req.params.orderId
  });
});

module.exports = router;
