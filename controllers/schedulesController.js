const schedules = require("../models/schedules")

const getSchedules = async (req, res) => {
	try {
		const results = await schedules.getSchedules()
		res.status(200).json(results)
	} catch (error) {
		res.status(500).json(error)
	}
}

const addSchedules = async (req, res) => {
	try {
		const results = await schedules.addSchedules(req, res)
		res.status(200).json(results)
	} catch (error) {
		res.status(500).json(error)
	}
}

const updateSchedules = async (req, res) => {
	try {
		const results = await schedules.updateSchedules(req, res)
		res.status(200).json(results)
	} catch (error) {
		if (error.status === 400) {
			res.status(400).json(error)
		} else {
			res.status(500).json(error)
		}
	}
}

const removeSchedules = async (req, res) => {
	try {
		const results = await schedules.removeSchedules(req, res)
		res.status(200).json(results)
	} catch (error) {
		if (error.status === 400) {
			res.status(400).json(error)
		} else {
			res.status(500).json(error)
		}
	}
}

module.exports={
    getSchedules,
    addSchedules,
    updateSchedules,
    removeSchedules,
}