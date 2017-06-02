const express = require('express');
const router = express.Router();
const passport = require('passport')
const passport2 = require('../passport')
const User = require( '../database/database').User




const authOptions = {
  successRedirect: '/home',
  failureRedirect: '/'
}

router.get('/signup', (request, response, next) => {
  response.render('login');
});

router.post( '/signup', (request, response, next) => {
  const {
    firstname,
    lastname,
    email,
    username,
    password
  } = request.body
  User.createOne(
    firstname,
    lastname,
    email,
    username,
    password )
    .then( user => {
      console.log("user created",user);
      request.login( {
        id: user.id,
        firstname,
        lastname,
        email,
        username,
        password
      }, error => {
        if(error) {
          next(error)
        }
        response.redirect('/home')
      })
    })
    .catch( error => {
      console.log("Damn it failed", error);
      response.render( 'signup', {
        message: 'Your authentication failed fool!'
      })
    })
})

// router.get('/login', (request, response, next) => {
//   response.render('login');
// });

router.post( '/login', passport.authenticate( 'local', authOptions ))

router.get( '/logout', ( request, response ) => {
  request.logout()
  response.redirect( '/' )
})

module.exports = router;
