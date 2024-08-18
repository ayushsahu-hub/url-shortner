const express = require('express');
const router = express.Router();
const {handleGenerateNewShortURL,handleRedirection} = require('../controllers/url');
// const URL =  require('../models/url');


router.post('/',handleGenerateNewShortURL);

router.get('/',handleRedirection);

module.exports = router;