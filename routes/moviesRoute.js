const express = require("express")
const router = express.Router()
const movieController = require("../controllers/moviesController")

router.get("/", movieController.getAllMovies)
router.get("/:id", movieController.getMovieById)
router.post("/", upload.single("image"), movieController.addMovies)
router.patch("/:id", upload.single("image"), movieController.updateMovies)
router.delete("/:id", movieController.removeMovies)
router.post("/search", movieController.searchMovies)
router.get("/sort/:sort", movieController.sortMovies)
module.exports = router
