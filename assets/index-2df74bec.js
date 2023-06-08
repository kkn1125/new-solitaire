var w=Object.defineProperty;var G=(o,e,t)=>e in o?w(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var d=(o,e,t)=>(G(o,typeof e!="symbol"?e+"":e,t),t),D=(o,e,t)=>{if(!e.has(o))throw TypeError("Cannot "+t)};var p=(o,e,t)=>{if(e.has(o))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(o):e.set(o,t)};var m=(o,e,t)=>(D(o,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();var v,A;class q{constructor(e,t){p(this,v);d(this,"solitaire");d(this,"renderer");m(this,v,A).call(this),this.solitaire=e,this.renderer=t}convertElToCard(e){return this.solitaire.deck[e.dataset.cardType][Number(e.dataset.cardNumber)-1]}handleDeckToPick(e){const t=e.target;if(t&&t.closest("#deck")){const s=this.solitaire.getCardInDecks();if(s.length>0){const n=s.splice(-1)[0];n.updateState("pick"),n.open()}this.renderer.update()}}handleSelectCard(e){const t=e.target;if(document.querySelectorAll(".card").forEach(i=>{const s=i.dataset.cardType,n=Number(i.dataset.cardNumber),r=this.solitaire.deck[s][n-1];r&&(r.selected=!1,i.classList.remove("selected"))}),t){const i=t.closest(".empty"),s=this.solitaire.selector;if(i&&s[0]!==null&&s[0][0].number===13){const n=t.parentElement,l=[...n.parentElement.children].findIndex(c=>c===n);console.log("good"),this.solitaire.moveToColumn(s[0],l)}else i&&s[0]!==null&&s[0][0].number!==13&&console.log("bad");if(t.closest(".card")){const n=t.closest(".card"),r=n.dataset.cardType,l=Number(n.dataset.cardNumber),c=this.solitaire.deck[r][l-1];if(n.dataset.cardOpen==="true")if(c.selected)c.selected=!1;else if(c.selected=!0,s[0]===null){const h=n.dataset.cardState,C=n.parentNode,H=Array.from(C.children).slice(-1)[0];if((h==="ground"||h==="pick"||h==="stack")&&H===n){if(this.solitaire.isStackDirectly(c)){console.log(1),this.solitaire.clearSelector(),c.selected=!1,n.classList.remove("selected"),this.renderer.update();return}c.selected=!0,s[0]=[c]}else if(h==="ground"){const S=Array.from(C.children).filter(u=>u.classList.contains("card")).map(this.convertElToCard.bind(this)),$=S.findIndex(u=>u.type===c.type&&u.number===c.number);if($>-1){const u=S.slice($);u.forEach(M=>M.selected=!0),s[0]=u}}}else console.log(s[0]),console.log(s[1]),s[1]===null&&(s[1]=c,this.solitaire.compareWith(s[0][0],s[1])?(console.log("good"),this.solitaire.moveToColumn(s[0],s[1].column)):console.log("bad"),this.solitaire.clearSelector(),c.selected=!1,n.classList.remove("selected"));this.renderer.update()}else this.solitaire.clearSelector(),this.renderer.update()}}}v=new WeakSet,A=function(){window.addEventListener("click",this.handleSelectCard.bind(this)),window.addEventListener("click",this.handleDeckToPick.bind(this))};const a={TYPES:["heart","diamond","spade","clover"],SHAPE:{heart:"♥",diamond:"◆",spade:"♠",clover:"♣"},TAG:{1:"A",2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:"J",12:"Q",13:"K"},AMOUNT:13},F=document.querySelector("#app"),T=()=>document.querySelector("#ground"),U=()=>document.querySelector("#stack"),E=()=>document.querySelector("#pick"),K=(o,e)=>`/cards/${o}_${e}.png`;class Y{constructor(e){d(this,"solitaire");this.solitaire=e}layout(){F.innerHTML=`
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
    `}ground(){return this.solitaire.ground.forEach((t,i)=>{T().children[i].innerHTML='<div class="empty"></div>',T().children[i].innerHTML+=t.map((s,n)=>this.groundCardForm(s,n)).join("")})}stack(){const e=this.solitaire.stack,t='<div class="empty"></div>',i=s=>U().querySelector(`#${s}-stack`);Object.entries(e).forEach(([s,n])=>{i(s).innerHTML=t,n.forEach((r,l)=>{i(r.type).innerHTML+=this.stackCardForm(r,l)})})}pick(){const e=this.solitaire.getCardInPicks().reverse().slice(-3);return E().innerHTML='<div class="empty"></div>',e.forEach((t,i)=>{E().innerHTML+=this.pickCardForm(t,i)})}render(){this.layout(),this.update()}update(){this.ground(),this.pick(),this.stack()}stackCardForm(e,t){return`
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
            ${a.SHAPE[e.type]}
          </span>
          <span>
            ${a.TAG[e.number]}
          </span>
        </div>
        <div class="card-mid">
          ${a.SHAPE[e.type]}
        </div>
        <div class="card-bottom">
          <span>
            ${a.SHAPE[e.type]}
          </span>
          <span>
            ${a.TAG[e.number]}
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
          ${a.SHAPE[e.type]}
        </span>
        <span>
          ${a.TAG[e.number]}
        </span>
      </div>
      <div class="card-mid">
        ${a.SHAPE[e.type]}
      </div>
      <div class="card-bottom">
        <span>
          ${a.SHAPE[e.type]}
        </span>
        <span>
          ${a.TAG[e.number]}
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
          ${a.SHAPE[e.type]}
        </span>
        <span>
          ${a.TAG[e.number]}
        </span>
      </div>
      <div class="card-mid">
        ${a.SHAPE[e.type]}
      </div>
      <div class="card-bottom">
        <span>
          ${a.SHAPE[e.type]}
        </span>
        <span>
          ${a.TAG[e.number]}
        </span>
      </div>
    -->
    </div>
  `}}var f,O,k,P;class b{constructor(e,t){p(this,f);p(this,k);d(this,"type","back");d(this,"number",0);d(this,"selected",!1);d(this,"state","deck");d(this,"color","none");d(this,"image","");d(this,"isOpen",!1);d(this,"column",-1);this.type=e,this.number=t,m(this,k,P).call(this),m(this,f,O).call(this),this.updateState("deck")}updateState(e){this.state=e}updateColumn(e){return this.column=e,this}open(){this.isOpen=!0}}f=new WeakSet,O=function(){this.image=K(this.type,this.number)},k=new WeakSet,P=function(){switch(this.type){case"back":this.color="none";break;case"diamond":this.color="red";break;case"heart":this.color="red";break;case"spade":this.color="black";break;case"clover":this.color="black";break;default:this.color="none";break}};var y,I,g,L;class j{constructor(){p(this,y);p(this,g);d(this,"selector",[null,null]);d(this,"deck",{heart:[],diamond:[],spade:[],clover:[]});d(this,"empty",new b("empty",0));d(this,"back",new b("back",0));d(this,"stack",{heart:[],diamond:[],spade:[],clover:[]});d(this,"ground",[[],[],[],[],[],[],[]]);m(this,y,I).call(this),m(this,g,L).call(this),console.log(this.deck),console.log(this.ground)}findUsableColumn(){const e=this.ground.findIndex((i,s)=>i.length<s+1),t=this.ground[e];return[e,t]}addGroundColumn(e){const[t,i]=this.findUsableColumn();e.updateState("ground"),e.updateColumn(t),i.push(e),i.length===t+1&&e.open()}asList(){return Object.values(this.deck).flat(1)}getCardInDecks(){return this.asList().filter(e=>e.state==="deck")}getCardInGrounds(){return this.asList().filter(e=>e.state==="ground")}getCardInStacks(){return this.asList().filter(e=>e.state==="stack")}getCardInPicks(){return this.asList().filter(e=>e.state==="pick")}compareWith(e,t){return this.isStackableColorType(e,t)&&this.isStackableNumber(e,t)}isStackableColorType(e,t){return e.color!==t.color}isStackableNumber(e,t){return e.number+1===t.number}isStackDirectly(e){const t=this.stack[e.type],i=t.slice(-1)[0],s=e.column;if(console.log(e.state),e.state==="pick"){const n=this.getCardInPicks(),r=n.findIndex(l=>l.number===e.number&&l.type===e.type);if(r>-1&&(t.length===0&&e.number===1||i&&i.number+1===e.number)){const l=n.splice(r)[0];return console.log(e,l),this.moveToStack(e),!0}}else if(this.ground[s]&&e.state!=="stack"){const n=this.ground[s].findIndex(r=>r.number===e.number&&r.type===e.type);if(n>-1&&(t.length===0&&e.number===1||i&&i.number+1===e.number)){const r=this.ground[s].splice(n)[0];return console.log(r),console.log(t),console.log(i),this.afterCardOpen(s),this.moveToStack(r),!0}}return!1}moveToGround(e,t){e.updateColumn(t),e.updateState("ground")}moveToStack(e){e.updateColumn(-1),e.updateState("stack"),this.stack[e.type].push(e)}moveToColumn(e,t){const i=e[0],s=i.column;if(i.state==="stack"){const n=this.stack[i.type].findIndex(r=>r.number===i.number&&r.type===i.type);if(n>-1){const r=this.stack[i.type].splice(n);this.ground[t].push(...r),this.afterCardOpen(t),i.updateColumn(t),i.updateState("ground")}}else if(i.state==="ground"){const n=this.findOrderInColumn(i),r=this.ground[s].splice(n);this.ground[t].push(...r.map(l=>l.updateColumn(t))),this.afterCardOpen(s),i.updateColumn(t),i.updateState("ground")}else i.state==="pick"&&(i.updateColumn(t),i.updateState("ground"),this.ground[t].push(i))}afterCardOpen(e){this.ground[e].slice(-1)[0]&&(this.ground[e].slice(-1)[0].isOpen=!0)}findOrderInColumn(e){return this.ground[e.column].findIndex(t=>t.type===e.type&&t.number===e.number)}clearSelector(){this.selector[0]=null,this.selector[1]=null}}y=new WeakSet,I=function(){for(let e of a.TYPES)for(let t=1;t<=a.AMOUNT;t++){const i=new b(e,t);this.deck[e].push(i)}},g=new WeakSet,L=function(){for(let e=0;e<28;e++){const t=Math.floor(Math.random()*a.TYPES.length),i=Math.floor(Math.random()*a.AMOUNT),s=this.deck[a.TYPES[t]][i];if(s.state==="ground"){e--;continue}this.addGroundColumn(s)}};const x=new j,N=new Y(x);new q(x,N);N.render();
