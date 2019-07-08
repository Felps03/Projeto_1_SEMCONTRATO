const mongoosePaginate = require('mongoose-paginate');
const mongoose = require('../../database/index');

const HelpCenterAskSchema = new mongoose.Schema({
    id_user: {
        type: String,
        required: true
    },
    id_helpCenter: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const HelpCenterAsk = mongoose.model('HelpCenterAsk', HelpCenterAskSchema);

module.exports = HelpCenterAsk;