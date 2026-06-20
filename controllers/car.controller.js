const { db } = require("../config/db");

const carsCollection = () => db().collection("cars");

const addCar = async (req, res) => {
  try {
    const car = req.body;

    if (
      !car.carName ||
      !car.dailyRentPrice ||
      !car.carType ||
      !car.image ||
      !car.seatCapacity ||
      !car.pickupLocation ||
      !car.description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    car.bookingCount = 0;
    car.createdAt = new Date();

    const result = await carsCollection().insertOne(car);

    res.status(201).json({
      success: true,
      message: "Car added successfully.",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Add Car Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

module.exports = {
  addCar,
};
