$(document).ready(function(){

/** ===========================================
    Hide / show the master navigation menu
============================================ */

  // console.log('Window Height is ' + $(window).height());
  // console.log('Document Height is' + $(document).height());

  var previousScroll = 0;
  var tolerance = 0;
  var upTolerance = 0;
  var intervalShow;
  var intervalHide;
  $(window).scroll(function(){
    var currentScroll = $(this).scrollTop();

    if (currentScroll > 300 && currentScroll < $(document).height() - $(window).height()){
      // console.log("currentScroll in if: ",$(this).scrollTop() +" previous scroll in if: ",previousScroll)
      /*
        If the current scroll is greater than the previous scroll (i.e we're scrolling down the page), hide the nav.
      */
      if (currentScroll > previousScroll ){
        tolerance++;
        if (tolerance >= 30) {
          intervalShow = window.setTimeout(showNav, 1);
          tolerance = 0;
        }
        upTolerance = 0;
      } 
      else {
          upTolerance++;
          if (upTolerance >= 10) {
            intervalHide = window.setTimeout(hideNav, 1);
            upTolerance = 0;
          }
       
       tolerance = 0;
      }
      previousScroll = currentScroll;
    }
    else{
      intervalShow = window.setTimeout(showNav, 1);
    }
      previousScroll = currentScroll;

  });
  function hideNav() {
    $("#collapsable-nav").addClass("navbar-fixed-top");
    $(".navbar-toggle").addClass("fixed");
    clearTimeout(intervalHide);    
  }

  function showNav() {
    $("#collapsable-nav").removeClass("navbar-fixed-top");
    $(".navbar-toggle").removeClass("fixed");
    clearTimeout(intervalShow);
    // var screenWidth = window.innerWidth;
    //   if (screenWidth < 768) {
    //   $("#collapsable-nav").collapse('hide');
    // }
  }
});
