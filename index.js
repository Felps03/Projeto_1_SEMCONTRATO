const express = require('express');
const bodyParser = require('body-parser');
cors = require('cors');

var corsOption = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
};

const app = express();

app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./app/routes/routes');
routes(app);

app.listen(process.env.PORT || 3000);