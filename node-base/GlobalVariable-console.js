// 자바스크립트 객체
const person = {
    name: '홍길동',
    age: 20
}

// 자바스크립트 객체를 출력하면, JSON 객체로 변환해서 출력
//  {"name":"홍길동","age":20}
console.log('JSON(자바스크립트) 객체입니다. %j', person);

// 객체(자바스크립트) 출력
// { name: '홍길동', age: 20 }
console.dir(person);

// 실행시간 측정
console.time('duration_time');
let result = 0;
for(let i = 0; i < 10000; i++) {
    result += i;
}
console.timeEnd('duration_time');

// 파일이름, 패스
console.log('파일 이름 : %s', __filename);
console.log('파일 패스 : %s', __dirname);
// 파일 이름 : /Users/nunb/Desktop/webpage/node-demo/node-object/index.js
// 파일 패스 : /Users/nunb/Desktop/webpage/node-demo/node-object

