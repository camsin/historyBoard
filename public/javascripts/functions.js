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
