const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

module.exports = (app) => {
    authRoutes(app);
    userRoutes(app);
};