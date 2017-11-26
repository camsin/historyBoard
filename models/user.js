const mongoose = require('mongoose');
const schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

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

/**
 * Clase que contiene los métodos que utiliza el modelo Usuarios.
 */
class UserClass{

    /**
     * Constructor vacío.
     */
    constructor(){}

    // /**
    //  * Verifica que el virtual de confirmar contraseña sea igual texto mandado.
    //  *
    //  * @param password {@code String) Contraseña a verificar
    //  * @returns {boolean} si coinciden las cadenas de texto
    //  */
    // confrimPassword(password){
    //     return this.passwordToVerify === password;
    // };

    // /**
    //  * Asigna el virual para ser validado.
    //  *
    //  * @param password {@code String) Contraseña a verificar proximamente
    //  */
    // verifyPassword(passwordToVerify){
    //     this.passwordToVerify = passwordToVerify;
    // };

    /**
     * Genera la encriptación de la contraseña por medio de la libreria bcrypt.
     * @param password {@code String} a encriptar
     */
    generateHash(password) {
        console.log("ALV");
        this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    /**
     * Verifica que la constraseña mandada sea igual que la encriptada en el user.
     *
     * @param password {@code String} texto a comparar
     * @returns {boolean} si coincide o no la contraseña
     */
    validatePassword(password) {
        console.log("PASS", password);
        return bcrypt.compareSync(password, this.password);
    };

    static findByEmail(email){
        return this.constructor.findOne({"email":email});
    }

    /**
     * Verifica que el email ingresado no se encuentre utiliado por otro user.
     *
     * @returns {boolean} si el email ya esta siendo utilizado por otro user.
     */
    isDuplicateEmail(next) {
        this.constructor.findOne({email:this.email}).exec(function (err, user) {
            return err ? next(true) : user != undefined ? next(true) : next(false);
        });
    }

    // /**
    //  * Verifica que el email ingresado no se encuentre utiliado por otro user, que no
    //  * sea el que se esta editando.
    //  *
    //  * @returns {boolean} si el email ya esta siendo utilizado por otro user.
    //  */
    // isDuplicateEmailShow(userId, next) {
    //     this.constructor.findOne({email:this.email}).exec(function (err, user) {
    //         return err ? next(true) : user != undefined && user._id != userId  ? next(true) : next(false);
    //     })
    // }

    /**
     * Verifica si el email es valido por medio de una regex.
     *
     * @returns {boolean} si es un email válido.
     */
    verifyValidEmail(){
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
