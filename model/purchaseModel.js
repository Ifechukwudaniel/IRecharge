const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const purchase = mongoose.model("Purchases", purchaseSchema);

module.exports = purchase;
