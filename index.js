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
        // console.log(path);
    let needToken = true;

    if ((path === 'authenticate') || (path === 'user') || (path === 'code') || (path === 'changepassword')) {
        needToken = false;
    }
    const userData = getTokenFromHeader(req);

    if ((routesType === 'admin') || ((routesType === 'users') && (needToken)) || (routesType === 'dailys')) {
        // console.log("entrou no if");
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./app/routes/routes');
routes(app);

app.listen(process.env.PORT || 3000);