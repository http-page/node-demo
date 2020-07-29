/*
    콜백함수
    변수에 함수를 할당할 수 있으므로 함수를 호출할 때,
    파라미터로 다른 함수를 전달
 */

function add(a, b, callback) {
    let result = a + b;
    callback(result);
}

add(10, 10, function (result) {
    console.log('더하기 결과(callback) : ' + result);
    // 더하기 결과(callback) : 20
})


// 결과값을 함수로 리턴해 주는 경우
// 히스토리 기능으로, 내부 함수를 만들어서 리턴한다.

function minus(a, b, callback) {
    let result = a - b;
    callback(result);

    let history = function() {
        return a + ' - ' + b + ' = ' + result;
    };

    return history;
}

const minus_history = minus(100, 10, function (result) {
    console.log('a에서 b를 뺀 값(callback) : ' + result);
});

console.log('minus_history :: ' + minus_history());
console.log('minus_history 자료형 :: ' + typeof(minus_history));
/*
    더하기 결과(callback) : 20
    a에서 b를 뺀 값(callback) : 90
    minus_history :: 100 - 10 = 90
    minus_history 자료형 :: function
 */
