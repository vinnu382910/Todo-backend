const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Task schema
const TaskSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',  // Reference to the User model
        required: true,
    },
    title: {
        type: String,
        required: true,  // Title is now a required field
        trim: true,      // Trims any whitespace around the title
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'done', 'completed'],
        default: 'pending', // Default status is 'pending'
    },
    deadline: {
        type: Date,
        required: true,  // Deadline is now a required field
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Automatically set the current date
    },
    updatedAt: {
        type: Date,
        default: Date.now,  // Automatically set the last update date
    }
});

// Middleware to update 'updatedAt' before saving the task
TaskSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create and export the Task model
const TaskModel = mongoose.model('tasks', TaskSchema);
module.exports = TaskModel;
