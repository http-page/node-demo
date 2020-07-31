/*
    쿠키 : 클라이언트 웹 브라우저에 정보 저장
        npm i --save cookie-parser
 */

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());

const router = express.Router();

router.route('/process/setUserCookie').get(function (req, res){
    // 쿠키 저장 : 응답을 보낼 때, 저
    console.log('/process/setUserCookie 호출됨');
    res.cookie('user', {id:'test1', name:'홍길동', authorized: true});

    res.redirect('/process/showCookie');

});

router.route('/process/showCookie').get(function (req, res) {
    // 쿠키 정보 확인
    console.log('/process/showCookie 호출됨');

    res.send(req.cookies)
});

app.use('/', router);

app.all('*', function (req, res) {
    res.status(400).send('<h1>요청하신 페이지가 없습니다.</h1>')
})

const server
    = http.createServer(app).listen(app.get('port'), function () {
    console.log('익스프레스로 웹서버 실행 : http://localhost:' + app.get('port') + '/process/setUserCookie');
});
