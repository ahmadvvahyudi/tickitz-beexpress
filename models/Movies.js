const db = require("../helper/db_conn")
const table = "movies"
const id = "id_movie"

const getAll = async (req, res) => {
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

const getById = async (req, res) => {
	return new Promise((resolve, reject) => {
		db.query(
			`SELECT * FROM ${table} WHERE id_movie =${req.params.id}`,
			(err, results) => {
				if (err) {
					reject({
						succes: false,
						status: 500,
						message: "Internal Server Error",
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

const add = async (req, res) => {
	return new Promise((resolve, reject) => {
		const {
			title,
			genre,
			release_date,
			directed_by,
			duration,
			cast,
			synopsis,
			image
		} = req.body
		console.log(req.body)
		db.query(
			`INSERT INTO ${table} (title, genre, release_date, directed_by, duration, cast, synopsis, image) VALUES ('${title}', '${genre}','${release_date}','${directed_by}','${duration}','${cast}','${synopsis}','${image}')`,
			(err, results) => {
				console.log(req.body, "reaq")
				if (err) {
					reject({
						success: false,
						status: 500,
						message: "Internal Server Error",
						data: err
					})
				} else {
				resolve({
					success: true,
					message: "Add Movies Success",
					status: 200,
					data: results 
				})
			}
	})
	})
}
const update = async (req, res) => {
	return new Promise((resolve, reject) => {
		const { id } = req.params
		db.query(
			`SELECT * FROM ${table} WHERE id_movie = ${id}`,
			(err, results) => {
				if (err) {
					reject({
						success: false,
						status: 500,
						message: "Internal Server Error",
						data: err.code
					})
				} else if (results.length === 0) {
					reject({
						success: false,
						status: 400,
						message: "Bad Request, data not found!"
					})
				} else {
					const prevData = {
						...results[0],
						...req.body
					}
					const {
						title,
						genre,
						release_date,
						directed_by,
						duration,
						cast,
						synopsis,
						image
					} = prevData

					db.query(
						`UPDATE ${table} SET title='${title}', genre='${genre}', release_date='${release_date}', directed_by='${directed_by}', duration='${duration}', cast='${cast}', synopsis='${synopsis}', image ='${image}'`,
						(err, results) => {
							if (err) {
								reject({
									success: false,
									status: 500,
									message: "Internal Server Error",
									data: err.code
								})
							}
							resolve({
								success: true,
								message: "Update Movies Success",
								status: 200,
								data: {
									id: req.params.id
								}
							})
						}
					)
				}
			}
		)
	})
}
const remove = async (req, res) => {
	return new Promise((resolve, reject) => {
		db.query(
			`SELECT ${id} from ${table} where ${id}=${req.params.id}`,
			(err, results) => {
				if (err) {
					reject({
						success: false,
						status: 500,
						message: "Internal Server Error",
						data: err.code
					})
				} else if (results.length === 0) {
					reject({
						success: false,
						status: 400,
						message: "Bad Request, data not found!"
					})
				} else {
					db.query(
						`DELETE FROM ${table} WHERE ${id} = ${req.params.id}`,
						(err, results) => {
							if (err) {
								reject({
									success: false,
									status: 500,
									message: "Internal Server Error",
									data: err.code
								})
							} else {
								resolve({
									success: true,
									status: 200,
									message: "Delete Movies Success",
									data: {
										id: req.params.id
									}
								})
							}
						}
					)
				}
			}
		)
	})
}

const search = async (req, res) => {
	return new Promise((resolve, reject) => {
		const { title } = req.body
		db.query(
			`SELECT * FROM ${table} WHERE title LIKE '%${title}%'`,
			(err, results) => {
				if (err) {
					reject({
						succes: false,
						status: 500,
						message: "Internal Server Error",
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

const sort = async (req, res) => {
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
	getAll,
	getById,
	add,
	update,
	remove,
	search,
	sort
}
