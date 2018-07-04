var helper = require('sendgrid').mail;

module.exports = {
    sendEmails: function (recipients, emailInfo, completion) {
        var from_email = new helper.Email(process.env.FROM_EMAIL);
        var subject = emailInfo.subject;
        var content = new helper.Content('text/html', emailInfo.content);

        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

        recipients.forEach(function sendMail (recipient, i) {
            var to_email = new helper.Email(recipient.trim()); // trim to remove leftover spaces
            var mail = new helper.Mail(from_email, subject, to_email, content);

            var request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON(),
            });

            sg.API(request, function (error, response) {
                if (error) {
                    console.log('Failed to send email to: ' + to_email);
                }
            });
        });

        completion()
    },
};