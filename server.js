require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const customerRoutes = require("./routes/customerRoute");
const mongoose = require("mongoose");

const { notFoundMiddleWare } = require("./middleware/notFound");
const { errorMiddleWare } = require("./middleware/Error");
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ hope: "loop" });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/customers", customerRoutes);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log("Error connecting to MongoDB");
    process.exit(1);
  }
  console.log("Connection established");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(errorMiddleWare);

app.use(notFoundMiddleWare);

module.exports = app;
