
const expect = require('chai').expect;
const path = require('path');



describe('Pruebas de Registrarse y Entrar',function(){
    browser.url('http://localhost:3000');

    //Prueba de registrar email que ya esta en uso
    it('Prueba de mail en uso. Debe mostrar toast con: email already in use.',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-blue');
            browser.waitForVisible('.register-modal', 10000);
            browser.setValue(' .name-register-test ','Carolina');
            browser.setValue('.email-register-test ','connie@gmail.com');
            browser.setValue('.password-register-test ','123');
            browser.setValue('.confirm-password-register-test ','123');
            browser.click('.waves-light');
            browser.waitForExist('.alert',10000);
            expect(browser.isExisting('.alert-danger')).to.be.true;
        }
    });

    //Prueba de registrar contrasenas que no son iguales
    it('Prueba de contraseñas diferentes. Debe mostrar toast con: Passwords are not equals.',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-blue');
            browser.waitForVisible('.register-modal', 10000);
            browser.setValue(' .name-register-test ','Carolina');
            browser.setValue('.email-register-test ','soyunemail@gmail.com');
            browser.setValue('.password-register-test ','123');
            browser.setValue('.confirm-password-register-test ','123qwqert');
            browser.click('.waves-light');
            browser.waitForExist('.alert',10000);
            expect(browser.isExisting('.alert-danger')).to.be.true;
        }
    });

    //CAMBIAR O ELIMINAR LOS DATOS DE LA BD/////////////////////
    //Prueba de crear usuario
    it('Prueba de crear usuario',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-blue');
            browser.waitForVisible('.register-modal', 10000);
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
            browser.waitForVisible('.login-modal', 10000);
            browser.setValue('.email-login-test ','soyunemail@gmail.com');
            browser.setValue('.password-login-test ','123');
            browser.click('.btn-primary');
            browser.waitForExist('.alert',10000);
            expect(browser.isExisting('.alert-danger')).to.be.true;
        }
    });

    //Prueba de intentar ingresar con contra incorrecta
    it('Prueba de contraseña incorrecta. Debe mostrar toast con: Incorrect password.',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-white');
            browser.waitForVisible('.login-modal', 10000);
            browser.setValue('.email-login-test ','connie@gmail.com');
            browser.setValue('.password-login-test ','1231092830129ek0w');
            browser.click('.btn-primary');
            browser.waitForExist('.alert',10000);
            expect(browser.isExisting('.alert-danger')).to.be.true;
        }
    });

    //Prueba de intentar ingresar con campos vacios
    it('Prueba de no llenar los campos. Debe mostrar toast con: Missing credentials.',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-white');
            browser.waitForVisible('.login-modal', 10000);
            browser.setValue('.email-login-test ','');
            browser.setValue('.password-login-test ','');
            browser.click('.btn-primary');
            browser.waitForExist('.alert',10000);
            expect(browser.isExisting('.alert-danger')).to.be.true;
        }
    });

    //Prueba de intentar ingresar con datos correctos
    it('Debe entrar al home si el login es correcto',function(){
        if(browser.isExisting('.login-view')){

            browser.click('.btn-white');
            browser.waitForVisible('.login-modal', 10000);
            browser.setValue('.email-login-test ','willow@gmail.com');
            browser.setValue('.password-login-test ','123');
            browser.click('.btn-primary');
            expect(browser.isExisting('.home-page')).to.be.true;
        }
    });
});

