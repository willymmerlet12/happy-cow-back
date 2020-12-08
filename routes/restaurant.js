const express = require("express");
const router = express.Router();

router.get("/restaurants", (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.status(400).json("message : ", error.message);
  }
});

router.get("/restaurant/:id", async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:3100/${req.params.id}`);
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("message : ", error.message);
  }
});
module.exports = router;
