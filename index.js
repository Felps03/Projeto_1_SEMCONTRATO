const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

<<<<<<< HEAD
require('./app/controllers/index')(app);

const port = process.env.PORT || 3000;
=======
require('./app/controllers/authController');
>>>>>>> c6720247ee22c188df5802aea0a862c0539b61f1

app.listen(port);