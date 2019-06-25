const express = require('express');
const bodyParser = require('body-parser');
cors = require('cors');

var corsOption = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
};

const app = express();

app.use(cors(corsOption));

app.use("/admin*", (req, res, next) => {
    //somente admin
    res.send("é rota de admin");

});

app.use(['/users', '/daily'], (req, res, next) => {
    // somente logado
    res.send("é rota de logado");
});

app.use("/register", (req, res, next) => {
    // não logado ou admin
    res.send("é rota de não logado ou admin");
});
app.use("/", (req, res, next) => {
    // qualquer pessoa
    res.send("é rota de qualquer um");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./app/routes/routes');
routes(app);

app.listen(process.env.PORT || 3000);