const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const dailyNoteRoutes = require('./dailyNoteRoutes');

module.exports = (app) => {
    authRoutes(app);
    userRoutes(app);
    dailyNoteRoutes(app);
};