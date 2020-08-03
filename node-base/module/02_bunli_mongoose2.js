const path = require('path');
const http = require('http');
const cors = require('cors');
const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

// 에러 핸들러 모듈 사용
const expressErrorHandler = require('express-error-handler');

ß// config
const config = require('./config/config');

// loader
const database_loader = require('./database/db_loader');
const router_loader = require('./router/router_loader');

const app = express();
app.set('port', config.server_port || 3000);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

// 라우터 설정
router_loader.init(app, express.Router());

const errorHandler = expressErrorHandler({
    static: {
        '404': './public/error/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));  // 404에러인 경우 실행
app.use(errorHandler);

server = http.createServer(app).listen(app.get('port'), function () {
    console.log('---> 익스프레스로 웹서버 실행 : \n http://localhost:' + app.get('port') + '/adduser.html');
     database_loader.init(app, config);        // 몽고디비 연결
});
