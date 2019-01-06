var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    dotenv = require('dotenv').config();

var app = express();

var userCtrl = require('./apiControllers/userControllers');
var accountCtrl = require('./apiControllers/accountControllers');
var authCtrl = require('./apiControllers/authController');
var transferCtrl = require('./apiControllers/transferController');
var otpCtrl = require('./apiControllers/otpVerificationController');
var recipientCtrl = require('./apiControllers/recipientController');

var verifyAccessToken = require('./repos/authRepo').verifyAccessToken;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        msg: 'hello from nodejs express api'
    })
});

app.use('/users/', userCtrl);
app.use('/accounts/', verifyAccessToken, accountCtrl);
app.use('/auth/', authCtrl);
app.use('/transfers/', verifyAccessToken, transferCtrl);
app.use('/otp/', verifyAccessToken, otpCtrl);
app.use('/recipients/', verifyAccessToken, recipientCtrl);

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Backend API is running on port ${port}`);
});