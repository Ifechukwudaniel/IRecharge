const customerModel = require("../model/customerModel");
const mongoose = require("mongoose");
const { APIError } = require("../Errors/baseErrors");
const objectId = mongoose.Types.ObjectId;

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

module.exports = {
  create,
  getAllCustomers,
};
