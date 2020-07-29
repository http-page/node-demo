// http 모듈로 웹 서버 시작
// 노드에 기본으로 들어 있는 http 모듈을 사용하여 웹 서버 객체 만듬

const http = require('http');
const server = http.createServer();

const host = 'localhost';
const port = 5000;
const back_log = 50000; // 동시 접속자 수

server.listen(port, host, back_log, function () {
    console.log('웹서버 정상 실행 :: http://localhost:5000');
})
