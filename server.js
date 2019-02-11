require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');
const mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://kmagilavy:Josie841376!@cluster0-qjotp.mongodb.net/Content?retryWrites=true';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error.'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/users', require('./users/users.controller'));
app.use('/contentPages', require('./contentPages/contentPages.controller'));

app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, () => {
    console.log('Server listening on port ' + port);
});