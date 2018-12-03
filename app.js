const express=require('express');
const bodyparser=require('body-parser');
const app= express();

const mongoose = require('mongoose');

let dev_db_url = 'mongodb://knodels:knodels97@ds123224.mlab.com:23224/knodels';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let dbc = mongoose.connection;
dbc.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyparser.json());

app.get('/', (req, res) => res.send('Hello World'));

var routes=require('./api/routes/knodelsRoutes.js');

routes.init(app);

module.exports = app;
