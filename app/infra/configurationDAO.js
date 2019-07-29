const ConfiguracaoSchema = require('../models/configuration')

class configurationDAO {

    findOne(callback) {
        ConfiguracaoSchema.findOne({}, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }

    update(config, id, callback) {
        const { recaptcha } = config;
        ConfiguracaoSchema.findByIdAndUpdate(id, { recaptcha }, (err, docs) => {
            if (err) return callback(err, null)
            callback(null, docs);
        });
    }
}

module.exports = configurationDAO;