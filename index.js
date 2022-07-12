require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const app = express()
<<<<<<< HEAD
const port = process.env.PORT || 4000
=======
const port = process.env.PORT || 5000
>>>>>>> b6008648da60fea951efadf710f5c8d4828c4c96
const router = require("./routes")
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/api/v1", router)

app.get("/", (req, res) => res.send("Server is running"))

app.listen(port, () => {
	console.log(`Tickitz Server is running on port ${port}`)
})
