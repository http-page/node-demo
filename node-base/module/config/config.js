const apis = require('./router/bunli_router')

module.exports = {
    server_port: 5000,
    db_url: 'mongodb://localhost:27017/local',
    db_schemas: [
        {file:'./bunli_schema', collection:'users2', schemaName:'UserSchema', modelName:'UserModel'}
    ],
    route_info: [
        {file:'./bunli_router', path:'/apis/login', method:'login', type:'post'},
        {file:'./bunli_router', path:'/apis/adduser', method:'adduser', type:'post'},
        {file:'./bunli_router', path:'/apis/listuser', method:'listuser', type:'post'}
    ],
    initRoutes: function(app) {
        console.log('initRoutes() 호출됨.');
        // 로그인 처리 함수 라우팅
        app.post('/apis/login', apis.login);
        // 사용자 추가 함수 라우팅
        app.post('/apis/adduser', apis.adduser);
        // 사용자 리스트 함수 라우팅
        app.post('/apis/listuser', apis.listuser);
    }
};
