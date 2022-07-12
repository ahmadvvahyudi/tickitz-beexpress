const {login, register} = require("../models/Auth")

const loginUser = async (req, res) => {
	try {
		const results = await login(req, res)
		return res.status(200).send(results)
	} catch (error) {
		return res.status(500).send(error)
	}
}
const registerUser = async (req, res) => {
	try {
		const results = await register(req, res)
		return res.status(200).send(results)
	} catch (error) {
		return res.status(500).send(error)
	}
}
module.exports = { loginUser, registerUser }
