const mongoosePaginate = require('mongoose-paginate');
const mongoose = require('../../database/index');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const HelpCenterAskSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    id_helpCenter: {
        type: mongoose.Schema.Types.ObjectId,
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

HelpCenterAskSchema.plugin(mongoosePaginate);
HelpCenterAskSchema.plugin(aggregatePaginate);

const HelpCenterAsk = mongoose.model('HelpCenterAsk', HelpCenterAskSchema);


module.exports = HelpCenterAsk;