const Movies = require("../models/Movies")

const getAllMovies = async (req, res) => {
	try {
		const results = await Movies.getAllMovies(req, res)
		res.status(200).send(results)
	} catch (error) {
		res.status(500).send(error)
	}
}

const getMovieById = async (req, res) => {
	try {
		const results = await Movies.getMovieById(req, res)
		res.status(200).json(results)
	} catch (error) {
		if (error.status === 400) {
			res.status(400).json(error)
		} else {
			res.status(500).send(error)
		}
	}
}

const addMovies = async (req, res) => {
    try {
        const results = await Movies.addMovies(req, res)
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateMovies = async (req, res) => {
    try {
        const results = await Movies.updateMovies(req, res)
        res.status(200).json(results)
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json(error)
        } else {
            res.status(500).json(error)
        }
    }
}

const removeMovies = async (req, res) => {
    try {
        const results = await Movies.removeMovies(req, res)
        res.status(200).json(results)
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json(error)
        } else {
            res.status(500).json(error)
        }
    }
}

const searchMovies = async (req, res) => {
    try {
        const results = await Movies.searchMovies(req, res)
        res.status(200).json(results)
    } catch (error) {
        if (error.status === 400) {
            res.status(400).json(error)
        } else {
            res.status(500).json(error)
        }
    }
}

const sortMovies = async (req, res) => {
    try {
        const results = await Movies.sortMovies(req, res)
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getAllMovies,
    getMovieById,
    addMovies,
    updateMovies,
    removeMovies,
    searchMovies,
    sortMovies
}