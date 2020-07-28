// calc라는 객체를 정의 하면서, 할당하고 싶을 때
// module.exports

const calc = {};

calc.add = function (a, b) {
    return a + b;
}

module.exports = calc;
