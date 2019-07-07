const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const dailyNoteRoutes = require('./dailyNoteRoutes');
const helpCenter =  require('./helpCenterRoutes');

module.exports = (app) => {
    authRoutes(app);
    userRoutes(app);
    dailyNoteRoutes(app);
    helpCenter(app);
};