/*Product ile ilgili routerlerin handle edildigi dosya*/
const express = require("express");
const router = express.Router();

// Handle incoming GET request to /orders
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Orders were fetched!"
    });
});

router.post("/", (req, res, next) => {
    res.status(201).json({ // 201 everything was successful resource created demek
        message: "Orders was created!"
    });
});

router.get("/:orderId", (req, res, next) => {
    res.status(200).json({
        message: "Order details!",
        orderId : req.params.orderId
    });
});

router.delete("/:orderId", (req, res, next) => {
    res.status(200).json({
        message: "Order deleted!",
        orderId : req.params.orderId
    });
});

module.exports = router;
