$(function() {
  // owl carousel script starts
  if ($("#main-banner-carousel").length) {
    $("#main-banner-carousel").owlCarousel({
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplaySpeed: 2000,
      autoplayHoverPause: true,
      autoWidth: false,
      dots: true,
      margin: 0,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1
        },
        320: {
          items: 1
        }
      }
    });
  }

  // scroll header script here
  window.onscroll = function() {
    scrollHeader();
  };
  // Get the header
  var header = $(".navbar-bottom-menu");
  var body = $("body");
  function scrollHeader() {
    // adding sticky class
    if (window.pageYOffset > 105) {
      $(header).addClass("sticky");
    } else {
      // removing sticky class
      $(header).removeClass("sticky");
    }
  }

  // navbar toggler script
  $(".navbar-toggler").on("click", function() {
    $(".collapse").toggleClass("show");
    $("body").toggleClass("layer-open");
    // $(header).toggleClass("sticky-not");
    $(".navbar-close").show();
  });
  $(".navbar-close").on("click", function() {
    $(".collapse").toggleClass("show");
    $(".navbar-close").hide();
    $("body").toggleClass("layer-open");
    // $(header).toggleClass("sticky-not");
    $(".dark-overlay").click(function() {
      $(".collapse").removeClass("show");
      $("body").removeClass("layer-open");
    });
  });
});


const isHidden = localStorage.getItem('logHidden') && localStorage.getItem('logHidden') === 'true';
document.getElementById('logger').ariaHidden = isHidden;
document.getElementById('logger-button').innerText = isHidden ? 'Show logs' : 'Hide logs';

document.getElementById('logger-button').addEventListener('click', (e) => {
  const loggerElement = document.getElementById('logger');
  const newState = !(loggerElement.ariaHidden === 'true');
  loggerElement.ariaHidden = newState;
  e.target.innerText = newState ? 'Show logs' : 'Hide logs';
  localStorage.setItem('logHidden', loggerElement.ariaHidden);
})

document.getElementById('kam-visit-generator').addEventListener('click', (e) => {
  document.cookie = "kameleoonVisitorCode=;expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.sdk-nodejs-sandbox.herokuapp.com";
  localStorage.removeItem('kameleoonVisitorCode');
  console.log(document.cookie);
  console.log(localStorage.getItem('kameleoonVisitorCode'));
  window.location.reload();
})