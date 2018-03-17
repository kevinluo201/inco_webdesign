//NAV
function nav(){
    $("#menu").click(function(){
        $("nav").css("display", "block");;
    });
    $("#menuon").click(function(){
        $("nav").css("display", "none");;
    });
}

function album(){
	$(".small img").click( function(){
		var NN = $(this).index();
		$(".banner img").eq(NN).fadeIn(800).siblings().fadeOut(800);
	});
}

function carousel(){
    $(".carousel").carousel();
    $(".carousel02").carousel();
}

$(document).ready(function(){
    nav();
    album();
    carousel();
});


