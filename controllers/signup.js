var express = require('express');
var router = express.Router();
var db = require('../models/db_controller.js'); // Make sure this path is correct

router.post('/', function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var status = req.body.verify;

    db.signup(username, email, password, status, function(err, result) {
        if (err) {
            return res.status(500).send('Error occurred: database error');
        }
        res.status(200).send('User signed up successfully');
    });
});

module.exports = router;
