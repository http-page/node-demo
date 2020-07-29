/*
    [ fs 모듈의 주요 메소드 ]
    readFile로 읽고, writeFile로 쓰기

    1. readFile(filename, [encoding], [callback]
        비동기식 IO, 파일 읽기
    2. readFileSync(filename, [encoding])
        동기식 IO, 파일 읽기
    3. writeFile(filename, data, encoding='utf8', [callback])
        비동기식 IO, 파일 쓰기
    4. writeFileSync(filename, data, encoding='utf8')
        동기식 IO, 파일 쓰기
 */
const fs = require('fs');

// 동기 방식
const data = fs.readFileSync('../package.json', 'utf8');
console.log(data);

// 비동기 방식
fs.readFile('../package.json', 'utf8', function (err, data) {
    if(err) {
        console.log(err);
        return;
    }
    console.log(data);
})


// 파일 쓰기의 경우, 대부분 비동기 방식
fs.writeFile('./output.txt', 'Hello', function(err) {
    if(err) {
        console.dir(err);
        return;
    }
    console.log('파일 저장 OK.')
})
