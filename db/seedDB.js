//seed database with mock data
const data = require('./mockData.js');
const db = require('./index.js');


const seedDB = async () => {
  db.connect()
  .then( async () => {
    for (var i = 0; i < data.length; i++) {
      await db.saveExperience(data[i]);
    }
  })
  .then(() => (db.disconnect()))
  .catch((err) => (console.log(err)));
}

module.exports = seedDB;

