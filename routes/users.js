const express = require('express');
const router = express.Router();
const faker = require('faker');

let pingHandler = (req, res, next) => {
  let path = req.baseUrl;
  let { params, query, body } = req;

  if( params.id ) var data = MockUser.user;
  else var data = MockUser.users;

  res.status(200).send({
    status: res.statusCode,
    message: `${req.method} :hash - ${path}`,
    data: data,
    params: params,
    query: query
  });
}

let indexHandler = (req, res, next) => {
  let path = req.baseUrl;
  let { params, query, body } = req;

  if( params.id ) var data = MockUser.user;
  else var data = MockUser.users;

  res.status(200).send({
    status: res.statusCode,
    message: `${req.method} :hash - ${path}`,
    //data: data,
    params: params,
    query: query
  });
}

module.exports = {
  getUserById: indexHandler
};

class MockUser {
  static get schema() {
    return {
      id:      '{{random.number}}',
      company: '{{company.companyName}} {{company.companySuffix}}',
      address: '{{address.streetAddress}}',
      fname:   '{{name.firstName}}',
      lname:   '{{name.lastName}}',
      phone:   '{{phone.phoneNumber}}',
      email:   '{{internet.email}}'
    }
  }

  static get users(){

    // Generate between 10 - 20 users based on the schema above
    return this.generateRandomData(this.schema, 5, 20)
  }

  static get user(){
    return this.generateRandomData(this.schema, 1, 1)
  }

  static generateRandomData = (schema, min, max) => {
    max = max || min
    return Array.from({ length: faker.random.number({ min, max }) }).map(() => Object.keys(schema).reduce((entity, key) => {
      entity[key] = faker.fake(schema[key])
      return entity
    }, {}))
  }
}
