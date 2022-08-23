const Router = require("express").Router();
const customerCtrl = require("../controllers/customer");

Router.route("/").post(customerCtrl.create);
Router.route("/").get(customerCtrl.getAllCustomers);
module.exports = Router;
