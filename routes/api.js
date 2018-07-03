var express = require('express');
var router = express.Router();

var helper = require('sendgrid').mail;


// send email
router.get('/:action', function (req, res, next) {

    var action = req.params.action;

    if (action == 'send') {
        var from_email = new helper.Email(process.env.FROM_EMAIL);
        var to_email = new helper.Email(process.env.TO_EMAIL);
        var subject = 'Email Microservice Teste!';
        var content = new helper.Content('text/html', 'Hello, from email microservice!');
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });

        sg.API(request, function (error, response) {
            if (error) {
                res.json({
                    confirmation: 'Fail',
                    message: error
                });

                return;
            }

            res.json({
                confirmation: 'Success',
                response: response
            });
        });

        return;
    }

    res.json({
        confirmation: 'Fail',
        message: 'Invalid action'
    });


});

module.exports = router;