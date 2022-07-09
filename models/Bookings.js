const db = require("../helper/db_conn")
const table = {
	movie: "movies",
	schedule: "schedules",
	booking: "bookings",
	cinema: "cinemas"
}
const getBookings = async () => {
	return new Promise((resolve, reject) => {
		db.query(
			`SELECT a.seat, a.time, b.title, c.name_cinema, c.image_cinema, d.price FROM ${table.booking} AS a JOIN ${table.movie} AS b JOIN ${table.cinema} AS c JOIN ${table.schedule} AS d WHERE a.id_movie=b.id_movie AND a.id_cinema=c.id_cinema AND a.id_schedule=d.id_schedule`,
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
						message: "Success Get Bookings",
						data: results
					})
				}
			}
		)
	})
}

const addBookings = async (req, res) => {
	return new Promise((resolve, reject) => {
		const { id_movie, id_cinema, id_schedule, seat, time } = req.body
		db.query(
			`INSERT INTO ${
				table.booking
			} (id_movie, id_cinema, id_schedule, seat, time) VALUES ('${id_movie}', '${id_cinema}', '${id_schedule}', ${JSON.stringify(
				seat
			)}, '${time}')`,
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
						message: "Success Add Bookings",
						data: {
							id: results.insertId
						}
					})
				}
			}
		)
	})
}

const updateBookings = async (req, res) => {
	return new Promise((resolve, reject) => {
		db.query(
			`SELECT * FROM ${table.booking} WHERE id_booking=${req.params.id}`,
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
						status: 404,
						message: "Bad Request, Booking Not Found"
					})
				} else {
					let prevData = {
						...results[0],
						...req.body
					}
					const { id_movie, id_cinema, id_schedule, seat, time } = prevData
					db.query(
						`UPDATE ${
							table.booking
						} SET id_movie='${id_movie}', id_cinema='${id_cinema}', id_schedule='${id_schedule}', seat='${JSON.stringify(
							seat
						)}', time='${time}' WHERE id_booking=${req.params.id}`,
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
									message: "Success Update Bookings",
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

const deleteBookings = async (req, res) => {
	return new Promise((resolve, reject) => {
		db.query(
			`DELETE FROM ${table.booking} WHERE id_booking=${req.params.id}`,
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
						status: 404,
						message: "Bad Request, Booking Not Found"
					})
				} else {
					db.query(
						`DELETE FROM ${table.booking} WHERE id_booking=${req.params.id}`,
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
									message: "Success Delete Booking Data",
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
	getBookings,
	addBookings,
	updateBookings,
	deleteBookings
}
