'use strict';

const { server } = require('../src/server');
const { db } = require('../src/models/index');
const supertest = require('supertest');


const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('testing v1 Routes', () => {
  // test.todo('Add test here!');// helps clean up display on test runs to just reference todo tests
  test('Creates a record in DB', async () => {
    let response = await request.post('/api/v1/food').send({
      name: 'Beef Cake',
      calories: 1000,
      type: 'protein',
    });

    expect(response.status).toEqual(201);
    expect(response.body.name).toBe('Beef Cake');
  });

  test('Gets all records', async () => {
    let response = await request.get('/api/v1/food');

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('Beef Cake');
  });

  test('Get one records', async () => {
    let response = await request.get('/api/v1/food/1');

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Beef Cake');
  });

  test('Updates a single record', async () => {
    let response = await  request.put('/api/v1/food/1').send({
      name: 'Better Beef Cake',
      calories: 10000,
      type: 'protein',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Better Beef Cake');
  });

  test('Deletes a single record', async () => {
    let response = await request.delete('/api/v1/food/1');

    expect(response.status).toEqual(200);
  });

});