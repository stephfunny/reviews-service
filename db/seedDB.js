//seed database with mock data
const data = require('./mockData.js');
const db = require('./index.js');


for (var i = 0; i < data.length; i++) {
  db.saveExperience(data[i], (err, success) => {
    if (err) {
      throw err;
    }
  });
}

