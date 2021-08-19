module.exports = async app => {
  const multer = require('multer');
  const fs = require('fs');
  const path = require('path');
  const nodemailer = require("nodemailer");
  const smtpTransport = require('nodemailer-smtp-transport');

  const imgModel = require('../models/ImageModel');

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.png');
    }
  });

  const upload = multer({ storage: storage });

  app.post('/img/upload', upload.single('image'), async (req, res) => {
    try {
      if (req.file) {
        if (['image/jpeg', 'image/png'].includes(req.file.mimetype)) {
          const obj = {
            name: req.body.name,
            img: {
              data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
              contentType: req.file.mimetype
            },
            token: req.headers.authtoken
          }
          const item = await imgModel.create(obj);
          await item.save();
          res.status(200).send({ message: 'The image has been uploaded successfully' });
        } else {
          res.status(400).send({  message: 'The mimetype is incorrect' });
        }
      }
    } catch {
      res.status(400).send({ err: err });
    }
  });

  app.get('/img/last', async (req, res) => {
    try {
      const items = await imgModel.find({ "token": req.headers.authtoken });
      res.json(items[items.length-1].img);
    } catch (err) {
      res.status(500).send({ err: err });
    }
  });

  app.post('/img/send', async (req, res) => {
    try {
      const data = req.body.token.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(data, 'base64');
      const timestamp = Date.now();
      const filepath = path.join('./uploads/image-' + timestamp + '.png');
    
      fs.writeFile(path.join('./uploads/image-' + timestamp + '.png'), buffer, function(err) {
        if(err) res.status(500).send(err);
      });
      const obj = {
        name: 'image-' + timestamp,
          img: {
            data: filepath,
            contentType: 'image/png'
          },
          token: req.headers.authtoken,
        contentType: 'image/png',
        image: buffer
      };
      
      const item = await imgModel.create(obj);
      item.save();

      let transporter = nodemailer.createTransport(smtpTransport({
        service: "Gmail",
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      }));
    
      await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: process.env.NODEMAILER_TO_EMAIL,
        subject: "New photo to print",
        html: "<p>Hello!</p><p>Please, print a new photo in the attachments</p>",
        attachments: [
          {
            filename: 'image-' + timestamp + '.png',
            path: filepath
          }
        ]
      });
      res.status(200).send({ message: 'The message has been saved' });
    } catch (err) {
      res.status(500).send({ err: err });
    }
  });
};