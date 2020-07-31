/*
    [ Router ]
    Router 객체를 참조한 후, route() 메소드를 이용해 라우팅

    const router = express.Router();
    router.route('......').post(function(){})

    1. get(callback) : GET 방식으로 특정 패스 요청이 발생했을 때, 사용할 콜백함수 지정
    2. post(callback) : POST 방식으로 특정 패스 요청이 발생했을 때, 사용할 콜백함수 지정
    3. put(callback) : PUT 방식으로 특정 패스 요청이 발생했을 때, 사용할 콜백함수 지정
    4. delete(callback) : DELETE 방식으로 특정 패스 요청이 발생했을 때, 사용할 콜백함수 지정
    5. all(callback)
        모든 요청 방식을 처리
        특정 패스 요청이 발생했을 때, 사용할 콜백 함수를 지정
 */
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
app.set('port', process.env.PORT || 5000);      // port 속성 지정
app.use(express.static('public'));

// extended ( true || false )
// extended는 중첩된 객체표현을 허용할지 말지를 정하는 것
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const router = express.Router();

router.route('/process/login').post(function (req, res){
    console.log('Routing :: /process/login');

    const _id = req.body.id || req.query.id;
    const _pw = req.body.password || req.query.password;

    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.write("<h1>서버에서 데이터 전달 </h1>");
    res.write("<div><p>아이디 :: " + _id + "</p></div>");
    res.write("<div><p>비밀번호 :: " + _pw + "</p></div>");
})

app.use('/', router);

const server
    = http.createServer(app).listen(app.get('port'), function () {
    console.log('익스프레스로 웹서버 실행 : http://localhost:' + app.get('port') + '/login2.html');
});
