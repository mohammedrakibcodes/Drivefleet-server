const { ObjectId } = require("mongodb");
const { db } = require("../config/db");

const bookingsCollection = () => db().collection("bookings");
const carsCollection = () => db().collection("cars");

const bookCar = async (req, res) => {
  try {
    const booking = req.body;

    const { carId, bookingDate, returnDate } = booking;

    if (!ObjectId.isValid(carId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Car ID.",
      });
    }

    if (!bookingDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "Booking and return dates are required.",
      });
    }

    const start = new Date(bookingDate);
    const end = new Date(returnDate);

    if (end < start) {
      return res.status(400).json({
        success: false,
        message: "Return date cannot be before booking date.",
      });
    }

    const car = await carsCollection().findOne({
      _id: new ObjectId(carId),
    });

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found.",
      });
    }

    if (car.availability !== "Available") {
      return res.status(400).json({
        success: false,
        message: "This car is currently unavailable.",
      });
    }

    const alreadyBooked = await bookingsCollection().findOne({
      userEmail: req.user.email,
      carId,
    });

    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: "You already booked this car.",
      });
    }

    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const totalPrice = totalDays * Number(car.dailyRentPrice);

    const bookingData = {
      carId,
      carName: car.carName,
      carImage: car.image,
      dailyRentPrice: car.dailyRentPrice,
      bookingDate,
      returnDate,
      totalDays,
      totalPrice,
      userEmail: req.user.email,
      createdAt: new Date(),
    };

    const result = await bookingsCollection().insertOne(bookingData);

    await carsCollection().updateOne(
      {
        _id: new ObjectId(carId),
      },
      {
        $inc: {
          bookingCount: 1,
        },
      },
    );

    res.status(201).json({
      success: true,
      message: "Car booked successfully.",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await bookingsCollection()
      .find({
        userEmail: req.user.email,
      })
      .sort({
        createdAt: -1,
      })
      .toArray();

    res.status(200).json({
      success: true,
      total: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Booking ID.",
      });
    }

    const booking = await bookingsCollection().findOne({
      _id: new ObjectId(id),
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (booking.userEmail !== req.user.email) {
      return res.status(403).json({
        success: false,
        message: "Forbidden Access.",
      });
    }

    await bookingsCollection().deleteOne({
      _id: new ObjectId(id),
    });

    await carsCollection().updateOne(
      {
        _id: new ObjectId(booking.carId),
      },
      {
        $inc: {
          bookingCount: -1,
        },
      },
    );

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully.",
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
  bookCar,
  getMyBookings,
  cancelBooking,
};
