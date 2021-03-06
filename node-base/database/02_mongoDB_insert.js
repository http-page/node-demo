const path = require('path');
const http = require('http');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

// 에러 핸들러 모듈 사용
const expressErrorHandler = require('express-error-handler');
// mongodb 모듈 사용
const MongoClient = require('mongodb').MongoClient;

let database;
const mon_opt = {useUnifiedTopology: true, useNewUrlParser: true};
function connectDB() {
    const databaseUrl = 'mongodb://localhost:27017/local';
    MongoClient.connect(databaseUrl, mon_opt,function (err, db){
        if(err) {
            console.log('몽고디비 연결시 에러 : ' + err);
            return;
        }
        database = db.db('local');
        console.log('몽고디비 연결');
    });
}

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
app.use(cors());


const router = express.Router();

router.route('/process/login').post(function (req, res){
    console.log('router : /process/login');

    const _id = req.body.id || req.query.id;
    const _pw = req.body.password || req.query.password;

    console.log('요청 파라미터 : ' + _id + ' , ' + _pw);

    if(database) {
        // 데이터 베이스가 설정되어 있으면
        authUser(database, _id, _pw, function (err, docs){
            if(err) {
                console.log('에러 발생.');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>몽고디비 검색시 에러 발생</h1>');
                res.end();
            }

            if(docs) {
                // 데이터가 있는 경우
                console.dir(docs);
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>사용자 로그인 성공</h1>');
                res.write('<div><p>사용자 : ' + docs[0].name + '</div>');
                res.write('<br><br><a href="/login.html">다시 로그인 하기</a>');
                res.end();
            }
            else {
                // 데이터가 없는 경우
                console.log('에러발생 : 조회 데이터 없음');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>사용자 데이터 조회 안됨</h1>');
                res.write('<br><br><a href="login.html">다시 로그인 하기</a>');
                res.end();
            }
        });
    }
    else {
        console.log('에러발생 : 데이터 베이스 정의 안됨');
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>데이터 베이스 정의 안됨</h1>');
        res.end();
    }
})

router.route('/process/adduser').post(function (req, res){
    console.log('router : /process/adduser');

    const _id = req.body.id || req.query.id;
    const _name = req.body.name || req.query.name;
    const _pw = req.body.password || req.query.password;

    console.log('요청 파라미터 : ' + _id + ' , ' + _pw + ' , ' + _name);

    if(database) {
        // 데이터 베이스가 정상적으로 만들어졌다면.
        addUser(database, _id, _pw, _name, function (err, result){
            if(err) {
                console.log('에러 발생.');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>몽고디비 : 사용자 추가 시 에러 발생</h1>');
                res.end();
                return;
            }

            if(result) {
                // 사용자 추가 성공
                console.dir(result);
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>사용자 추가 성공</h1>');
                res.write('<div><p>사용자 : ' + _id + '</p></div>');
                res.end();
            }
            else {
                // 추가된 사용자가 없는 경우
                console.log('에러발생 : 추가한 사용자 없음');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>추가한 사용자 없음</h1>');
                res.end();
            }

        });
    }
    else {
        console.log('에러발생 : 데이터 베이스 정의 안됨');
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>데이터 베이스 정의 안됨</h1>');
        res.end();
    }
})

app.use('/', router);

// 함수 정의 :: find()
const authUser = function (db, id, password, callback)
{
    console.log('function : authUser');

    const users = db.collection('users');
    users.find({'id':id, 'password':password}).toArray(function (err, docs){
        if(err) {
            console.log('find Error');
            callback(err, null);        // 호출한 곳으로 에러 넘김
            return;
        }
        if(docs.length > 0) {
            // 문서 객체가 있는 경우
            console.log('일치하는 사용자 찾음');
            callback(null, docs);
        }
        else {
            console.log('일치하는 사용자를 찾지 못함');
            callback(null, null);   // 에러는 아니지만, docs에 결과값 없
        }
    });
};

// 함수 정의 :: insert()
const addUser = function (db, id, password, name, callback) {
    console.log('function : addUser :' + id + ' , ' + password + ' , ' + name);

    const users = db.collection('users');
    users.insertMany([{'id':id, 'password':password, 'name':name}],
        function (err, result){
            if(err) {
                callback(err, null);
                return;
            }

            if(result.insertedCount > 0) {
                console.log('사용자 추가 됨(개수) : ' + result.insertedCount)
                callback(null, result);
            }
            else {
                console.log('추가된 레코드가 없음');
                callback(null, null);
            }
        });
};

const errorHandler = expressErrorHandler({
    static: {
        '404': './public/error/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

server = http.createServer(app).listen(app.get('port'), function () {
    console.log('익스프레스로 웹서버 실행 : http://localhost:' + app.get('port') + '/adduser.html');
    connectDB();        // 몽고디비 연결
});
