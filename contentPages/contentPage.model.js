const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONTENT_PAGE_TYPES = require('../_helpers/enums').CONTENT_PAGE_TYPES;

let contentPageSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        max: 255 
    },
    type: { 
        type: String, 
        enum: CONTENT_PAGE_TYPES, 
        required: true, max: 50 
    },
    markdown: String,
    html: String,
    createdBy: { 
        type: String, required: true 
    },
    updatedBy: String
}, { timestamps: true });

module.exports = mongoose.model('ContentPage', contentPageSchema);