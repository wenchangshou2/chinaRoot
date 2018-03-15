"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const mongoose_1 = require("mongoose");
const crypto = require('crypto');
// const Schema = mongoose.Schema;
exports.UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    provider: {
        type: String,
    },
    hashed_password: {
        type: String,
    },
    salt: {
        type: String,
    },
    authToken: {
        type: String,
    },
    password: {
        type: String,
    },
    nickname: {
        type: String,
    }
});
const validatePresenceOf = (value) => value && value.length;
exports.UserSchema.methods.makeSalt = function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
};
exports.UserSchema.methods.encryptPassword = function (password) {
    if (!password)
        return '';
    try {
        return crypto
            .createHmac('shal', this.salt)
            .update(password)
            .digest('hex');
    }
    catch (err) {
        return '';
    }
};
exports.UserSchema.statics = {
    load: function (options, cb) {
        options.select = options.select || 'username password';
        return this.find(options.criteria);
    },
    getUserByName: function (name) {
        return this.findOne({ username: name });
        // .select(options.select)
    },
    registerUser: function (username, password) {
    }
};
module.exports = mongoose_1.model("User", exports.UserSchema);
;
//# sourceMappingURL=user.js.map