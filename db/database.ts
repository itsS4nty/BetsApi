import mongoose from 'mongoose';
import 'dotenv/config';

let database: mongoose.Connection;

export const connect = () => {
    mongoose.connect(`${process.env.MONGO_URI}`);
    database = mongoose.connection;

    database.once('open', async() => {
        console.log('Connected to database.');
    });

    database.on('error', () => {
        console.log('Error connecting to the database.');
    });
}

export const disconnect = () => {
    if(!database)
        return;

    mongoose.disconnect();
}
