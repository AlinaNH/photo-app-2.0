module.exports = (app) => {
  const mongoose = require('mongoose');
  const multer = require('multer');
  const fs = require('fs');
  const path = require('path');

  const imgModel = require('../models/ImageModel');

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

  const upload = multer({ storage: storage });

  app.post('/upload', upload.single('image'), (req, res, next) => {
    if (req.file && (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png')) {
      const obj = {
        name: req.body.name,
        img: {
          data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
          contentType: req.file.mimetype
        }
      }
      imgModel.create(obj, (err, item) => {
        if (err) res.send({ err: err })
        else item.save();
        res.status(200).send({ message: 'The image has been uploaded successfully' })
      });
    } else {
      res.status(500).send({ message: 'The image has not been uploaded' })
    }
  });

  app.get('/getLast', (req, res) => {
    imgModel.find({}, (err, items) => {
      if (err) {
        console.log(err);
        res.status(500).send('An error occurred', err);
      }
      else {
        res.json(items[items.length-1].img);
      }
    });
  });
}