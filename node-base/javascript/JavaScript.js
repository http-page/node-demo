/*
    [자료형]

    1. Boolean(기본 자료형)
       ture와 false의 두 가지 값을 가지는 자료형
    2. Number(기본 자료형)
       64비트 형식의 IEEE 754 값이며, 정수나 부동소수 값을 가지는 자료형
       몇 가지 상징적인 값을 가질 수 있음
       a. NAN(숫자 아님)
       b. + 무한대 : Number.MAX_VALUE로 확인
       c. - 무한대 : Number.MIN_VALUE로 확인
    3. String(기본 자료형)
       문자열 갓을 가지는 자료형
    4. undefined
       값을 할당하지 않은 변수의 값
    5. null
       존재하지 않는 값을 가리키는 값
    6. Object
       객체를 값으로 가지는 자료형
       객체는 속성을 담고 있는 가방(Collection)으로 볼 수 있으며,
       대표적인 객체로 Array나 Date를 들 수 있음
 */

/* 변수 */
let name;
let age = 20;
console.log('name : ' + name + '    age : ' + age);
// name : undefined    age : 20

name = '홍길동';
age = null;
console.log('name : ' + name + '    age : ' + age);
// name : 홍길동    age : null

/* 객체 */
// 자바 스크립트 객체는 {}로 만들고
// 속성을 넣을 수 있다.
let person = {};

person['name'] = '홍길동';     // person.name
person['age'] = 20;            // person.age
console.log('person["name"] : ' + person.name + '    person.age : ' + person['age']);

// 객체에 익명함수 넣기
person.add = function (a, b) {
    return a + b;
}
console.log('person.add() : ' + person.add(10,10));

// 속성 정의시 값 넣기
const human = {
    name: '소녀시대',
    age: 20,
    add: function add(a, b) {
        return a + b;
    }
};
console.log('human.add() : ' + human.add(10,10));


/* 함수 */
function add(a, b) {
    return a + b;
}
console.log('function add(10, 10) :: ' + add(10,10));

// 함수를 변수에 할당
const add2 = function add(a, b) {
    return a + b;
}
console.log('const add2(10, 10) :: ' + add2(10,10));


/*
    배열
    여러 개의 데이터를 하나의 변수에 담아 둘 수 있는 방법
    요소는 대괄호([])를 이용해 접근할 수 있다.

    push(object) : 배열의 끝에 요소를 추가
    pop() : 배열의 끝에 있는 요소를 삭제
    unshift() : 배열의 앞에 소소 추가
    shift() : 배열의 앞에 있는 요소를 삭제s
    splice(index, removeCount [,object]) : 여러 개의 객체를 요소로 추가하거나 삭제
    slice(index, copyCount) : 여러 개의 요소를 잘라내어 새로운 배열 객체 생성
*/
const names = ['홍길동', '감감찬', '이순신'];
let users = [{name:'홍길동', age:20}, {name:'감감찬', age:50}];
users.push({name:'이순신', age: 60});

console.log('사용자 수 : ' + users.length);
console.log('첫번째 사용자 이름 : ' + users[0].name);

// 배열에 함수를 넣음
const oper = function (a, b) { return a + b; }
users.push(oper);
console.dir(users);
/*
    [
      { name: '홍길동', age: 20 },
      { name: '감감찬', age: 50 },
      { name: '이순신', age: 60 },
      [Function: oper]
    ]

*/
console.log('네번째 배열에 저장된 함수 실행 :: ' + users[3](10,10));

// 배열의 마지막 요소 제거 : pop()
const del = users.pop();
console.log('배열에서 지워진 요소 : ' + del);
console.dir(users);
/*
    배열에서 지워진 요소 : function (a, b) { return a + b; }
    [
      { name: '홍길동', age: 20 },
      { name: '감감찬', age: 50 },
      { name: '이순신', age: 60 }
    ]
 */

/*
    for문 == forEach문(콜백함수)  <-- 동일한 결
 */

for(let i = 0; i < users.length; i++) {
    console.log('배열 원소 #' + i + ' : ' + users[i].name);
}

users.forEach(function(item, index) {
    // 콜백함수 : 첫번째 인자 (아이템), 두번째 인자 (순서)
    console.log('배열 원소 #' + index + ' : ' + item.name);
})

// 배열 조작
console.dir(users);
/*
    [
      { name: '홍길동', age: 20 },
      { name: '감감찬', age: 50 },
      { name: '이순신', age: 60 }
    ]
*/
console.log('users 배열의 개수 : ' + users.length); // 3
users.push({name:'유관순', age: 18});
console.log('users 배열의 개수 : ' + users.length); // 4
/*
    [
      { name: '홍길동', age: 20 },
      { name: '감감찬', age: 50 },
      { name: '이순신', age: 60 },
      { name: '유관순', age: 18 }
    ]
*/
const pop_element = users.pop(); // pop된 요소
console.dir(pop_element); // { name: '유관순', age: 18 }

// 배열의 제일 앞에 데이터 넣기
users.unshift({name:'유관순', age: 18});
console.dir(users);
/*
    [
      { name: '유관순', age: 18 },
      { name: '홍길동', age: 20 },
      { name: '감감찬', age: 50 },
      { name: '이순신', age: 60 }
    ]
 */

// 배열의 제일 앞에 데이터 빼기
users.shift();
console.dir(users);

/*
    [
      { name: '홍길동', age: 20 },
      { name: '감감찬', age: 50 },
      { name: '이순신', age: 60 }
    ]
 */

// delete :: 배열 원소의 개수는 그대로 이다.
delete users[1];    // users 두번째 요소를 삭제
console.dir(users);
// [ { name: '홍길동', age: 20 }, <1 empty item>, { name: '이순신', age: 60 } ]
users.forEach(function(item, index) {
    console.log('원소 #' + index + '  이름 : ' + item.name);
})
/*
    원소 #0  이름 : 홍길동
    원소 #2  이름 : 이순신
 */

// 배열의 삭제는 slice를 사용
// 인자 : 1. 지우고 싶은 위치, 2. 지우고 싶은 개수
// 인자 : 1. 추가하고 싶은 위치, 2. 0(추가), 3. 데이터

// 추가
users.splice(1, 0, {name:'김준연', age:39});
console.dir(users);
/*
    [
      { name: '홍길동', age: 20 },
      { name: '김준연', age: 39 },
      <1 empty item>,
      { name: '이순신', age: 60 }
    ]
 */
console.log('users 배열의 길이 ' + users.length); // 4

// 삭제
users.splice(2, 1);// 두번째 위치에서 한개 삭제
console.dir(users);
/*
    [
      { name: '홍길동', age: 20 },
      { name: '김준연', age: 39 },
      { name: '이순신', age: 60 }
    ]

 */

// slice --> (1) 두번째 에서 (2) 세번째 까지 복사
const users2 = users.slice(1, 2);
console.log('users 객체'); console.dir(users);
/*
    users 객체
    [
      { name: '홍길동', age: 20 },
      { name: '김준연', age: 39 },
      { name: '이순신', age: 60 }
    ]
*/
console.log('users2 객체'); console.dir(users2);
/*
    users2 객체
    [ { name: '김준연', age: 39 } ]
*/
