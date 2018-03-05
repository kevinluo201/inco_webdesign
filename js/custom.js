//NAV
function nav(){
    $("#menu").click(function(){
        $("nav").css("display", "block");;
    });
    $("#menuon").click(function(){
        $("nav").css("display", "none");;
    });
}

$(document).ready(function(){
    nav();
});


