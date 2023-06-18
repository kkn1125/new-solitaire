var Y=Object.defineProperty;var V=(n,e,t)=>e in n?Y(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var a=(n,e,t)=>(V(n,typeof e!="symbol"?e+"":e,t),t),J=(n,e,t)=>{if(!e.has(n))throw TypeError("Cannot "+t)};var m=(n,e,t)=>{if(e.has(n))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(n):e.set(n,t)};var u=(n,e,t)=>(J(n,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();var C,H;class Q{constructor(e,t){m(this,C);a(this,"solitaire");a(this,"renderer");u(this,C,H).call(this),this.solitaire=e,this.renderer=t}removeAllListeners(){window.removeEventListener("click",this.handleSelectCard.bind(this)),window.removeEventListener("click",this.handleDeckToPick.bind(this)),window.removeEventListener("click",this.handleRestartGame.bind(this)),window.removeEventListener("resize",this.handleResize.bind(this))}handleAutoComplete(e){const t=this,i=e.target;if(i.id!=="auto-complete")return;this.renderer.active_auto_complete=!0,this.renderer.auto_complete=!1,i.remove();function s(){const o=t.solitaire.ground.filter(r=>r.length);for(let r=0;r<o.length;r++){const d=o[r],p=d.slice(-1)[0];if(p){const c=t.solitaire.stack[p.type];if(c.length===0&&d.slice(-1)[0].number===1){const l=d.splice(-1)[0];l.updateColumn(-1),l.updateState("stack"),c.push(l),t.renderer.update()}else if(c.slice(-1)[0]&&c.slice(-1)[0].number+1===p.number){const l=d.splice(-1)[0];l.updateColumn(-1),l.updateState("stack"),c.push(l),t.renderer.update()}else continue}else continue}o.some(r=>r.length>0)?setTimeout(()=>{s()},100):(t.renderer.active_auto_complete=!1,t.renderer.auto_complete=!1)}s()}handleResize(){innerWidth>768?this.renderer.update():this.renderer.update()}handleRestartGame(e){e.target.id==="restart"&&this.renderer.regame()}convertElToCard(e){return this.solitaire.deck[e.dataset.cardType].find(t=>t.number===Number(e.dataset.cardNumber))}handleDeckToPick(e){const t=e.target;if(t&&t.closest("#deck")){const s=this.solitaire.store;if(s.length>0){const o=s.shift();o.updateState("pick"),o.open(),this.solitaire.pick.push(o),this.renderer.soundPick()}else this.solitaire.store.push(...this.solitaire.pick.splice(0).map(o=>(o.isOpen=!1,o.updateColumn(-1),o.updateState("deck"),o))),this.renderer.soundShuffle();this.renderer.update()}}handleSelectCard(e){const t=e.target;if(document.querySelectorAll(".card").forEach(i=>{const s=i.dataset.cardType,o=Number(i.dataset.cardNumber),r=this.solitaire.deck[s].find(d=>d.number===o);r&&(r.selected=!1,i.classList.remove("selected"))}),t){const i=t.closest(".empty"),s=this.solitaire.selector,o=this.solitaire.mode==="development";if(i&&s[0]!==null&&(o||s[0][0].number===13)){const r=t.parentElement,p=[...r.parentElement.children].findIndex(c=>c===r);console.log("good"),this.solitaire.countUpMove(),this.solitaire.moveToColumn(s[0],p),this.renderer.update(),this.renderer.soundPick()}else i&&s[0]!==null&&(o||s[0][0].number!==13)&&console.log("bad");if(t.closest(".card")){const r=t.closest(".card"),d=r.dataset.cardType,p=Number(r.dataset.cardNumber),c=this.solitaire.deck[d].find(l=>l.number===p);if(r.dataset.cardOpen==="true")if(c.selected)c.selected=!1;else if(s[0]===null){const l=r.dataset.cardState,A=r.parentNode,K=Array.from(A.children).slice(-1)[0];if((l==="ground"||l==="pick"||l==="stack")&&K===r){if(this.solitaire.isStackDirectly(c)){this.solitaire.clearSelector(),c.selected=!1,r.classList.remove("selected"),this.solitaire.countUpScore(),this.renderer.update(),this.renderer.soundPick(),this.solitaire.getCardInStacks().length>0&&(this.solitaire.compareDeck[0]<this.solitaire.getCardInStacks().length?(this.solitaire.compareDeck[0]=this.solitaire.getCardInStacks().length,this.solitaire.compareDeck[1]=this.solitaire.compareDeck[0]):this.solitaire.compareDeck[1]=this.solitaire.getCardInStacks().length);return}c.selected=!0,s[0]=[c]}else if(l==="ground"){const _=Array.from(A.children).filter(v=>v.classList.contains("card")).map(this.convertElToCard.bind(this)),x=_.findIndex(v=>v.type===c.type&&v.number===c.number);if(x>-1){const v=_.slice(x);v.forEach(j=>j.selected=!0),s[0]=v}}}else if(s[1]===null&&c.state==="ground"){s[1]=c;const l=this.solitaire.compareWith(s[0][0],s[1]);Array.from(r.parentElement.children).slice(-1)[0]===r&&(l?(console.log("good"),this.solitaire.countUpMove(),this.solitaire.moveToColumn(s[0],s[1].column),this.renderer.soundPick()):console.log("bad")),this.solitaire.clearSelector(),c.selected=!1,r.classList.remove("selected")}else this.solitaire.clearSelector(),c.selected=!1,r.classList.remove("selected");this.renderer.update()}else this.solitaire.clearSelector()}}}C=new WeakSet,H=function(){window.addEventListener("click",this.handleAutoComplete.bind(this)),window.addEventListener("click",this.handleSelectCard.bind(this)),window.addEventListener("click",this.handleDeckToPick.bind(this)),window.addEventListener("click",this.handleRestartGame.bind(this)),window.addEventListener("resize",this.handleResize.bind(this))};const h={TYPES:["heart","diamond","spade","clover"],SHAPE:{heart:"♥",diamond:"◆",spade:"♠",clover:"♣"},TAG:{1:"A",2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:"J",12:"Q",13:"K"},AMOUNT:13},D=document.querySelector("#app"),G=()=>document.querySelector("#ground"),B=()=>document.querySelector("#stack"),N=()=>document.querySelector("#pick"),S=()=>document.querySelector("#deck"),q=()=>document.querySelector("#timer"),X=()=>document.querySelector("#move"),Z=()=>document.querySelector("#score"),ee=()=>document.querySelector("#auto-complete"),te=(n,e)=>`/new-solitaire/cards/${n}_${e}.png`,se=n=>{const e=Math.floor(n*10/60)%60,t=Math.floor(n*10)%60;return`${e.toString().padStart(2,"0")}:${t.toString().padStart(2,"0")}`},U=()=>innerWidth>768,$=()=>U(),E=n=>$()?`background-image: url('${n.image}');`:"",I=n=>`${$()?"<!--":""}
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
  ${$()?"-->":""}`;class ie{constructor(e){a(this,"solitaire");a(this,"timer");a(this,"auto_complete",!1);a(this,"active_auto_complete",!1);this.solitaire=e}renderTimer(){clearInterval(this.timer);let e=0;q().innerHTML="00:00",this.startTimer(e)}startTimer(e){this.timer=setInterval(()=>{const t=se(e+=.1);q().innerHTML=`${t}`},1e3)}layout(){D.innerHTML=`
      <div id="options">
        <div id="score" class="shape" data-game-score="0"></div>
        <div id="timer" class="shape"></div>
        <div id="move" class="shape" data-game-move="0"></div>
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
    `}ground(){return this.solitaire.ground.forEach((t,i)=>{G().children[i].innerHTML='<div class="empty"></div>',G().children[i].innerHTML+=t.map((s,o)=>this.groundCardForm(s,o)).join("")})}stack(){const e=this.solitaire.stack,t='<div class="empty"></div>',i=s=>B().querySelector(`#${s}-stack`);Object.entries(e).some(s=>s[1].length>0)&&Object.entries(e).forEach(([s,o])=>{i(s).innerHTML=t,o.forEach((r,d)=>{i(r.type).innerHTML+=this.stackCardForm(r,d)})})}pick(){const e=this.solitaire.pick.slice(-3);return N().innerHTML='<div class="empty"></div>',e.forEach((t,i)=>{N().innerHTML+=this.pickCardForm(t,i)})}render(){this.layout(),this.renderTimer(),this.update()}update(){this.ground(),this.pick(),this.stack(),this.isEmptyDeck(),this.move(),this.score(),this.checkAutoStack(),this.active_auto_complete||this.auto_complete&&!ee()&&(D.innerHTML+='<button id="auto-complete">AUTO COMPLETE!!</button>'),this.isWin()}move(){X().dataset.gameMove=this.solitaire.move.toString()}score(){Z().dataset.gameScore=this.solitaire.score.toString()}isWin(){this.solitaire.store.length===0&&this.solitaire.getCardInStacks().length===52&&setTimeout(()=>{alert("✨ 축하드립니다! 게임에서 승리하셨습니다 ✨"),confirm("새 게임을 시작하시겠습니까?")&&this.regame()},100)}regame(){this.auto_complete=!1,this.active_auto_complete=!1,this.solitaire.regame(),this.render(),this.soundShuffle()}checkAutoStack(){const e=this.solitaire.store.length===0,t=this.solitaire.pick.length===0;this.solitaire.getCardInGrounds().every(s=>s.isOpen)&&t&&e&&(!this.active_auto_complete&&!this.auto_complete&&this.solitaire.getCardInGrounds().length>0&&(this.auto_complete=!0,this.active_auto_complete=!1),console.log("auto complete"))}isEmptyDeck(){this.solitaire.store.length===0?S().querySelector(".back").classList.add("zero"):S().querySelector(".back").classList.remove("zero");const e=this.solitaire.getCardInPicks().length,t=this.solitaire.getCardInDecks().length+e;S().dataset.pickLen=e.toString(),S().dataset.storeLen=t.toString()}stackCardForm(e,t){return`
      <div
      class="card${e.selected?" selected":""}"
      data-card-column="${e.column}"
      data-card-open="${e.isOpen}"
      data-card-number="${e.number}"
      data-card-type="${e.type}"
      data-card-state="${e.state}"
      style="top: 0px; left: 0px; ${E(e)}">
      ${I(e)}
      </div>
    `}groundCardForm(e,t){return`<div
    class="card${e.selected?" selected":""}"
    data-card-column="${e.column}"
    data-card-open="${e.isOpen}"
    data-card-number="${e.number}"
    data-card-type="${e.type}"
    data-card-state="${e.state}"
    style="top: ${U()?t*22:t*15}px; ${E(e)}">
    ${I(e)}
  </div>`}pickCardForm(e,t){return`
    <div
    class="card${e.selected?" selected":""}"
    data-card-column="${e.column}"
    data-card-open="${e.isOpen}"
    data-card-number="${e.number}"
    data-card-type="${e.type}"
    data-card-state="${e.state}"
    style="left: ${t*22}px; ${E(e)}">
    ${I(e)}
    </div>
  `}soundPick(){var e=new Audio("/new-solitaire/sounds/pick_sound.mp4");e.currentTime=.05,e.volume=.7,e.play()}soundShuffle(){var e=new Audio("/new-solitaire/sounds/shuffle_sound.mp4");e.currentTime=.01,e.volume=.5,e.play()}}var T,R,L,F;class f{constructor(e,t){m(this,T);m(this,L);a(this,"type","back");a(this,"number",0);a(this,"selected",!1);a(this,"state","deck");a(this,"color","none");a(this,"image","");a(this,"isOpen",!1);a(this,"column",-1);this.type=e,this.number=t,u(this,L,F).call(this),u(this,T,R).call(this),this.updateState("deck")}updateState(e){this.state=e}updateColumn(e){return this.column=e,this}open(){this.isOpen=!0}}T=new WeakSet,R=function(){this.image=te(this.type,this.number)},L=new WeakSet,F=function(){switch(this.type){case"back":this.color="none";break;case"diamond":this.color="red";break;case"heart":this.color="red";break;case"spade":this.color="black";break;case"clover":this.color="black";break;default:this.color="none";break}};var k,O,g,w,y,M,b,P;class re{constructor(e){m(this,k);m(this,g);m(this,y);m(this,b);a(this,"empty",new f("empty",0));a(this,"back",new f("back",0));a(this,"mode","development");a(this,"selector",[null,null]);a(this,"deck",{heart:[],diamond:[],spade:[],clover:[]});a(this,"store",[]);a(this,"pick",[]);a(this,"stack",{heart:[],diamond:[],spade:[],clover:[]});a(this,"ground",[[],[],[],[],[],[],[]]);a(this,"score",0);a(this,"move",0);a(this,"compareDeck",[0,0]);typeof e.mode=="number"?this.mode=e.mode?"development":"production":this.mode=e.mode||"development",u(this,k,O).call(this),this.mode==="development"?u(this,g,w).call(this):u(this,y,M).call(this),u(this,b,P).call(this)}countUpScore(){this.score+=1}countUpMove(){this.move+=1}regame(){this.selector=[null,null],this.deck={heart:[],diamond:[],spade:[],clover:[]},this.empty=new f("empty",0),this.back=new f("back",0),this.store=[],this.pick=[],this.stack={heart:[],diamond:[],spade:[],clover:[]},this.ground=[[],[],[],[],[],[],[]],this.score=0,this.move=0,u(this,k,O).call(this),this.mode==="development"?u(this,g,w).call(this):u(this,y,M).call(this),u(this,b,P).call(this)}findUsableColumn(){const e=this.ground.findIndex((i,s)=>i.length<s+1),t=this.ground[e];return[e,t]}addGroundColumn(e){const[t,i]=this.findUsableColumn();e.updateState("ground"),e.updateColumn(t),i.push(e),i.length===t+1&&e.open()}asList(){return Object.values(this.deck).flat(1)}getCardInDecks(){return this.asList().filter(e=>e.state==="deck")}getCardInGrounds(){return this.asList().filter(e=>e.state==="ground")}getCardInStacks(){return this.asList().filter(e=>e.state==="stack")}getCardInPicks(){return this.asList().filter(e=>e.state==="pick")}compareWith(e,t){return this.isStackableColorType(e,t)&&this.isStackableNumber(e,t)}isStackableColorType(e,t){return e.color!==t.color}isStackableNumber(e,t){return e.number+1===t.number}isStackDirectly(e){const t=this.stack[e.type],i=t.slice(-1)[0],s=e.column;if(e.state==="pick"){const o=this.pick,r=o.findIndex(d=>d.number===e.number&&d.type===e.type);if(r>-1&&(t.length===0&&e.number===1||i&&i.number+1===e.number))return o.splice(r)[0],this.moveToStack(e),!0}else if(this.ground[s]&&e.state!=="stack"){const o=this.ground[s].findIndex(r=>r.number===e.number&&r.type===e.type);if(o>-1&&(t.length===0&&e.number===1||i&&i.number+1===e.number)){const r=this.ground[s].splice(o)[0];return this.afterCardOpen(s),this.moveToStack(r),!0}}return!1}moveToGround(e,t){e.updateColumn(t),e.updateState("ground")}moveToStack(e){e.updateColumn(-1),e.updateState("stack"),this.stack[e.type].push(e)}moveToColumn(e,t){const i=e[0],s=i.column;if(i.state==="stack"){const o=this.stack[i.type].findIndex(r=>r.number===i.number&&r.type===i.type);if(o>-1){const r=this.stack[i.type].splice(o);this.ground[t].push(...r),this.afterCardOpen(t),this.moveToGround(i,t)}}else if(i.state==="ground"){const o=this.findOrderInColumn(i),r=this.ground[s].splice(o);this.ground[t].push(...r.map(d=>d.updateColumn(t))),this.afterCardOpen(s),this.moveToGround(i,t)}else if(i.state==="pick"){const o=this.findOrderInPickList(i),r=this.pick.splice(o);this.ground[t].push(...r.map(d=>d.updateColumn(t))),this.moveToGround(i,t)}}afterCardOpen(e){this.ground[e].slice(-1)[0]&&(this.ground[e].slice(-1)[0].isOpen=!0)}findOrderInColumn(e){return this.ground[e.column].findIndex(t=>t.type===e.type&&t.number===e.number)}findOrderInPickList(e){return this.pick.findIndex(t=>t.type===e.type&&t.number===e.number)}clearSelector(){this.selector[0]=null,this.selector[1]=null}}k=new WeakSet,O=function(){for(let e of h.TYPES)for(let t=1;t<=h.AMOUNT;t++){const i=new f(e,t);this.deck[e].push(i)}},g=new WeakSet,w=function(){const e=["heart","spade","diamond","clover"];for(let t=12;t>=0;t--){for(let i of e){const s=this.deck[i][t],o=e.findIndex(r=>r===i);s.updateState("ground"),s.updateColumn(o),s.open(),this.ground[o].push(s)}e.push(e.shift())}},y=new WeakSet,M=function(){for(let e=0;e<28;e++){const t=Math.floor(Math.random()*h.TYPES.length),i=Math.floor(Math.random()*h.AMOUNT),s=this.deck[h.TYPES[t]][i];if(s.state==="ground"){e--;continue}this.addGroundColumn(s)}},b=new WeakSet,P=function(){const e=this.getCardInDecks();for(;e.length!==0;){const t=e.splice(Math.floor(Math.random()*e.length),1)[0];this.store.push(t)}};const z=new re({mode:0}),W=new ie(z);new Q(z,W);W.render();
