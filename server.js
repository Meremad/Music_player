const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const dotenv = require("dotenv")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")

dotenv.config()

const app = express()
async function createAdminUser() {
  try {
    const adminUsername = "admin"
    const adminPassword = "admin"

    const existingAdmin = await User.findOne({ username: adminUsername })
    if (!existingAdmin) {
      console.log("Creating admin user...")
      const adminUser = new User({
        username: adminUsername,
        password: adminPassword,
        isAdmin: true,
      })
      await adminUser.save()
      console.log("Admin user created successfully")
    } else {
      console.log("Admin user already exists")
    }
  } catch (error) {
    console.error("Error creating admin user:", error)
  }
}
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err))

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
)

// Set view engine
app.use(expressLayouts)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Routes
app.use("/", require("./routes/auth"))
app.use("/player", require("./routes/player"))
app.use("/admin", require("./routes/admin"))
app.use("/api", require("./routes/api"))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const User = require("./models/User")


