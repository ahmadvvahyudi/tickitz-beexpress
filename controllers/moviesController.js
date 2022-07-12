const {getAll, getById, add, update, remove, search, sort} = require("../models/Movies")

const getAllMovies = async (req, res) => {
	try {
		const results = await getAll(req, res)
		res.status(200).send(results)
	} catch (error) {
		res.status(500).send(error)
	}
}

const getMoviesById = async (req, res) => {
	try {
		const results = await getById(req, res)
		res.status(200).send(results)
	} catch (error) {
		if (error.status === 400) {
			res.status(400).send(error)
		} else {
			res.status(500).send(error)
		}
	}
}

const addMovies = async (req, res) => {
    try {
        const reqModified={
            ...req,
            body: {...req.body, image: req.file.filename}
        }
        const results = await add(reqModified, res)
        res.status(200).send(results)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateMovies = async (req, res) => {
    try {
        const results = await update(req, res)
        res.status(200).send(results)
    } catch (error) {
        if (error.status === 400) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
}

const removeMovies = async (req, res) => {
    try {
        const results = await remove(req, res)
        res.status(200).send(results)
    } catch (error) {
        if (error.status === 400) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
}

const searchMovies = async (req, res) => {
    try {
        const results = await search(req, res)
        res.status(200).send(results)
    } catch (error) {
        if (error.status === 400) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
}

const sortMovies = async (req, res) => {
    try {
        const results = await sort(req, res)
        res.status(200).send(results)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getAllMovies,
    getMoviesById,
    addMovies,
    updateMovies,
    removeMovies,
    searchMovies,
    sortMovies
}