// ================================================================
// Export
//  exports.getUser = function () {
//     return {id:'test01', name:'홍길동'};
//  };
//  exports.group = {id:'group01', name:'친구'};
// ================================================================
const user1 = require('./01_export');
function showUser() {
    return user1.getUser().name + ' , ' + user1.group.name;
}
console.log('사용자 정보 : ' + showUser());

// ================================================================
// Module.Export (객체설정)
//  const user = {
//      getUser : function () {
//          return {id:'test01', name:'홍길동'};
//      },
//      group: {id:'group01', name:'친구'}
//  };
//  module.exports = user;
// ================================================================
const user = require('./01_module_exports');
function showUser2() {
    return user.getUser().name + ' , ' + user.group.name;
}
console.log('사용자 정보 : ' + showUser2());

// ================================================================
// Module.Export (함수 할당) -- 소괄호()를 붙이면 바로 실행
//  module.exports = function() {
//      return {id:'test01', name:'홍길동'}
//  };
// ================================================================

const user3 = require('./01_module_exports_function');
function showUser3() {
    return user3().name + ' , ' + 'No Group';
}
console.log('사용자 정보 : ' + showUser3());
