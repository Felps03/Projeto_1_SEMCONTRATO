const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const dailyNoteRoutes = require('./dailyNoteRoutes');
const helpCenter = require('./helpCenterRoutes');
const helpCenterAskRoutes = require('./helpCenterAskRoutes');

module.exports = (app) => {
    authRoutes(app);
    userRoutes(app);
    dailyNoteRoutes(app);
    helpCenter(app);
    helpCenterAskRoutes(app);
};