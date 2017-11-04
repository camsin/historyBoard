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
    var images = ['login.jpg', 'plaza.jpg'];
    $('.img-header').css({'background-image': 'url(../../images/' + images[Math.floor(Math.random() * images.length)] + ')'});
});