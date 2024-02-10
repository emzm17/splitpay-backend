const redis = require('redis');
const redisClient =redis.createClient({
    host: 'redis',
    port: process.env.REDIS_PORT,
    // password: process.env.REDIS_PASSWORD,
  });




  export default redisClient;