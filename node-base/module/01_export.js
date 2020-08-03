// exports라는 전역객체를 사용해서
// 함수 또는 객체를 전역객체에 저장

// exports에 속성을 지정할 수 있으나
// exports에 객체를 바로 저장할 수 없다. --> module.exports 사용

exports.getUser = function () {
    return {id:'test01', name:'홍길동'};
};

exports.group = {id:'group01', name:'친구'};
