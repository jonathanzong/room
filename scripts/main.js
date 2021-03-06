'use strict';

navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();

if (navigator.sayswho.toLowerCase().indexOf('chrome') < 0) {
  alert("Please use Chrome for the full interactive experience of ROOM.");
}

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function initOscillatorGainPair() {
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.value = 0;

  oscillator.type = 'sine';  
  oscillator.frequency.value = 440;
  oscillator.detune.value = 100; // cents
  oscillator.start(0);

  return {
    oscillator: oscillator,
    gainNode: gainNode
  };
}

var ogp = initOscillatorGainPair();

var leftArrows = ["&#8592", "&#8604", "&#8606", "&#8610", "&#8612", "&#8617", "&#8619", "&#8668", "&#8672", "&#10094"];
var rightArrows = ["&#8594", "&#8605", "&#8608", "&#8611", "&#8614", "&#8618", "&#8620", "&#8669", "&#8674", "&#10095"];

$(document).ready(function() {
  var sizeHandler = function() {
    $(".nav").width(($(window).width() - $(".scene").width()) / 2 - 20);
  };
  $(window).resize(sizeHandler);
  $(".scene .background").imagesLoaded(sizeHandler);

  var idx = Math.floor(Math.random() * leftArrows.length);
  $(".nav-left > span").html(leftArrows[idx]);
  $(".nav-right > span").html(rightArrows[idx]);

  $(window).on("audio", "play", function() {
    $("audio").not(this).each(function(index, audio) {
        audio.pause();
        $(this).remove();
    });
  });

  $("audio")[0].play();

  $(document).on({
      mouseenter: function () {
        $(this).attr("src", $(this).data("hoverurl"));
        ogp.oscillator.frequency.value = 440 + (Math.random()*300 - 150);
        ogp.gainNode.gain.value = 1;
        setTimeout((function(ogp) {
          ogp.gainNode.gain.value = 0;
        }).bind(undefined, ogp), 200);
      },
      mouseleave: function () {
        $(this).attr("src", $(this).data("imageurl"));
      }
  }, ".interactive");

  var options = {
    prefetch: true,
    cacheLength: 5,
    onStart: {
      duration: 250, // Duration of our animation
      render: function ($container) {
        // Add your CSS animation reversing class
        $container.addClass('is-exiting');
        
        // Restart your animation
        smoothState.restartCSSAnimations();
      }
    },
    onReady: {
      duration: 0,
      render: function ($container, $newContent) {
        // Remove your CSS animation reversing class
        $container.removeClass('is-exiting');
        // Inject the new content
        $container.html($newContent);

      }
    }
  },
  smoothState = $('#smoothstate').smoothState(options).data('smoothState');
});