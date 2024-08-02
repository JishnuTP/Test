const mongoose = require('mongoose');

// Define the schema for the test
const TestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    questions: [{
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }], // Array of strings for options
        answer: { type: String, required: true }
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', } // Reference to User model
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Export the Test model
module.exports = mongoose.model('Test', TestSchema);
