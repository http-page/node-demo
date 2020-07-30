const fs = require('fs');
const http = require('http');
const server = http.createServer();

const host = 'localhost';
const port = 5000;
const back_log = 50000; // 동시 접속자 수

server.listen(port, host, back_log, function () {
    console.log('웹서버 정상 실행 :: http://localhost:5000');
});

server.on('connection', (socket) => {
    // Event -> connection : socket 반환
    console.log('클라이언트가 접속했습니다.');
});

server.on('request', (req, res) => {
    console.log('클라이언트 요청이 들어왔습니다.');
    // console.dir(req);

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

server.on('close', () => {
    console.log('클라이언트 요청이 종료되었습니다.');
})
