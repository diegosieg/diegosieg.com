$(function(){
     'use strict';
  $(".about-l").click(function() {
    $("body").animate({
     scrollTop: $("#slide2").offset().top
   }, 2000);
  });
  $(".social-l").click(function() {
    $("body").animate({
     scrollTop: $("#slide3").offset().top
   }, 2000);
  });
  $(".port-l").click(function() {
    $("body").animate({
     scrollTop: $("#slide4").offset().top
   }, 2000);
  });
  $(".resea-l").click(function() {
    $("body").animate({
     scrollTop: $("#slide5").offset().top
   }, 2000);
  });
  $(".cont-l").click(function() {
    $("body").animate({
     scrollTop: $("#contact").offset().top
   }, 2000);
  });
  $(".topo-l").click(function() {
    $("body").animate({
     scrollTop: $("#header-top").offset().top
   }, 2000);
  });
});
