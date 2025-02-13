const express = require("express")
const router = express.Router()
const axios = require("axios")
const { isAuthenticated } = require("../middleware/auth")
const History = require("../models/ApiHistory")

// Get API request history
router.get("/history", isAuthenticated, async (req, res) => {
  try {
    const history = await History.find({ user: req.session.user.id }).sort({ timestamp: -1 })
    res.render("api-history", { history })
  } catch (error) {
    console.error("Error fetching history:", error)
    res.status(500).json({ error: "An error occurred while fetching history" })
  }
})

// Get specific history entry
router.get("/history/:id", isAuthenticated, async (req, res) => {
  try {
    const entry = await History.findById(req.params.id)
    if (!entry || entry.user.toString() !== req.session.user.id) {
      return res.status(404).json({ error: "History entry not found" })
    }
    res.json(JSON.parse(entry.response))
  } catch (error) {
    console.error("Error fetching history entry:", error)
    res.status(500).json({ error: "An error occurred while fetching history entry" })
  }
})

module.exports = router

