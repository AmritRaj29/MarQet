const express = require('express');
const router = express.Router();
const { aiSearch } = require('../controllers/searchController');

router.route('/ai').get(aiSearch);

module.exports = router;
