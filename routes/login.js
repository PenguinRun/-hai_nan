var express = require('express');
var router = express.Router();
const passport = require('../config/passport');

const LoginAction = require('../controllers/login/get_controller');

loginAction = new LoginAction();

router.get('/success', function(req, res, next) {
    res.render('success', {data: req.user});
})

router.get('/login/facebook', passport.authenticate('facebook', { scope : ['email'] }));

router.get('/login/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/login/redirect',
                                      failureRedirect: 'https://hainan.oss.tw/#!index' }));

// router.get('/login/redirect', loginAction.);

module.exports = router;
