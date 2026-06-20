const { ObjectId } = require("mongodb");
const { db } = require("../config/db");

const carsCollection = () => db().collection("cars");

const verifyOwner = async (req, res, next) => {
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

    if (car.ownerEmail !== req.user.email) {
      return res.status(403).json({
        success: false,
        message: "Forbidden Access.",
      });
    }

    next();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

module.exports = verifyOwner;
