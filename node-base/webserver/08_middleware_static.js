/*
    [ static ]
    특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 열어주는 역할
 */

const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const static = require('serve-static');

const app = express();
app.set('port', process.env.PORT || 5000);      // port 속성 지정

// public'의 정적 파일을 제공하기 위한 익스프레스 미들웨어를 사용.
app.use('/public', static(path.join(__dirname, 'public'))); // localhost/public/... -> ./public/...

app.use(function (req, res, next) {
    const filename = './public/icon.png';
    fs.readFile(filename, function (err, data) {
        if(err) {
            console.dir(err);
            return;
        }
        // res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        res.writeHead(200, {"Content-Type":"image/png"});
        res.write(data);
        res.end();
    })
});

const server
    = http.createServer(app).listen(app.get('port'), function () {
    console.log('익스프레스로 웹서버 실행 : http://localhost:' + app.get('port'));
});
