var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    dotenv = require('dotenv').config();

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        msg: 'hello from nodejs express api'
    })
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Backend API is running on port ${port}`);
});