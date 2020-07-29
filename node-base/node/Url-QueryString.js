/*
    Url 모듈의 주요 메소드
    1. parse() : 주소 문자열을 파싱하여 URL 객체를 만들어 준다.
    2. format() : URL 객체를 주소 문자열로 변환합니다.
 */

const url = require('url');
const curURL = url.parse('https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=popcon');
console.dir(curURL);
/*
   Url {
      protocol: 'https:',
      slashes: true,
      auth: null,
      host: 'search.naver.com',
      port: null,
      hostname: 'search.naver.com',
      hash: null,
      search: '?sm=top_hty&fbm=1&ie=utf8&query=popcon',
      query: 'sm=top_hty&fbm=1&ie=utf8&query=popcon',
      pathname: '/search.naver',
      path: '/search.naver?sm=top_hty&fbm=1&ie=utf8&query=popcon',
      href: 'https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=popcon'
    }
 */

console.log('hostname : ' + curURL.hostname);
console.log('query : ' + curURL.query);
console.log('search : ' + curURL.search);

// hostname : search.naver.com
// query : sm=top_hty&fbm=1&ie=utf8&query=popcon
// search : ?sm=top_hty&fbm=1&ie=utf8&query=popcon

const curStr = url.format(curURL);
console.log('주소 문자열: %s', curStr);
// 주소 문자열: https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=popcon


/*
    Query String
 */

const querystring = require('querystring');
const params = querystring.parse(curURL.query);
console.log('검색어 : ' + params.query);
// 검색어 : popcon
