//main starting point of app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//DB Setup

mongoose.connect('mongodb://localhost:authentication/auth');


//App Setup
app.use(morgan('combined')); //logging framework used for debugging
app.use(bodyParser.json({ type: '*/*' })); //parse incoming requests to json
router(app);

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
