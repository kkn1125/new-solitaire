var Z=Object.defineProperty;var ee=(r,e,t)=>e in r?Z(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var c=(r,e,t)=>(ee(r,typeof e!="symbol"?e+"":e,t),t),te=(r,e,t)=>{if(!e.has(r))throw TypeError("Cannot "+t)};var m=(r,e,t)=>{if(e.has(r))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(r):e.set(r,t)};var h=(r,e,t)=>(te(r,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();var w,W;class se{constructor(e,t){m(this,w);c(this,"solitaire");c(this,"renderer");h(this,w,W).call(this),this.solitaire=e,this.renderer=t}handleTabout(e){document.hidden?this.solitaire.bgmOff():this.solitaire.sound.bgm.active&&this.solitaire.bgmStart()}handleBeforeClose(e){this.removeAllListeners()}handleToggleEffect(e){const s=e.target.closest("#effect");s&&s.id==="effect"&&(this.solitaire.effect=!this.solitaire.effect,this.renderer.update())}handleToggleBGm(e){const s=e.target.closest("#bgm");s&&s.id==="bgm"&&(this.solitaire.sound.bgm.active=!this.solitaire.sound.bgm.active,this.renderer.update())}handleRandomTheme(e){const s=e.target.closest("#theme");s&&s.id==="theme"&&(this.solitaire.nextTheme(),this.renderer.update())}removeAllListeners(){window.removeEventListener("click",this.handleAutoComplete.bind(this)),window.removeEventListener("click",this.handleSelectCard.bind(this)),window.removeEventListener("click",this.handleDeckToPick.bind(this)),window.removeEventListener("click",this.handleRestartGame.bind(this)),window.removeEventListener("click",this.handleRandomTheme.bind(this)),window.removeEventListener("click",this.handleToggleEffect.bind(this)),window.removeEventListener("click",this.handleToggleBGm.bind(this)),window.removeEventListener("resize",this.handleResize.bind(this)),document.removeEventListener("visibilitychange",this.handleTabout.bind(this)),window.removeEventListener("beforeunload",this.handleBeforeClose.bind(this))}handleAutoComplete(e){const t=this,s=e.target;if(s.id!=="auto-complete")return;this.renderer.active_auto_complete=!0,this.renderer.auto_complete=!1,s.remove();function i(){const o=t.solitaire.ground.filter(n=>n.length);for(let n=0;n<o.length;n++){const d=o[n],p=d.slice(-1)[0];if(p){const a=t.solitaire.stack[p.type];if(a.length===0&&d.slice(-1)[0].number===1){const l=d.splice(-1)[0];l.updateColumn(-1),l.updateState("stack"),a.push(l),t.renderer.update()}else if(a.slice(-1)[0]&&a.slice(-1)[0].number+1===p.number){const l=d.splice(-1)[0];l.updateColumn(-1),l.updateState("stack"),a.push(l),t.renderer.update()}else continue}else continue}o.some(n=>n.length>0)?setTimeout(()=>{i()},100):(t.renderer.active_auto_complete=!1,t.renderer.auto_complete=!1)}i()}handleResize(){innerWidth>768?this.renderer.update():this.renderer.update()}handleRestartGame(e){e.target.id==="restart"&&this.renderer.regame()}convertElToCard(e){return this.solitaire.deck[e.dataset.cardType].find(t=>t.number===Number(e.dataset.cardNumber))}handleDeckToPick(e){const t=e.target;if(t&&t.closest("#deck")){const i=this.solitaire.store;if(i.length>0){const o=i.shift();o.updateState("pick"),o.open(),this.solitaire.pick.push(o),this.renderer.soundPick()}else this.solitaire.store.push(...this.solitaire.pick.splice(0).map(o=>(o.isOpen=!1,o.updateColumn(-1),o.updateState("deck"),o))),this.renderer.soundShuffle();this.renderer.update()}}handleSelectCard(e){const t=e.target;if(document.querySelectorAll(".card").forEach(s=>{const i=s.dataset.cardType,o=Number(s.dataset.cardNumber),n=this.solitaire.deck[i].find(d=>d.number===o);n&&(n.selected=!1,s.classList.remove("selected"))}),t){const s=t.closest(".empty"),i=this.solitaire.selector,o=this.solitaire.mode==="development";if(s&&i[0]!==null&&(o||i[0][0].number===13)){const n=t.parentElement,p=[...n.parentElement.children].findIndex(a=>a===n);console.log("good"),this.solitaire.countUpMove(),this.solitaire.moveToColumn(i[0],p),this.renderer.update(),this.renderer.soundPick()}else s&&i[0]!==null&&(o||i[0][0].number!==13)&&console.log("bad");if(t.closest(".card")){const n=t.closest(".card"),d=n.dataset.cardType,p=Number(n.dataset.cardNumber),a=this.solitaire.deck[d].find(l=>l.number===p);if(n.dataset.cardOpen==="true")if(a.selected)a.selected=!1;else if(i[0]===null){const l=n.dataset.cardState,B=n.parentNode,Q=Array.from(B.children).slice(-1)[0];if((l==="ground"||l==="pick"||l==="stack")&&Q===n){if(this.solitaire.isStackDirectly(a)){this.solitaire.clearSelector(),a.selected=!1,n.classList.remove("selected"),this.solitaire.countUpScore(),this.renderer.update(),this.renderer.soundPick(),this.solitaire.getCardInStacks().length>0&&(this.solitaire.compareDeck[0]<this.solitaire.getCardInStacks().length?(this.solitaire.compareDeck[0]=this.solitaire.getCardInStacks().length,this.solitaire.compareDeck[1]=this.solitaire.compareDeck[0]):this.solitaire.compareDeck[1]=this.solitaire.getCardInStacks().length);return}a.selected=!0,i[0]=[a]}else if(l==="ground"){const R=Array.from(B.children).filter(f=>f.classList.contains("card")).map(this.convertElToCard.bind(this)),N=R.findIndex(f=>f.type===a.type&&f.number===a.number);if(N>-1){const f=R.slice(N);f.forEach(X=>X.selected=!0),i[0]=f}}}else if(i[1]===null&&a.state==="ground"){i[1]=a;const l=this.solitaire.compareWith(i[0][0],i[1]);Array.from(n.parentElement.children).slice(-1)[0]===n&&(l?(console.log("good"),this.solitaire.countUpMove(),this.solitaire.moveToColumn(i[0],i[1].column),this.renderer.soundPick()):console.log("bad")),this.solitaire.clearSelector(),a.selected=!1,n.classList.remove("selected")}else this.solitaire.clearSelector(),a.selected=!1,n.classList.remove("selected");this.renderer.update()}else this.solitaire.clearSelector()}}}w=new WeakSet,W=function(){window.addEventListener("click",this.handleAutoComplete.bind(this)),window.addEventListener("click",this.handleSelectCard.bind(this)),window.addEventListener("click",this.handleDeckToPick.bind(this)),window.addEventListener("click",this.handleRestartGame.bind(this)),window.addEventListener("click",this.handleRandomTheme.bind(this)),window.addEventListener("click",this.handleToggleEffect.bind(this)),window.addEventListener("click",this.handleToggleBGm.bind(this)),window.addEventListener("resize",this.handleResize.bind(this)),document.addEventListener("visibilitychange",this.handleTabout.bind(this)),window.addEventListener("beforeunload",this.handleBeforeClose.bind(this))};const ie=`<?xml version="1.0" encoding="iso-8859-1"?>
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
</svg>`,ne=r=>new DOMParser().parseFromString(r,"text/html").body.children[0],oe={palette:ne(ie)},u={TYPES:["heart","diamond","spade","clover"],SHAPE:{heart:"♥",diamond:"◆",spade:"♠",clover:"♣"},TAG:{1:"A",2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:"J",12:"Q",13:"K"},AMOUNT:13},z=document.querySelector("#app"),q=()=>document.querySelector("#ground"),re=()=>document.querySelector("#stack"),H=()=>document.querySelector("#pick"),L=()=>document.querySelector("#deck"),U=()=>document.querySelector("#timer"),ce=()=>document.querySelector("#move"),ae=()=>document.querySelector("#score"),I=()=>document.querySelector("#effect"),O=()=>document.querySelector("#bgm"),b=()=>document.querySelector("#current-bgm"),k=()=>document.querySelector("#current-bgm > #slide"),de=()=>document.querySelector("#auto-complete"),le=(r,e)=>`/new-solitaire/cards/${r}_${e}.png`,F={pick:"/sounds/pick_sound.mp4",shuffle:"/sounds/shuffle_sound.mp4"},he=["/bgm/daehanghaesidae_bar.mp4","/bgm/daehanghaesidae_eastern_mediterranean_sea.mp4","/bgm/daehanghaesidae_japan.mp4","/bgm/daehanghaesidae_marseille.mp4"],ue=.55,g=["theme-1","theme-2","theme-3","theme-4","theme-5","theme-6","theme-7"],me=r=>{const e=Math.floor(r*10/60)%60,t=Math.floor(r*10)%60;return`${e.toString().padStart(2,"0")}:${t.toString().padStart(2,"0")}`},V=()=>innerWidth>768,G=()=>V(),$=r=>G()?`background-image: url('${r.image}');`:"",x=r=>`${G()?"<!--":""}
  <div class="card-top">
    <span>
      ${u.SHAPE[r.type]}
    </span>
    <span>
      ${u.TAG[r.number]}
    </span>
  </div>
  <div class="card-mid">
    ${u.SHAPE[r.type]}
  </div>
  <div class="card-bottom">
    <span>
      ${u.SHAPE[r.type]}
    </span>
    <span>
      ${u.TAG[r.number]}
    </span>
  </div>
  ${G()?"-->":""}`;class pe{constructor(e){c(this,"solitaire");c(this,"timer");c(this,"auto_complete",!1);c(this,"active_auto_complete",!1);this.solitaire=e}renderTimer(){clearInterval(this.timer);let e=0;U().innerHTML="00:00",this.startTimer(e)}startTimer(e){this.timer=setInterval(()=>{const t=me(e+=.1);U().innerHTML=`${t}`},1e3)}layout(){z.innerHTML=`
      <div id="top-bar">
        <div></div>
        <div id="options">
          <div id="score" class="shape" data-game-score="0"></div>
          <div id="timer" class="shape"></div>
          <div id="move" class="shape" data-game-move="0"></div>
        </div>
        <button id="theme" class="top-circle-btn">
          ${oe.palette.outerHTML}
        </button>
        <button id="effect" class="top-circle-btn">
          🃏
        </button>
        <button id="bgm" class="top-circle-btn">
          🔊
        </button>
      </div>
      <div class="slide-bgm">
        <span id="current-bgm">
          
        </span>
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
      
      <button id="restart">new game</button>
    `}dpBGM(){var t,s;const e=(t=this.solitaire.sound.bgm.list.currentSrc)==null?void 0:t.split("daehanghaesidae_")[1];b().style.display=this.solitaire.sound.bgm.active&&e?"inline-block":"none",this.solitaire.sound.bgm.active&&((s=k())==null?void 0:s.innerHTML)!==e&&(b().innerHTML=`<span id="slide">${e}</span>`||"",k()&&(k().dataset.content=e||""))}ground(){return this.solitaire.ground.forEach((t,s)=>{q().children[s].innerHTML='<div class="empty"></div>',q().children[s].innerHTML+=t.map((i,o)=>this.groundCardForm(i,o)).join("")})}stack(){const e=this.solitaire.stack,t='<div class="empty"></div>',s=i=>re().querySelector(`#${i}-stack`);Object.entries(e).some(i=>i[1].length>0)&&Object.entries(e).forEach(([i,o])=>{s(i).innerHTML=t,o.forEach((n,d)=>{s(n.type).innerHTML+=this.stackCardForm(n,d)})})}pick(){const e=this.solitaire.pick.slice(-3);return H().innerHTML='<div class="empty"></div>',e.forEach((t,s)=>{H().innerHTML+=this.pickCardForm(t,s)})}render(){this.startBgm(),this.layout(),this.renderTimer(),this.update()}update(){this.theme(),this.ground(),this.pick(),this.stack(),this.isEmptyDeck(),this.move(),this.score(),this.effect(),this.toggleBgm(),this.dpBGM(),this.checkAutoStack(),this.active_auto_complete||this.auto_complete&&!de()&&(console.log("here"),z.innerHTML+='<button id="auto-complete">AUTO COMPLETE</button>'),this.isWin()}startBgm(){this.solitaire.sound.bgm.active&&this.solitaire.sound.bgm.list.play()}effect(){!this.solitaire.effect&&!I().classList.contains(".not-use")?I().classList.add("not-use"):I().classList.remove("not-use")}toggleBgm(){!this.solitaire.sound.bgm.active&&!O().classList.contains(".not-use")?(O().classList.add("not-use"),this.solitaire.bgmOff()):(O().classList.remove("not-use"),this.solitaire.bgmStart())}theme(){document.body.classList.forEach(e=>document.body.classList.remove(e)),document.body.classList.add(this.solitaire.currentTheme)}move(){ce().dataset.gameMove=this.solitaire.move.toString()}score(){ae().dataset.gameScore=this.solitaire.score.toString()}isWin(){this.solitaire.store.length===0&&this.solitaire.getCardInStacks().length===52&&setTimeout(()=>{alert("✨ 축하드립니다! 게임에서 승리하셨습니다 ✨"),confirm("새 게임을 시작하시겠습니까?")&&this.regame()},100)}regame(){this.auto_complete=!1,this.active_auto_complete=!1,this.solitaire.regame(),this.render(),this.soundShuffle()}checkAutoStack(){const e=this.solitaire.store.length===0,t=this.solitaire.pick.length===0;this.solitaire.getCardInGrounds().every(i=>i.isOpen)&&t&&e&&(!this.active_auto_complete&&!this.auto_complete&&this.solitaire.getCardInGrounds().length>0&&(this.auto_complete=!0,this.active_auto_complete=!1),console.log("auto complete"))}isEmptyDeck(){this.solitaire.store.length===0?L().querySelector(".back").classList.add("zero"):L().querySelector(".back").classList.remove("zero");const e=this.solitaire.getCardInPicks().length,t=this.solitaire.getCardInDecks().length+e;L().dataset.pickLen=e.toString(),L().dataset.storeLen=t.toString()}stackCardForm(e,t){return`
      <div
      class="card${e.selected?" selected":""}"
      data-card-column="${e.column}"
      data-card-open="${e.isOpen}"
      data-card-number="${e.number}"
      data-card-type="${e.type}"
      data-card-state="${e.state}"
      style="top: 0px; left: 0px; ${$(e)}">
      ${x(e)}
      </div>
    `}groundCardForm(e,t){return`<div
    class="card${e.selected?" selected":""}"
    data-card-column="${e.column}"
    data-card-open="${e.isOpen}"
    data-card-number="${e.number}"
    data-card-type="${e.type}"
    data-card-state="${e.state}"
    style="top: ${V()?t*22:t*15}px; ${$(e)}">
    ${x(e)}
  </div>`}pickCardForm(e,t){return`
    <div
    class="card${e.selected?" selected":""}"
    data-card-column="${e.column}"
    data-card-open="${e.isOpen}"
    data-card-number="${e.number}"
    data-card-type="${e.type}"
    data-card-state="${e.state}"
    style="left: ${t*22}px; ${$(e)}">
    ${x(e)}
    </div>
  `}soundPick(){this.solitaire.effect&&this.solitaire.pickSound()}soundShuffle(){this.solitaire.effect&&this.solitaire.shuffleSound()}playBgm(){}}var E,K,M,j;class v{constructor(e,t){m(this,E);m(this,M);c(this,"type","back");c(this,"number",0);c(this,"selected",!1);c(this,"state","deck");c(this,"color","none");c(this,"image","");c(this,"isOpen",!1);c(this,"column",-1);this.type=e,this.number=t,h(this,M,j).call(this),h(this,E,K).call(this),this.updateState("deck")}updateState(e){this.state=e}updateColumn(e){return this.column=e,this}open(){this.isOpen=!0}}E=new WeakSet,K=function(){this.image=le(this.type,this.number)},M=new WeakSet,j=function(){switch(this.type){case"back":this.color="none";break;case"diamond":this.color="red";break;case"heart":this.color="red";break;case"spade":this.color="black";break;case"clover":this.color="black";break;default:this.color="none";break}};var y,_,S,P,C,A,T,D;class fe{constructor(e){m(this,y);m(this,S);m(this,C);m(this,T);c(this,"empty",new v("empty",0));c(this,"back",new v("back",0));c(this,"mode","development");c(this,"selector",[null,null]);c(this,"deck",{heart:[],diamond:[],spade:[],clover:[]});c(this,"store",[]);c(this,"pick",[]);c(this,"stack",{heart:[],diamond:[],spade:[],clover:[]});c(this,"ground",[[],[],[],[],[],[],[]]);c(this,"score",0);c(this,"move",0);c(this,"compareDeck",[0,0]);c(this,"themeIndex",0);c(this,"currentTheme",g[0]);c(this,"effect",!0);c(this,"sound",{bgm:{active:!1,list:null},effect:{active:!0}});typeof e.mode=="number"?this.mode=e.mode?"development":"production":this.mode=e.mode||"development",h(this,y,_).call(this),this.mode==="development"?h(this,S,P).call(this):h(this,C,A).call(this),h(this,T,D).call(this),this.setBGM()}setBGM(){this.sound.bgm.list=new Audio,this.sound.bgm.list.muted=!0,this.sound.bgm.list.volume=ue,this.setRandomBgm(),this.sound.bgm.list.addEventListener("ended",(()=>{this.setRandomBgm()}).bind(this))}bgmStart(){this.sound.bgm.list.muted=!1,this.sound.bgm.list.play()}bgmOff(){this.sound.bgm.list.muted=!0,this.sound.bgm.list.pause()}setRandomBgm(){const e=he.filter(i=>i!==this.sound.bgm.list.currentSrc.replace(location.origin,"")),t="/new-solitaire"+e[Math.floor(e.length*Math.random())];this.sound.bgm.list.src=t,this.sound.bgm.active&&this.sound.bgm.list.play();const s=this.sound.bgm.list.src.split("daehanghaesidae_")[1];b()&&(b().style.display=s?"inline-block":"none",b().innerHTML=`<span id="slide">${s}</span>`||"",k()&&(k().dataset.content=s||""))}pickSound(){const e=new Audio("/new-solitaire"+F.pick);e.currentTime=.02,e.volume=.6,e.play()}shuffleSound(){const e=new Audio("/new-solitaire"+F.shuffle);e.currentTime=.01,e.volume=.5,e.play()}randomTheme(){this.currentTheme=g[Math.floor(g.length*Math.random())]}nextTheme(){this.themeIndex+=1,this.currentTheme=g[this.themeIndex%g.length]}countUpScore(){this.score+=1}countUpMove(){this.move+=1}regame(){this.selector=[null,null],this.deck={heart:[],diamond:[],spade:[],clover:[]},this.empty=new v("empty",0),this.back=new v("back",0),this.store=[],this.pick=[],this.stack={heart:[],diamond:[],spade:[],clover:[]},this.ground=[[],[],[],[],[],[],[]],this.score=0,this.move=0,h(this,y,_).call(this),this.mode==="development"?h(this,S,P).call(this):h(this,C,A).call(this),h(this,T,D).call(this)}findUsableColumn(){const e=this.ground.findIndex((s,i)=>s.length<i+1),t=this.ground[e];return[e,t]}addGroundColumn(e){const[t,s]=this.findUsableColumn();e.updateState("ground"),e.updateColumn(t),s.push(e),s.length===t+1&&e.open()}asList(){return Object.values(this.deck).flat(1)}getCardInDecks(){return this.asList().filter(e=>e.state==="deck")}getCardInGrounds(){return this.asList().filter(e=>e.state==="ground")}getCardInStacks(){return this.asList().filter(e=>e.state==="stack")}getCardInPicks(){return this.asList().filter(e=>e.state==="pick")}compareWith(e,t){return this.isStackableColorType(e,t)&&this.isStackableNumber(e,t)}isStackableColorType(e,t){return e.color!==t.color}isStackableNumber(e,t){return e.number+1===t.number}isStackDirectly(e){const t=this.stack[e.type],s=t.slice(-1)[0],i=e.column;if(e.state==="pick"){const o=this.pick,n=o.findIndex(d=>d.number===e.number&&d.type===e.type);if(n>-1&&(t.length===0&&e.number===1||s&&s.number+1===e.number))return o.splice(n)[0],this.moveToStack(e),!0}else if(this.ground[i]&&e.state!=="stack"){const o=this.ground[i].findIndex(n=>n.number===e.number&&n.type===e.type);if(o>-1&&(t.length===0&&e.number===1||s&&s.number+1===e.number)){const n=this.ground[i].splice(o)[0];return this.afterCardOpen(i),this.moveToStack(n),!0}}return!1}moveToGround(e,t){e.updateColumn(t),e.updateState("ground")}moveToStack(e){e.updateColumn(-1),e.updateState("stack"),this.stack[e.type].push(e)}moveToColumn(e,t){const s=e[0],i=s.column;if(s.state==="stack"){const o=this.stack[s.type].findIndex(n=>n.number===s.number&&n.type===s.type);if(o>-1){const n=this.stack[s.type].splice(o);this.ground[t].push(...n),this.afterCardOpen(t),this.moveToGround(s,t)}}else if(s.state==="ground"){const o=this.findOrderInColumn(s),n=this.ground[i].splice(o);this.ground[t].push(...n.map(d=>d.updateColumn(t))),this.afterCardOpen(i),this.moveToGround(s,t)}else if(s.state==="pick"){const o=this.findOrderInPickList(s),n=this.pick.splice(o);this.ground[t].push(...n.map(d=>d.updateColumn(t))),this.moveToGround(s,t)}}afterCardOpen(e){this.ground[e].slice(-1)[0]&&(this.ground[e].slice(-1)[0].isOpen=!0)}findOrderInColumn(e){return this.ground[e.column].findIndex(t=>t.type===e.type&&t.number===e.number)}findOrderInPickList(e){return this.pick.findIndex(t=>t.type===e.type&&t.number===e.number)}clearSelector(){this.selector[0]=null,this.selector[1]=null}}y=new WeakSet,_=function(){for(let e of u.TYPES)for(let t=1;t<=u.AMOUNT;t++){const s=new v(e,t);this.deck[e].push(s)}},S=new WeakSet,P=function(){const e=["heart","spade","diamond","clover"];for(let t=12;t>=0;t--){for(let s of e){const i=this.deck[s][t],o=e.findIndex(n=>n===s);i.updateState("ground"),i.updateColumn(o),i.open(),this.ground[o].push(i)}e.push(e.shift())}},C=new WeakSet,A=function(){for(let e=0;e<28;e++){const t=Math.floor(Math.random()*u.TYPES.length),s=Math.floor(Math.random()*u.AMOUNT),i=this.deck[u.TYPES[t]][s];if(i.state==="ground"){e--;continue}this.addGroundColumn(i)}},T=new WeakSet,D=function(){const e=this.getCardInDecks();for(;e.length!==0;){const t=e.splice(Math.floor(Math.random()*e.length),1)[0];this.store.push(t)}};const Y=new fe({mode:0}),J=new pe(Y);new se(Y,J);J.render();
