console.log('argv 속성의 파라미터 수 : ' + process.argv.length);
console.dir(process.argv);
// [
//   '/usr/local/bin/node',  --> 노드 실행파일
//   '/Users/nunb/Desktop/webpage/node-demo/node-object/process.js' --> 실행될 파일
// ]

process.argv.forEach(function (item, index) {
    // 배열의 원소 개수 만큼, function(){} 실행
    // 원소는 item으로 넘어오고, 순서는 index로 넘어 온다.
    console.log(index + ' : ' + item);
})
