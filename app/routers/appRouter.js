var passport = require('passport'),
    signupController = require('../controllers/signupController.js')

module.exports = function(express) {
  var router = express.Router()

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next()
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/')
  }
  
  router.get('/signup', signupController.show)
  router.post('/signup', signupController.signup)

  router.post('/login', passport.authenticate('local', {
      successRedirect: '/patients/',
      failureRedirect: '/',
      failureFlash: true 
      })
  );

  router.get('/', function(req, res) {
    res.render('home')
  })

  router.get('/patients/', isAuthenticated, function(req, res) {
    // res.send(req.body.username)
    res.render('patients', { doctorsFirstname: "Enrico", doctorsLastname: "Babaran"})
  })

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })

  return router
}