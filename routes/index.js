var app = require('express');
var router = app.Router();
var _ = require( 'lodash' )
var moment = require( 'moment' )
const User = require( '../database/database').User


function isLoggedIn(request, response, next) {
  if(request.isAuthenticated()) {
    //query to enter active
    // do we need a transaction that enters roomid

    const activeuserid = request.session.id
    const id = request.cookies.userid
    User.makeActiveUser(activeuserid, id, 345)
    return next()
  }
  response.redirect('/')
}

/* GET home page. */
router.get('/', (request, response ) => {
  response.render('splash')
})


router.get('/chat', isLoggedIn, function(request, response, next) {
  response.cookie('userid', request.user.id, { maxAge: (30*60*1000), httpOnly: false })
  response.render('index');
});

module.exports = router
