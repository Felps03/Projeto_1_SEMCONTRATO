const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const dailyNoteRoutes = require('./dailyNoteRoutes');
const helpCenter = require('./helpCenterRoutes');
const helpCenterAskRoutes = require('./helpCenterAskRoutes');
const homeRoutes = require('./homeRoutes');
const accessRoutes = require('./accessRoutes');

module.exports = (app) => {
    authRoutes(app);
    userRoutes(app);
    dailyNoteRoutes(app);
    helpCenter(app);
    helpCenterAskRoutes(app);
    homeRoutes(app);
    accessRoutes(app);
};