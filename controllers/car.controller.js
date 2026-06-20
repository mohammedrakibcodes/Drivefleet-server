const { db } = require("../config/db");

const carsCollection = () => db().collection("cars");
const { ObjectId } = require("mongodb");

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

const getAllCars = async (req, res) => {
  try {
    const cars = await carsCollection()
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({
      success: true,
      total: cars.length,
      data: cars,
    });
  } catch (error) {
    console.error("Get Cars Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

const getHomeCars = async (req, res) => {
  try {
    const cars = await carsCollection()
      .find({ availability: "Available" })
      .sort({ createdAt: -1 })
      .limit(6)
      .toArray();

    res.status(200).json({
      success: true,
      total: cars.length,
      data: cars,
    });
  } catch (error) {
    console.error("Home Cars Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

const getSingleCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await carsCollection().findOne({
      _id: new ObjectId(id),
    });

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: car,
    });
  } catch (error) {
    console.error("Get Single Car Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedData = req.body;

    const result = await carsCollection().updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          dailyRentPrice: updatedData.dailyRentPrice,
          description: updatedData.description,
          availability: updatedData.availability,
          image: updatedData.image,
          carType: updatedData.carType,
          pickupLocation: updatedData.pickupLocation,
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Car not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Car updated successfully.",
    });
  } catch (error) {
    console.error("Update Car Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

module.exports = {
  addCar,
  getAllCars,
  getHomeCars,
  getSingleCar,
  updateCar,
};
