const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
    testName: { type: String, required: true },
    score: { type: Number, required: true },
    status: { type: String, default:"created"},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
