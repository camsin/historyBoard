

const expect = require('chai').expect;



describe('history board pruebas de Registrarse y Entrar',function(){
    browser.url('http://localhost:3000');

    //Prueba de registrar email que ya esta en uso
    it('Debe mostrar toast con: email already in use. Si el email esta en uso',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-blue');
            browser.waitForVisible('.register-modal', 999999);
            browser.setValue(' .name-register-test ','Carolina');
            browser.setValue('.email-register-test ','connie@gmail.com');
            browser.setValue('.password-register-test ','123');
            browser.setValue('.confirm-password-register-test ','123');
            browser.click('.waves-light');
            browser.waitForExist('.alert',999999);
            expect(browser.isExisting('.alert-danger')).to.be.true;
        }
    });

    //Prueba de registrar contrasenas que no son iguales
    it('Debe mostrar toast con: Passwords are not equals. Si las contrasenas no son iguales',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-blue');
            browser.waitForVisible('.register-modal', 999999);
            browser.setValue(' .name-register-test ','Carolina');
            browser.setValue('.email-register-test ','soyunemail@gmail.com');
            browser.setValue('.password-register-test ','123');
            browser.setValue('.confirm-password-register-test ','123qwqert');
            browser.click('.waves-light');
            browser.waitForExist('.alert',999999);
            expect(browser.isExisting('.alert-danger')).to.be.true;
        }
    });

    //CAMBIAR O ELIMINAR LOS DATOS DE LA BD/////////////////////
    //Prueba de crear usuario
    it('Crear usuario',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-blue');
            browser.waitForVisible('.register-modal', 999999);
            browser.setValue(' .name-register-test ','Willow');
            browser.setValue('.email-register-test ','willow@gmail.com');
            browser.setValue('.password-register-test ','123');
            browser.setValue('.confirm-password-register-test ','123');
            browser.click('.waves-light');
            expect(browser.isExisting('.alert')).to.be.false;
        }
    });

    //Prueba de intentar ingresar con nombre incorrecto
    it('Debe mostrar toast con: Incorrect username. Si el usuario es incorrecto',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-white');
            browser.waitForVisible('.login-modal', 999999);
            browser.setValue('.email-login-test ','soyunemail@gmail.com');
            browser.setValue('.password-login-test ','123');
            browser.click('.btn-primary');
            browser.waitForExist('.alert',999999);
            expect(browser.isExisting('.alert-danger')).to.be.true;
        }
    });

    //Prueba de intentar ingresar con contra incorrecta
    it('Debe mostrar toast con: Incorrect password. si la contra es incorrecta',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-white');
            browser.waitForVisible('.login-modal', 999999);
            browser.setValue('.email-login-test ','connie@gmail.com');
            browser.setValue('.password-login-test ','1231092830129ek0w');
            browser.click('.btn-primary');
            browser.waitForExist('.alert',999999);
            expect(browser.isExisting('.alert-danger')).to.be.true;
        }
    });

    //Prueba de intentar ingresar con campos vacios
    it('Debe mostrar toast con: Missing credentials. Si no se llenan los campos',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-white');
            browser.waitForVisible('.login-modal', 999999);
            browser.setValue('.email-login-test ','');
            browser.setValue('.password-login-test ','');
            browser.click('.btn-primary');
            browser.waitForExist('.alert',999999);
            expect(browser.isExisting('.alert-danger')).to.be.true;
        }
    });

    //Prueba de intentar ingresar con datos correctos
    it('Debe entrar al home si el login es correcto',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-white');
            browser.waitForVisible('.login-modal', 999999);
            browser.setValue('.email-login-test ','perla@gmail.com');
            browser.setValue('.password-login-test ','123');
            browser.click('.btn-primary');
            expect(browser.isExisting('.home-page')).to.be.true;
        }
    });
})




