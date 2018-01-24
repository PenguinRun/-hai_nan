var express = require('express');
var router = express.Router();

const passport = require('../config/passport');

router.get('/success', function(req, res, next) {
    res.render('success', {data: req.user});
})

router.get('/login/facebook', passport.authenticate('facebook', { scope : ['email'] }));

router.get('/login/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/success',
                                      failureRedirect: '/' }));

module.exports = router;
