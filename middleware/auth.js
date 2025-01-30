exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      console.log(req.session.user)
      next();
    } else {
      res.redirect('/login');
    }
  };
  
  exports.isAdmin = (req, res, next) => {
    console.log(req.session.user)
    if (req.session.user && req.session.user.isAdmin) {
      next();
    } else {
      return res.status(403).send('Access denied');
    }
  };