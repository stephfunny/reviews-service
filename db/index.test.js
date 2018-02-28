//unit test for mongoDB interface
const mongoose = require('mongoose');
const MongoDBMemoryServer = require('mongodb-memory-server');
const testData = require('./mockData.js');



describe('Database Interface', () => {
  let dbInterface = require('./index.js');
  let memMongo;
  let mockData;

  beforeAll(async () => {
    jest.setTimeout(60000);
    //let firstMongo = await new MongoDBMemoryServer.MongoMemoryServer();
    //firstMongo.stop();
    //jest.setTimeout(5000);
  });


  beforeEach(async () => {
    //console.log(MongoDBMemoryServer);
    memMongo = await new MongoDBMemoryServer.MongoMemoryServer();
    process.env.DATABASE = await memMongo.getConnectionString();
    //console.log('test connecting');
    await dbInterface.connect()
    .then(() => (console.log('connected to db:', process.env.DATABASE)))
    .catch((err) => (console.log('connection failed', err)));
    mockData = testData.slice();
  });

  afterEach(async () => {
    await dbInterface.disconnect();
    await memMongo.stop();
    //dbInterface = null;
    mockData = null;
  });


  //add an experience
  test('It should add experiences to the db', async () => {
    let mockData = require('./mockData.js');
    //console.log('mockdata[0]', mockData[0]);
    await dbInterface.saveExperience(mockData[0])
    .then((success) => {
      //console.log('success', success);
      expect(success._id).toBeDefined();
      expect(success.id).toBe(mockData[0].id);
      for (var key in mockData[0]) {
        expect(success[key]).toBeDefined();
      }
      //delete mockData[0].reviews; //toMatchObject cannot handle list of objects with extra properties
      //expect(success).toMatchObject(mockData[0]);
    })
    .catch((err) => {
      throw err;
    });
  });


  //retrieve an experience
  test('It should retrieve the correct experience from the db', async () => {

    //let matchableMockData = mockData.slice();
    //matchableMockData[0].reviews = null; //expect.arrayContaining(matchableMockData[0].reviews);
    //console.log(mockData[0].reviews);

    await dbInterface.saveExperience(mockData[0])
    .then(() => (dbInterface.saveExperience(mockData[1])))
    .then(() => (dbInterface.getAllReviews(mockData[0].id)))
    .then((success) => {
      for (var i = 0; i < mockData[0].reviews.length; i++) {
        expect(success.reviews[i]).toMatchObject(mockData[0].reviews[i]);
      }
    })
    .catch((err) => {
      throw err;
    });
  });

  //add a review to an existing experience
  xtest('It should add reviews to existing experiences', async () => {
    let mockReview = {
      userImg: 'string',
      user: 'new Reviewer',
      date: 'Feb 2018',
      comment: 'I went there after everyone else and it was still a good experience'
    };
    
    await dbInterface.saveExperience(mockData[0])
    .then(() => (dbInterface.saveReview(mockData[0].id, mockReview)))
    .then((success) => {
      //console.log('success', success);
      expect(success.reviews).toMatchObject([mockReview]);
      delete mockData[0].reviews;
      expect(success).toMatchObject(mockData[0]);
    })
    .catch((err) => {
      throw err;
    });
  });


});