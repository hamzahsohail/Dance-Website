const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const app = express();
const port = 80;

main().catch((err) => console.log(err));

// mongoose
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/contactDance");
}

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  emailAddress: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// express
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

// pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// endpoints
app.get("/", (req, res) => {
  res.status(200).render("index.pug");
});

app.get("/apply-now", (req, res) => {
  res.status(200).render("button.pug");
});

app.post("/apply-now", (req, res) => {
  var myData = new Contact(req.body);
  myData
    .save()
    .then(() => {
      res.status(200).send("Application Sent!");
    })
    .catch(() => {
      res.status(400).send("Application NOT Sent!");
    });
});

// server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
