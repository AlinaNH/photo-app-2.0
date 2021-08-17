module.exports = async app => {
  const multer = require('multer');
  const fs = require('fs');
  const path = require('path');

  const imgModel = require('../models/ImageModel');

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

  const upload = multer({ storage: storage });

  app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
      if (['image/jpeg', 'image/png'].includes(req.file.mimetype)) {
        const obj = {
          name: req.body.name,
          img: {
            data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
            contentType: req.file.mimetype
          }
        };
        imgModel.create(obj, async (err, item) => {
          try {
            item.save();
            res.status(200).send({ message: 'The image has been uploaded successfully' });
          } catch (error) {
            res.send({ err: err });
          }
        });
      } else {
        res.status(400).send({ message: 'The image mimetype is invalid' });
      }
    }
  });

  app.get('/getLast', (req, res) => {
    imgModel.find({}, async (err, items) => {
      try {
        res.json(items[items.length-1].img);
      } catch (error) {
        res.status(500).send(err);
      }
    });
  });
};