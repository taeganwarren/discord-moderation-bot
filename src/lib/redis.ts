// Library imports
import redis, { RedisClient } from 'redis';

// Connect to redis client
const redis_client: RedisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
});

export { redis_client }