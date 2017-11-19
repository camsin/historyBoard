$(document).ready(function() {

    $('#hamburguer').on('click', function() {
        this.classList.toggle('active');
    });

    $(".drag-target").click(function(){
        $("#hamburguer").removeClass("active");
    });

    $(".drag-target").click(function(){
        $(".drag-target").removeClass("d-initial");
    });

    $("#hamburguer").click(function(){
        $(".drag-target").addClass("d-initial");
    });

    $("#hamburguer").click(function(){
        $(".side-nav").toggleClass("d-initial");
    });

});

$("#hamburguer").sideNav();

$(document).ready(function(){
    $('.tooltipped').tooltip({delay: 50});
});

tippy('.tippy', {
    position: 'top',
    animation: 'scale',
    arrow: true,
    followCursor: true
})

$(function() {
    var images = ['login.jpg', 'plaza.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg',];
    $('.img-header').css({'background-image': 'url(../../images/' + images[Math.floor(Math.random() * images.length)] + ')'});
});

$(document).ready(function(){
    $('.carousel').carousel();
});

$(document).ready(function(){
    $('.materialboxed').materialbox();
});

//
// (function () {
//     var timeLeft = 8, cinterval;
//     var timeDec = function (){
//         timeLeft--;
//         document.querySelector('#countdown-404').innerHTML = timeLeft;
//
//         if(timeLeft === 0){
//             clearInterval(cinterval);
//             location.href = '/publicaciones/ultimasPublicaciones'; // index page here
//         }
//     };
//
//     cinterval = setInterval(timeDec, 1000);
// })();

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 50, // Creates a dropdown of 15 years to control year,
    today: 'Hoy',
    clear: 'Limpiar',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
});
