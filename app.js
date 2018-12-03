const express=require('express');
const dbHandler = require('./dbInit');
const routes = require('./api/routes/knodelsRoutes');

const app= express();
const PORT = process.env.PORT || 3000;

dbHandler.dbInit();
routes(app);
app.listen(PORT);
