/*
    URL 파라메터
    URL 안에 파리미터가 포함되도록 요청

    URL 안에 들어간 파라미터가 매핑되는 형식
    /process/login/hong-gil-dong ===> /process/login/:name
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

const router = express.Router();

router.route('/process/login/:name').post(function (req, res){
    console.log('Routing :: /process/login/:name');

    const _id = req.body.id || req.query.id;
    const _pw = req.body.password || req.query.password;
    const _semantic_name = req.params.name;

    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.write("<h1>서버에서 데이터 전달 </h1>");
    res.write("<div><p>아이디 :: " + _id + "</p></div>");
    res.write("<div><p>비밀번호 :: " + _pw + "</p></div>");
    res.write("<div><p>시멘틱 네임 :: " + _semantic_name + "</p></div>");
})

app.use('/', router);

const server
    = http.createServer(app).listen(app.get('port'), function () {
    console.log('익스프레스로 웹서버 실행 : http://localhost:' + app.get('port') + '/login3.html');
});
