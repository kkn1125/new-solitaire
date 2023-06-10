var F=Object.defineProperty;var U=(o,e,t)=>e in o?F(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var a=(o,e,t)=>(U(o,typeof e!="symbol"?e+"":e,t),t),K=(o,e,t)=>{if(!e.has(o))throw TypeError("Cannot "+t)};var m=(o,e,t)=>{if(e.has(o))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(o):e.set(o,t)};var l=(o,e,t)=>(K(o,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();var y,N;class W{constructor(e,t){m(this,y);a(this,"solitaire");a(this,"renderer");l(this,y,N).call(this),this.solitaire=e,this.renderer=t}handleResize(){innerWidth>768?this.renderer.update():this.renderer.update()}removeAllListeners(){window.removeEventListener("click",this.handleSelectCard.bind(this)),window.removeEventListener("click",this.handleDeckToPick.bind(this)),window.removeEventListener("click",this.handleRestartGame.bind(this)),window.removeEventListener("resize",this.handleResize.bind(this))}handleRestartGame(e){e.target.id==="restart"&&(this.solitaire.regame(),this.renderer.render())}convertElToCard(e){return this.solitaire.deck[e.dataset.cardType].find(t=>t.number===Number(e.dataset.cardNumber))}handleDeckToPick(e){const t=e.target;if(t&&t.closest("#deck")){const s=this.solitaire.store;if(s.length>0){const i=s.shift();i.updateState("pick"),i.open(),this.solitaire.pick.push(i)}else this.solitaire.store.push(...this.solitaire.pick.splice(0).map(i=>(i.isOpen=!1,i.updateColumn(-1),i.updateState("deck"),i)));this.renderer.update()}}handleSelectCard(e){const t=e.target;if(document.querySelectorAll(".card").forEach(r=>{const s=r.dataset.cardType,i=Number(r.dataset.cardNumber),n=this.solitaire.deck[s].find(d=>d.number===i);n&&(n.selected=!1,r.classList.remove("selected"))}),t){const r=t.closest(".empty"),s=this.solitaire.selector;if(r&&s[0]!==null&&s[0][0].number===13){const i=t.parentElement,d=[...i.parentElement.children].findIndex(c=>c===i);console.log("good"),this.solitaire.moveToColumn(s[0],d)}else r&&s[0]!==null&&s[0][0].number!==13&&console.log("bad");if(t.closest(".card")){const i=t.closest(".card"),n=i.dataset.cardType,d=Number(i.dataset.cardNumber),c=this.solitaire.deck[n].find(h=>h.number===d);if(i.dataset.cardOpen==="true")if(c.selected)c.selected=!1;else if(s[0]===null){const h=i.dataset.cardState,O=i.parentNode,R=Array.from(O.children).slice(-1)[0];if((h==="ground"||h==="pick"||h==="stack")&&R===i){if(this.solitaire.isStackDirectly(c)){this.solitaire.clearSelector(),c.selected=!1,i.classList.remove("selected"),this.renderer.update();return}c.selected=!0,s[0]=[c]}else if(h==="ground"){const w=Array.from(O.children).filter(p=>p.classList.contains("card")).map(this.convertElToCard.bind(this)),x=w.findIndex(p=>p.type===c.type&&p.number===c.number);if(x>-1){const p=w.slice(x);p.forEach(z=>z.selected=!0),s[0]=p}}}else s[1]===null&&(s[1]=c,this.solitaire.compareWith(s[0][0],s[1])?(console.log("good"),this.solitaire.moveToColumn(s[0],s[1].column)):console.log("bad"),this.solitaire.clearSelector(),c.selected=!1,i.classList.remove("selected"));this.renderer.update()}else this.solitaire.clearSelector(),this.renderer.update()}}}y=new WeakSet,N=function(){window.addEventListener("click",this.handleSelectCard.bind(this)),window.addEventListener("click",this.handleDeckToPick.bind(this)),window.addEventListener("click",this.handleRestartGame.bind(this)),window.addEventListener("resize",this.handleResize.bind(this))};const u={TYPES:["heart","diamond","spade","clover"],SHAPE:{heart:"♥",diamond:"◆",spade:"♠",clover:"♣"},TAG:{1:"A",2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:"J",12:"Q",13:"K"},AMOUNT:13},Y=document.querySelector("#app"),P=()=>document.querySelector("#ground"),j=()=>document.querySelector("#stack"),A=()=>document.querySelector("#pick"),M=()=>document.querySelector("#deck"),_=(o,e)=>`/new-solitaire/cards/${o}_${e}.png`,$=()=>innerWidth>768,S=o=>$()?`background-image: url('${o.image}');`:"",T=o=>`${$()?"<!--":""}
  <div class="card-top">
    <span>
      ${u.SHAPE[o.type]}
    </span>
    <span>
      ${u.TAG[o.number]}
    </span>
  </div>
  <div class="card-mid">
    ${u.SHAPE[o.type]}
  </div>
  <div class="card-bottom">
    <span>
      ${u.SHAPE[o.type]}
    </span>
    <span>
      ${u.TAG[o.number]}
    </span>
  </div>
  ${$()?"-->":""}`;class J{constructor(e){a(this,"solitaire");this.solitaire=e}layout(){Y.innerHTML=`
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
    `}ground(){return this.solitaire.ground.forEach((t,r)=>{P().children[r].innerHTML='<div class="empty"></div>',P().children[r].innerHTML+=t.map((s,i)=>this.groundCardForm(s,i)).join("")})}stack(){const e=this.solitaire.stack,t='<div class="empty"></div>',r=s=>j().querySelector(`#${s}-stack`);Object.entries(e).forEach(([s,i])=>{r(s).innerHTML=t,i.forEach((n,d)=>{r(n.type).innerHTML+=this.stackCardForm(n,d)})})}pick(){const e=this.solitaire.pick.slice(-3);return A().innerHTML='<div class="empty"></div>',e.forEach((t,r)=>{A().innerHTML+=this.pickCardForm(t,r)})}render(){this.layout(),this.update()}update(){this.ground(),this.pick(),this.stack(),this.isEmptyDeck()}isEmptyDeck(){this.solitaire.getCardInDecks().length===0?M().querySelector(".back").classList.add("zero"):M().querySelector(".back").classList.remove("zero")}stackCardForm(e,t){return`
      <div
      class="card${e.selected?" selected":""}"
      data-card-column="${e.column}"
      data-card-open="${e.isOpen}"
      data-card-number="${e.number}"
      data-card-type="${e.type}"
      data-card-state="${e.state}"
      style="top: 0px; left: 0px; ${S(e)}">
      ${T(e)}
      </div>
    `}groundCardForm(e,t){return`<div
    class="card${e.selected?" selected":""}"
    data-card-column="${e.column}"
    data-card-open="${e.isOpen}"
    data-card-number="${e.number}"
    data-card-type="${e.type}"
    data-card-state="${e.state}"
    style="top: ${t*22}px; ${S(e)}">
    ${T(e)}
  </div>`}pickCardForm(e,t){return`
    <div
    class="card${e.selected?" selected":""}"
    data-card-column="${e.column}"
    data-card-open="${e.isOpen}"
    data-card-number="${e.number}"
    data-card-type="${e.type}"
    data-card-state="${e.state}"
    style="left: ${t*22}px; ${S(e)}">
    ${T(e)}
    </div>
  `}}var g,D,C,G;class v{constructor(e,t){m(this,g);m(this,C);a(this,"type","back");a(this,"number",0);a(this,"selected",!1);a(this,"state","deck");a(this,"color","none");a(this,"image","");a(this,"isOpen",!1);a(this,"column",-1);this.type=e,this.number=t,l(this,C,G).call(this),l(this,g,D).call(this),this.updateState("deck")}updateState(e){this.state=e}updateColumn(e){return this.column=e,this}open(){this.isOpen=!0}}g=new WeakSet,D=function(){this.image=_(this.type,this.number)},C=new WeakSet,G=function(){switch(this.type){case"back":this.color="none";break;case"diamond":this.color="red";break;case"heart":this.color="red";break;case"spade":this.color="black";break;case"clover":this.color="black";break;default:this.color="none";break}};var k,L,f,E,b,I;class Q{constructor(){m(this,k);m(this,f);m(this,b);a(this,"empty",new v("empty",0));a(this,"back",new v("back",0));a(this,"selector",[null,null]);a(this,"deck",{heart:[],diamond:[],spade:[],clover:[]});a(this,"store",[]);a(this,"pick",[]);a(this,"stack",{heart:[],diamond:[],spade:[],clover:[]});a(this,"ground",[[],[],[],[],[],[],[]]);l(this,k,L).call(this),l(this,f,E).call(this),l(this,b,I).call(this)}regame(){this.selector=[null,null],this.deck={heart:[],diamond:[],spade:[],clover:[]},this.empty=new v("empty",0),this.back=new v("back",0),this.store=[],this.pick=[],this.stack={heart:[],diamond:[],spade:[],clover:[]},this.ground=[[],[],[],[],[],[],[]],l(this,k,L).call(this),l(this,f,E).call(this),l(this,b,I).call(this)}findUsableColumn(){const e=this.ground.findIndex((r,s)=>r.length<s+1),t=this.ground[e];return[e,t]}addGroundColumn(e){const[t,r]=this.findUsableColumn();e.updateState("ground"),e.updateColumn(t),r.push(e),r.length===t+1&&e.open()}asList(){return Object.values(this.deck).flat(1)}getCardInDecks(){return this.asList().filter(e=>e.state==="deck")}getCardInGrounds(){return this.asList().filter(e=>e.state==="ground")}getCardInStacks(){return this.asList().filter(e=>e.state==="stack")}getCardInPicks(){return this.asList().filter(e=>e.state==="pick")}compareWith(e,t){return this.isStackableColorType(e,t)&&this.isStackableNumber(e,t)}isStackableColorType(e,t){return e.color!==t.color}isStackableNumber(e,t){return e.number+1===t.number}isStackDirectly(e){const t=this.stack[e.type],r=t.slice(-1)[0],s=e.column;if(e.state==="pick"){const i=this.pick,n=i.findIndex(d=>d.number===e.number&&d.type===e.type);if(n>-1&&(t.length===0&&e.number===1||r&&r.number+1===e.number))return i.splice(n)[0],this.moveToStack(e),!0}else if(this.ground[s]&&e.state!=="stack"){const i=this.ground[s].findIndex(n=>n.number===e.number&&n.type===e.type);if(i>-1&&(t.length===0&&e.number===1||r&&r.number+1===e.number)){const n=this.ground[s].splice(i)[0];return this.afterCardOpen(s),this.moveToStack(n),!0}}return!1}moveToGround(e,t){e.updateColumn(t),e.updateState("ground")}moveToStack(e){e.updateColumn(-1),e.updateState("stack"),this.stack[e.type].push(e)}moveToColumn(e,t){const r=e[0],s=r.column;if(r.state==="stack"){const i=this.stack[r.type].findIndex(n=>n.number===r.number&&n.type===r.type);if(i>-1){const n=this.stack[r.type].splice(i);this.ground[t].push(...n),this.afterCardOpen(t),this.moveToGround(r,t)}}else if(r.state==="ground"){const i=this.findOrderInColumn(r),n=this.ground[s].splice(i);this.ground[t].push(...n.map(d=>d.updateColumn(t))),this.afterCardOpen(s),this.moveToGround(r,t)}else if(r.state==="pick"){const i=this.findOrderInPickList(r),n=this.pick.splice(i);this.ground[t].push(...n.map(d=>d.updateColumn(t))),this.moveToGround(r,t)}}afterCardOpen(e){this.ground[e].slice(-1)[0]&&(this.ground[e].slice(-1)[0].isOpen=!0)}findOrderInColumn(e){return this.ground[e.column].findIndex(t=>t.type===e.type&&t.number===e.number)}findOrderInPickList(e){return this.pick.findIndex(t=>t.type===e.type&&t.number===e.number)}clearSelector(){this.selector[0]=null,this.selector[1]=null}}k=new WeakSet,L=function(){for(let e of u.TYPES)for(let t=1;t<=u.AMOUNT;t++){const r=new v(e,t);this.deck[e].push(r)}},f=new WeakSet,E=function(){for(let e=0;e<28;e++){const t=Math.floor(Math.random()*u.TYPES.length),r=Math.floor(Math.random()*u.AMOUNT),s=this.deck[u.TYPES[t]][r];if(s.state==="ground"){e--;continue}this.addGroundColumn(s)}},b=new WeakSet,I=function(){const e=this.getCardInDecks();for(;e.length!==0;){const t=e.splice(Math.floor(Math.random()*e.length),1)[0];this.store.push(t)}};const H=new Q,q=new J(H);new W(H,q);q.render();
