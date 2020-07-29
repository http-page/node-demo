/*
    프로토타입
    객체의 원형을 프로토타입(Prototype)이라 하고 이 프로토타입이 클래스(Class) 역할을 함
    프로토타입을 만들고 new 연산자를 이용해 새로운 객체를 만들어 낼 수 있음

    자바스크립트의 함수 용도
    1. 함수를 실행하기 위해 만든 것
    2. 자바에서 처럼 Class(틀)로 사용하기 위해서 만든 것 --> 프로토타입
*/

const person1 = {name:'홍길동', age: 20};
const person2 = {name:'유관순', age: 19};

// 실행할 함수로도 사욕가능, Class(틀) 용도로도 사용 가능
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Class(틀)로 사용하려고 한다면
Person.prototype.walk = function(speed) {
    console.log(speed + 'km 속도로 걸어갑니다.');
}

const person3 = new Person('감감찬', 50);
const person4 = new Person('이순신', 60);

// 위의 new로 정의된 코드(Class)가 일반 실행함수와 다른 점은
// walk() 함수를 포함하고 있다.

person3.walk(30);
// 30km 속도로 걸어갑니다.