describe('Pruebas de actualizar perfil',function(){
    browser.url('http://localhost:3000/publications/lastPublications');

    //Prueba de cambiar info sin llenar datos
    it('Prueba de no llenar datos. Debe salir toast de error',function(){
        if(browser.isExisting('.home-page')){

            browser.click('#hamburguer');
            browser.pause(1000);
            browser.waitForVisible('.side-nav', 10000);
            browser.click('.perfil-boton');
            browser.waitForVisible('.name-change-test', 10000);
            browser.setValue('.name-change-test ','');
            browser.setValue('.new-psw-change-test ','');
            browser.setValue('.confirm-new-psw-change-test ','');
            browser.setValue('.img-change-test','');
            browser.click('.btn-primary');
            browser.waitForExist('#toast-container',10000);
            expect(browser.getText('.toast-error')).to.be.equal('Error\nPara guardar tus cambios debes de ingresar tu contraseña y confirmarla');
            browser.click('#toast-container');


            // expect(browser.isExisting('Para guardar tus cambios debes de ingresar tu contraseña y confirmarla')).to.be.true;
        }
    });

    //Prueba de intentar ingresar nombre pero no contraseña
    it('Prueba de cambiar nombre sin ingresar contraseña. Debe salir toast de error',function(){
        if(browser.isExisting('.home-page')){

            browser.waitForVisible('.name-change-test', 10000);
            browser.setValue('.name-change-test ','Karen');
            browser.setValue('.new-psw-change-test ','');
            browser.setValue('.confirm-new-psw-change-test ','');
            browser.setValue('.img-change-test','');
            browser.click('.btn-primary');
            browser.waitForExist('#toast-container',10000);
            expect(browser.getText('.toast-error')).to.be.equal('Error\nPara guardar tus cambios debes de ingresar tu contraseña y confirmarla');
            browser.click('#toast-container');
        }
    });

    //Prueba de intentar ingresar nombre, contraseña y no confirmarla
    it('Prueba de cambiar nombre sin ingresar  la confirmacion de la contraseña. Debe salir toast de error',function(){
        if(browser.isExisting('.home-page')){

            browser.waitForVisible('.name-change-test', 10000);
            browser.setValue('.name-change-test ','Karen');
            browser.setValue('.new-psw-change-test ','321');
            browser.setValue('.confirm-new-psw-change-test ','');
            browser.setValue('.img-change-test','');
            browser.click('.btn-primary');
            browser.waitForExist('#toast-container',10000);
            expect(browser.getText('.toast-error')).to.be.equal('Error\nPara guardar tus cambios debes de ingresar tu contraseña y confirmarla');
            browser.click('#toast-container');
        }
    });

    //Prueba de intentar ingresar nombre, contraseña pero las contraseñas  no son iguales
    it('Prueba de cambiar nombre y que las contraseñas no sean iguales. Debe salir toast de error',function(){
        if(browser.isExisting('.home-page')){

            browser.waitForVisible('.name-change-test', 10000);
            browser.setValue('.name-change-test ','Karen');
            browser.setValue('.new-psw-change-test ','321');
            browser.setValue('.confirm-new-psw-change-test ','321321');
            browser.setValue('.img-change-test','');
            browser.click('.btn-primary');
            browser.waitForExist('#toast-container',10000);
            expect(browser.getText('.toast-error')).to.be.equal('Error\nLas contraseñas no coinciden');
            browser.click('#toast-container');
        }
    });

    //Prueba de cambiar nombre
    it('Prueba de cambiar nombre',function(){
        var toUpload = path.join(__dirname, '..', '..', 'fixtures', 'cat-to-upload.gif')
        if(browser.isExisting('.home-page')){

            browser.waitForVisible('.name-change-test', 10000);
            browser.setValue('.name-change-test ','Buffy');
            browser.setValue('.new-psw-change-test ','321');
            browser.setValue('.confirm-new-psw-change-test ','321');
            browser.chooseFile('.img-change-test', path.resolve(__dirname, './img/doggo.jpg'));
            browser.click('.btn-primary');
            browser.waitForExist('#toast-container',10000);
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
        if(browser.isExisting('.home-page')){
            browser.click('.make-publication');
            browser.waitForVisible('.publication-test', 10000);
            browser.click('.btn-public-test');
            browser.waitForVisible('.register-modal', 10000);
            browser.click('.btn-public-now-test');
            browser.waitForExist('.toast-warning',10000);
            expect(browser.getText('.toast-warning')).to.be.equal('Llena todos los campos');
            browser.click('.toast-warning');
        }
    });

    // //Prueba de intentar publicar llenando: titulo
    it('Prueba de llenar solo: titulo. Debe salir toast de warning',function(){
        if(browser.isExisting('.home-page')){
            browser.waitForVisible('.titulo-test', 10000);
            browser.setValue('.titulo-test','Soy un titulo de prueba');
            browser.click('.btn-public-test');
            browser.waitForVisible('.register-modal', 10000);
            browser.click('.btn-public-now-test');
            browser.waitForExist('.toast-warning',10000);
            expect(browser.getText('.toast-warning')).to.be.equal('Llena todos los campos');
            browser.click('.toast-warning');
        }
    });

    //Prueba de intentar publicar llenando: titulo
    it('Prueba de llenar solo: titulo, estado. Debe salir toast de warning',function(){
        if(browser.isExisting('.home-page')){
            browser.waitForVisible('.titulo-test', 10000);
            browser.setValue('.titulo-test','Soy un titulo de prueba');
            browser.click('input.select-dropdown');
            browser.pause(1000);
            browser.click('.dropdown-content > li:nth-child(3)');
            browser.click('.btn-public-test');
            browser.waitForVisible('.register-modal', 10000);
            browser.click('.btn-public-now-test');
            browser.waitForExist('.toast-warning',10000);
            expect(browser.getText('.toast-warning')).to.be.equal('Llena todos los campos');
            browser.click('.toast-warning');
        }
    });

    //Prueba de publicar sin subir las 5 imagenes
    it('Prueba de publicar sin subir imagenes. Debe salir toast de warning',function(){
        if(browser.isExisting('.container-nav')){
            browser.waitForVisible('.titulo-test', 10000);
            browser.setValue('.titulo-test','Soy un titulo de prueba');
            browser.chooseFile('#preview',  path.resolve('./test/specs/', './img/1.png'));
            browser.chooseFile('#head',  path.resolve('./test/specs/', './img/2.png'));
            browser.click('input.select-dropdown');
            browser.pause(1000);
            browser.click('.dropdown-content > li:nth-child(3)');
            browser.setValue('#textarea1','Soy un contenido de prueba');
            browser.click('.btn-public-test');
            browser.waitForVisible('.register-modal', 10000);
            browser.click('.btn-public-now-test');
            browser.waitForExist('.toast-warning',10000);
            expect(browser.getText('.toast-warning')).to.be.equal('Llena todos los campos');
            browser.click('.toast-warning');
        }
    });

    //Prueba de publicar subiendo 1 imagen
    it('Prueba de publicar subiendo 1 imagen. Debe salir toast de warning',function(){
        if(browser.isExisting('.container-nav')){
            browser.waitForVisible('.titulo-test', 10000);
            browser.setValue('.titulo-test','Soy un titulo de prueba');
            browser.chooseFile('#preview',  path.resolve('./test/specs/', './img/1.png'));
            browser.chooseFile('#head',  path.resolve('./test/specs/', './img/2.png'));
            browser.click('input.select-dropdown');
            browser.pause(1000);
            browser.click('.dropdown-content > li:nth-child(3)');
            browser.setValue('#textarea1','Soy un contenido de prueba');
            browser.chooseFile('#img1',  path.resolve('./test/specs/', './img/3.png'));
            browser.click('.btn-public-test');
            browser.waitForVisible('.register-modal', 10000);
            browser.click('.btn-public-now-test');
            browser.waitForExist('.toast-warning',10000);
            expect(browser.getText('.toast-warning')).to.be.equal('Llena todos los campos');
            browser.click('.toast-warning');
        }
    });

    //Prueba de publicar subiendo 2 imagenes
    it('Prueba de publicar subiendo 2 imagenes. Debe salir toast de warning',function(){
        if(browser.isExisting('.container-nav')){
            browser.waitForVisible('.titulo-test', 10000);
            browser.setValue('.titulo-test','Soy un titulo de prueba');
            browser.chooseFile('#preview',  path.resolve('./test/specs/', './img/1.png'));
            browser.chooseFile('#head',  path.resolve('./test/specs/', './img/2.png'));
            browser.click('input.select-dropdown');
            browser.pause(1000);
            browser.click('.dropdown-content > li:nth-child(3)');
            browser.setValue('#textarea1','Soy un contenido de prueba');
            browser.chooseFile('#img1',  path.resolve('./test/specs/', './img/3.png'));
            browser.chooseFile('#img2',  path.resolve('./test/specs/', './img/4.png'));
            browser.click('.btn-public-test');
            browser.waitForVisible('.register-modal', 10000);
            browser.click('.btn-public-now-test');
            browser.waitForExist('.toast-warning',10000);
            expect(browser.getText('.toast-warning')).to.be.equal('Llena todos los campos');
            browser.click('.toast-warning');
        }
    });

    //Prueba de publicar subiendo 3 imagenes
    it('Prueba de publicar subiendo 3 imagenes. Debe salir toast de warning',function(){
        if(browser.isExisting('.container-nav')){
            browser.waitForVisible('.titulo-test', 10000);
            browser.setValue('.titulo-test','Soy un titulo de prueba');
            browser.chooseFile('#preview',  path.resolve('./test/specs/', './img/1.png'));
            browser.chooseFile('#head',  path.resolve('./test/specs/', './img/2.png'));
            browser.click('input.select-dropdown');
            browser.pause(1000);
            browser.click('.dropdown-content > li:nth-child(3)');
            browser.setValue('#textarea1','Soy un contenido de prueba');
            browser.chooseFile('#img1',  path.resolve('./test/specs/', './img/3.png'));
            browser.chooseFile('#img2',  path.resolve('./test/specs/', './img/4.png'));
            browser.chooseFile('#img3',  path.resolve('./test/specs/', './img/5.png'));
            browser.click('.btn-public-test');
            browser.waitForVisible('.register-modal', 10000);
            browser.click('.btn-public-now-test');
            browser.waitForExist('.toast-warning',10000);
            expect(browser.getText('.toast-warning')).to.be.equal('Llena todos los campos');
            browser.click('.toast-warning');
        }
    });

    //Prueba de publicar subiendo 4 imagenes
    it('Prueba de publicar subiendo 4 imagenes. Debe salir toast de warning',function(){
        if(browser.isExisting('.container-nav')){
            browser.waitForVisible('.titulo-test', 10000);
            browser.setValue('.titulo-test','Soy un titulo de prueba');
            browser.chooseFile('#preview',  path.resolve('./test/specs/', './img/1.png'));
            browser.chooseFile('#head',  path.resolve('./test/specs/', './img/2.png'));
            browser.click('input.select-dropdown');
            browser.pause(1000);
            browser.click('.dropdown-content > li:nth-child(3)');
            browser.setValue('#textarea1','Soy un contenido de prueba');
            browser.chooseFile('#img1',  path.resolve('./test/specs/', './img/3.png'));
            browser.chooseFile('#img2',  path.resolve('./test/specs/', './img/4.png'));
            browser.chooseFile('#img3',  path.resolve('./test/specs/', './img/5.png'));
            browser.chooseFile('#img4',  path.resolve('./test/specs/', './img/6.png'));
            browser.click('.btn-public-test');
            browser.waitForVisible('.register-modal', 10000);
            browser.click('.btn-public-now-test');
            browser.waitForExist('.toast-warning',10000);
            expect(browser.getText('.toast-warning')).to.be.equal('Llena todos los campos');
            browser.click('.toast-warning');
            browser.pause(1000);
        }
    });

    //Prueba de publicar sin imagen preview
    it('Prueba de publicar sin imagen preview',function(){
        if(browser.isExisting('.container-nav')){
            browser.refresh();
            browser.waitForVisible('.titulo-test', 10000);
            browser.setValue('.titulo-test','Soy un titulo de prueba');
            browser.chooseFile('#head',  path.resolve('./test/specs/', './img/2.png'));
            browser.click('input.select-dropdown');
            browser.pause(1000);
            browser.click('.dropdown-content > li:nth-child(3)');
            browser.setValue('#textarea1','Soy un contenido de prueba');
            browser.chooseFile('#img1',  path.resolve('./test/specs/', './img/3.png'));
            browser.chooseFile('#img2',  path.resolve('./test/specs/', './img/4.png'));
            browser.chooseFile('#img3',  path.resolve('./test/specs/', './img/5.png'));
            browser.chooseFile('#img4',  path.resolve('./test/specs/', './img/6.png'));
            browser.chooseFile('#img5',  path.resolve('./test/specs/', './img/7.png'));
            browser.click('.btn-public-test');
            browser.waitForVisible('.register-modal', 10000);
            browser.click('.btn-public-now-test');
            browser.waitForExist('.toast-warning',10000);
            expect(browser.getText('.toast-warning')).to.be.equal('Llena todos los campos');
            browser.click('.toast-warning');
        }
    });

    //Prueba de publicar sin imagen de cabecera
    it('Prueba de publicar sin imagen de cabecera',function(){
        browser.refresh();
        if(browser.isExisting('.container-nav')){
            browser.waitForVisible('.titulo-test', 10000);
            browser.setValue('.titulo-test','Soy un titulo de prueba');
            browser.chooseFile('#preview',  path.resolve('./test/specs/', './img/1.png'));
            // browser.chooseFile('#head',  path.resolve('./test/specs/', './img/2.png'));
            browser.click('input.select-dropdown');
            browser.pause(1000);
            browser.click('.dropdown-content > li:nth-child(3)');
            browser.setValue('#textarea1','Soy un contenido de prueba');
            browser.chooseFile('#img1',  path.resolve('./test/specs/', './img/3.png'));
            browser.chooseFile('#img2',  path.resolve('./test/specs/', './img/4.png'));
            browser.chooseFile('#img3',  path.resolve('./test/specs/', './img/5.png'));
            browser.chooseFile('#img4',  path.resolve('./test/specs/', './img/6.png'));
            browser.chooseFile('#img5',  path.resolve('./test/specs/', './img/7.png'));
            browser.click('.btn-public-test');
            browser.waitForVisible('.register-modal', 10000);
            browser.click('.btn-public-now-test');
            browser.waitForExist('.toast-warning',10000);
            expect(browser.getText('.toast-warning')).to.be.equal('Llena todos los campos');
            browser.click('.toast-warning');
            browser.pause(1000);
        }
    });

    //Prueba de publicar
    it('Prueba de publicar',function(){
        if(browser.isExisting('.container-nav')){
            browser.waitForVisible('.titulo-test', 10000);
            browser.setValue('.titulo-test','Soy un titulo de prueba');
            browser.chooseFile('#preview',  path.resolve('./test/specs/', './img/1.png'));
            browser.chooseFile('#head',  path.resolve('./test/specs/', './img/2.png'));
            browser.click('input.select-dropdown');
            browser.pause(1000);
            browser.click('.dropdown-content > li:nth-child(3)');
            browser.setValue('#textarea1','Soy un contenido de prueba');
            browser.chooseFile('#img1',  path.resolve('./test/specs/', './img/3.png'));
            browser.chooseFile('#img2',  path.resolve('./test/specs/', './img/4.png'));
            browser.chooseFile('#img3',  path.resolve('./test/specs/', './img/5.png'));
            browser.chooseFile('#img4',  path.resolve('./test/specs/', './img/6.png'));
            browser.chooseFile('#img5',  path.resolve('./test/specs/', './img/7.png'));
            browser.click('.btn-public-test');
            browser.waitForVisible('.register-modal', 10000);
            browser.click('.btn-public-now-test');
            browser.waitForExist('.home-test',10000);
            browser.pause(2000);
            // browser.waitForExist('#toast-container',10000);
            // expect(browser.getText('.toast-success')).to.be.equal('Tu publicacion fue guardada exitosamente');
            // expect(browser.getText('.toast-message')).to.be.equal('Llena todos los campos');
            // browser.click('#toast-container');
        }
    });

    //Prueba de eliminar publicacion :c
    it('Prueba de eliminar publicacion. Debe salir toast de success',function(){
        if(browser.isExisting('.home-page')){

            browser.click('#hamburguer');
            browser.pause(1000);
            browser.click('.misPublicacionesTest');
            browser.waitForVisible('.delete-test', 10000);
            browser.click('.delete-btn');
            browser.waitForVisible('#deleteModal', 10000);
            browser.click('.btn-danger');
            browser.waitForExist('.toast-success',10000);
            expect(browser.getText('.toast-success')).to.be.equal('Tu publicacion fue eliminada :(');
            browser.click('.home-test');
            browser.pause(3000);

        }
    });


});

