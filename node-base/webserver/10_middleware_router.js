/*
    [ Router ]
    Router 객체를 참조한 후, route() 메소드를 이용해 라우팅

    const router = express.Router();
    router.route('......').post(function(){})

    1. get(callback) : GET 방식으로 특정 패스 요청이 발생했을 때, 사용할 콜백함수 지정
    2. post(callback) : POST 방식으로 특정 패스 요청이 발생했을 때, 사용할 콜백함수 지정
    3. put(callback) : PUT 방식으로 특정 패스 요청이 발생했을 때, 사용할 콜백함수 지정
    4. delete(callback) : DELETE 방식으로 특정 패스 요청이 발생했을 때, 사용할 콜백함수 지정
    5. all(callback)
        모든 요청 방식을 처리
        특정 패스 요청이 발생했을 때, 사용할 콜백 함수를 지정
 */
