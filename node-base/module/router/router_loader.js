const route_loader = {};
const config = require('../config/config');

route_loader.init = function(app, router) {
    console.log('route_loader.init 호출됨.');
    initRoutes(app, router)
}

function initRoutes(app, router)
{
    console.log('initRoutes() 호출됨.');

    for(let i = 0; i < config.route_info.length; i++) {
        const curItem = config.route_info[i];

        const curModule = require(curItem.file);
        if(curItem.type == 'get') {
            // get방식으로 호출이 되었다면
            // path:'/apis/login', method:'login', type:'get'
            router.route(curItem.path).get(curModule[curItem.method]);
        }
        else if(curItem.type == 'post') {
            // post 방식으로 호출이 되었다면
            // path:'/apis/login', method:'login', type:'post'
            router.route(curItem.path).get(curModule[curItem.method]);
        }
        else {
            console.log('라우팅 함수의 타입을 알수 없습니다. : ' + curItem.type);
        }
    }

    app.use('/', router);
}

module.exports = route_loader;
