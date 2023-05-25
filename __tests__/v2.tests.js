'use strict';

const { server } = require('../src/server');
const { db, users } = require('../src/models/index');
const supertest = require('supertest');


const request = supertest(server);
let adminTest; // trying to initialize the test created user for json token testing with bearer

beforeAll(async () => {
  await db.sync();
  adminTest = await users.create({
    username: 'admin',
    password: 'admin',
    role: 'admin',
  });
});

afterAll(async () => {
  await db.drop();
});

describe('testing v2 Routes', () => {
  // test.todo('Add test here!'); // helps clean up display on test runs to just reference todo tests
  test('Can create a new record', async () => {
    let response = await request.post('/api/v2/food').send({
      name: 'Beef Cake',
      calories: 1000,
      type: 'protein',
    }).set('Authorization', `Bearer ${adminTest.token}`);

    expect(response.status).toEqual(201);
    expect(response.body.name).toBe('Beef Cake');
  });

  test('Gets all records', async () => {
    let response = await request.get('/api/v1/food').set('Authorization', 'Basic YWRtaW46YWRtaW4=');

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('Beef Cake'); // have to target first index position for name
  });

  test('Get one records', async () => {
    let response = await request.get('/api/v1/food/1').set('Authorization', `Bearer ${adminTest.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Beef Cake');
  });

  test('Updates a single record', async () => {
    let response = await  request.put('/api/v1/food/1').send({
      name: 'Better Beef Cake',
      calories: 10000,
      type: 'protein',
    }).set('Authorization', `Bearer ${adminTest.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Better Beef Cake');
  });

  test('Deletes a single record', async () => {
    let response = await request.delete('/api/v1/food/1').set('Authorization', `Bearer ${adminTest.token}`);

    expect(response.status).toEqual(200);
  });

});