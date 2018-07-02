var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:action', function(req, res, next) {

    var action = req.params.action;

    res.json({
        confirmation: 'Success',
        message: action,
    });
});

module.exports = router;
