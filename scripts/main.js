/**
*
*
*
 */
;(function(window) {

	'use strict';

//image background move on header
	window.addEventListener("load", function(){

		var n = 1.19;
		var timesRun = 0;

		document.querySelector(".c-hero-box-image-layer").style.transform = "scale(" + n + ")";

		var interval = setInterval(function(){

			timesRun += 1;

			if(timesRun === 45){
				clearInterval(interval);
				n = 1;
				document.querySelector(".c-hero-box-image-layer").style.transform = "scale(" + n + ")";
			}

			n = Math.random() * 1.1 + 0.9;
			document.querySelector(".c-hero-box-image-layer").style.transform = "scale(" + n + ")";
			//console.log('t: ' + timesRun);

		}, 3900);

		// document.querySelector(".c-hero-box-overlay").
		// addEventListener("mousemove", function (e){

		// 	// var x = (e.clientX/this.clientWidth)*100;
		// 	// var y = (e.clientY/this.clientHeight)*100;
		// 	//document.querySelector(".c-hero-box-image-layer").style.backgroundPosition = x+"% "+y+"%";

		// });
	});

//smooth scroll
	$('a[href*="#"]:not([href="#"])').click(function() {
	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		if (target.length) {
		$('html, body').animate({
			scrollTop: target.offset().top
		}, 1000);
		return false;
		}
	}
	});

})(window);