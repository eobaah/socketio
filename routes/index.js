var app = require('express');
var router = app.Router();


/* GET home page. */
// router.get('/', function(request, response, next) {
//   response.render('index', { title: "Hello World!"});
// });
router.get('/', function(request, response, next) {
  response.render('index');
});

module.exports = router
