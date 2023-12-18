var http = require('http');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
var bodyParser = require('body-parser');
const routes = require('./routes/index');
var path = require('path');
var client = require('./module_mqtt');
const io = require("./module_sokect");


client.onConnect((message) => {
    console.log(`Received message on topic ${message.toString()}`);
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to mongodb');
});
const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.get('/home', function (req, res) {
    res.render('index');
});

app.get('/', function (req, res) {
    res.redirect('/home');
});

routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.redirect('/');
});
var server = http.createServer(app);
io.attach(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT);
server.on('error', (error)=>{
    console.log('error', error);
});
server.on('listening', ()=>{
    console.log('listening on port '+PORT);
});