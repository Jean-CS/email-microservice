var express = require('express');
var router = express.Router();
var utils = require('../utils');

router.post(":action", function (req, res, next) {

    var action = req.params.action;

    if (action == 'send') {
        var recipients = req.body.recipients;
        var list = recipients.split(','); // comma separated list of emails

        utils.Email.sendEmails(list, req.body, function() {
            res.json({
                confirmation: 'Success',
                message: 'Emails Sent!'
            });
        });


        // utils.Email
        //     .sendEmail(req.body)
        //     .then(function (response) {
        //         res.json({
        //             confirmation: 'Success',
        //             response: response
        //         });
        //     })
        //     .catch(function (error) {
        //         res.json({
        //             confirmation: 'Fail',
        //             message: error
        //         });
        //     });

        return;
    }

    res.json({
        confirmation: 'Fail',
        message: 'Invalid action'
    });

});

module.exports = router;