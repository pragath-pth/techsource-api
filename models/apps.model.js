const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    appId: {
        type: Number,
        required: true,
        unique: true,
        default: 1
    },
    appName: {
        type: String,
        unique: true,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        enum: ['Windows', 'Android'],
        required: true
    },
    choice: {
        type: String,
        enum: ['Necessary', 'Optional'],
        required: true
    },
    // pricing: {
    //     type: String,
    //     enum: ['Free', 'Paid'],
    // },
    exclusive:{
        type: Boolean,
        required: true
    },
    appLink: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Application = mongoose.model('Application', ApplicationSchema,'apps');

module.exports = Application;