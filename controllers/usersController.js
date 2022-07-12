const Users = require("../models/Users");


module.exports={
    getUsers: async (req, res) => {
        try {
            const results = await Users.getUsers(req, res);
            return res.send({
                success: true,
                status: 200,
                message: "Get Users Success",
            })
        }catch(err){
            return res.send({
                success: false,
                status: 400,
                message: "Internal Server Error",
                data: {
                    code: err.code
                }
            })
        }
    },
    addUsers: async (req, res) => {
        try {
            const results = await Users.addUsers(req, res);
            return res.send({
                success: true,
                status: 200,
                message: "Add Users Success",
                data: results
            })
        }catch(err){
            return res.send({
                success: false,
                status: 400,
                message: "Internal Server Error",
                data: {
                    code: err.code
                }
            })
        }
    },
    updateUsers: async (req, res) => {
        try {
            const results = await Users.updateUsers(req, res);
            return res.send({
                success: true,
                status: 200,
                message: "Update Users Success",
                data: results
            })
        }catch(err){
            return res.send({
                success: false,
                status: 400,
                message: "Internal Server Error",
                data: {
                    code: err.code
                }
            })
        }
    },
    removeUsers: async (req, res) => {
        try {
            const results = await Users.removeUsers(req, res);
            return res.send({
                success: true,
                status: 200,
                message: "Delete Users Success",
                data: results
            })
        }catch(err){
            return res.send({
                success: false,
                status: 400,
                message: "Internal Server Error",
                data: {
                    code: err.code
                }
            })
        }
    }
}

