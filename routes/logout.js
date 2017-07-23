var express = require('express');
var router = express.Router();

/* GET logout page. */
router.get('/', function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});


module.exports = router;
