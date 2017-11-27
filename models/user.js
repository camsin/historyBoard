const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var userSchema = schema({
    name: String,
    password: String,
    email: String,
    socialNetworks: {
        facebook: {},
        twitter: {},
        google: {}
    },
    provider: String

});

class UserClass{

    constructor(){}

    generateHash(password) {
        this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    validatePass(password) {
        return bcrypt.compareSync(password, this.password);
    };

    duplicatedEmail(next) {
        this.constructor.findOne({email:this.email}).exec(function (err, user) {
            return err ? next(true) : user != undefined ? next(true) : next(false);
        });
    }

    verifyEmail(){
        return re.test(this.email);
    }

}

userSchema.loadClass(UserClass);
let User = mongoose.model('User', userSchema);
module.exports = {
    User
};
