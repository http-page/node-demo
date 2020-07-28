// calc라는 객체 정의
// 모듈이 아닌, 객체를 만들어서 사용
const calc = {};

calc.add = function (a, b) {
    return a + b;
}

console.log('모듈로 분리하기 전 - calc.add : ' + calc.add(10,20));
