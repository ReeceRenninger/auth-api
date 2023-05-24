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