/**
*
*
*
 */
;(function(window) {

	'use strict';

//image background move on header


	var headerMain = document.querySelector(".c-hero-box");
	var headerImg = document.getElementsByClassName("c-intro-photo");



	window.addEventListener("load", function(){

		// headerMain.addEventListener("mousemove", function(event){
		// 	var x = event.clientX / $(window).width() - 0.5;
		// 	var y = event.clientY / $(window).height() - 0.5;

		// 	console.log('x: ' + x);
		// 	console.log('y: ' + y);

		// 	TweenLite.to(headerImg, 0.6, {
		// 		rotationY: 20 * x,
		// 		rotationX: 10 * y,
		// 		ease: Power1.easeOut,
		// 		transformPerspective: 400,
		// 		transformOrigin: "center"
		// 	});
		// });

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

			n = Math.random() * 1.1 + 1;
			document.querySelector(".c-hero-box-image-layer").style.transform = "scale(" + n + ")";
			//console.log('t: ' + timesRun);

		}, 3900);

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