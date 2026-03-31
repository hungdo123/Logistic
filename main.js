// LANGUAGE SWITCHER
var currentLang='vi';
function switchLang(lang){
  currentLang=lang;
  document.getElementById('langVi').classList.toggle('active',lang==='vi');
  document.getElementById('langEn').classList.toggle('active',lang==='en');
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-'+lang+']').forEach(function(el){
    var val=el.getAttribute('data-'+lang);
    if(!val) return;
    var svg=el.querySelector('svg');
    var sp=el.querySelector('span');
    if(svg && sp){sp.textContent=val}
    else if(el.tagName==='INPUT'){el.placeholder=val}
    else{el.innerHTML=val}
  });
}

// REVIEW SLIDER (only on pages that have it)
(function(){
  var track=document.getElementById('sliderTrack');
  if(!track) return;
  var cards=track.querySelectorAll('.review-card'),dotsWrap=document.getElementById('sliderDots'),total=cards.length,current=0,interval;
  for(var i=0;i<total;i++){var d=document.createElement('button');d.className='slider-dot'+(i===0?' active':'');(function(idx){d.addEventListener('click',function(){goTo(idx);resetAuto()})})(i);dotsWrap.appendChild(d)}
  function gap(){return window.innerWidth<=640?14:24}
  function cw(){return cards[0].offsetWidth+gap()}
  function goTo(idx){current=idx;track.style.transform='translateX(-'+idx*cw()+'px)';for(var j=0;j<total;j++)cards[j].classList.toggle('active',j===idx);var dots=dotsWrap.querySelectorAll('.slider-dot');for(var j=0;j<dots.length;j++)dots[j].classList.toggle('active',j===idx)}
  function next(){goTo((current+1)%total)}
  function startAuto(){interval=setInterval(next,3500)}
  function resetAuto(){clearInterval(interval);startAuto()}
  goTo(0);startAuto();
  track.addEventListener('mouseenter',function(){clearInterval(interval)});
  track.addEventListener('mouseleave',startAuto);
  window.addEventListener('resize',function(){goTo(current)});
})();

// BACK TO TOP
var btt=document.getElementById('btt');
if(btt){window.addEventListener('scroll',function(){btt.classList.toggle('show',window.scrollY>400)})}

// MOBILE NAV CLOSE ON LINK CLICK
document.querySelectorAll('.nav-menu a').forEach(function(a){
  a.addEventListener('click',function(){document.getElementById('navMenu').classList.remove('show')});
});
