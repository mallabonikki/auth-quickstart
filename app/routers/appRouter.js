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

var user = require('../model/models.js').User

var db = require('../../provider')

  // router.post('/login', passport.authenticate('local', 
  //   { successRedirect: '/patients',
  //     failureRedirect: '/',
  //     failureFlash: true 
  //   })
  // );

  router.post('/login', 
    function(req, res, next) {
      passport.authenticate('local', 
        function(err, user, info) {
          if (err) { return next(err) }
          if (!user) { return res.redirect('/') }
          req.logIn(user, 
            function(err) {
              if (err) { return next(err); }

                db.getUserPatient('mallabonikki').then(function(rows) { 
                  console.log(rows)
                  res.render('patients', {rows: rows })
                })
                .catch(function(err) {
                  console.log(err);
                })

              // res.render('patients', { 
              //   doctorsFirstname: user.firstName, 
              //   doctorsLastname: user.lastName 
              // });
            }
          );
        }
      )(req, res, next);
    }
  );


  router.get('/', function(req, res) {
    res.render('home')
  })

  // router.get('/patients/', isAuthenticated, 
  //   function(err, user, info) {
  //     if (err) { return next(err); }

  //   }
  //     function(req, res, next) {
  //       res.render('patients', { doctorsFirstname: user.firstName, doctorsLastname: user.lastName })
  //     }

  // );

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })

  return router
}