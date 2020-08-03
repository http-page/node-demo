const crypto = require('crypto');

const Schema ={};

Schema.createSchema = function (mongoose) {
    console.log('Create Schema 호출');

    const UserSchema = mongoose.Schema({
        id: {type: String, required: true, unique: true, 'default': ''},
        name: {type: String, index: 'hashed', 'default': ''},
        hashed_password: {type: String, required: true, 'default': ''},
        salt: {type: String, required: true},
        age: {type: Number, 'default': -1},
        created_at: {type: Date, index: {unique: false}, 'default': Date.now()},
        updated_at: {type: Date, index: {unique: false}, 'default': Date.now()}
    });
    console.log('UserSchema 정의');

    UserSchema
        .virtual('password')        // 실제 저장하는 것이 아님
        .set(function (password) {
            // password라는 값이 넘어오면
            // 암호화 해서, hashed_password에 넣는다.
            this.salt = this.makeSalt();
            this.hashed_password = this.encryptPassword(password);
            console.log('virtual password 저장 : ' + this.hashed_password);
        });

    // 메소드에서 사용할 수 있는 함수 정의
    UserSchema.method('encryptPassword', function (plainText, inSalt) {
        if (inSalt) {
            return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
        } else {
            return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
        }
    })

    UserSchema.method('makeSalt', function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    })

    UserSchema.method('authenticate', function (plainText, inSalt, hashed_password) {
        if (inSalt) {
            console.log('authenticate 호출됨');
            return this.encryptPassword(plainText, inSalt) === hashed_password;
        } else {
            console.log('authenticate 호출됨');
            return this.encryptPassword(plainText) === hashed_password;
        }
    })

    // Static 함수 정의 --> Schema에서 정의하고, Model에서 사
    UserSchema.static('findById', function (id, callback) {
        return this.find({id: id}, callback);
    });

    UserSchema.static('findAll', function (callback) {
        return this.find({}, callback);
    });

    return UserSchema;
}

module.exports = Schema;
