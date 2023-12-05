const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
var bodyParser = require('body-parser');
const routes = require('./routes/index');
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('connected to mongodb');
});
const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
routes(app);
const PORT = process.env.PORT || 3000;
app.listen(3000, ()=>{
    console.log('listening on port',3000);
})