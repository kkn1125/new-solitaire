var j=Object.defineProperty;var B=(n,e,t)=>e in n?j(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var c=(n,e,t)=>(B(n,typeof e!="symbol"?e+"":e,t),t),J=(n,e,t)=>{if(!e.has(n))throw TypeError("Cannot "+t)};var m=(n,e,t)=>{if(e.has(n))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(n):e.set(n,t)};var u=(n,e,t)=>(J(n,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();var T,R;class Q{constructor(e,t){m(this,T);c(this,"solitaire");c(this,"renderer");u(this,T,R).call(this),this.solitaire=e,this.renderer=t}handleRandomTheme(e){const i=e.target.closest("#theme");i&&i.id==="theme"&&(this.solitaire.nextTheme(),this.renderer.update())}removeAllListeners(){window.removeEventListener("click",this.handleSelectCard.bind(this)),window.removeEventListener("click",this.handleDeckToPick.bind(this)),window.removeEventListener("click",this.handleRestartGame.bind(this)),window.removeEventListener("resize",this.handleResize.bind(this))}handleAutoComplete(e){const t=this,i=e.target;if(i.id!=="auto-complete")return;this.renderer.active_auto_complete=!0,this.renderer.auto_complete=!1,i.remove();function s(){const o=t.solitaire.ground.filter(r=>r.length);for(let r=0;r<o.length;r++){const d=o[r],p=d.slice(-1)[0];if(p){const a=t.solitaire.stack[p.type];if(a.length===0&&d.slice(-1)[0].number===1){const l=d.splice(-1)[0];l.updateColumn(-1),l.updateState("stack"),a.push(l),t.renderer.update()}else if(a.slice(-1)[0]&&a.slice(-1)[0].number+1===p.number){const l=d.splice(-1)[0];l.updateColumn(-1),l.updateState("stack"),a.push(l),t.renderer.update()}else continue}else continue}o.some(r=>r.length>0)?setTimeout(()=>{s()},100):(t.renderer.active_auto_complete=!1,t.renderer.auto_complete=!1)}s()}handleResize(){innerWidth>768?this.renderer.update():this.renderer.update()}handleRestartGame(e){e.target.id==="restart"&&this.renderer.regame()}convertElToCard(e){return this.solitaire.deck[e.dataset.cardType].find(t=>t.number===Number(e.dataset.cardNumber))}handleDeckToPick(e){const t=e.target;if(t&&t.closest("#deck")){const s=this.solitaire.store;if(s.length>0){const o=s.shift();o.updateState("pick"),o.open(),this.solitaire.pick.push(o),this.renderer.soundPick()}else this.solitaire.store.push(...this.solitaire.pick.splice(0).map(o=>(o.isOpen=!1,o.updateColumn(-1),o.updateState("deck"),o))),this.renderer.soundShuffle();this.renderer.update()}}handleSelectCard(e){const t=e.target;if(document.querySelectorAll(".card").forEach(i=>{const s=i.dataset.cardType,o=Number(i.dataset.cardNumber),r=this.solitaire.deck[s].find(d=>d.number===o);r&&(r.selected=!1,i.classList.remove("selected"))}),t){const i=t.closest(".empty"),s=this.solitaire.selector,o=this.solitaire.mode==="development";if(i&&s[0]!==null&&(o||s[0][0].number===13)){const r=t.parentElement,p=[...r.parentElement.children].findIndex(a=>a===r);console.log("good"),this.solitaire.countUpMove(),this.solitaire.moveToColumn(s[0],p),this.renderer.update(),this.renderer.soundPick()}else i&&s[0]!==null&&(o||s[0][0].number!==13)&&console.log("bad");if(t.closest(".card")){const r=t.closest(".card"),d=r.dataset.cardType,p=Number(r.dataset.cardNumber),a=this.solitaire.deck[d].find(l=>l.number===p);if(r.dataset.cardOpen==="true")if(a.selected)a.selected=!1;else if(s[0]===null){const l=r.dataset.cardState,D=r.parentNode,V=Array.from(D.children).slice(-1)[0];if((l==="ground"||l==="pick"||l==="stack")&&V===r){if(this.solitaire.isStackDirectly(a)){this.solitaire.clearSelector(),a.selected=!1,r.classList.remove("selected"),this.solitaire.countUpScore(),this.renderer.update(),this.renderer.soundPick(),this.solitaire.getCardInStacks().length>0&&(this.solitaire.compareDeck[0]<this.solitaire.getCardInStacks().length?(this.solitaire.compareDeck[0]=this.solitaire.getCardInStacks().length,this.solitaire.compareDeck[1]=this.solitaire.compareDeck[0]):this.solitaire.compareDeck[1]=this.solitaire.getCardInStacks().length);return}a.selected=!0,s[0]=[a]}else if(l==="ground"){const A=Array.from(D.children).filter(v=>v.classList.contains("card")).map(this.convertElToCard.bind(this)),G=A.findIndex(v=>v.type===a.type&&v.number===a.number);if(G>-1){const v=A.slice(G);v.forEach(Y=>Y.selected=!0),s[0]=v}}}else if(s[1]===null&&a.state==="ground"){s[1]=a;const l=this.solitaire.compareWith(s[0][0],s[1]);Array.from(r.parentElement.children).slice(-1)[0]===r&&(l?(console.log("good"),this.solitaire.countUpMove(),this.solitaire.moveToColumn(s[0],s[1].column),this.renderer.soundPick()):console.log("bad")),this.solitaire.clearSelector(),a.selected=!1,r.classList.remove("selected")}else this.solitaire.clearSelector(),a.selected=!1,r.classList.remove("selected");this.renderer.update()}else this.solitaire.clearSelector()}}}T=new WeakSet,R=function(){window.addEventListener("click",this.handleAutoComplete.bind(this)),window.addEventListener("click",this.handleSelectCard.bind(this)),window.addEventListener("click",this.handleDeckToPick.bind(this)),window.addEventListener("click",this.handleRestartGame.bind(this)),window.addEventListener("click",this.handleRandomTheme.bind(this)),window.addEventListener("resize",this.handleResize.bind(this))};const h={TYPES:["heart","diamond","spade","clover"],SHAPE:{heart:"♥",diamond:"◆",spade:"♠",clover:"♣"},TAG:{1:"A",2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:"J",12:"Q",13:"K"},AMOUNT:13},_=document.querySelector("#app"),z=()=>document.querySelector("#ground"),X=()=>document.querySelector("#stack"),N=()=>document.querySelector("#pick"),S=()=>document.querySelector("#deck"),H=()=>document.querySelector("#timer"),Z=()=>document.querySelector("#move"),ee=()=>document.querySelector("#score"),te=()=>document.querySelector("#auto-complete"),se=(n,e)=>`/new-solitaire/cards/${n}_${e}.png`,ie=n=>{const e=Math.floor(n*10/60)%60,t=Math.floor(n*10)%60;return`${e.toString().padStart(2,"0")}:${t.toString().padStart(2,"0")}`},re=`<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg fill="currentColor" height="100%" width="100%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 325.04 325.04" xml:space="preserve" stroke="currentColor">
<g>
	<path d="M84.821,210.938c-4.646-3.671-10.469-5.693-16.396-5.693c-8.055,0-15.556,3.579-20.58,9.821
		c-4.393,5.464-6.382,12.3-5.598,19.247c0.785,6.962,4.258,13.198,9.778,17.561c4.646,3.672,10.467,5.694,16.393,5.694
		c8.061,0,15.563-3.586,20.583-9.834c4.389-5.455,6.376-12.283,5.595-19.227C93.813,221.545,90.342,215.305,84.821,210.938z
		 M79.648,240.215c-2.732,3.402-6.826,5.354-11.23,5.354c-3.283,0-6.379-1.075-8.951-3.108c-2.991-2.364-4.871-5.735-5.296-9.493
		c-0.422-3.743,0.652-7.431,3.023-10.379c2.733-3.396,6.827-5.344,11.231-5.344c3.286,0,6.383,1.075,8.954,3.107
		c2.99,2.364,4.869,5.737,5.292,9.497C83.092,233.589,82.02,237.269,79.648,240.215z"/>
	<path d="M190.33,149.484c3.958,0,7.785-0.867,11.384-2.582c6.362-3.044,11.141-8.369,13.454-14.995
		c2.301-6.584,1.887-13.669-1.163-19.944c-4.363-8.994-13.681-14.806-23.738-14.806c-3.966,0-7.801,0.87-11.399,2.587
		c-6.36,3.034-11.141,8.355-13.458,14.983c-2.305,6.589-1.892,13.675,1.163,19.953C170.95,143.673,180.275,149.484,190.33,149.484z
		 M176.736,118.688c1.254-3.585,3.846-6.467,7.298-8.114c1.972-0.94,4.068-1.417,6.232-1.417c5.491,0,10.571,3.157,12.943,8.048
		c1.645,3.384,1.868,7.199,0.63,10.745c-1.253,3.587-3.848,6.473-7.296,8.123c-1.965,0.937-4.056,1.411-6.214,1.411
		c-5.496,0-10.586-3.162-12.968-8.055C175.718,126.05,175.496,122.236,176.736,118.688z"/>
	<path d="M125.035,107.081c1.93,0.436,3.905,0.657,5.87,0.657c12.352,0,22.905-8.354,25.665-20.327
		c1.551-6.789,0.358-13.778-3.356-19.682c-3.745-5.95-9.598-10.086-16.476-11.644c-1.938-0.44-3.921-0.664-5.895-0.664
		c-12.344,0-22.886,8.363-25.637,20.334c-1.564,6.784-0.379,13.774,3.336,19.682C112.29,101.395,118.149,105.531,125.035,107.081z
		 M116.901,78.447c1.491-6.491,7.225-11.025,13.942-11.025c1.079,0,2.168,0.123,3.239,0.366c3.752,0.85,6.939,3.099,8.975,6.333
		c2.006,3.187,2.65,6.957,1.816,10.605c-1.471,6.381-7.346,11.012-13.969,11.012c-1.076,0-2.161-0.122-3.229-0.363
		c-3.753-0.845-6.94-3.092-8.975-6.326C116.698,85.864,116.059,82.1,116.901,78.447z"/>
	<path d="M77.356,122.05c5.514-4.369,8.981-10.61,9.765-17.573c0.781-6.942-1.202-13.77-5.593-19.235
		c-5.032-6.239-12.539-9.817-20.594-9.817c-5.921,0-11.738,2.016-16.385,5.681c-5.515,4.356-8.984,10.587-9.771,17.545
		c-0.786,6.951,1.202,13.791,5.601,19.265c5.028,6.246,12.536,9.829,20.6,9.829C66.905,127.744,72.722,125.722,77.356,122.05z
		 M49.731,110.393c-2.376-2.956-3.451-6.648-3.027-10.396c0.424-3.753,2.302-7.119,5.282-9.474c2.571-2.028,5.666-3.1,8.949-3.1
		c4.408,0,8.511,1.95,11.246,5.341c2.365,2.946,3.437,6.629,3.016,10.37c-0.423,3.764-2.303,7.142-5.292,9.51
		c-2.559,2.027-5.646,3.099-8.925,3.099C56.567,115.744,52.467,113.792,49.731,110.393z"/>
	<path d="M322.745,63.336c-1.037-1.046-2.887-2.293-5.806-2.293c-3.423,0-12.516,0-67.74,46.992c-1.11,0.944-2.23,1.901-3.354,2.865
		c-9.867-25.739-27.203-48.686-49.542-65.284c-25.614-19.031-56.114-29.096-88.2-29.104c-0.01,0-0.017,0-0.025,0
		c-21.654,0-47.976,7.566-68.697,19.749C13.981,51.193-0.005,71.163,0,92.49c0.008,25.748,14.53,36.518,26.199,45.171
		c9.515,7.057,17.03,12.63,17.034,24.844c0.003,12.213-7.508,17.781-17.018,24.831c-11.665,8.648-26.184,19.412-26.176,45.163
		c0.006,21.324,14.001,41.299,39.406,56.244c20.736,12.198,47.072,19.78,68.73,19.786c0.015,0,0.028,0,0.042,0
		c39.305,0,76.254-15.171,104.044-42.72c27.436-27.197,42.695-63.246,43.096-101.661c9.316-10.601,18.341-21.138,26.58-31.067
		c14.096-16.986,24.935-31.002,32.216-41.657C323.799,77.311,328.023,68.655,322.745,63.336z M203.814,257.287
		c-25.529,25.308-59.475,39.242-95.596,39.242c-0.011,0-0.027,0-0.038,0c-38.707-0.011-96.13-26.903-96.141-64.034
		c-0.006-19.707,10.354-27.388,21.323-35.52c10.253-7.602,21.874-16.218,21.87-34.474c-0.006-18.253-11.63-26.874-21.886-34.479
		C22.372,119.883,12.006,112.196,12,92.487c-0.005-22.801,20.963-38.533,33.463-45.882c18.698-10.993,43.273-18.094,62.615-18.094
		c0.007,0,0.015,0,0.021,0c29.491,0.008,57.517,9.254,81.048,26.736c21.702,16.125,38.268,38.761,46.994,64.049
		c-26.025,22.724-54.207,48.924-75.195,69.98c-34.859,4.512-39.608,27.744-43.08,44.811c-2.956,14.532-4.875,21.558-16.092,22.458
		c-2.764,0.222-5.015,2.308-5.446,5.047c-0.432,2.738,1.069,5.416,3.631,6.477c0.721,0.298,17.877,7.308,37.921,7.309
		c0.003,0,0.005,0,0.007,0c13.968,0,25.95-3.386,35.612-10.063c11.906-8.228,19.979-21.273,24.036-38.767
		c13.713-13.874,29.382-30.604,44.876-47.837C238.845,208.381,225.456,235.833,203.814,257.287z M185.48,225.412
		c-6.358,25.196-22.356,37.968-47.594,37.967c0,0-0.004,0-0.006,0c-6.655,0-13.028-0.908-18.386-2.04
		c6.4-6.527,8.399-16.349,10.13-24.858c3.297-16.208,6.415-31.547,31.923-35.191L185.48,225.412z M268.336,130.652
		c-23.785,28.337-52.575,60.159-76.275,84.354l-3.669-3.698l-16.189-16.317c21.488-21.39,49.054-46.895,74.773-69.216l0,0
		c2.998-2.602,5.977-5.171,8.913-7.675c29.847-25.455,45.489-36.533,53.468-41.354C304.592,84.773,293.616,100.534,268.336,130.652z
		"/>
</g>
</svg>`,oe=n=>new DOMParser().parseFromString(n,"text/html").body.children[0],ne={palette:oe(re)},U=()=>innerWidth>768,I=()=>U(),M=n=>I()?`background-image: url('${n.image}');`:"",E=n=>`${I()?"<!--":""}
  <div class="card-top">
    <span>
      ${h.SHAPE[n.type]}
    </span>
    <span>
      ${h.TAG[n.number]}
    </span>
  </div>
  <div class="card-mid">
    ${h.SHAPE[n.type]}
  </div>
  <div class="card-bottom">
    <span>
      ${h.SHAPE[n.type]}
    </span>
    <span>
      ${h.TAG[n.number]}
    </span>
  </div>
  ${I()?"-->":""}`;class ce{constructor(e){c(this,"solitaire");c(this,"timer");c(this,"auto_complete",!1);c(this,"active_auto_complete",!1);this.solitaire=e}renderTimer(){clearInterval(this.timer);let e=0;H().innerHTML="00:00",this.startTimer(e)}startTimer(e){this.timer=setInterval(()=>{const t=ie(e+=.1);H().innerHTML=`${t}`},1e3)}layout(){_.innerHTML=`
      <div id="top-bar">
        <div></div>
        <div id="options">
          <div id="score" class="shape" data-game-score="0"></div>
          <div id="timer" class="shape"></div>
          <div id="move" class="shape" data-game-move="0"></div>
        </div>
        <button id="theme">
          ${ne.palette.outerHTML}
        </button>
      </div>
      <div id="wrapper">

        <div id="top">

          <div id="pick-deck">
            <div id="deck">
              <div class="empty"></div>
              <div class="back"></div>
            </div>

            
            <div id="pick">
              <div class="empty"></div>
            </div>
            
            <div class="gap"></div>
          </div>

          <div id="stack">
          
            <div id="diamond-stack">
              <div class="empty"></div>
            </div>
            <div id="heart-stack">
              <div class="empty"></div>
            </div>
            <div id="spade-stack">
              <div class="empty"></div>
            </div>
            <div id="clover-stack">
              <div class="empty"></div>
            </div>
          
          </div>

        </div>


        <div id="body">
        
          <div id="ground">
          
            <div class="column">
              <div class="empty"></div>
            </div>

            <div class="column">
              <div class="empty"></div>
            </div>

            <div class="column">
              <div class="empty"></div>
            </div>

            <div class="column">
              <div class="empty"></div>
            </div>

            <div class="column">
              <div class="empty"></div>
            </div>

            <div class="column">
              <div class="empty"></div>
            </div>

            <div class="column">
              <div class="empty"></div>
            </div>

          
          </div>

        </div>


      </div>
      <button id="restart">Solitaire!</button>
    `}ground(){return this.solitaire.ground.forEach((t,i)=>{z().children[i].innerHTML='<div class="empty"></div>',z().children[i].innerHTML+=t.map((s,o)=>this.groundCardForm(s,o)).join("")})}stack(){const e=this.solitaire.stack,t='<div class="empty"></div>',i=s=>X().querySelector(`#${s}-stack`);Object.entries(e).some(s=>s[1].length>0)&&Object.entries(e).forEach(([s,o])=>{i(s).innerHTML=t,o.forEach((r,d)=>{i(r.type).innerHTML+=this.stackCardForm(r,d)})})}pick(){const e=this.solitaire.pick.slice(-3);return N().innerHTML='<div class="empty"></div>',e.forEach((t,i)=>{N().innerHTML+=this.pickCardForm(t,i)})}render(){this.layout(),this.renderTimer(),this.update()}update(){this.theme(),this.ground(),this.pick(),this.stack(),this.isEmptyDeck(),this.move(),this.score(),this.checkAutoStack(),this.active_auto_complete||this.auto_complete&&!te()&&(_.innerHTML+='<button id="auto-complete">AUTO COMPLETE!!</button>'),this.isWin()}theme(){document.body.classList.forEach(e=>document.body.classList.remove(e)),document.body.classList.add(this.solitaire.currentTheme)}move(){Z().dataset.gameMove=this.solitaire.move.toString()}score(){ee().dataset.gameScore=this.solitaire.score.toString()}isWin(){this.solitaire.store.length===0&&this.solitaire.getCardInStacks().length===52&&setTimeout(()=>{alert("✨ 축하드립니다! 게임에서 승리하셨습니다 ✨"),confirm("새 게임을 시작하시겠습니까?")&&this.regame()},100)}regame(){this.auto_complete=!1,this.active_auto_complete=!1,this.solitaire.regame(),this.render(),this.soundShuffle()}checkAutoStack(){const e=this.solitaire.store.length===0,t=this.solitaire.pick.length===0;this.solitaire.getCardInGrounds().every(s=>s.isOpen)&&t&&e&&(!this.active_auto_complete&&!this.auto_complete&&this.solitaire.getCardInGrounds().length>0&&(this.auto_complete=!0,this.active_auto_complete=!1),console.log("auto complete"))}isEmptyDeck(){this.solitaire.store.length===0?S().querySelector(".back").classList.add("zero"):S().querySelector(".back").classList.remove("zero");const e=this.solitaire.getCardInPicks().length,t=this.solitaire.getCardInDecks().length+e;S().dataset.pickLen=e.toString(),S().dataset.storeLen=t.toString()}stackCardForm(e,t){return`
      <div
      class="card${e.selected?" selected":""}"
      data-card-column="${e.column}"
      data-card-open="${e.isOpen}"
      data-card-number="${e.number}"
      data-card-type="${e.type}"
      data-card-state="${e.state}"
      style="top: 0px; left: 0px; ${M(e)}">
      ${E(e)}
      </div>
    `}groundCardForm(e,t){return`<div
    class="card${e.selected?" selected":""}"
    data-card-column="${e.column}"
    data-card-open="${e.isOpen}"
    data-card-number="${e.number}"
    data-card-type="${e.type}"
    data-card-state="${e.state}"
    style="top: ${U()?t*22:t*15}px; ${M(e)}">
    ${E(e)}
  </div>`}pickCardForm(e,t){return`
    <div
    class="card${e.selected?" selected":""}"
    data-card-column="${e.column}"
    data-card-open="${e.isOpen}"
    data-card-number="${e.number}"
    data-card-type="${e.type}"
    data-card-state="${e.state}"
    style="left: ${t*22}px; ${M(e)}">
    ${E(e)}
    </div>
  `}soundPick(){var e=new Audio("/new-solitaire/sounds/pick_sound.mp4");e.currentTime=.05,e.volume=.7,e.play()}soundShuffle(){var e=new Audio("/new-solitaire/sounds/shuffle_sound.mp4");e.currentTime=.01,e.volume=.5,e.play()}}var w,q,L,F;class f{constructor(e,t){m(this,w);m(this,L);c(this,"type","back");c(this,"number",0);c(this,"selected",!1);c(this,"state","deck");c(this,"color","none");c(this,"image","");c(this,"isOpen",!1);c(this,"column",-1);this.type=e,this.number=t,u(this,L,F).call(this),u(this,w,q).call(this),this.updateState("deck")}updateState(e){this.state=e}updateColumn(e){return this.column=e,this}open(){this.isOpen=!0}}w=new WeakSet,q=function(){this.image=se(this.type,this.number)},L=new WeakSet,F=function(){switch(this.type){case"back":this.color="none";break;case"diamond":this.color="red";break;case"heart":this.color="red";break;case"spade":this.color="black";break;case"clover":this.color="black";break;default:this.color="none";break}};const k=["theme-1","theme-2","theme-3","theme-4","theme-5","theme-6","theme-7"];var g,O,y,$,b,x,C,P;class ae{constructor(e){m(this,g);m(this,y);m(this,b);m(this,C);c(this,"empty",new f("empty",0));c(this,"back",new f("back",0));c(this,"mode","development");c(this,"selector",[null,null]);c(this,"deck",{heart:[],diamond:[],spade:[],clover:[]});c(this,"store",[]);c(this,"pick",[]);c(this,"stack",{heart:[],diamond:[],spade:[],clover:[]});c(this,"ground",[[],[],[],[],[],[],[]]);c(this,"score",0);c(this,"move",0);c(this,"compareDeck",[0,0]);c(this,"themeIndex",0);c(this,"currentTheme",k[0]);typeof e.mode=="number"?this.mode=e.mode?"development":"production":this.mode=e.mode||"development",u(this,g,O).call(this),this.mode==="development"?u(this,y,$).call(this):u(this,b,x).call(this),u(this,C,P).call(this)}randomTheme(){this.currentTheme=k[Math.floor(k.length*Math.random())]}nextTheme(){this.themeIndex+=1,this.currentTheme=k[this.themeIndex%k.length]}countUpScore(){this.score+=1}countUpMove(){this.move+=1}regame(){this.selector=[null,null],this.deck={heart:[],diamond:[],spade:[],clover:[]},this.empty=new f("empty",0),this.back=new f("back",0),this.store=[],this.pick=[],this.stack={heart:[],diamond:[],spade:[],clover:[]},this.ground=[[],[],[],[],[],[],[]],this.score=0,this.move=0,u(this,g,O).call(this),this.mode==="development"?u(this,y,$).call(this):u(this,b,x).call(this),u(this,C,P).call(this)}findUsableColumn(){const e=this.ground.findIndex((i,s)=>i.length<s+1),t=this.ground[e];return[e,t]}addGroundColumn(e){const[t,i]=this.findUsableColumn();e.updateState("ground"),e.updateColumn(t),i.push(e),i.length===t+1&&e.open()}asList(){return Object.values(this.deck).flat(1)}getCardInDecks(){return this.asList().filter(e=>e.state==="deck")}getCardInGrounds(){return this.asList().filter(e=>e.state==="ground")}getCardInStacks(){return this.asList().filter(e=>e.state==="stack")}getCardInPicks(){return this.asList().filter(e=>e.state==="pick")}compareWith(e,t){return this.isStackableColorType(e,t)&&this.isStackableNumber(e,t)}isStackableColorType(e,t){return e.color!==t.color}isStackableNumber(e,t){return e.number+1===t.number}isStackDirectly(e){const t=this.stack[e.type],i=t.slice(-1)[0],s=e.column;if(e.state==="pick"){const o=this.pick,r=o.findIndex(d=>d.number===e.number&&d.type===e.type);if(r>-1&&(t.length===0&&e.number===1||i&&i.number+1===e.number))return o.splice(r)[0],this.moveToStack(e),!0}else if(this.ground[s]&&e.state!=="stack"){const o=this.ground[s].findIndex(r=>r.number===e.number&&r.type===e.type);if(o>-1&&(t.length===0&&e.number===1||i&&i.number+1===e.number)){const r=this.ground[s].splice(o)[0];return this.afterCardOpen(s),this.moveToStack(r),!0}}return!1}moveToGround(e,t){e.updateColumn(t),e.updateState("ground")}moveToStack(e){e.updateColumn(-1),e.updateState("stack"),this.stack[e.type].push(e)}moveToColumn(e,t){const i=e[0],s=i.column;if(i.state==="stack"){const o=this.stack[i.type].findIndex(r=>r.number===i.number&&r.type===i.type);if(o>-1){const r=this.stack[i.type].splice(o);this.ground[t].push(...r),this.afterCardOpen(t),this.moveToGround(i,t)}}else if(i.state==="ground"){const o=this.findOrderInColumn(i),r=this.ground[s].splice(o);this.ground[t].push(...r.map(d=>d.updateColumn(t))),this.afterCardOpen(s),this.moveToGround(i,t)}else if(i.state==="pick"){const o=this.findOrderInPickList(i),r=this.pick.splice(o);this.ground[t].push(...r.map(d=>d.updateColumn(t))),this.moveToGround(i,t)}}afterCardOpen(e){this.ground[e].slice(-1)[0]&&(this.ground[e].slice(-1)[0].isOpen=!0)}findOrderInColumn(e){return this.ground[e.column].findIndex(t=>t.type===e.type&&t.number===e.number)}findOrderInPickList(e){return this.pick.findIndex(t=>t.type===e.type&&t.number===e.number)}clearSelector(){this.selector[0]=null,this.selector[1]=null}}g=new WeakSet,O=function(){for(let e of h.TYPES)for(let t=1;t<=h.AMOUNT;t++){const i=new f(e,t);this.deck[e].push(i)}},y=new WeakSet,$=function(){const e=["heart","spade","diamond","clover"];for(let t=12;t>=0;t--){for(let i of e){const s=this.deck[i][t],o=e.findIndex(r=>r===i);s.updateState("ground"),s.updateColumn(o),s.open(),this.ground[o].push(s)}e.push(e.shift())}},b=new WeakSet,x=function(){for(let e=0;e<28;e++){const t=Math.floor(Math.random()*h.TYPES.length),i=Math.floor(Math.random()*h.AMOUNT),s=this.deck[h.TYPES[t]][i];if(s.state==="ground"){e--;continue}this.addGroundColumn(s)}},C=new WeakSet,P=function(){const e=this.getCardInDecks();for(;e.length!==0;){const t=e.splice(Math.floor(Math.random()*e.length),1)[0];this.store.push(t)}};const W=new ae({mode:0}),K=new ce(W);new Q(W,K);K.render();
