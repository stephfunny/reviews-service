const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisURL = 'redis://localhost:6379';
const client = redis.createClient(redisURL);
client.on('connect', () => {
  console.log('Redis connected!');
});
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
  const key = JSON.stringify(Object.assign({}, this.getQuery(), {collection: this.mongooseCollection.name}));
  const cacheValue = await client.get(key);

  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);
  client.set(key, JSON.stringify(result), 'EX', 86400);
  return result;
};