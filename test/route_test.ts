let assert = require("assert");
import supertest = require('supertest');
import * as express from "express";
import  DayRoutes  from "../src/routes/waiterRoutes";

//import {app} from "../src/index"
//var express = require("../build/index.js");
//let waiterRoutes = new DayRoutes

let app = express()

// const ShoeRoutes = require('../routes/shoe-routes.js')
// const BasketRoutes = require('../routes/shoe-basket-routes.js')
var chai = require('chai');
//var request = require('supertest');

var expect = chai.expect;

const baseURL = process.env.public_url || 'http://localhost:6008';



// describe('Shoe Api Routes', function () {
// let waiterRoutes = new DayRoutes
// const request: supertest.SuperTest<supertest.Test> = supertest(app);

// it('Return all days and respond with json and status success', function () {

//     // (request
//     //   .get('/') as supertest.Test)
//    // request(app)
//         //.get("/api")
//         // .set('Accept', 'application/json')
//         // .expect(200)
//         // .then(result => {
//         //     assert.equal(result.body.status, 'success');
//         // })
//         // .end(function (err, res) {
//         //     console.log(err)
//         //     if (err) throw err;
//         // });
// });
//});