const mongoose = require("mongoose");

const productSchema = mongoose.Schema({ // Product in taslaginin nasıl olması gerektigini yani product ın nasıl gorundugunu javascript objesi ile tanımlıyoruz.
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model("Product", productSchema);