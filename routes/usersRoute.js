const express = require("express")
const usersController = require("../controllers/usersController")
const router = express.Router()

router.get("/", usersController.getUsers)
router.post("/", usersController.addUsers)
router.patch("/:id", usersController.updateUsers)
router.delete("/:id", usersController.removeUsers)

module.exports = router
