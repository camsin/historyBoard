
const expect = require('chai').expect;
const path = require('path');



describe('Pruebas de Registrarse y Entrar',function(){
    browser.url('http://localhost:3000');

    //Prueba de registrar email que ya esta en uso
    it('Prueba de mail en uso. Debe mostrar toast con: email already in use.',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-blue');
            browser.waitForVisible('.register-modal', 30000);
            browser.setValue(' .name-register-test ','Carolina');
            browser.setValue('.email-register-test ','connie@gmail.com');
            browser.setValue('.password-register-test ','123');
            browser.setValue('.confirm-password-register-test ','123');
            browser.click('.waves-light');
            browser.waitForExist('.alert',30000);
            expect(browser.isExisting('.alert-danger')).to.be.true;
        }
    });

    //Prueba de registrar contrasenas que no son iguales
    it('Prueba de contraseñas diferentes. Debe mostrar toast con: Passwords are not equals.',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-blue');
            browser.waitForVisible('.register-modal', 30000);
            browser.setValue(' .name-register-test ','Carolina');
            browser.setValue('.email-register-test ','soyunemail@gmail.com');
            browser.setValue('.password-register-test ','123');
            browser.setValue('.confirm-password-register-test ','123qwqert');
            browser.click('.waves-light');
            browser.waitForExist('.alert',30000);
            expect(browser.isExisting('.alert-danger')).to.be.true;
        }
    });

    //CAMBIAR O ELIMINAR LOS DATOS DE LA BD/////////////////////
    //Prueba de crear usuario
    it('Prueba de crear usuario',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-blue');
            browser.waitForVisible('.register-modal', 30000);
            browser.setValue(' .name-register-test ','Willow');
            browser.setValue('.email-register-test ','willow@gmail.com');
            browser.setValue('.password-register-test ','123');
            browser.setValue('.confirm-password-register-test ','123');
            browser.click('.waves-light');
            expect(browser.isExisting('.alert')).to.be.false;
        }
    });

    //Prueba de intentar ingresar con nombre incorrecto
    it('Prueba de usuario incorrecto. Debe mostrar toast con: Incorrect username.',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-white');
            browser.waitForVisible('.login-modal', 30000);
            browser.setValue('.email-login-test ','soyunemail@gmail.com');
            browser.setValue('.password-login-test ','123');
            browser.click('.btn-primary');
            browser.waitForExist('.alert',30000);
            expect(browser.isExisting('.alert-danger')).to.be.true;
        }
    });

    //Prueba de intentar ingresar con contra incorrecta
    it('Prueba de contraseña incorrecta. Debe mostrar toast con: Incorrect password.',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-white');
            browser.waitForVisible('.login-modal', 30000);
            browser.setValue('.email-login-test ','connie@gmail.com');
            browser.setValue('.password-login-test ','1231092830129ek0w');
            browser.click('.btn-primary');
            browser.waitForExist('.alert',30000);
            expect(browser.isExisting('.alert-danger')).to.be.true;
        }
    });

    //Prueba de intentar ingresar con campos vacios
    it('Prueba de no llenar los campos. Debe mostrar toast con: Missing credentials.',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-white');
            browser.waitForVisible('.login-modal', 30000);
            browser.setValue('.email-login-test ','');
            browser.setValue('.password-login-test ','');
            browser.click('.btn-primary');
            browser.waitForExist('.alert',30000);
            expect(browser.isExisting('.alert-danger')).to.be.true;
        }
    });

    //Prueba de intentar ingresar con datos correctos
    it('Debe entrar al home si el login es correcto',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-white');
            browser.waitForVisible('.login-modal', 30000);
            browser.setValue('.email-login-test ','willow@gmail.com');
            browser.setValue('.password-login-test ','123');
            browser.click('.btn-primary');
            expect(browser.isExisting('.home-page')).to.be.true;
        }
    });
});

