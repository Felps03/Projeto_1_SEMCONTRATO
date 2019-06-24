const mongoose = require('../../database/index');

const DailyNoteSchema = new mongoose.Schema({
    id_user: {
        type: String,
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
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const DailyNote = mongoose.model('DailyNote', DailyNoteSchema);

module.exports = DailyNote;