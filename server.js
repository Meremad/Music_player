const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const dotenv = require("dotenv")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")
const User = require("./models/User") 
const isAuthenticated = require("./middleware/auth.js")
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
  .connect('mongodb+srv://abaymereke:5kJAFaqn04qdbCFP@cluster0.8tvgr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
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
  })
);

// Set view engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", require("./routes/auth"));
app.use("/player", require("./routes/player"));
app.use("/admin", require("./routes/admin"));
app.use("/api", require("./routes/api"));

// Роуты для квиза (будут доступны по URL: /quiz/...)
app.use("/quiz", require("./routes/quiz"));

// Set view engine
app.use(expressLayouts)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use('/downloads', express.static(path.join(__dirname, 'downloads')));

// Routes
const adminRoutes = require("./routes/admin"); // Импорт
app.use("/", require("./routes/auth"))
app.use("/admin", adminRoutes); // Подключаем маршруты
app.use("/player", require("./routes/player"))
app.use("/admin", require("./routes/admin"))
app.use("/api", require("./routes/api"))
app.use('/quiz', require('./routes/quiz'));
app.use('/rest', require('./routes/restApiRoute'));
app.use('/posts', require('./routes/catalog'));

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


