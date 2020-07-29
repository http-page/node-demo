/*
    [ 이벤트 ]
    같은 프로그램 안에서 데이터를 주고 받는 것

    1. 비동기 방식으로 처리하기 위해, 한 쪽에서 다른 쪽으로 데이터를 전달
    2. EventEmitter 사용 (이벤트 리스너로 부터 상속 받음)
    3. 한 쪽에서 이벤트를 [ emit ]으로 보내고, 다른 쪽에서 리스너를 등록하여 [ on ]으로 받음
 */
process.on('myEvent', function (count) {
    console.log('myEvent 발생함 : ' + count);
});


// 이벤트 발생
setTimeout(function () {
    console.log('2초 후에 실행되었음.');
    process.emit('myEvent', '2')
}, 2000);

console.log('2초 후에 실행될 것임');
