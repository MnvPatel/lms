import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL!;

const redis = new Redis(redisUrl, {
  tls: {
    rejectUnauthorized: false, // ⚠️ Only for dev/testing with rediss://
  },
});

redis.on('connect', () => {
  console.log('✅ Redis connected successfully!');
});

redis.on('ready', () => {
  console.log('🚀 Redis is ready to use.');
});

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

redis.on('close', () => {
  console.warn('⚠️ Redis connection closed.');
});

redis.on('reconnecting', () => {
  console.log('🔁 Attempting to reconnect to Redis...');
});

export default redis;
