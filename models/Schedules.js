const db = require("../helper/db_conn")

const table = { schedule: "schedules", cinema: "cinemas" }

const getSchedules = async (req, res) => {
	return new Promise((resolve, reject) => {
		db.query(
			`SELECT a.*, b.name_cinema, b.image_cinema FROM ${table.schedule} AS a JOIN ${table.cinema} AS b WHERE a.id_cinema=b.id_cinema`,
			(err, results) => {
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
						status: 200,
						message: "Success Get Schedules",
						data: results
					})
				}
			}
		)
	})
}

const addSchedules = async (req, res) => {
	return new Promise((resolve, reject) => {
		const { id_movie, id_cinema, time, price } = req.body
		db.query(
			`INSERT INTO ${
				table.schedule
			} (id_movie, id_cinema, time, price) VALUES ('${id_movie}', '${id_cinema}', '${JSON.stringify(
				time
			)}', '${price}')`,
			(err, results) => {
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
						status: 200,
						message: "Success Add Schedules",
						data: {
							id: results.insertId
						}
					})
				}
			}
		)
	})
}

const updateSchedules = async (req, res) => {
	return new Promise((resolve, reject) => {
		db.query(
			`SELECT * FROM ${table.schedule} WHERE id_schedule=${req.params.id}`,
			(err, results) => {
				if (err) {
					reject({
						success: false,
						status: 500,
						message: "Internal Server Error",
						data: err
					})
				} else if (results.length === 0) {
					reject({
						success: false,
						status: 400,
						message: "Schedule Not Found"
					})
				} else {
					let prevData = {
						...results[0],
						...req.body
					}
					db.query(
						`UPDATE ${table.schedule} SET id_movie='${
							prevData.id_movie
						}', id_cinema='${prevData.id_cinema}', time='${JSON.stringify(
							prevData.time
						)}', price='${prevData.price}' WHERE id_schedule=${req.params.id}`,
						(err, results) => {
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
									status: 200,
									message: "Success Update Schedules",
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

const removeSchedules = async (req, res) => {
	return new Promise((resolve, reject) => {
		db.query(
			`SELECT id_schedule FROM ${table.schedule} WHERE id_schedule=${req.params.id}`,
			(err, results) => {
				if (err) {
					reject({
						success: false,
						status: 500,
						message: "Internal Server Error",
						data: err
					})
				} else if (results.length === 0) {
					reject({
						success: false,
						status: 400,
						message: "Schedule Not Found"
					})
				} else {
					db.query(
						`DELETE FROM ${table.schedule} WHERE id_schedule=${req.params.id}`,
						(err, results) => {
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
									status: 200,
									message: "Success Remove Schedules",
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

module.exports = {
	getSchedules,
	addSchedules,
	updateSchedules,
	removeSchedules
}
