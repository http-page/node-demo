// 이벤트 이미터 불러옴
const EventEmitter = require('events').EventEmitter;
const util = require('util');

const Calc = function() {
    this.on('stop', function () {
        console.log('Calc에 stop 이벤트 발생');
    })
}

// util --> prototype를 쉽게 상속 받게 할 수 있다.
// 뒤에 있는 것을 부모로 보고, 앞에 있는 것에 상속
util.inherits(Calc, EventEmitter);

Calc.prototype.add = function(a, b) {
    // Calc에 이벤트를 정의 할려면, Calc가 객체이어야 한다.
    // 그래서 Calc를 prototype로 정의 해야 함.
    return a + b;
};

module.exports = Calc;
