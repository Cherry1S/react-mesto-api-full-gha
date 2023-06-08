require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

mongoose.connect(DB_URL).then(() => console.log('Connected to DB'));

app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://cherry.nomoredomains.rocks',
    'https://api.cherry.nomoredomains.rocks',
    'http://cherry.nomoredomains.rocks',
    'http://api.cherry.nomoredomains.rocks',
  ],
  depencies: true;
}));

app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
app.listen(PORT);
