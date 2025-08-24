// ---------- Splash Screen Logic ----------
const splashScreen = document.getElementById('splash-screen');
const music = document.getElementById('bg-music');
const mainWrap = document.querySelector('.wrap');
const mainFooter = document.querySelector('footer');

splashScreen.addEventListener('click', () => {
  // 1. Play music
  music.play().catch(error => {
    console.error("Lỗi phát nhạc:", error);
  });
  
  // 2. Hide splash screen
  splashScreen.classList.add('hidden');
  
  // 3. Show main content
  mainWrap.classList.add('visible');
  mainFooter.classList.add('visible');
  
}, { once: true });

// ---------- Starfield canvas ----------
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
function resize(){
  canvas.width=innerWidth;
  canvas.height=innerHeight
}

window.addEventListener('resize',resize);resize();
function initStars(){
  stars=[];
  const count=Math.floor((canvas.width*canvas.height)/8000);
  for(let i=0;i<count;i++){
    stars.push({
      x:Math.random()*canvas.width,y:Math.random()*canvas.height,z:Math.random()*1.2+0.2,r:Math.random()*1.2+0.2,s:Math.random()*0.004+0.0005
    })
  }
}initStars();

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(const s of stars){
    s.x += s.s*60;
    if(s.x>canvas.width){
      s.x=0;s.y=Math.random()*canvas.height
    }
    s.r += Math.sin(performance.now()/5000+s.x)*0.002;
    ctx.beginPath();
    ctx.globalAlpha=0.9;
    ctx.fillStyle='white';
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fill()
  }requestAnimationFrame(draw)
}draw();

// ---------- typing effect ----------
const typingTexts = ['Yêu thích lập trình💻👾','Đam mê AI & lập trình ứng dụng',
                    'Sống để học và tạo ra giá trị','UET mãi mãi là số 1 trong ❤️ tôi',
                    'Python 🐍 hay C++ đề chơi được😉'];
let ti=0,ci=0;
const typEl=document.getElementById('typing');
function type(){
  const full=typingTexts[ti];
  typEl.textContent=full.slice(0,ci);
  ci++;
  if(ci>full.length){
    setTimeout(()=>{
      let del=full.length;
      const delInt=setInterval(()=>{
        del--;
        typEl.textContent=full.slice(0,del);
        if(del<=0){
          clearInterval(delInt);
          ti=(ti+1)%typingTexts.length;
          ci=0;setTimeout(type,300);
        } 
      }
      ,40)
    }
    ,900);
  }
  else{
    setTimeout(type,60)
  }
}

setTimeout(type,800);

// ---------- simple reveal on scroll ----------
const reveals=document.querySelectorAll('.reveal');
function checkReveal(){
  const top = window.innerHeight;
  for(const el of reveals){
    const r=el.getBoundingClientRect();
    if(r.top<top-40)el.classList.add('show')
  } 
}

window.addEventListener('scroll',checkReveal);
checkReveal();

// ---------- tilt effect ----------
const card=document.querySelector('.card');
document.addEventListener('mousemove',e=>{
  const rect=card.getBoundingClientRect();
  const x=(e.clientX-rect.left-rect.width/2)/(rect.width/2);
  const y=(e.clientY-rect.top-rect.height/2)/(rect.height/2);
  card.style.transform=`perspective(900px) rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*10).toFixed(2)}deg) translateZ(3px)`;
});
document.addEventListener('mouseleave',()=>card.style.transform='');

// ---------- download HTML button ----------
document.getElementById('downloadBtn').addEventListener('click',()=>{
  const blob = new Blob([document.documentElement.outerHTML],{type:'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); 
  a.href=url; a.download='nguyentudung_portfolio.html'; 
  a.click(); URL.revokeObjectURL(url);
});

