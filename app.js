const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contactGym", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// define mongoose schema
var contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});

var Contact = mongoose.model("Contact", contactSchema);

//express stuff
app.use("/static", express.static("static"));
app.use(express.urlencoded());

// pug stuff
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData
    .save()
    .then(() => {
      res.send("this information is saved");
    })
    .catch(() => {
      res.status.send("info not saved");
    });
  // res.status(200).render("contact.pug");
});

app.listen(port, () => {
  console.log(`the server is at ${port}`);
});