const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  // Order in taslaginin nasıl olması gerektigini yani product ın nasıl gorundugunu javascript objesi ile tanımlıyoruz.
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
