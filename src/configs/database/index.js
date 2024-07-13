import mongoose from 'mongoose';

export const db = () =>
    mongoose.connect(process.env.MONGODB_URL, {
        autoCreate: true,
        dbName: 'explore-history',
    });
