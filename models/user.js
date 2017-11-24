const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

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
        console.log("ALV");
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

    // /**
    //  * Verifica si los campos name y lastName no se encuentran vacíos y que su longitud
    //  * sea mayor a 3.
    //  *
    //  * @returns {boolean} si cumple con las validaciones especificadas.
    //  */
    // verifyNotEmptyStringFields(){
    //     return (this.name != undefined && this.name.length > 3) && (this.lastName != undefined && this.lastName.length > 3);
    // }

}

userSchema.loadClass(UserClass);
let User = mongoose.model('User', userSchema);
module.exports = {
    User
};
