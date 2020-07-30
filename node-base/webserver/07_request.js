/*
    1. GET 방식 : query -> req.query.name
        클라이언트에서 get 방식으로 전송한 요청 파라미터를 확인
    2. POST 방식 : body -> req.body.name
        클라이언트에서 post 방식으로 전송한 요청 파라미터를 확인
        단, body-parser와 같은 외장 모듈을 사용
    3. header(name) -> 헤더를 확인
 */

const express = require('express');
const http = require('http');

const app = express();
app.set('port', process.env.PORT || 5000);      // port 속성 지정

app.use(function (req, res, next) {
    // header
    const user_agent = req.header('User-Agent');
    console.log('User-Agent : ' + user_agent);

    // param - query
    const param_Name = req.query.name;
    console.log('Param - Name : ' + param_Name);

    res.send('<h3>[서버에서의 응답] Name 파라미터의 값은 :: '+ param_Name + '</h3>');
});

const server
    = http.createServer(app).listen(app.get('port'), function () {
    console.log('익스프레스로 웹서버 실행 : http://localhost:' + app.get('port') + '?name=hong');
});
