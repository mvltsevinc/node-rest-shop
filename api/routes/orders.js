/*Product ile ilgili routerlerin handle edildigi dosya*/
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // Create yaparken id lazım onu kullanmak icin ekledim.

const Order = require("../models/order");
const Product = require("../models/product");

// Handle incoming GET request to /orders
router.get("/", (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name") // ilk parametre baglayacagin alan , ikinci parametre populate ettigin icin select de hangi alanlari getirmek istiyorsun
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
  Product.findById(req.body.productId)
    .then(doc => {
      if (!doc) {
        return res.status(404).json({
          message: "Product Not Found!"
        });
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
      });

      return order.save();
    })
    .then(result => {
      res.status(200).json({
        message: "Created Order Successfully!",
        createdOrder: {
          product: result.product,
          quantity: result.quantity,
          _id: result._id
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
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
// Get a Order / Order Detail
router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate("product") // ilk parametre baglayacagin alan , ikinci parametre populate ettigin icin select de hangi alanlari getirmek istiyorsun
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order Not Found!"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:orderId", (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order Deleted!",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: {
            productId: "ID",
            quantity: "Number"
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
