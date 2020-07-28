/*
    exports.add = function(a, b) {
        return a + b;
    }
 */
const calc = require('./module-export-1');
console.log('exports로 분리한 후 - calc.add : ' + calc.add(10, 20));

/*
    const calc = {};

    calc.add = function (a, b) {
        return a + b;
    }

    module.exports = calc;
 */
const calc_module = require('./module-export-2');
console.log('모듈(module exports)로 분리한 후 - calc.add : ' + calc_module.add(10, 20));


// 외장묘듈 : 시스템 변수 읽기
// npm i --save nconf
const nconf = require('nconf');

nconf.env();
console.log('OS 환경 변수의 값 :: ' + nconf.get('OS'));
