const express = require('express');
const http = require('http');

const app = express();
app.set('port', process.env.PORT || 5000);      // port 속성 지정

// use -> 미들웨어 등록
app.use(function (req, res, next) {
    console.log('페이지 리다이렉션 실행');
    res.redirect('https://google.co.kr');
});

const server
    = http.createServer(app).listen(app.get('port'), function () {
    console.log('익스프레스로 웹서버 실행 : http://localhost:' + app.get('port'));
});
