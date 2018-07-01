var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({
        confirmation: 'Success',
        message: 'It worked!!',
    });
});

module.exports = router;
