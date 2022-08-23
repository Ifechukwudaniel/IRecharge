const customerModel = require("../model/customerModel");
const mongoose = require("mongoose");
const { APIError } = require("../Errors/baseErrors");
const objectId = mongoose.Types.ObjectId;
const { v4: uuidv4 } = require("uuid");
const purchaseModel = require("../model/purchaseModel");
const Flutterwave = require("flutterwave-node-v3");

const create = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    let findEmail = await customerModel.findOne({ email });
    if (findEmail) {
      throw new APIError("Duplicate Error", "User with email was found");
    }
    let customer = new customerModel({ name, email });
    await customer.save();

    return res.status(200).send({ customer });
  } catch (error) {
    next(error);
  }
};

const getAllCustomers = async (req, res, next) => {
  try {
    let allCustomers = await customerModel.find();
    return res.status(200).send(allCustomers);
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let customer = await customerModel.findById(id);
    return res.status(200).send(customer);
  } catch (error) {
    next(error);
  }
};

const chargeCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, card_number, cvv, expiry_month, expiry_year, fullname } =
      req.body;

    let { email } = await customerModel.findById(id);

    const tx_ref = `${uuidv4()}`;
    const payload = {
      card_number,
      cvv,
      expiry_month,
      expiry_year,
      currency: "NGN",
      amount,
      email,
      fullname,
      tx_ref,
      enckey: process.env.FLW_ENCRYPTION_KEY,
    };

    // console.log(amount, id, customer);

    const flw = new Flutterwave(
      process.env.FLW_PUBLIC_KEY,
      process.env.FLW_SECRET_KEY
    );
    let data = await flw.Charge.card(payload);
    if (data.status !== "success") {
      throw new APIError("Payment Error", data.message);
    } else {
      let newPurchase = new purchaseModel({
        customerId: id,
        amount: amount,
      });
      await newPurchase.save();
    }
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAllCustomers,
  getCustomerById,
  chargeCustomer,
};
