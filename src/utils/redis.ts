// Library imports
import redis, { RedisClient } from 'redis';
// Project imports
import { logger } from './logger';

// Connect to redis client
const redis_client: RedisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
});

// Error event
redis_client.on('error', (error) => {
    logger.error({message: error});
});

// Ready event
redis_client.on('ready', () => {
    logger.info({message: 'Connected to redis server'});
})

export { redis_client }