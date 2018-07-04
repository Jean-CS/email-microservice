var express = require('express');
var router = express.Router();
var utils = require('../utils');

router.post("send", function (req, res, next) {
    var recipients = req.body.recipients;
    var list = recipients.split(','); // comma separated list of emails

    utils.Email.sendEmails(list, req.body, function completion() {
        res.json({
            confirmation: 'Success',
            message: 'Emails Sent!'
        });
    });

    return;
});

module.exports = router;