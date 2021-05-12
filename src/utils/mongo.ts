// Library imports
import mongoose from 'mongoose';
// Project imports
import { logger } from './logger';

const mongo_host = process.env.MONGO_HOST;
const mongo_port = process.env.MONGO_PORT;
const mongo_db_name = process.env.MONGO_DATABASE;

const mongo_url = `mongodb://${mongo_host}:${mongo_port}/${mongo_db_name}`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(mongo_url, options);
try {
    mongoose.connect(mongo_url, options);
} catch (e) {
    logger.error({message: e});
    process.exit();
}

const mongo_client = mongoose.connection;
mongo_client.on('error', () => {
    logger.error('Connection to database has been lost');
});
mongo_client.once('open', () => {
    logger.info('Successfully connected to MongoDB database');
});

export {
    mongo_client
}