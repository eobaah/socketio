var app = require('express');
var router = app.Router();
var _ = require( 'lodash' )
var moment = require( 'moment' )

/* GET home page. */
router.get('/', (request, response ) => {
  response.render('splash')
})

router.get('/chat', function(request, response, next) {
  response.render('index');
});

module.exports = router
