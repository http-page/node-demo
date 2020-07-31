/*
   세션 : 웹 서버에 저장되는 정보
   로그인하면 세션이 만들어지고, 로그아웃하면 세션이 삭제되도록 만
 */

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const app = express();
app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

const router = express.Router();

router.route('/process/product').get(function (req, res){
    console.log('/process/product 호출됨');

    if(req.session.user) {
        // 로그인이 된 경우 -> 상품 페이지
        res.redirect('/product.html');
    }
    else {
        // 로그인이 안된 경우 -> 로그인 페이지
        res.redirect('/login2.html');
    }
});

router.route('/process/login').post(function (req, res) {
    console.log('/process/login 호출 됨');

    const _id = req.body.id || req.query.id;
    const _pw = req.body.password || req.query.password;

    if(req.session.user) {
        console.log('이미 로그인되어 있습니다.');
        res.redirect('/product.html');
    }
    else {
        req.session.user = {
            id: _id,
            name: '홍길동',
            authorized: true
        };
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>' + _id + '님 로그인 성공</h1>');
        res.write('<br><br><a href="/process/product">상품 페이지</a>');
        res.end();
    }
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

const server
    = http.createServer(app).listen(app.get('port'), function () {
    console.log('익스프레스로 웹서버 실행 : http://localhost:' + app.get('port') + '/login2.html');
});
