var N=Object.defineProperty;var H=(a,e,t)=>e in a?N(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var o=(a,e,t)=>(H(a,typeof e!="symbol"?e+"":e,t),t),D=(a,e,t)=>{if(!e.has(a))throw TypeError("Cannot "+t)};var h=(a,e,t)=>{if(e.has(a))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(a):e.set(a,t)};var u=(a,e,t)=>(D(a,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();var b,O;class q{constructor(e,t){h(this,b);o(this,"solitaire");o(this,"renderer");u(this,b,O).call(this),this.solitaire=e,this.renderer=t}removeAllListeners(){window.removeEventListener("click",this.handleSelectCard.bind(this)),window.removeEventListener("click",this.handleDeckToPick.bind(this)),window.removeEventListener("click",this.handleRestartGame.bind(this))}handleRestartGame(e){e.target.id==="restart"&&(this.solitaire.regame(),this.renderer.render())}convertElToCard(e){return this.solitaire.deck[e.dataset.cardType].find(t=>t.number===Number(e.dataset.cardNumber))}handleDeckToPick(e){const t=e.target;if(t&&t.closest("#deck")){const s=this.solitaire.getCardInDecks();if(s.length>0){const n=s.splice(Math.floor(Math.random()*s.length))[0];n.updateState("pick"),n.open(),this.solitaire.pick.push(n)}this.renderer.update()}}handleSelectCard(e){const t=e.target;if(document.querySelectorAll(".card").forEach(i=>{const s=i.dataset.cardType,n=Number(i.dataset.cardNumber),r=this.solitaire.deck[s].find(c=>c.number===n);r&&(r.selected=!1,i.classList.remove("selected"))}),t){const i=t.closest(".empty"),s=this.solitaire.selector;if(i&&s[0]!==null&&s[0][0].number===13){const n=t.parentElement,c=[...n.parentElement.children].findIndex(l=>l===n);console.log("good"),this.solitaire.moveToColumn(s[0],c)}else i&&s[0]!==null&&s[0][0].number!==13&&console.log("bad");if(t.closest(".card")){const n=t.closest(".card"),r=n.dataset.cardType,c=Number(n.dataset.cardNumber),l=this.solitaire.deck[r].find(p=>p.number===c);if(n.dataset.cardOpen==="true")if(l.selected)l.selected=!1;else if(s[0]===null){const p=n.dataset.cardState,T=n.parentNode,G=Array.from(T.children).slice(-1)[0];if((p==="ground"||p==="pick"||p==="stack")&&G===n){if(this.solitaire.isStackDirectly(l)){this.solitaire.clearSelector(),l.selected=!1,n.classList.remove("selected"),this.renderer.update();return}l.selected=!0,s[0]=[l]}else if(p==="ground"){const $=Array.from(T.children).filter(m=>m.classList.contains("card")).map(this.convertElToCard.bind(this)),E=$.findIndex(m=>m.type===l.type&&m.number===l.number);if(E>-1){const m=$.slice(E);m.forEach(M=>M.selected=!0),s[0]=m}}}else s[1]===null&&(s[1]=l,this.solitaire.compareWith(s[0][0],s[1])?(console.log("good"),this.solitaire.moveToColumn(s[0],s[1].column)):console.log("bad"),this.solitaire.clearSelector(),l.selected=!1,n.classList.remove("selected"));this.renderer.update()}else this.solitaire.clearSelector(),this.renderer.update()}}}b=new WeakSet,O=function(){window.addEventListener("click",this.handleSelectCard.bind(this)),window.addEventListener("click",this.handleDeckToPick.bind(this)),window.addEventListener("click",this.handleRestartGame.bind(this))};const d={TYPES:["heart","diamond","spade","clover"],SHAPE:{heart:"♥",diamond:"◆",spade:"♠",clover:"♣"},TAG:{1:"A",2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:"J",12:"Q",13:"K"},AMOUNT:13},F=document.querySelector("#app"),L=()=>document.querySelector("#ground"),R=()=>document.querySelector("#stack"),A=()=>document.querySelector("#pick"),U=()=>document.querySelector("#deck"),K=(a,e)=>`/new-solitaire/cards/${a}_${e}.png`;class Y{constructor(e){o(this,"solitaire");this.solitaire=e}layout(){F.innerHTML=`
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
    `}ground(){return this.solitaire.ground.forEach((t,i)=>{L().children[i].innerHTML='<div class="empty"></div>',L().children[i].innerHTML+=t.map((s,n)=>this.groundCardForm(s,n)).join("")})}stack(){const e=this.solitaire.stack,t='<div class="empty"></div>',i=s=>R().querySelector(`#${s}-stack`);Object.entries(e).forEach(([s,n])=>{i(s).innerHTML=t,n.forEach((r,c)=>{i(r.type).innerHTML+=this.stackCardForm(r,c)})})}pick(){const e=this.solitaire.pick.slice(-3);return A().innerHTML='<div class="empty"></div>',e.forEach((t,i)=>{A().innerHTML+=this.pickCardForm(t,i)})}render(){this.layout(),this.update()}update(){this.ground(),this.pick(),this.stack(),this.isEmptyDeck()}isEmptyDeck(){this.solitaire.getCardInDecks().length===0&&U().querySelector(".back").classList.add("zero")}stackCardForm(e,t){return`
      <div
      class="card${e.selected?" selected":""}"
      data-card-column="${e.column}"
      data-card-open="${e.isOpen}"
      data-card-number="${e.number}"
      data-card-type="${e.type}"
      data-card-state="${e.state}"
      style="top: 0px; left: 0px; background-image: url('${e.image}');">
      <!--
        <div class="card-top">
          <span>
            ${d.SHAPE[e.type]}
          </span>
          <span>
            ${d.TAG[e.number]}
          </span>
        </div>
        <div class="card-mid">
          ${d.SHAPE[e.type]}
        </div>
        <div class="card-bottom">
          <span>
            ${d.SHAPE[e.type]}
          </span>
          <span>
            ${d.TAG[e.number]}
          </span>
        </div>
      -->
      </div>
    `}groundCardForm(e,t){return`<div
    class="card${e.selected?" selected":""}"
    data-card-column="${e.column}"
    data-card-open="${e.isOpen}"
    data-card-number="${e.number}"
    data-card-type="${e.type}"
    data-card-state="${e.state}"
    style="top: ${t*22}px; background-image: url('${e.image}');">
    <!--
      <div class="card-top">
        <span>
          ${d.SHAPE[e.type]}
        </span>
        <span>
          ${d.TAG[e.number]}
        </span>
      </div>
      <div class="card-mid">
        ${d.SHAPE[e.type]}
      </div>
      <div class="card-bottom">
        <span>
          ${d.SHAPE[e.type]}
        </span>
        <span>
          ${d.TAG[e.number]}
        </span>
      </div>
    -->
  </div>`}pickCardForm(e,t){return`
    <div
    class="card${e.selected?" selected":""}"
    data-card-column="${e.column}"
    data-card-open="${e.isOpen}"
    data-card-number="${e.number}"
    data-card-type="${e.type}"
    data-card-state="${e.state}"
    style="left: ${t*22}px; background-image: url('${e.image}');">
    <!--
      <div class="card-top">
        <span>
          ${d.SHAPE[e.type]}
        </span>
        <span>
          ${d.TAG[e.number]}
        </span>
      </div>
      <div class="card-mid">
        ${d.SHAPE[e.type]}
      </div>
      <div class="card-bottom">
        <span>
          ${d.SHAPE[e.type]}
        </span>
        <span>
          ${d.TAG[e.number]}
        </span>
      </div>
    -->
    </div>
  `}}var y,I,g,P;class v{constructor(e,t){h(this,y);h(this,g);o(this,"type","back");o(this,"number",0);o(this,"selected",!1);o(this,"state","deck");o(this,"color","none");o(this,"image","");o(this,"isOpen",!1);o(this,"column",-1);this.type=e,this.number=t,u(this,g,P).call(this),u(this,y,I).call(this),this.updateState("deck")}updateState(e){this.state=e}updateColumn(e){return this.column=e,this}open(){this.isOpen=!0}}y=new WeakSet,I=function(){this.image=K(this.type,this.number)},g=new WeakSet,P=function(){switch(this.type){case"back":this.color="none";break;case"diamond":this.color="red";break;case"heart":this.color="red";break;case"spade":this.color="black";break;case"clover":this.color="black";break;default:this.color="none";break}};var k,S,f,C;class j{constructor(){h(this,k);h(this,f);o(this,"selector",[null,null]);o(this,"deck",{heart:[],diamond:[],spade:[],clover:[]});o(this,"empty",new v("empty",0));o(this,"back",new v("back",0));o(this,"pick",[]);o(this,"stack",{heart:[],diamond:[],spade:[],clover:[]});o(this,"ground",[[],[],[],[],[],[],[]]);u(this,k,S).call(this),u(this,f,C).call(this)}regame(){this.selector=[null,null],this.deck={heart:[],diamond:[],spade:[],clover:[]},this.empty=new v("empty",0),this.back=new v("back",0),this.pick=[],this.stack={heart:[],diamond:[],spade:[],clover:[]},this.ground=[[],[],[],[],[],[],[]],u(this,k,S).call(this),u(this,f,C).call(this)}findUsableColumn(){const e=this.ground.findIndex((i,s)=>i.length<s+1),t=this.ground[e];return[e,t]}addGroundColumn(e){const[t,i]=this.findUsableColumn();e.updateState("ground"),e.updateColumn(t),i.push(e),i.length===t+1&&e.open()}asList(){return Object.values(this.deck).flat(1)}getCardInDecks(){return this.asList().filter(e=>e.state==="deck")}getCardInGrounds(){return this.asList().filter(e=>e.state==="ground")}getCardInStacks(){return this.asList().filter(e=>e.state==="stack")}getCardInPicks(){return this.asList().filter(e=>e.state==="pick")}compareWith(e,t){return this.isStackableColorType(e,t)&&this.isStackableNumber(e,t)}isStackableColorType(e,t){return e.color!==t.color}isStackableNumber(e,t){return e.number+1===t.number}isStackDirectly(e){const t=this.stack[e.type],i=t.slice(-1)[0],s=e.column;if(e.state==="pick"){const n=this.pick,r=n.findIndex(c=>c.number===e.number&&c.type===e.type);if(r>-1&&(t.length===0&&e.number===1||i&&i.number+1===e.number))return n.splice(r)[0],this.moveToStack(e),!0}else if(this.ground[s]&&e.state!=="stack"){const n=this.ground[s].findIndex(r=>r.number===e.number&&r.type===e.type);if(n>-1&&(t.length===0&&e.number===1||i&&i.number+1===e.number)){const r=this.ground[s].splice(n)[0];return this.afterCardOpen(s),this.moveToStack(r),!0}}return!1}moveToGround(e,t){e.updateColumn(t),e.updateState("ground")}moveToStack(e){e.updateColumn(-1),e.updateState("stack"),this.stack[e.type].push(e)}moveToColumn(e,t){const i=e[0],s=i.column;if(i.state==="stack"){const n=this.stack[i.type].findIndex(r=>r.number===i.number&&r.type===i.type);if(n>-1){const r=this.stack[i.type].splice(n);this.ground[t].push(...r),this.afterCardOpen(t),this.moveToGround(i,t)}}else if(i.state==="ground"){const n=this.findOrderInColumn(i),r=this.ground[s].splice(n);this.ground[t].push(...r.map(c=>c.updateColumn(t))),this.afterCardOpen(s),this.moveToGround(i,t)}else if(i.state==="pick"){const n=this.findOrderInPickList(i),r=this.pick.splice(n);this.ground[t].push(...r.map(c=>c.updateColumn(t))),this.moveToGround(i,t)}}afterCardOpen(e){this.ground[e].slice(-1)[0]&&(this.ground[e].slice(-1)[0].isOpen=!0)}findOrderInColumn(e){return this.ground[e.column].findIndex(t=>t.type===e.type&&t.number===e.number)}findOrderInPickList(e){return this.pick.findIndex(t=>t.type===e.type&&t.number===e.number)}clearSelector(){this.selector[0]=null,this.selector[1]=null}}k=new WeakSet,S=function(){for(let e of d.TYPES)for(let t=1;t<=d.AMOUNT;t++){const i=new v(e,t);this.deck[e].push(i)}},f=new WeakSet,C=function(){for(let e=0;e<28;e++){const t=Math.floor(Math.random()*d.TYPES.length),i=Math.floor(Math.random()*d.AMOUNT),s=this.deck[d.TYPES[t]][i];if(s.state==="ground"){e--;continue}this.addGroundColumn(s)}};const w=new j,x=new Y(w);new q(w,x);x.render();
