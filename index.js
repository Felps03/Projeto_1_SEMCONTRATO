const express = require('express');
const bodyParser = require('body-parser');
cors = require('cors');

const getTokenFromHeader = require('./app/utils/getTokenFromHeader');
const ValidateAccess = require('./app/utils/ValidateAccess');
const validateAccess = new ValidateAccess();

var corsOption = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
};

const app = express();

app.use(cors(corsOption));

app.use("*", (req, res, next) => {

    const url = req.originalUrl;
    const routesType = url.split('/')[1].toLocaleLowerCase();
    let path = "";
    if (url.split('/').length > 2) path = url.split('/')[2].toLocaleLowerCase()
    // console.log(url.split('/').length);
    // res.send(url.split('/').lenght);

    if ((routesType === 'admin') || ((routesType === 'users') && (path != 'authenticate')) || (routesType === 'daily')) {

        const userData = getTokenFromHeader(req);
        if (!userData) {
            return res.status(401).send(JSON.stringify({ erro: 'Token Inválido' }));
        }
        if (!userData.logged) {
            return res.status(401).send(JSON.stringify({ erro: 'Usuário não logado' }));
        }
        if (routesType === 'admin') {
            if (!userData.admin) {
                return res.status(401).send(JSON.stringify({ erro: 'Usuário não autorizado' }));
            }
        }
    }
    next();
});
/*
app.use("/admin*", (req, res, next) => {

    const userData = getTokenFromHeader(req);

    if (!userData) {
        res.status(401).send("token inválido");
    }

    if (!userData.isValid) {
        res.status(401).send("não logado");
    }
    if (!userData.isAdmin) {
        res.status(401).send("não é admin");
    }

    res.status(200).send("sim");

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
    const headerToken = getTokenFromHeader(req);
    res.send(headerToken);

    // if (!headerToken) {
    //     res.status(401).send("token inválido");
    // }
    // else {

    //     if (!headerToken.isValid) {
    //         res.status(401).send("não logado");
    //     }
    // }
    // res.status(200).send("sim");

});
*/


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./app/routes/routes');
routes(app);

app.listen(process.env.PORT || 3000);