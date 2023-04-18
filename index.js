//nao ta controlando volume
  //1-botar audio pelo html
  //2-seletor em cada audio pra uma const
  


let IDtimeout // retorno do settimeout
const maxMin=95 
let playOn=false

let drag = false
//var para as cores
let corBack, corFont, corSlider,  corSliderSel
let corBacksel, corFontsel, corBody, corCtrOff

//botoes timer
const butplay=document.querySelector('.play')
const butstop=document.querySelector('.stop')
const butincrement=document.querySelector('.increment')
const butdecrement=document.querySelector('.decrement')
//display do timer
const minDisplay=document.querySelector('.minutes')
const secDisplay=document.querySelector('.seconds')
const twoPoints=document.querySelector('.twoPoints')

let minIni= Number(minDisplay.textContent)

//cores light/dark mode
const timerCor=document.querySelector('.timer')
const bodyTag=document.querySelector('body')
const iconLight=document.querySelector('.iconLight')
const iconDark=document.querySelector('.iconDark')
const corPlay=document.querySelector('.corPlay')
const corStop=document.querySelector('.corStop')
const corInc=document.querySelector('.corInc')
const corDec=document.querySelector('.corDec')

//
const somCards=[ 
  { Card:document.querySelector('.treeCard'),
    CorF:document.querySelector('.treeCorF0'),
    CorB:document.querySelector('.treeCorB0'),
    slider:document.getElementById("treeInput"),// slider do input range
    slider2:document.getElementById("treeInput2"),// slider do input range
    Song:new Audio("./sons/Floresta.wav"),
    noSelect: true,},

  { Card:document.querySelector('.rainCard'),
    CorF:document.querySelector('.rainCorF1'),
    CorB:document.querySelector('.rainCorB1'),
    slider:document.getElementById("rainInput"),
    slider2:document.getElementById("rainInput2"),
    Song:new Audio("./sons/Chuva.wav"),
    noSelect: true,},

  { Card:document.querySelector('.coffeeCard'),
    CorF:document.querySelector('.coffeeCorF2'),
    CorB:document.querySelector('.coffeeCorB2'),
    slider:document.getElementById("coffeeInput"),
    slider2:document.getElementById("coffeeInput2"),
    Song:new Audio("./sons/Cafeteria.wav"),
    noSelect: true,},

  { Card:document.querySelector('.fireCard'),
    CorF:document.querySelector('.fireCorF3'),
    CorB:document.querySelector('.fireCorB3'),
    slider:document.getElementById("fireInput"),
    slider2:document.getElementById("fireInput2"),
    Song:new Audio("./sons/Lareira.wav"),
    noSelect: true,
  }
]



butplay.addEventListener('click', function() {
  if(!playOn){
    playOn=true
    CorControls()
    Faciona()
  }
})

butstop.addEventListener('click', function() {
  clearTimeout(IDtimeout)
  Fchangewatch(minIni,0)
  playOn=false;
  CorControls()  
})

butincrement.addEventListener('click', function() {
  let mn=Number(minDisplay.textContent)
  if(!playOn){Fsetmin(mn+=5)}
 })

 butdecrement.addEventListener('click', function() {
  let mn=Number(minDisplay.textContent)
  if(!playOn){ Fsetmin(mn-=5)}
 })

 //============== funcoes do timer =====================================
function Fsetmin(min){
  if (min>maxMin) {min=0} 
  else {if(min<0){min=maxMin } }
  Fchangewatch(min,0)
  minIni=min
}
  
function Fchangewatch(min,sec){
  secDisplay.textContent=String(sec).padStart(2,"0")
  minDisplay.textContent=String(min).padStart(2,"0")
}
  
function Faciona(){
  IDtimeout=setTimeout(function(){
    let ss= Number(secDisplay.textContent)
    let mn=Number(minDisplay.textContent)

    if ((mn+ss)<=0){
      Fchangewatch(minIni,0); playOn=false
      CorControls('#323238')
      return
    }
    
    if(ss<=0 && mn>0){--mn;  ss=60} 
    --ss
    Fchangewatch(mn,ss)
    Faciona()
  },1000)
}
  


