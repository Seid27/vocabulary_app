const mongoose = require('mongoose');

const VocabularySchema = new mongoose.Schema({
    word: {
        type: String,
        trim: true
    },

    text: {
        type: String,
        trim: true

    },

    meaning: {
        type: String,
        trim: true
    }
})


module.exports = mongoose.model('Vocabulary',VocabularySchema);