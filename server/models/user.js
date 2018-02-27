const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        default: ''
    },
    provider: {
        type: String,
        default: ''
    },
    hashed_password: {
        type: String,
        default: ''
    },
    salt: {
        type: String,
        default: ''
    },
    authToken: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    }
});
const validatePresenceOf = value => value && value.length;
// UserSchema.virtual('password')
//     .set(function (password) {
//         this._password = password;
//         this.salt = this.makeSalt();
//         this.hashed_password = this.encryptPassword(password);
//     }).get(function () {
//         return this._password;
//     });

UserSchema.method = {
    /**
     * 
     * 
     * @returns 
     */
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('shal', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};
UserSchema.statics = {
    load: function (options, cb) {
        options.select = options.select || 'username password';
        // this.findOne({ username: 'wenchangshou' }, function(err, character) {
        //     console.log(character); // { name: 'Sam', inventory: {}}
        //   });
        return this.find(options.criteria)
            // .select(options.select)
            // .exec()
            // .exec(cb);
    },
    getUserByName:function(name){
        return this.findOne({username:name})
            // .select(options.select)
    }
}
module.exports = mongoose.model("User", UserSchema);;