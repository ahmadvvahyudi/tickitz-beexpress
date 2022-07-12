const db = require("../helper/db_conn")
const table = "users"

const getUsers = async (req, res) => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT * FROM ${table}`, (err, results) => {
			if (err) {
				reject({
					success: false,
					status: 500,
					message: "Internal Server Error",
					data: {
						code: err.code
					}
				})
			} else {
				resolve({
					success: true,
					status: 200,
					message: "Get Users Success",
					data: results
				})
			}
		})
	})
}
const addUsers = async (req, res) => {
	return new Promise((resolve, reject) => {
		const { fullname, email, password, image, role } = req.body
		db.query(
			`INSERT INTO ${table} (fullname, email, password, image, role) VALUES ('${fullname}', '${email.toLowerCase()}', '${password}', '${image}', '${role}')`,
			(err, results) => {
				if (err) {
					reject({
						success: false,
						status: 500,
						message: "Internal Server Error",
						data: {
							code: err.code
						}
					})
				}
				resolve({
					success: true,
					status: 200,
					message: "Add Users Success",
					data: {
						id: results.insertId,
						...req.body
					}
				})
			}
		)
	})
}

const updateUsers = async (req, res) => {
	return new Promise((resolve, reject) => {
		const { id } = req.params
		db.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, results) => {
			if (err) {
				reject({
					success: false,
					status: 500,
					message: "Internal Server Error",
					data: {
						code: err.code
					}
				})
			}
			const prevData = {
				...results[0],
				...req.body
			}
			const { fullname, email, password, image, role } = prevData
			db.query(
				`UPDATE ${table} SET fullname='${fullname}', email='${email.toLowerCase()}', password='${password}', image='${image}', role='${role}' WHERE id=${id}`,
				(err, results) => {
					if (err) {
						reject({
							success: false,
							status: 500,
							message: "Internal Server Error",
							data: {
								code: err.code
							}
						})
					}
					resolve({
						success: true,
						status: 200,
						message: "Update Users Success",
						data: results
					})
				}
			)
		})
	})
}

const removeUsers = async (req, res) => {
	return new Promise((resolve, reject) => {
		const { id } = req.params
		db.query(`DELETE FROM ${table} WHERE id=${id}`, (err, results) => {
			if (err) {
				reject({
					success: false,
					status: 500,
					message: "Internal Server Error",
					data: {
						code: err.code
					}
				})
			}
			resolve({
				success: true,
				status: 200,
				message: "Remove Users Success",
				data: results
			})
		})
	})
}

module.exports = {
	getUsers,
	addUsers,
	updateUsers,
	removeUsers
}
