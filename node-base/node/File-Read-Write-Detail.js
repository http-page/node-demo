/*
    [ 파일을 직접 열고, 닫으면서 읽거나 쓰기 ]
    1. open(path, flags [,mode] [,callback] : 파일을 엽니다.
    2. read(fd, buffer, offset, length, position [,callback]) : 지정한 부분의 파일 내용을 읽어 들입니다.
    3. write(fd, buffer, offset, length, position [,callback]) : 파일의 지정한 부분에 데이터를 씁니다.
    4. close(fd [,callback]) : 파일을 닫아 줍니다.
 */

const fs = require('fs');

// 파일을 열면서, 쓰기 권한을 줌
// 오픈 -> 쓰기 -> 닫기 :: 순서대로 실행 해야 함.
fs.open('./output.txt', 'w', function (err, fd) {
    if(err) {
        console.log('파일 오픈시 에러 : ' + err);
        return;
    }

    const buf = new Buffer('안녕!\n');
    fs.write(fd, buf, 0, buf.length, null, function (err, written, buffer) {
        if(err) {
            console.log('파일 쓰기시 에러 : ' + err);
            return;
        }

        console.log('파일 쓰기 OK');

        fs.close(fd, function () {
            console.log('파일 닫기 OK');
        });
    })

})

