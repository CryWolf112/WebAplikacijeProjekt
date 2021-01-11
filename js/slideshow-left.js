  var slides = document.getElementsByClassName("slide");
  var active = document.getElementsByClassName("act");
  var lastSlide = document.getElementsByClassName("last-slide");
  var timeInterval = 2000;
  var timeoutId = null;
  var clickFreeze = false;
  var clickFreezeInterval = 400;
  var hoverClear = false;
  var mouseHoldTimeoutId;
  var set = 0;
  var unset = slides.length - 1;
  var maxSlides = slides.length - 1;
  
  function limits(){
    if (set > maxSlides){set = 0;}
    if (set < 0){set = maxSlides;}
    
    if (unset > maxSlides){unset = 0;}
    if (unset < 0){unset = maxSlides;}
  }
  
  function next(){
    if (!clickFreeze){

      clickFreeze = true;
      setTimeout(function(){clickFreeze=false;},clickFreezeInterval);

      set++; unset++; limits();
      lastSlide[0].className = lastSlide[0].className.replace(" last-slide", "");
      active[0].className = active[0].className.replace(" act", " last-slide");
      slides[set].className += " act";

      if (hoverClear){
        clearInterval(timeoutId);
        timeoutId = setTimeout(next,timeInterval);
      }
    }
  }
  
  function prev(){
    if (!clickFreeze){

      clickFreeze = true;
      setTimeout(function(){clickFreeze=false;},clickFreezeInterval);

      set--; unset--; limits();
    active[0].className = active[0].className.replace(" act", "");
    lastSlide[0].className = lastSlide[0].className.replace(" last-slide", " act");
    slides[unset].className += " last-slide";
    }
  }

  function hoverActive(){
    hoverClear = false;
    clearInterval(timeoutId);
  }

  function hoverOut(){
    hoverClear = true;
    clearInterval(timeoutId);
    timeoutId = setTimeout(next,timeInterval);
  }

  function mouseHoldNext(){
    next();
    mouseHoldTimeoutId = setTimeout(mouseHoldNext,clickFreezeInterval);
  }

  function mouseHoldPrev(){
    prev();
    mouseHoldTimeoutId = setTimeout(mouseHoldPrev,clickFreezeInterval);
  }

  function mouseHoldOut(){
    clearTimeout(mouseHoldTimeoutId);
  }

  timeoutId = setTimeout(next,timeInterval);
