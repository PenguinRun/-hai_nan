var express = require('express');
var router = express.Router();
const passport = require('../config/passport');
const config = require('../config/development_config');

const GetLogin = require('../controllers/login/get_controller');

getLogin = new GetLogin();

router.get('/success', function (req, res, next) {
    res.render('success', { data: req.user });
})

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/login/facebook/callback',
    //   passport.authenticate('facebook', { successRedirect: 'http://localhost:3000/api/beach/login/redirect',
    passport.authenticate('facebook', {
        successRedirect: 'https://' + config.backEndHost + '/api/beach/login/redirect',
        failureRedirect: 'https://' + config.frontEndHost + '/#!index'
    }));

router.get('/login/redirect', getLogin.register);

router.post('/testLogin', getLogin.testLogin);

module.exports = router;
