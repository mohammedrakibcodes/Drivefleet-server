const { db } = require("../config/db");
const { ObjectId } = require("mongodb");

const carsCollection = () => db().collection("cars");

const addCar = async (req, res) => {
  try {
    const car = {
      ...req.body,
      ownerEmail: req.user.email,
      bookingCount: 0,
      createdAt: new Date(),
    };

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

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Car ID.",
      });
    }

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

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Car ID.",
      });
    }

    const {
      dailyRentPrice,
      description,
      availability,
      image,
      carType,
      pickupLocation,
    } = req.body;

    const result = await carsCollection().updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          dailyRentPrice,
          description,
          availability,
          image,
          carType,
          pickupLocation,
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

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Car ID.",
      });
    }

    const result = await carsCollection().deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Car not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Car deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Car Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

const getMyCars = async (req, res) => {
  try {
    const cars = await carsCollection()
      .find({
        ownerEmail: req.user.email,
      })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({
      success: true,
      total: cars.length,
      data: cars,
    });
  } catch (error) {
    console.log(error);

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
  deleteCar,
  getMyCars,
};
