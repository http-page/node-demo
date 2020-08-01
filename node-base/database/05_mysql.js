/*
    [ MySql ]
    서버실행 : mysql.server start(stop)
    접속 : mysql -uroot -p(girl)
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

// mysql
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'girl',
    database:'rosewar',
    debug:false
})

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
    const _password = req.body.password || req.query.password;

    console.log('요청 파라미터 : ' + _id + ' , ' + _password + ' , ' + _name);

    if(pool) {
        // 데이터 베이스 POOL이 정상적으로 만들어졌다면.
        addUser(_id, _name, _password, function (err, result){
            if(err) {
                console.log('에러 발생.');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>MySql : 사용자 추가 시 에러 발생</h1>');
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
});

router.route('/process/listuser').post(function(req, res){
    console.log('router : /process/listuser');

    if(database) {
        UserModel.findAll(function (err, results) {
            if(err) {
                console.log('에러 발생.');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>몽고디비 : 사용자 추가 시 에러 발생</h1>');
                res.end();
                return;
            }

            if(results) {
                console.dir(results);
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h3>사용자 리스트</h3>');

                res.write('<div><ul>');
                for(let i = 0; i < results.length; i++) {
                    let curId = results[i]._doc.id;
                    let curName = results[i]._doc.name;
                    res.write('    <li>#' + i + ' -> ' + curId + ' , ' + curName + '</li>');
                }
                res.write('</ul></div>');
                res.end();
            }
            else {
                console.log('에러발생 : 조회된 사용자 없음');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>에러발생 : 조회된 사용자 없음</h1>');
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
});
app.use('/', router);

// 함수 정의 :: find()
const authUser = function (id, name, password, callback)
{
    console.log('function : authUser');

    // user 찾기
    UserModel.findById(id, function(err, results){
        if(err) {
            console.log('mongoose find Error');
            callback(err, null);        // 호출한 곳으로 에러 넘김
            return;
        }

        console.log('아이디  %s로 검색', id);
        if(results.length > 0) {
            if(results[0]._doc.password === password) {
                console.log('비밀번호 일치함');
                callback(null, results);
            }
            else {
                console.log('비밀번호 일치하지 않음');
                callback(null, null);
            }
        }
        else {
            console.log('아이디 일치하는 사용자 없음');
            callback(null, null);
        }
    });
};

// 함수 정의 :: insert()
const addUser = function (id, name, password, callback) {
    console.log('function : addUser :' + id + ' , ' + password + ' , ' + name);

    pool.getConnection(function (err, conn) {
        if (err) {
            if (conn) {
                conn.release(); // connection 반납
            }
            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결의 스레드 아이디 : ' + conn.threadId)

        // sql 실행
        const data = {id: id, name: name, password: password};
        const exec = conn.query('insert into users set ?', data, function (err, result) {
            conn.release();
            console.log('실행된 sql : ' + exec.sql);

            if (err) {
                console.log('sql 실행시 에러 발생');
                callback(err, null);
                return;
            }
            callback(null, result);     //  정상실

        })
    });
}

const errorHandler = expressErrorHandler({
    static: {
        '404': './public/error/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

server = http.createServer(app).listen(app.get('port'), function () {
    console.log('익스프레스로 웹서버 실행 : http://localhost:' + app.get('port') + '/adduser.html');
});

