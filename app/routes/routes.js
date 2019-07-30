const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const dailyNoteRoutes = require('./dailyNoteRoutes');
const helpCenter = require('./helpCenterRoutes');
const helpCenterAskRoutes = require('./helpCenterAskRoutes');
const homeRoutes = require('./homeRoutes');
const accessRoutes = require('./accessRoutes');
const useChatBotRoutes = require('./useChatBotRoutes');
// const homeRoutes = require('./homeRoutes')
const configurationRoutes = require('./configurationRoutes')
const ratingRoutes = require('./ratingRoutes');

module.exports = (app) => {
    authRoutes(app);
    userRoutes(app);
    dailyNoteRoutes(app);
    helpCenter(app);
    helpCenterAskRoutes(app);
    homeRoutes(app);
    accessRoutes(app);
    useChatBotRoutes(app);
    configurationRoutes(app);
    ratingRoutes(app);
};