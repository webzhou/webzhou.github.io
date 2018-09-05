$(function(){
	$(".long").on("scroll",function(){
		var _top = $(this).scrollTop();
		console.log(_top);
		if(_top>800){
			$(".im10").fadeIn();
		}
	});
	var kt = document.getElementById("p208");
	kt.addEventListener("webkitAnimationEnd",function(){
		setTimeout(function(){
			$(".p209").show();
		},1200);
		
		setTimeout(function(){
		$(".s2").css({"background":"url(images/p210.png) center top no-repeat","background-size":"100%  100%"})
		$(".s2 .sect-inner").show(function(){
			setTimeout(function(){
				$(".arr").show();
			},1000)
		});
		},4200)
	});
});