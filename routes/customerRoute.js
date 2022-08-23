const Router = require("express").Router();
const customerCtrl = require("../controllers/customer");

Router.route("/").post(customerCtrl.create);
Router.route("/").get(customerCtrl.getAllCustomers);
Router.route("/charge/:id/").post(customerCtrl.chargeCustomer);
Router.route("/chargeOtp/:id/").post(customerCtrl.validateCharge);
Router.route("/:id").get(customerCtrl.getCustomerById);
Router.route("/payments/:id").get(customerCtrl.getCustomerPurchases);
module.exports = Router;
