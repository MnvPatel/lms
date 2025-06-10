import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL!;

const redis = new Redis(redisUrl, {
  tls: {
    rejectUnauthorized: false, // ⚠️ Keep this false only for development
  },
  maxRetriesPerRequest: null, // Prevent "MaxRetriesPerRequestError"
  retryStrategy: (times) => {
    console.log(`🔁 Redis reconnect attempt #${times}`);
    if (times > 10) {
      console.error("❌ Too many Redis reconnect attempts. Giving up.");
      return null;
    }
    return Math.min(times * 500, 3000); // Retry after 0.5s-3s
  },
  keepAlive: 30000, // Optional: keep connection alive every 30s
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
