const User = require("../models/User")

exports.getHome = (req, res) => {
  res.render("index", { user: req.session.user })
}

exports.getLogin = (req, res) => {
  res.render("login")
}

exports.postLogin = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (user && (await user.comparePassword(password))) {
      req.session.user = { id: user._id, username: user.username, isAdmin: user.isAdmin }
      res.redirect("/player")
    } else {
      res.render("login", { error: "Invalid username or password" })
    }
  } catch (error) {
    console.error("Login error:", error)
    res.render("login", { error: "An error occurred during login" })
  }
}

exports.getRegister = (req, res) => {
  res.render("register")
}

exports.postRegister = async (req, res) => {
  const { username, password } = req.body
  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.render("register", { error: "Username already exists" })
    }
    const user = new User({ username, password })
    await user.save()
    res.redirect("/login")
  } catch (error) {
    console.error("Registration error:", error)
    res.render("register", { error: "An error occurred during registration" })
  }
}

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error(err)
    res.redirect("/")
  })
}

