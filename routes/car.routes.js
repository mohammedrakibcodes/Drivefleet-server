const express = require("express");

const { addCar } = require("../controllers/car.controller");

const router = express.Router();

router.post("/cars", addCar);

module.exports = router;
