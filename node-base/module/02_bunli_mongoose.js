const path = require('path');
const http = require('http');
const cors = require('cors');
const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

// 에러 핸들러 모듈 사용
const expressErrorHandler = require('express-error-handler');

// 암호화 모듈
const crypto = require('crypto');

const app = express();
app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

// 라우터 설정
const apis = require('./router/bunli_router');

// mongoose
const mongoose = require('mongoose');

let database;
const _collection = 'user2';

function connectDB()
{
    const _db_url = 'mongodb://localhost:27017/local';

    mongoose.Promise = global.Promise;
    mongoose.connect(_db_url);
    database = mongoose.connection;

    database.on('open', function (){
        console.log('---> MonGoose OPEN');
        createUserSchema(database);
    });

    database.on('disconnected', function (){
        console.log('---> 데이터베이스 연결 끊어짐');
    });

    database.on('error', console.error.bind(console, 'mongoose connect error'));

    // app 객체에 database 객체를 넣어서 전달(라우터)
    // database 객체에는 스키마와 모델 객체도 들어 있어, 참조 가능
    app.set('database', database);
}

function createUserSchema(database)
{
    // 스키마 정의
    // 하나의 테이블을 정의하고
    // 그 테일블의 내용을 읽고, 쓸 수 있는 함수를 설정

    database.UserSchema =
        require('./database/bunli_schema').createSchema(mongoose);
    console.log('---> UserSchema 정의');

    // 모델 정의
    // 컬렉션(users)과 스키마(UserSchema)를 연결
    database.UserModel = mongoose.model(_collection, database.UserSchema);
    console.log('---> UserModel 정의');
}

// ============================================================
const router = express.Router();
router.route('/apis/login').post(apis.login);
router.route('/apis/adduser').post(apis.adduser);
router.route('/apis/listuser').post(apis.listuser);
app.use('/', router);
// ============================================================

const errorHandler = expressErrorHandler({
    static: {
        '404': './public/error/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));  // 404에러인 경우 실행
app.use(errorHandler);

server = http.createServer(app).listen(app.get('port'), function () {
    console.log('---> 익스프레스로 웹서버 실행 : \n http://localhost:' + app.get('port') + '/adduser.html');
    connectDB();        // 몽고디비 연결
});
