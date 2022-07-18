// 
const Movies = require ("../models/Movies")

const getAllMovies = async (req, res) => {
	try {
		const results = await Movies.getAll(req, res)
		res.status(200).send(results)
	} catch (error) {
		res.status(500).send(error)
	}
}

const getMoviesById = async (req, res) => {
	try {
		const results = await Movies.getById(req, res)
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
        console.log(req.body)
        console.log(req.file)
        const reqModified={
            ...req,
            body: {...req.body, image: req.file.filename}
        }
        const results = await Movies.add(reqModified, res)
        res.status(200).send(results)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateMovies = async (req, res) => {
    try {
        const results = await Movies.update(req, res)
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
        const results = await Movies.remove(req, res)
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
        const results = await Movies.search(req, res)
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
        const results = await Movies.sort(req, res)
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