describe('Pruebas de actualizar perfil',function(){
    browser.url('http://localhost:3000/publications/lastPublications');

    //Prueba de intentar ingresar con datos correctos
    it('Prueba de no llenar datos. Debe salir toast de error',function(){
        if(browser.isExisting('.home-page')){

            browser.click('#hamburguer');
            browser.pause(1000);
            browser.waitForVisible('.side-nav', 30000);
            browser.click('.perfil-boton');
            browser.waitForVisible('.name-change-test', 30000);
            browser.setValue('.name-change-test ','');
            browser.setValue('.new-psw-change-test ','');
            browser.setValue('.confirm-new-psw-change-test ','');
            browser.setValue('.img-change-test','');
            browser.click('.btn-primary');
            browser.waitForExist('#toast-container',30000);
            expect(browser.getText('.toast-error')).to.be.equal('Error\nPara guardar tus cambios debes de ingresar tu contraseña y confirmarla');
            browser.click('#toast-container');


            // expect(browser.isExisting('Para guardar tus cambios debes de ingresar tu contraseña y confirmarla')).to.be.true;
        }
    });

    //Prueba de intentar ingresar nombre pero no contraseña
    it('Prueba de cambiar nombre sin ingresar contraseña. Debe salir toast de error',function(){
        if(browser.isExisting('.home-page')){

            browser.waitForVisible('.name-change-test', 30000);
            browser.setValue('.name-change-test ','Karen');
            browser.setValue('.new-psw-change-test ','');
            browser.setValue('.confirm-new-psw-change-test ','');
            browser.setValue('.img-change-test','');
            browser.click('.btn-primary');
            browser.waitForExist('#toast-container',30000);
            expect(browser.getText('.toast-error')).to.be.equal('Error\nPara guardar tus cambios debes de ingresar tu contraseña y confirmarla');
            browser.click('#toast-container');
        }
    });

    //Prueba de intentar ingresar nombre, contraseña y no confirmarla
    it('Prueba de cambiar nombre sin ingresar  la confirmacion de la contraseña. Debe salir toast de error',function(){
        if(browser.isExisting('.home-page')){

            browser.waitForVisible('.name-change-test', 30000);
            browser.setValue('.name-change-test ','Karen');
            browser.setValue('.new-psw-change-test ','321');
            browser.setValue('.confirm-new-psw-change-test ','');
            browser.setValue('.img-change-test','');
            browser.click('.btn-primary');
            browser.waitForExist('#toast-container',30000);
            expect(browser.getText('.toast-error')).to.be.equal('Error\nPara guardar tus cambios debes de ingresar tu contraseña y confirmarla');
            browser.click('#toast-container');
        }
    });

    //Prueba de intentar ingresar nombre, contraseña pero las contraseñas  no son iguales
    it('Prueba de cambiar nombre y que las contraseñas no sean iguales. Debe salir toast de error',function(){
        if(browser.isExisting('.home-page')){

            browser.waitForVisible('.name-change-test', 30000);
            browser.setValue('.name-change-test ','Karen');
            browser.setValue('.new-psw-change-test ','321');
            browser.setValue('.confirm-new-psw-change-test ','321321');
            browser.setValue('.img-change-test','');
            browser.click('.btn-primary');
            browser.waitForExist('#toast-container',30000);
            expect(browser.getText('.toast-error')).to.be.equal('Error\nLas contraseñas no coinciden');
            browser.click('#toast-container');
        }
    });

    //Prueba de cambiar nombre
    it('Prueba de cambiar nombre',function(){
        var toUpload = path.join(__dirname, '..', '..', 'fixtures', 'cat-to-upload.gif')
        if(browser.isExisting('.home-page')){

            browser.waitForVisible('.name-change-test', 30000);
            browser.setValue('.name-change-test ','Buffy');
            browser.setValue('.new-psw-change-test ','321');
            browser.setValue('.confirm-new-psw-change-test ','321');
            browser.chooseFile('.img-change-test', path.resolve(__dirname, './img/doggo.jpg'));
            browser.click('.btn-primary');
            browser.waitForExist('#toast-container',30000);
            expect(browser.getText('.toast-success')).to.be.equal('Tu perfil se ha actualizado\nCORRECTAMENTE');
            browser.click('#toast-container');
            // browser.pause(3000);
            browser.click('#hamburguer');
            // browser.pause(3000);
        }
    });

});


describe('Pruebas de publicacion',function(){
    browser.url('http://localhost:3000/publications/lastPublications');

    //Prueba de intentar publicar sin llenar los campos
    it('Prueba de no llenar datos. Debe salir toast de warning',function(){
        if(browser.isExisting('.container-nav')){
            browser.click('.make-publication');
            browser.waitForVisible('.publication-test', 30000);
            browser.click('.btn-public-test');
            browser.waitForVisible('.register-modal', 30000);
            browser.click('.btn-public-now-test');
            browser.waitForExist('#toast-container',30000);
            expect(browser.getText('.toast-warning')).to.be.equal('Llena todos los campos');
            browser.click('#toast-container');
        }
    });

    //Prueba de intentar publicar llenando: titulo
    // it('Prueba de llenar: titulo. Debe salir toast de warning',function(){
    //     if(browser.isExisting('.container-nav')){
    //         browser.waitForVisible('.titulo-test', 30000);
    //         browser.setValue('.titulo-test','Soy un titulo de prueba');
    //         browser.click('.btn-public-test');
    //         browser.waitForVisible('.register-modal', 30000);
    //         browser.click('.btn-public-now-test');
    //         browser.waitForExist('#toast-container',30000);
    //         expect(browser.getText('.toast-message')).to.be.equal('Llena todos los campos');
    //         browser.click('#toast-container');
    //     }
    // });



});

