const fs = require('fs');

// 파일 열면서, 읽기 권한 주기
const infile = fs.createReadStream('./output.txt', {flags:'r'});

// 읽어 들일 때, 이벤트('data') 발생
infile.on('data', function (data) {
    console.log('읽어 들인 데이터 : ' + data);
})

// 파일 읽기가 끝나면, 이벤트('end')
infile.on('end', function () {
    console.log('파일 읽기 종료');
})
