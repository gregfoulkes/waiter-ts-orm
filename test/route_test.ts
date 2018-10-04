let assert = require("assert");
import * as express from "express";
//let app = express()
import  DayRoutes  from "../src/routes/waiterRoutes";
//import {app} from "../build/index.js"
//var app = require('../index.js');
// const ShoeRoutes = require('../routes/shoe-routes.js')
// const BasketRoutes = require('../routes/shoe-basket-routes.js')
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

const baseURL = process.env.public_url || 'http://localhost:6008';



// describe('Shoe Api Routes', function () {
// let waiterRoutes = new DayRoutes

// it('Return all days and respond with json and status success', function () {

//     request(app)
//         .get("/api")
//         .set('Accept', 'application/json')
//         .expect(200)
//         .then(result => {
//             assert.equal(result.body.status, 'success');
//         })
// });
// });