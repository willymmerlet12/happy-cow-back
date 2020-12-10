require("dotenv").config();
const express = require("express");
const cors = require("cors");
const formidable = require("express-formidable");
const mongoose = require("mongoose");

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const userRoute = require("./routes/user");
app.use(userRoute);

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
app.get("/", (req, res) => {
  res.json("Hello");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "error" });
});

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
