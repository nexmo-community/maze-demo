'use strict'

var express = require('express');
var app = express.app();
var expressWs = require('express-ws')(app);
console.log(expressWs.getWss().clients);