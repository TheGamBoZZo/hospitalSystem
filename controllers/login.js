var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require ('models/db_controller');
var mysql = require('mysql');

const {check , validationResult } = require('express-validator');