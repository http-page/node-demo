/*
    [ mongoose ]
    1. 스키마 지원
        [타입]
        a. String : 문자열타입
        b. Number : 숫자타입
        c. Boolean : 이진타입
        d. Array : 배열타입
        e. Buffer : 버퍼(바이너리 데이터 저장)타입
        f. Date : 날짜타입
        g. ObjectId : 각 문서(Document)마다 만들어지는 ObjectId를 저장할 수 있는 타입
        h. Mixed : 혼합타입
        [속성]
        a. type : 자료형을 지정
        b. required : 값이 true이면 반드시 들어가야 하는 속성
        c. unique : 값이 true이면 이 속성에 고유한 값이 들어가야 한다.
    2. 컬렉션 안에 같은 자료형의 객체를 넣는 방법 제공
    3. 데이터베이스 이벤트는 open, error, disconnected 등이 있
    4. npm install --save mongoose

    1. connect(uri(s), [options], [callback])
        mongoose를 사용해 데이터베이스에 연결
        연결 후, mongoose.connection 객체를 사용해 연결 관련 이벤트를 처리
    2. Schema() --> 테이블 정의
        스키마를 정의하는 생성자
    3. model(name, [schema], [collection], [skipInit]) --> 데이터 조작
        모델을 정의
        [collection]이 지정되면 이 컬렉션을 사용하며,
        지정하지 않으면, name으로 유추한 컬렉션을 사용
        [ 모델 메소드 ]
        a. static(name, fn)
            모델 객체에서 사용할 수 있는 함수를 등록
            함수의 이름과 함수 객체를 파라미터로 전달
        b. method(name, fn)
            모델 인스턴스 객체에서 사용할 수 있는 함수를 등록
            함수의 이름과 함수 객체를 파라미터로 전달
 */

const path = require('path');
const http = require('http');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

// 에러 핸들러 모듈 사용
const expressErrorHandler = require('express-error-handler');
// mongoose
const mongoose = require('mongoose');

let database, UserSchema, UserModel;
const _collection = 'users';
const _db_url = 'mongodb://localhost:27017/local';

function connectDB() {
    mongoose.Promise = global.Promise;
    mongoose.connect(_db_url);
    database = mongoose.connection;

    database.on('open', function (){
        console.log('MonGoose OPEN');

        // 스키마 정의
        UserSchema = mongoose.Schema({
            id: String,
            name: String,
            password: String
        });
        console.log('UserSchema 정의');

        // 모델 정의
        // 컬렉션(users)과 스키마(UserSchema)를 연
        UserModel = mongoose.model(_collection, UserSchema);
        console.log('UserModel 정의');
    });

    database.on('disconnected', function (){
        colsole.log('데이터베이스 연결 끊어짐');
    });

    database.on('error', console.error.bind(console, 'mongoose connect error'));
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
                res.write('<br><br><a href="/login.html">다시 로그인 하기</a>');
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

    // user 찾기
    UserModel.find({'id':id, 'password':password}, function (err, docs) {
        if(err) {
            console.log('mongoose find Error');
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

    // 객체 생성
    const user = new UserModel({'id':id, 'password':password, 'name': name});

    // 객체 저장
    user.save(function (err) {
        if(err) {
            callback(err, null);
            return;
        }
        console.log('사용자 데이터 추가 함');
        callback(null, user);
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
