import mongoose from 'mongoose';

const cleanup = () => {
    process.on('disconnectDB', () => {
        mongoose.connection.close(() => { 
            console.log('Database disconnected.'); 
        }); 
    });
    process.on('exit', () => {
        process.emit('disconnectDB');
        console.log('Server closed.');
        process.exit(0);
    });
    process.on('SIGINT', () => {
        console.log('\nServer terminated by administrator.');
        process.exit(0);
    });
    process.on('uncaughtException', (err) => {
        console.error('\n[NODE:001] Uncaught exception');
        console.error(err.stack);
        process.exit(1);
    });
};

export default cleanup;