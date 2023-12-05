const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: { unique: true }
    },
    lat: {
        type: Number,
        default: 0,
        min: -90,   
        max: 90     
    },
    long: {
        type: Number,
        default: 0,
        min: -180,  
        max: 180   
    },
    address: {
        type: String,
    },
    unit: {
        type: String,
        default: 'cm'
    },
    value: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const DeviceModel = mongoose.model('Device', DeviceSchema);

module.exports = DeviceModel;