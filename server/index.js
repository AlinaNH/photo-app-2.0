
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

const MONGODB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

async function start() {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    require('./app/api/ImageAPI')(app);
    require('./app/api/UserAPI')(app);

    app.listen(PORT,
      () => console.log(`Server running at http://${HOST}:${PORT}/`)
    );
  } catch (error) {
    console.error("server/index.js start() | Error: ", error);
  }
}

start();