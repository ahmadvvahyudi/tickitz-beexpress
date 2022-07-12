<<<<<<< HEAD
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
=======
const Auth= require('../models/Auth');

module.exports = {
    loginUser: async (req, res)=> {
        try {
            const results = await Auth.loginUser(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    registerUser: async (req, res)=> {
        try {
            const results = await Auth.registerUser(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
}
>>>>>>> b6008648da60fea951efadf710f5c8d4828c4c96
