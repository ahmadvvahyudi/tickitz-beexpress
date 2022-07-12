
const Users = require('../models/Users')

module.exports = {
    getUsers: async (req, res)=> {
        try {
            const results = await Users.getUsers(req, res)
            return res.status(200).send({
                message: 'success'
            })
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    addUsers: async (req, res)=> {
        try {
            const results = await Users.addUsers(req, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    updateUsers: async(req, res) => {
        try {
            const results = await Users.updateUsers(req, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    removeUsers: async(req, res)=> {
        try {
            const results = await Users.removeUsers(req, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}