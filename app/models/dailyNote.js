var mongoosePaginate = require('mongoose-paginate');
const mongoose = require('../../database/index');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const DailyNoteSchema = new mongoose.Schema({
    // id_user: {
    //     type: String,
    //     required: true
    // },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    yesterday: {
        type: String,
        required: true
    },
    today: {
        type: String,
        required: true
    },
    impediment: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    }
});

DailyNoteSchema.plugin(mongoosePaginate);
DailyNoteSchema.plugin(aggregatePaginate);

const DailyNote = mongoose.model('DailyNote', DailyNoteSchema);

module.exports = DailyNote;