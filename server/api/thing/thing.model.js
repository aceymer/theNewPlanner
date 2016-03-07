'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  age: Number,
  times:[String],
  frog: {
    name: String,
    age: Number,
    legs: [{
      amount: Number,
      color: String
    }]
  },
  termite: String
});

export default mongoose.model('Thing', ThingSchema);
