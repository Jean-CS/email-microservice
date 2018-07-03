var helper = require('sendgrid').mail;
var promise = require('bluebird');

module.exports = {
    sendEmail: function (emailInfo) {
        return new promise(function (resolve, reject) {
            var from_email = new helper.Email(process.env.FROM_EMAIL);
            var to_email = new helper.Email(emailInfo.recipient);
            var subject = emailInfo.subject;
            var content = new helper.Content('text/html', emailInfo.confirmation);
            var mail = new helper.Mail(from_email, subject, to_email, content);

            var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
            var request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON(),
            });

            sg.API(request, function (error, response) {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(response);
            });
        });
    }
};