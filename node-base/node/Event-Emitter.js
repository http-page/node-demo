const Calc = require('./Event-Emitter-Calc');

// Calc는 객체(prototype)로 정의 되어 있어서, new 명령어 사용해서 정의
const calc1 = new Calc();
calc1.emit('stop');

console.log('Clac에 stop 이벤트 전달함');
