require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const userRoutes = require("./routes/user");
app.use(userRoutes);
const restoRoutes = require("./routes/restaurant");

app.post("/payment", async (req, res) => {
  try {
    const stripeToken = req.fields.stripeToken;

    const response = await stripe.charges.create({
      amount: 2003,
      currency: "eur",
      description: "",
      source: stripeToken,
    });
    console.log(response);

    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
});
app.all("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: error.message });
});
app.listen(process.env.PORT, () => {
  console.log("Server started");
});
