const db = require("../helper/db_conn")
const table = "movies"

const getAllMovies = async (req, res) => {
	return new Promise((resolve, reject) => {
		const { title = "", director = "" } = req.query
		const sql = `SELECT * FROM ${table} ${
			title ? `WHERE title LIKE '%${title}%'` : title && director
		} ${
			director ? `AND director LIKE '%${director}%'` : ""
		} ORDER BY release_date DESC`
		db.query(sql, (err, results) => {
			if (err) {
				reject({ message: "ada error" })
			}
			resolve({
				message: "Get All Movies Success",
				status: 200,
				data: results
			})
		})
	})
}

const getMoviesById = async (req, res) => {
	return new Promise((resolve, reject) => {
		db.query(
			`SELECT * FROM ${table} WHERE id =${req.params.id}`,
			(err, results) => {
				if (err) {
					reject({
						succes: false,
						status: 500,
						message: "ada error",
						data: err.code
					})
				} else if (results.length === 0) {
					reject({
						success: false,
						status: 400,
						message: "Bad Request, data not found!"
					})
				} else {
					resolve({
						success: true,
						status: 200,
						message: "successfully get data",
						data: results.map((result) => {
							return {
								...result,
								release_date: result.release_date.toISOString().split("T")[0]
							}
						})
					})
				}
			}
		)
	})
}

const addMovies = async (req, res) => {
	return new Promise((resolve, reject) => {
		const {
			title,
			cover,
			release_date,
			director,
			description,
			casts,
			categories
		} = req.body
		db.query(
			`INSERT INTO ${table}(title, cover, release, director, description, casts, categories) VALUES ('${title}', '${cover}','${release_date}','${director}','${description}','${casts}','${categories}')`,
			(err, results) => {
				if (err) {
					reject({ message: "ada error" })
				}
				resolve({
					message: "Add Movies Success",
					status: 200,
					data: {
						...req.body
					}
				})
			}
		)
	})
}
const updateMovies = async (req, res) => {
	return new Promise((resolve, reject) => {
		const { id } = req.params
		db.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, results) => {
			if (err) {
				res.send({ message: "ada error" })
			}

			const prevData = {
				...results[0],
				...req.body
			}
			const {
				title,
				cover,
				release_date,
				director,
				description,
				casts,
				categories
			} = prevData

			db.query(
				`UPDATE ${table} SET title='${title}', cover='${cover}', release='${release_date}', director='${director}', description='${description}', casts='${casts}', categories='${categories}'`,
				(err, results) => {
					if (err) {
						reject({ message: "ada error" })
					}
					resolve({
						message: "Update Movies Success",
						status: 200,
						data: results
					})
				}
			)
		})
	})
}
const removeMovies = async (req, res) => {
	return new Promise((resolve, reject) => {
		const { id } = req.params
		db.query(`DELETE FROM ${table} WHERE id = ${id}`, (err, results) => {
			if (err) {
				reject({ message: "ada error" })
			}
			resolve.send({
				message: "Delete Movies Success",
				status: 200,
				data: results
			})
		})
	})
}

const searchMovies = async (req, res) => {
	return new Promise((resolve, reject) => {
		const { title } = req.body
		db.query(
			`SELECT * FROM ${table} WHERE title LIKE '%${title}%'`,
			(err, results) => {
				if (err) {
					reject({
						succes: false,
						status: 500,
						message: "ada error",
						data: {
							code: err.code
						}
					})
				} else if (results.length === 0) {
					reject({
						succes: false,
						status: 400,
						message: "Bad Request, data not found!"
					})
				} else {
					resolve({
						succes: true,
						status: 200,
						message: "Search Movies Success",
						data: results
					})
				}
			}
		)
	})
}

const sortMovies = async (req, res) => {
	return new Promise((resolve, reject) => {
		const { sort } = req.params.toLowerCase()
		let querySort = { sort } != "asc" && { sort } != "desc" ? "asc" : { sort }
		db.query(
			`SELECT * FROM ${table} ORDER BY title ${querySort}, release_date ${querySort}`,
			(err, results) => {
				if (err) {
					reject({
						succes: false,
						status: 500,
						message: "Internal Server Error",
						data: err
					})
				} else {
					resolve({
						succes: true,
						status: 200,
						message: "Sort Movies Success",
						data: results.map((result) => {
							return {
								...result,
								release_date: result.release_date.toISOString().split("T")[0]
							}
						})
					})
				}
			}
		)
	})
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
