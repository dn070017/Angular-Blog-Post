import mongoose from 'mongoose';
import config   from '../config/config.mjs';

const connectParams = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    auth: { "authSource": "admin" }
}

const adminUsername = config.adminUsername;
const adminPassword = config.adminPassword;
const portDB = config.portDB
const dbName = config.dbName

const url = `mongodb://${adminUsername}:${adminPassword}@localhost:${portDB}/${dbName}`;

const connectDB = () => {
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    mongoose.connect(url, connectParams);

    mongoose.connection.on('connected', () => {
        console.log('Successfully coneected to MongoDB.\n');
    }); 

    mongoose.connection.on('error', (err) => {
        if(err)
            console.error('\n[DB:001] Failed to connect to database.\n');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Successfully disconnected\n');
    });
}

export default connectDB;
