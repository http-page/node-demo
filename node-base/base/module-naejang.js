// 내장 묘듈 :: OS
const os = require('os');
console.log('hostname : ' + os.hostname());
console.log('free memory : ' + os.freemem());

// 내장 묘듈 :: PATH
const path = require('path');
const directories = ['Users', 'Mars', 'docs'];

// ','으로 구분
const dirStr = directories.join();
console.log('dir : ' + dirStr);
// dir : Users,Mars,docs

// path.sep('/')로 구분
const dirStr2 = directories.join(path.sep);
console.log('dir : ' + dirStr2);
// dir : Users/Mars/docs

// path.join()
// 폴더(파일)의 패스를 구성하기 위한, 각각의 요소를 붙여주는 역활
const filepath = path.join('/User/Nunb', 'notepad.exe');
console.log('filepath : ' + filepath);
// filepath : /User/Nunb/notepad.exe

console.log('dirname : ' + path.dirname(filepath));
console.log('path.basename : ' + path.basename(filepath));
console.log('path.extname : ' + path.extname(filepath));
