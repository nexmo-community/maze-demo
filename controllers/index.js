'use strict'
const express = require('express')
const router = express.Router()

// Register route groups.
router.use('/maze', require('./maze'))
router.use('/webhooks', require('./webhook'));

module.exports = router