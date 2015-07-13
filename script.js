(function(){

  // ELEMENTS

  var logo = document.querySelector('#logo');
  var sqr = document.querySelector('#sqr');
  var boxes = document.querySelectorAll('.box');

  var output = document.querySelector('#volume');
  var range = document.querySelector('#fader');
  var progressEl = document.querySelector('progress');

  console.log(progressEl);
  
  var playBtn = document.querySelector('#playBtn');
  var reverseBtn = document.querySelector('#reverseBtn');
  var restartBtn = document.querySelector('#restartBtn');

  var chars = document.querySelectorAll('path');
  var one = document.querySelector('path');
  

  // VARS

  var oneLength = one.getTotalLength();
  var scrubbing = false;
  var progress = 0;


  // HELPER

  var updateOthers = function(percent){
    progressEl.value = percent*100;
    
    chars[1].style.strokeDasharray = chars[1].getTotalLength() + 'px, '+ chars[1].getTotalLength() + 'px';
    chars[1].style.strokeDashoffset = (chars[1].getTotalLength()+chars[1].getTotalLength()*percent).toString();
    chars[2].style.strokeDasharray = chars[2].getTotalLength() + 'px, '+ chars[2].getTotalLength() + 'px';
    chars[2].style.strokeDashoffset = (chars[2].getTotalLength()+chars[2].getTotalLength()*percent).toString();
  };


  // TIMELINE

  var tl = new TimelineMax({ onUpdate:function(){
    if(!scrubbing) {
      progress = tl.progress();
      range.value = progress * 100;
      output.value = Math.round(progress * 100);
      updateOthers(progress);
    }
  }});

  tl.from(logo, 0.5, {
    width: 0,
    opacity: 0,
    ease: Ease.easeOut
  }).from(sqr, 0.5, {
    opacity: 0,
    transform: 'rotate(-140deg)',
    width: 0,
    height: 0,
    ease: Circ.easeOut
  }).staggerFrom(boxes, 0.4,  {
    scale:0,
    opacity:0.3,
    ease: Power2.easeOut
  }, 0.04)
  .to(one, 3, {
    strokeDashoffset: oneLength*2,
    ease: Power1.easeOut
  });



  // EVENTLISTENERS

  range.addEventListener('input', function(e){
    var percent = e.target.valueAsNumber/100;
    output.value = e.target.value;

    updateOthers(percent);

    tl.progress(percent).pause();
  });
  
  range.addEventListener('mousedown', function(){ scrubbing = true; });
  range.addEventListener('mouseup', function(){ scrubbing = false; });

  playBtn.addEventListener('click', function(){
    tl.play();
  });
  reverseBtn.addEventListener('click', function(){
    tl.reverse();
  });
  restartBtn.addEventListener('click', function(){
    tl.restart();
  });

}());
