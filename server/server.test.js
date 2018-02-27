const serverApp = require('./server-app.js');
const supertest = require('supertest');
const path = require('path');
const fs = require('fs');



describe('Express Server Endpoints', () => {
  test('It should respond to the root path', async () => {
    const response = await supertest(serverApp).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('It should respond with an error to invalid paths', async () => {
    const response = await supertest(serverApp).get('/baloney');
    expect(response.statusCode).toBe(404);
  });

  test('It should respond to static file requests from the public directory', async () => {

    const testFilePath = path.join(__dirname, '../client/public/index.test.html');
    let testHTML = `<!DOCTYPE html>
      <html>
      <head>
        <title>TestFilr</title>
      </head>
      <body>
        This is a test

      </body>
      </html>`;

    
    fs.writeFile(testFilePath, testHTML, (err) => {
      if (err) throw err;
      console.log('The test file could not be created in ');
    });
    const staticResponse = await supertest(serverApp).get('/content/index.test.html');
    //const expectedResponse = fs.readFileSync(testFilePath, 'utf8');
    expect(staticResponse.statusCode).toBe(200);
    expect(staticResponse.text).toEqual(testHTML);//expectedResponse);
  })


})