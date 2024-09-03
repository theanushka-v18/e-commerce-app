const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("passport");
const path = require("path");
const cors = require('cors');

app.use(cors());
// kind of middleware which parse the data
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // we can access it in (req.body)
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;  // or simply 3000

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

app.use("/auth", authRoutes);
app.use("/products", productRoutes);




// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  // res.send("hi welcome to this e-commerce app");
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.use(passport.initialize());

app.listen(PORT, () => {
  console.log("server is running on port ", process.env.PORT);
});
