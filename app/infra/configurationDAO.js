const ConfiguracaoSchema = require('../models/configuration')

class configurationDAO {

    findOne(callback) {
        ConfiguracaoSchema.findOne({}, function(err, docs) {
            if (err) callback(err)
            callback(docs)
        });
    }

    update(config, id) {
        const { recaptcha } = config;
        return new Promise((resolve, reject) => {
            ConfiguracaoSchema.findByIdAndUpdate(id, { recaptcha }, function(err, docs) {
                if (err) reject(err)
                resolve(docs)
            });
        });
    }
}

module.exports = configurationDAO;