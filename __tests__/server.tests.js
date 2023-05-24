'use strict';

const { server } = require('../src/server');
const { db } = require('../src/models/index');
const supertest = require('supertest');
const { describe } = require('yargs');
const { test } = require('node:test');
const { expect } = require('@jest/globals');

const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});


describe('Server testing', () => {

  test('Allow users to sign up', async () => {
    let response = (await request.post('/signup')).setEncoding({
      username: 'Admin',
      password: 'password',
      role: 'admin',
    });
    expect(response.status).toBe(201);
    expect(response.body.user.username).toEqual('Admin');
  });




});