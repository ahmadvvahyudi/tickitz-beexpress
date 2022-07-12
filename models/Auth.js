const db = require("../helper/db_conn")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
<<<<<<< HEAD
const { useError } = require("../helper/errmsg")

const table = "users"

const login = async (req, res) => {
	const { email, password } = req.body
	return new Promise((resolve, reject) => {
		db.query(
			`SELECT id_user, password, role FROM ${table} WHERE email = '${email.toLowerCase()}' AND password = '${password}'`,
=======
const { useError } = require("../helper/error_message")

const table = "users"

const loginUser = async (req, res) => {
	const { email, password } = req.body
	return new Promise((resolve, reject) => {
		db.query(
			`SELECT id_user, password, role FROM ${table} WHERE email = '${email.toLowerCase()}'`,
>>>>>>> b6008648da60fea951efadf710f5c8d4828c4c96
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
				} else {
					if (!results.length) {
						reject({
							success: false,
							status: 400,
							message: "Email/Password Salah"
						})
<<<<<<< HEAD
					}
					// if (successHashing) {
						const token = jwt.sign(
							{
								id: results[0].id_user,
								role: results[0].role
							},
							process.env.JWT_SECRET_KEY,
							{
								expiresIn: "1 day"
							}
						)
						resolve({
							success: true,
							status: 200,
							message: "Login Success",
							data: {
								token,
								user_id: results[0].id_user
							}
						})
					// } else {
					// 	reject({
					// 		success: false,
					// 		status: 400,
					// 		message: "Email/Password Salah"
					// 	})
					// }
					// } else {
					// 	bcrypt.compare(
					// 		password,
					// 		results[0].password,
					// 		(errHashing, successHashing) => {
					// 			if (errHashing) {
					// 				reject({
					// 					success: false,
					// 					status: 500,
					// 					message: "Ada masalah saat Login, coba lagi",
					// 					data: {
					// 						code: err.code
					// 					}
					// 				})
					// 			}
					// 			if (successHashing) {
					// 				const token = jwt.sign(
					// 					{
					// 						id: results[0].id_user,
					// 						role: results[0].role
					// 					},
					// 					process.env.JWT_SECRET_KEY,
					// 					{
					// 						expiresIn: "1 day"
					// 					}
					// 				)
					// 				resolve({
					// 					success: true,
					// 					status: 200,
					// 					message: "Login Success",
					// 					data: {
					// 						token,
					// 						user_id: results[0].id_user
					// 					}
					// 				})
					// 			} else {
					// 				reject({
					// 					success: false,
					// 					status: 400,
					// 					message: "Email/Password Salah"
					// 				})
					// 			}
					// 		}
					// 	)
					// }
=======
					} else {
						bcrypt.compare(
							password,
							results[0].password,
							(errHashing, successHashing) => {
								if (errHashing) {
									reject({
										success: false,
										status: 500,
										message: "Ada masalah saat Login, coba lagi",
										data: {
											code: err.code
										}
									})
								}
								if (successHashing) {
									const token = jwt.sign(
										{
											id: results[0].id_user,
											role: results[0].role
										},
										process.env.JWT_SECRET_KEY,
										{
											expiresIn: "1 day"
										}
									)
									resolve({
										success: true,
										status: 200,
										message: "Login Success",
										data: {
											token,
											user_id: results[0].id_user
										}
									})
								} else {
									reject({
										success: false,
										status: 400,
										message: "Email/Password Salah"
									})
								}
							}
						)
					}
>>>>>>> b6008648da60fea951efadf710f5c8d4828c4c96
				}
			}
		)
	})
}

<<<<<<< HEAD
const register = async (req, res) => {
	const { fullname, email, password, image } = req.body
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, 10, (err, hashedPassword) => {
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
				db.query(
					`INSERT INTO ${table} (fullname, email, password, image) VALUES ('${fullname}', '${email.toLowerCase()}', '${hashedPassword}', '${image}')`,
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
							message: "Register Success",
							data: results
						})
					}
				)
			}
		})
	})
}

module.exports = {
	login,
	register
=======
const registerUser = async (req, res) => {
    const {name, email, password, image} = req.body
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
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
                db.query(
                    `INSERT INTO ${table} (name, email, password, image) VALUES ('${name}', '${email.toLowerCase()}', '${hashedPassword}', '${image}')`,
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
                        } else {
                            resolve({
                                success: true,
                                status: 200,
                                message: "Register Success",
                                data: results
                            })
                        }
                    }
                )
            }
        })
    })
}

module.exports={
    loginUser,
    registerUser
>>>>>>> b6008648da60fea951efadf710f5c8d4828c4c96
}
