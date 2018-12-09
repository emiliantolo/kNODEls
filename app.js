const express=require('express');
const bodyparser=require('body-parser');

const dbHandler = require('./dbInit');
const routes = require('./api/routes/knodelsRoutes');

const app= express();

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
let dev_db_url = 'mongodb+srv://emiliano:knodels97@knodels-crpnx.mongodb.net/knodels?retryWrites=true';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let dbc = mongoose.connection;
dbc.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => res.send('Hello World'));

app.use(bodyparser.json());
app.use(express.json());
routes(app);

module.exports = app;
