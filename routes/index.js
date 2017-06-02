var app = require('express');
var router = app.Router();
var _ = require( 'lodash' )
var moment = require( 'moment' )
const {User, Messages} = require( '../database/database')


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

router.post('/createchatroom', (request, response, next ) => {
  const roomname = request.body.roomname
  console.log( "======> roomname", roomname )
  Messages.createChatRoom( roomname )
    .then( () => response.redirect( '/home' ) )
})


router.get('/home', isLoggedIn, function(request, response, next) {
  Messages.getChatRooms()
    .then( newrooms => {
    response.cookie('userid', request.user.id, { maxAge: (30*60*1000), httpOnly: false })
    response.render( 'index', {
      newrooms
    }) ;
    })
});

module.exports = router
