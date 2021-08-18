
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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