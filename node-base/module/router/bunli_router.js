
const login = function (req, res) {
    console.log('router : /apis/login');

    const _id = req.body.id || req.query.id;
    const _pw = req.body.password || req.query.password;

    console.log('요청 파라미터 : ' + _id + ' , ' + _pw);

    const database = req.app.get('database');

    if(database) {
        // 데이터 베이스가 설정되어 있으면
        authUser(database, _id, _pw, function (err, docs){
            if(err) {
                console.log('에러 발생.');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>몽고디비 검색시 에러 발생</h1>');
                res.end();
            }

            if(docs) {
                // 데이터가 있는 경우
                console.dir(docs);
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>사용자 로그인 성공</h1>');
                res.write('<div><p>사용자 : ' + docs[0].name + '</div>');
                res.write('<br><br><a href="/login.html">다시 로그인 하기</a>');
                res.end();
            }
            else {
                // 데이터가 없는 경우
                console.log('에러발생 : 조회 데이터 없음');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>사용자 데이터 조회 안됨</h1>');
                res.write('<br><br><a href="/login.html">다시 로그인 하기</a>');
                res.end();
            }
        });
    }
    else {
        console.log('에러발생 : 데이터 베이스 정의 안됨');
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>데이터 베이스 정의 안됨</h1>');
        res.end();
    }
};

const adduser = function (req, res){
    console.log('router : /apis/adduser');

    const _id = req.body.id || req.query.id;
    const _name = req.body.name || req.query.name;
    const _pw = req.body.password || req.query.password;

    console.log('요청 파라미터 : ' + _id + ' , ' + _pw + ' , ' + _name);

    const database = req.app.get('database');
    if(database) {
        // 데이터 베이스가 정상적으로 만들어졌다면.
        addUser(database, _id, _pw, _name, function (err, result){
            if(err) {
                console.log('에러 발생.');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>몽고디비 : 사용자 추가 시 에러 발생</h1>');
                res.end();
                return;
            }

            if(result) {
                // 사용자 추가 성공
                console.dir(result);
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>사용자 추가 성공</h1>');
                res.write('<div><p>사용자 : ' + _id + '</p></div>');
                res.end();
            }
            else {
                // 추가된 사용자가 없는 경우
                console.log('에러발생 : 추가한 사용자 없음');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>추가한 사용자 없음</h1>');
                res.end();
            }

        });
    }
    else {
        console.log('에러발생 : 데이터 베이스 정의 안됨');
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>데이터 베이스 정의 안됨</h1>');
        res.end();
    }
};

const listuser = function(req, res){
    console.log('router : /apis/listuser');

    const database = req.app.get('database');
    if(database) {
        database.UserModel.findAll(function (err, results) {
            if(err) {
                console.log('에러 발생.');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>몽고디비 : 사용자 추가 시 에러 발생</h1>');
                res.end();
                return;
            }

            if(results) {
                console.dir(results);
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h3>사용자 리스트</h3>');

                res.write('<div><ul>');
                for(let i = 0; i < results.length; i++) {
                    let curId = results[i]._doc.id;
                    let curName = results[i]._doc.name;
                    res.write('    <li>#' + i + ' -> ' + curId + ' , ' + curName + '</li>');
                }
                res.write('</ul></div>');
                res.end();
            }
            else {
                console.log('에러발생 : 조회된 사용자 없음');
                res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
                res.write('<h1>에러발생 : 조회된 사용자 없음</h1>');
                res.end();
            }
        });
    }
    else {
        console.log('에러발생 : 데이터 베이스 정의 안됨');
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>데이터 베이스 정의 안됨</h1>');
        res.end();
    }
};

const authUser = function (db, id, password, callback)
{
    console.log('function : authUser');

    // user 찾기
    db.UserModel.findById(id, function(err, results){
        if(err) {
            console.log('mongoose find Error');
            callback(err, null);        // 호출한 곳으로 에러 넘김
            return;
        }

        console.log('아이디  %s로 검색', id);
        if(results.length > 0) {
            if(results[0]._doc.password === password) {
                console.log('비밀번호 일치함');
                callback(null, results);
            }
            else {
                console.log('비밀번호 일치하지 않음');
                callback(null, null);
            }
        }
        else {
            console.log('아이디 일치하는 사용자 없음');
            callback(null, null);
        }
    });
};

const addUser = function (db, id, password, name, callback) {
    console.log('function : addUser :' + id + ' , ' + password + ' , ' + name);

    // 객체 생성
    const user = new db.UserModel({'id':id, 'password':password, 'name': name});

    // 객체 저장
    user.save(function (err) {
        if(err) {
            callback(err, null);
            return;
        }
        console.log('사용자 데이터 추가 함');
        callback(null, user);
    });
};

module.exports.login = login;
module.exports.adduser = adduser;
module.exports.listuser = listuser;
