import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    presentationUrl: {
        type: String,
        required: true,
    },
    tourUrl: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Location = mongoose.model('Location', LocationSchema);

export default Location;
