/*
    [ body-parser ]
    Post 방식의 Query 처리
    npm install --save body-parser
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

app.use(function (req, res, next) {
    // param - query
    const param_ID = req.body.id || req.query.id;
    const param_Password = req.body.password || req.query.passowrd;

    res.send('<h3>ID :: '+ param_ID + '    PW :: ' + param_Password + '</h3>');
});

const server
    = http.createServer(app).listen(app.get('port'), function () {
    console.log('익스프레스로 웹서버 실행 : http://localhost:' + app.get('port'));
});
