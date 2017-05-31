var express = require('express');
var router = express.Router();
var passport = require('passport')
var passport2 = require('../passport')
var User = require( '../database/database').User

var authOptions = {
  successRedirect: '/',
  failureRedirect: 'users/login'
}

router.get('/signup', (request, response, next) => {
  response.render('signup');
});

router.post( '/signup', (request, response, next) => {
  const {
    username,
    firstname,
    lastname,
    email,
    password
  } = request.body

  User.createOne(
    username,
    firstname,
    lastname,
    email,
    password  )
      .then( user => {
        console.log("user created",user);
        request.login( {
          id: user.id,
          email
        }, error => {
          if(error) {
            next(error)
          }
          response.redirect('/chat')
        })
      })
      .catch( error => {
        console.log("Damn it failed", error);
        response.render( 'signup', {
          message: 'Your authentication failed fool!'
        })
      })
})

router.get('/login', (request, response, next) => {
  response.render('login');
});

router.post( '/login', passport.authenticate( 'local', authOptions ))

router.get( '/logout', ( request, response ) => {
  request.logout()
  response.redirect( '/' )
})

module.exports = router;
