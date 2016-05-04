"use strict";

$(document).ready(function($) {

  var headerHeight = 123;

  $('.navbar-toggle').click(function() {
    $('.primary-menu').slideToggle("fast");
  });

  //$(document).on('scroll', function() {
  //  if($('.menu-section').css("display")!=='none') {
  //    //$('.menu-section').css('display','none');
  //  }
  //});


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
});