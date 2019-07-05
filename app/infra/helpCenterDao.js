const HelpCenterSchema = require('../models/helpCenter');

class HelpCenterDao {
    add(helpCenter, callback) {

        const { id_user, title, desc } = helpCenter;
        const date = new Date();
        HelpCenterSchema.create({ id_user, title, desc, date }, (err, docs) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, docs);
        });
    }
}
module.exports = HelpCenterDao;