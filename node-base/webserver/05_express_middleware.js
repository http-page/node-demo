/*
    [ 미들웨어, 라우터 ]
    미들웨어는 중간에 요청을 처리하고, 라우터는 요청 패스에 따라 분기하여 처리
*/
const express = require('express');
const http = require('http');

const app = express();
app.set('port', process.env.PORT || 5000);      // port 속성 지정

// use -> 미들웨어 등록
app.use(function (req, res, next) {
    console.log('첫번째 미들웨어 호출됨.');
    req.user = 'HongGilDong';
    next();
});

// 두번째 미들웨어 등록
app.use(function (req, res, next) {
    console.log('두번째 미들웨어 호출됨.');
    res.writeHead(200, {"Content-Type": "text/html;charset=utf8"});
    res.end('<h1>서버에서 응답한 결과 :: ' + req.user + '</h1>');
})
const server
    = http.createServer(app).listen(app.get('port'), function () {
    console.log('익스프레스로 웹서버 실행 : http://localhost:' + app.get('port'));
});
