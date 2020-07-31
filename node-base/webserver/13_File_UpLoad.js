/*
    [파일 업로드]
    1. 파일 업로드 시, POST 방식으로 요청해야 하며, body-parser 미들웨어 사용
    2. fs, multer, cors 모듈 사용
    3. npm install --save multer cors body-parser
*/
const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

// 다중 서버 접속
const cors = require('cors');
// 파일 업로드
const multer = require('multer');

let app, server;

app = express();
app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));
app.use('/upload', express.static('upload'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

// 파일 업로드 설정
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'upload')
    },
    filename: function (req, file, callback) {
        // 업로드 파일의 이름을, 별도의 이름으로 저장

        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extension);
        callback(null, basename + Date.now() + extension);
    }
});

const upload = multer({
    storage:storage,
    limits: {
        files:10,
        fileSize: 1024 * 1024 * 1024
    }
});

const router = express.Router();

router.route('/process/photo').post(upload.array('photo', 1),
    function (req, res){

    console.log('/process/photo 호출 됨');

    const files = req.files;
    console.log('=========== 업로드된 파일 =============');
    if(files.length > 0) {
        console.dir(files[0]);
    }
    else {
        console.log('파일이 없습니다.');
    }
    console.log('=========== 업로드된 파일 =============');

    let original_name;
    let file_name;
    let mime_type;
    let size;

    if(Array.isArray(files)) {
        for(let i = 0; i < files.length; i++) {
            original_name = files[i].originalname;
            file_name = files[i].filename;
            mime_type = files[i].mimetype;
            size = files[i].size;
        }
    }

    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.write('<h1>파일 업로드 성공</h1>');
    res.write('<p>원본파일 :: ' + original_name + '</p>');
    res.write('<p>저장파일 :: ' + file_name + '</p>');
    res.end();
});

router.route('/process/logout').get(function (req, res) {
    console.log('/process/logout 호출 됨');

    if(req.session.user) {
        console.log('로그아웃 합니다.');
        req.session.destroy(function (err) {
            if(err) {
                console.log('세션 삭제시 에러발생');
                return;
            }
            console.log('세션 삭제 성공');
            res.redirect('/login2.html');
        });
    }
    else {
        console.log('로그인되지 않았습니다.');
        res.redirect('/login2.html');
    }
});

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

// 라우터 등록 이후에 사용해야 한다.
app.all('*', function (req, res) {
    res.status(400).send('<h1>요청하신 페이지가 없습니다.</h1>')
})

server = http.createServer(app).listen(app.get('port'), function () {
    console.log('익스프레스로 웹서버 실행 : http://localhost:' + app.get('port') + '/upload.html');
});
