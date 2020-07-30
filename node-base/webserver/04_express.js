const express = require('express');
const http = require('http');

const app = express();
app.set('port', process.env.PORT || 5000);      // port 속성 지정

const server
    = http.createServer(app).listen(app.get('port'), function () {
    console.log('익스프레스로 웹서버 실행 : http://localhost:' + app.get('port'));
});
