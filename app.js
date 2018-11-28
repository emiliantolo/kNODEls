const express=require('express');
const bodyparser=require('body-parser');
const app= express();

app.use(bodyparser.json());

app.get('/', (req, res) => res.send('Hello World'));

var routes=require('./api/routes/knodelsRoutes.js');

routes.init(app);

module.exports = app;
