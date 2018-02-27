//unit test for mongoDB interface
const mongoose = require('mongoose');
const MongoDBMemoryServer = require('mongodb-memory-server');
const mockData = require('./mockData.js');



describe('Database Interface', () => {
  let dbInterface;
  let memMongo;


  beforeEach(async () => {
    //console.log(MongoDBMemoryServer);
    memMongo = await new MongoDBMemoryServer.MongoMemoryServer();
    process.env.DATABASE = await memMongo.getConnectionString();
    dbInterface = require('./index.js');
  });

  afterEach(async () => {
    await dbInterface.disconnect();
    await memMongo.stop();
  });


  //

  //add an experience
  test('The interface should add experiences to the db', () => {
    let cb = (err, success) => {
      expect(err).toBe(null);
      expect(success).toBe(true);
      done();
    }
    console.log('running test');
    dbInterface.saveExperience(mockData[0], cb);
  });

  //add a few more experiences
  //get all experiences

  //add a review to an experience

  //disconnect from the db

  /*//after all (if using real db)
  db.disconnect((err, success) => {
    if (err) {
      throw err
    } else {
      //console.log('disconnected from db');
    }
  });*/

});