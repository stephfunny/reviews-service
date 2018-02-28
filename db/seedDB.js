//seed database with mock data
const data = require('./mockData.js');
const db = require('./index.js');


for (var i = 0; i < data.length; i++) {
  async () => {
    await db.saveExperience(data[i])
    .catch((err) => (throw err));
  }
}

db.disconnect()
.catch((err) => (throw err));