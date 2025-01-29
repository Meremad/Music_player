const express = require("express")
const router = express.Router()
const playerController = require("../controllers/playerController")
const { isAuthenticated } = require("../middleware/auth")

router.get("/", isAuthenticated, playerController.getPlayer)
router.get("/search", isAuthenticated, playerController.searchSongs)
router.get("/play/:id", isAuthenticated, playerController.playSong)
router.get("/video", isAuthenticated, playerController.getVideo)

module.exports = router

