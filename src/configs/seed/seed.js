import mongoose from 'mongoose';
import Location from '../../models/location.js';

const MONGODB_URL =
    'mongodb+srv://bunhatv:bunhatv123@cluster0.44gqo5h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const db = () => {
    return mongoose.connect(MONGODB_URL, {
        autoCreate: true,
        dbName: 'review-foods',
    });
};

const mockupData = [
    {
        name: 'Historic Site 1',
        country: 'vietnam',
        presentationUrl: 'http://example.com/presentation1',
        tourUrl: 'http://example.com/tour1',
        latitude: 21.028511,
        longitude: 105.804817,
        timestamp: new Date('2023-01-01T00:00:00Z'),
    },
    {
        name: 'Historic Site 2',
        country: 'vietnam',
        presentationUrl: 'http://example.com/presentation2',
        tourUrl: 'http://example.com/tour2',
        latitude: 16.047079,
        longitude: 108.20623,
        timestamp: new Date('2023-01-02T00:00:00Z'),
    },
    {
        name: 'Historic Site 3',
        country: 'thailand',
        presentationUrl: 'http://example.com/presentation3',
        tourUrl: 'http://example.com/tour3',
        latitude: 13.756331,
        longitude: 100.501762,
        timestamp: new Date('2023-01-03T00:00:00Z'),
    },
    {
        name: 'Historic Site 4',
        country: 'cambodia',
        presentationUrl: 'http://example.com/presentation4',
        tourUrl: 'http://example.com/tour4',
        latitude: 11.556376,
        longitude: 104.928207,
        timestamp: new Date('2023-01-04T00:00:00Z'),
    },
    {
        name: 'Historic Site 5',
        country: 'cambodia',
        presentationUrl: 'http://example.com/presentation4',
        tourUrl: 'http://example.com/tour4',
        latitude: 11.556376,
        longitude: 104.928207,
        timestamp: new Date('2023-01-04T00:00:00Z'),
    },
];

const seedDatabase = async () => {
    try {
        await db();
        await Location.insertMany(mockupData);
        console.log('Mockup data inserted successfully!');
        process.exit();
    } catch (error) {
        console.error('Error inserting mockup data:', error);
        process.exit(1);
    }
};

seedDatabase();
