const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../../models/user/user.model');

module.exports.register = (req, res) => {
  const response = {};
  if (req.body.name && req.body.email) {
    User.find({ email: req.body.email }, (err, userdata) => {
      if (err) {
        response.status = 401;
        response.msg = 'Data not inserted';
        response.err = err;
        res.send(response);
      } else {
        if(userdata) {
          User.create(req.body, (error, userRegister) => {
            if (error) {
              response.status = 401;
              response.msg = 'Data not inserted';
              res.send(response);
            } else {
              const pay = { subject: userRegister._id };
              const token = jwt.sign(pay, 'secretkey');
              response.status = 200;
              response.msg = 'Data successfully inserted';
              response.token = token;
              response.data = userRegister;


              const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secureConnection: 'false', // true for 465, false for other ports
                auth: {
                  user: 'example@gmail.com', // generated ethereal user
                  pass: 12345, // generated ethereal password
                },
                tls: {
                  ciphers: 'SSLv3',
                  rejectUnauthorized: false
                }
              });

              // setup email data with unicode symbols
              const mailOptions = {
                from: '"Amit Kumar 👻" <example@gmail.com>', // sender address
                to: 'example@gmail.com', // list of receivers
                subject: 'Nodejs Mailer testing', // Subject line
                text: 'Node mailer testing?', // plain text body
                html: `<h2>Nodejs mailer testing</h2><br />
                       Name:${req.body.name}<br />
                       Email:${req.body.email}
                     ` // html body
              };

              // send mail with defined transport object
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log('Message sent: %s', info.response);
                // Preview only available when sending through an Ethereal account
                // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

              });



              res.send(response);
            }
          });
        } else {
          response.status = 402;
          response.msg = 'Duplicate email id found';
          response.data = userdata;
          res.send(response);
        }
      }
    });
  } else {
    response.status = 500;
    response.msg = 'server error';
    res.send(response);
  }
}

