
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

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

    require('./app/api/routes')(app);

    app.listen(PORT,
      () => console.log(`Server running at http://${HOST}:${PORT}/`)
    );
  } catch (error) {
    console.error("server/index.js start() | Error: ", error);
  }
}

start();