//========= som cards ======================================
let modeType='light'
let butClick, nBt

const elementos = document.querySelectorAll(".svgcard")

lightDark(modeType) 

elementos.forEach(elem => {elem.addEventListener("click",clicked)})  

function clicked(obj){
  butClick=obj.target.className.baseVal //pega o nome da classe do elemento clicado
  nBt=Number(String(butClick).slice(-1)) //pega o ultimo caracter do nome da classe, que é o numero do card
 
  for(let i = 0; i < elementos.length; i++){
    if(i==nBt && somCards[i].noSelect){
      
      somCards[i].slider.classList.add('hide')
      somCards[i].slider2.classList.remove('hide')
      
      somCards[i].slider2.addEventListener("input",//!ISSO AQUI NAO TA FUNCIONANDO
       function(){somCards[i].Song.volume = this.value }  ) 

      
      somCards[i].slider2.setAttribute('max','1')
      // somCards[i].slider2.setAttribute('min','0')
      somCards[i].slider2.value=0.5
      somCards[i].slider2.style.cursor='pointer'
      
      somCards[i].CorF.setAttribute("fill",corFontsel)
      somCards[i].CorB.setAttribute("fill",corBacksel)
      somCards[i].Song.play()
      somCards[i].Song.loop=true
      somCards[i].Song.volume=0.5
      somCards[i].noSelect=false 
    }else{
      somCards[i].slider.classList.remove('hide')
      somCards[i].slider2.classList.add('hide')
      somCards[i].slider.setAttribute('max','0')
      somCards[i].slider.value=0
      somCards[i].slider.style.cursor='auto'
     
     somCards[i].CorF.setAttribute("fill",corFont)
     somCards[i].CorB.setAttribute("fill",corBack)
     somCards[i].Song.pause()
     somCards[i].Song.pause()
     somCards[i].noSelect=true
    }
  }
}
      
//=========== rotinas Light e Dark mode ===========================
 iconDark.addEventListener('click', function() {
  iconDark.classList.add('hide')
  iconLight.classList.remove('hide')
  lightDark('light')
})

iconLight.addEventListener('click', function() {
  iconLight.classList.add('hide')
  iconDark.classList.remove('hide')
  lightDark('dark')
})

 //------------- padrao de cores para Dark e Light ---------------------------------
function lightDark(mode){
  modeType=mode
  if(mode=='dark'){ 
    corBack='#29292E'
    corFont='#C4C4CC'
    corBacksel='#0A3442'
    corFontsel='#C4C4CC'
    corCtrOff='#323238'
    corSlider='white'
    corBody='black'

    setaCores()
  }else{
    corBack='#E1E1E6'
    corFont='#323238'
    corBacksel='#02799d'
    corFontsel='white'
    corBody='white'
    corCtrOff='#c0c0c0'
    corSlider=corFont
    setaCores() 
  }
  bodyTag.style.background=corBody
  timerCor.style.color=corFont
  minDisplay.style.color=corFont
  twoPoints.style.color=corFont
  secDisplay.style.color=corFont
  CorControls()
}

//------Atrubui cor aos controls--------------------
function CorControls(){
  let cor=corFont
  if(playOn){cor=corCtrOff}
  corPlay.setAttribute('fill',cor)
  corStop.setAttribute('fill',corFont)
  corInc.setAttribute('fill',cor)
  corDec.setAttribute('fill',cor)
  // minDisplay.setAttribute('fill',white)//!aqui merda
}

//----- Atribui cor aos Cards --------------------------
function setaCores(){
  for(let i = 0; i < elementos.length; i++){
    if(somCards[i].noSelect){
      somCards[i].slider.style.background=corSlider
      somCards[i].CorF.setAttribute("fill",corFont)
      somCards[i].CorB.setAttribute("fill",corBack)
    }else{
      somCards[i].slider.style.background=corSlider
      somCards[i].CorF.setAttribute("fill",corFontsel)
      somCards[i].CorB.setAttribute("fill",corBacksel)  
    }
  }
}
//==================== fim dark light mode ===========================

