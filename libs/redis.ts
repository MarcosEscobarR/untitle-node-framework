import redis from "redis";

class RedisClient {
  client: any;

  constructor() {
    this.client = redis.createClient({
      url: process.env.REDIS_URL,
      name: process.env.REDIS_NAME,
    });
    this.client.connect();
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key: string) {
    const val = await this.client.get(key);

    if (!val) return null;
    try {
      return JSON.parse(val);
    } catch (error) {
      return val;
    }
  }

  async set(key: string, value: unknown, duration: string) {
    await this.client.set(key, JSON.stringify(value), duration);
  }

  async del(key: string) {
    await this.client.del(key);
  }
}

module.exports = RedisClient;
