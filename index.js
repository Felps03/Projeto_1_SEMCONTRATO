const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

<<<<<<< HEAD
require('./app/controllers/index')(app);

const port = process.env.PORT || 3000;
app.listen(port);
=======
const port = process.env.PORT || 3000;

require('./app/controllers/authController');

app.listen(port);
>>>>>>> 27018d9205b9aafc36ad07dcae7ba19ccc52703b
