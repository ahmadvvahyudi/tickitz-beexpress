const Bookings = require("../models/Bookings")

const getBookings = async (req, res) => {
  try {
    const results = await Bookings.getBookings()
    res.status(200).json(results)
  } catch (error) {
    res.status(500).json(error)
  }
}

const addBookings = async (req, res) => {
  try {
    const results = await Bookings.addBookings(req, res)
    res.status(200).json(results)
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateBookings = async (req, res) => {
  try {
    const results = await Bookings.updateBookings(req, res)
    res.status(200).json(results)
  } catch (error) {
    if (error.status === 400) {
      res.status(400).json(error)
    } else {
      res.status(500).json(error)
    }
  }
}

const removeBookings = async (req, res) => {
  try {
    const results = await Bookings.removeBookings(req, res)
    res.status(200).json(results)
  } catch (error) {
    if (error.status === 400) {
      res.status(400).json(error)
    } else {
      res.status(500).json(error)
    }
  }
}

module.exports = {
  getBookings,
  addBookings,
  updateBookings,
  removeBookings,
}
