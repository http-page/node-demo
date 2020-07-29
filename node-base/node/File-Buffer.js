// 버퍼는 한번 만들어지면, 길이 값을 변경하기 어렵다.

const output = '안녕!';
const buffer1 = new Buffer(10);
const len = buffer1.write(output, 'utf8');

console.log('버퍼에 쓰인 문자열의 길이 : ' + len);
console.log('첫번째 버퍼에 쓰인 문자열 : ' + buffer1.toString());
console.log('버피인지의 여부 : ' + Buffer.isBuffer(buffer1));

const byteLen = Buffer.byteLength(buffer1);
console.log('버퍼의 생성 크기 : ' + byteLen);

let str1 = buffer1.toString('utf8', 0, 7);
console.log('버퍼 속의 글자 가져오기 : ' + str1);


// 버퍼 만들기
// 문자열을 버퍼를 이용해서 만들
const buffer2 = Buffer.from('Hello', 'utf8');
console.log('버퍼2의 길이 : ' + Buffer.byteLength(buffer2));

const str2 = buffer2.toString('utf8', 0, Buffer.byteLength(buffer2));
console.log('str2 : ' + str2);
