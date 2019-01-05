const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
const bodyparser = require('body-parser');

const signup = require('./api/signup');
const login = require('./api/login');
const notice = require('./api/notice');
const auth = require('./middleware/auth');
const teacher = require('./api/teachers');
dotenv.config();
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended: false}));

const server = require('http').createServer(app);
server.listen(4000);
const dburl = process.env.DB;

(async () => {
    try{
        const client = await MongoClient.connect(dburl, {useNewUrlParser: true});
        console.log('Connected to database.');
        const db = client.db('school');
        app.use('/signup', signup(db));
        app.use('/login',login(db));
        app.use('/notice', auth, notice(db));
        app.use('/teacher',auth, teacher(db));
    }catch(e){
        console.log(e.message);
    }
})();

module.exports = app;