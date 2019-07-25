const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const dailyNoteRoutes = require('./dailyNoteRoutes');
const helpCenter = require('./helpCenterRoutes');
const helpCenterAskRoutes = require('./helpCenterAskRoutes');
const homeRoutes = require('./homeRoutes')
const configurationRoutes = require('./configurationRoutes')

module.exports = (app) => {
    authRoutes(app);
    userRoutes(app);
    dailyNoteRoutes(app);
    helpCenter(app);
    helpCenterAskRoutes(app);
    homeRoutes(app);
    configurationRoutes(app);
};