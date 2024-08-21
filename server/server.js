const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("passport");
const path = require("path");

app.set("view engine", "ejs");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  // res.send("hi welcome to this e-commerce app");
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// kind of middleware which parse the data
const bodyParser = require("body-parser");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../client/build")));

app.use(bodyParser.json()); // we can access it in (req.body)

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

app.use(passport.initialize());

app.listen(PORT, () => {
  console.log("server is running on port ", process.env.PORT);
});
