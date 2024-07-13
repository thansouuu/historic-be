// fetchData.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URL =
    'mongodb+srv://bunhatv:bunhatv123@cluster0.44gqo5h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// Database connection
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'review-foods',
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

const fetchAllData = async () => {
    await connectToDatabase();

    const db = mongoose.connection;

    try {
        const collections = await db.db.listCollections().toArray();

        for (const collectionInfo of collections) {
            const collectionName = collectionInfo.name;
            const collection = db.collection(collectionName);
            const data = await collection.find({}).toArray();

            console.log(`Data from collection: ${collectionName}`);
            console.log(data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        mongoose.connection.close();
    }
};

fetchAllData();
