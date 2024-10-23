var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var randomToken = require('random-token');

const {check , validationResult} = require('express-validator');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/',[check('username').notEmpty().withMessage("Username is required"),
    check('password').notEmpty().withMessage("Password is required"),
    check('email').notEmpty().withMessage("Email is required")
],function(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()})
    }
    var email_status = "not verified";
    var email = req.body.email;
    var username = req.body.username;

    db.signup(req.body.username, req.body.email, req.body.password, email_status);
    var token = randomToken(8);
    db.verify(req.body.username,email,token)

    db.getuserid(email, function(err,result){
        var id = result[0].id;
        var output = `<p> Dear ${username}, </p>
        Thanks for signing up. Your verification ID and Token is given below:</p>
        <ul>
        <li>User ID: ${id}</li>
        <li>Token ID: ${token}</li>
        </ul>
        <p>Verify Link: <a href = "http://localhost:3000/verify">Verify</a></p>
        <p><b>This is automatically generated mail</b></p>
        

        `;
        var transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port: 465,
            secure:true,
            auth:{
                user: "raees04fakier@gmail.com",
                pass: "04December2000."
            }
        });
        var mailOptions = {
            from:"raeesfakier04@gmail.com",
            to: email,
            subject : 'Email Verification',
            html:output

        };
        transporter.sendMail(mailOptions,function(err,info){
            if(err){
                return console.log(info);
            }
            console.log(info);
        });
        res.send("Check your Email for Verification")
    })
})

module.exports=router;