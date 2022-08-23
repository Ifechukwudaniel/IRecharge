const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const purchaseSchema = new mongoose.Schema(
  {
    customerId: {
      type: ObjectId,
      ref: "Customer",
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const purchase = mongoose.model("Purchases", purchaseSchema);

module.exports = purchase;
