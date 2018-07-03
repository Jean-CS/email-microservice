var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:action', function (req, res, next) {

    var action = req.params.action;

    if (action == 'send') {
        res.json({
            confirmation: 'Success',
            message: action,
        });

        return;
    }

    res.json({
        confirmation: 'Fail',
        message: 'Invalid action'
    });

    
});

module.exports = router;