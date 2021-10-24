const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a course title']
    },
    description: {
        type: String,
        requied: [true, 'Please add a description']
    },
    weeks: {
        type: String,
        requied: [true, 'Please add a number of weeks']
    },
    tuition: {
        type: Number,
        requied: [true, 'Please add a tuition cost']
    },
    minimumSkill: { 
        type: String,
        requied: [true, 'Please add a minimum skill'],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    scholarshipAvailable:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        reqiored: true
    }
});

module.exports = mongoose.model('Course', CourseSchema);