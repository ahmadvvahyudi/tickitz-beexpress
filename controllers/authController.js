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