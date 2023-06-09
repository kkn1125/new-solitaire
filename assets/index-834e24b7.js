var H=Object.defineProperty;var D=(r,e,t)=>e in r?H(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var c=(r,e,t)=>(D(r,typeof e!="symbol"?e+"":e,t),t),q=(r,e,t)=>{if(!e.has(r))throw TypeError("Cannot "+t)};var m=(r,e,t)=>{if(e.has(r))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(r):e.set(r,t)};var v=(r,e,t)=>(q(r,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();var f,E;class F{constructor(e,t){m(this,f);c(this,"solitaire");c(this,"renderer");v(this,f,E).call(this),this.solitaire=e,this.renderer=t}convertElToCard(e){return this.solitaire.deck[e.dataset.cardType].find(t=>t.number===Number(e.dataset.cardNumber))}handleDeckToPick(e){const t=e.target;if(t&&t.closest("#deck")){const s=this.solitaire.getCardInDecks();if(s.length>0){const n=s.splice(Math.floor(Math.random()*s.length))[0];n.updateState("pick"),n.open(),this.solitaire.pick.push(n)}this.renderer.update()}}handleSelectCard(e){const t=e.target;if(document.querySelectorAll(".card").forEach(i=>{const s=i.dataset.cardType,n=Number(i.dataset.cardNumber),o=this.solitaire.deck[s].find(d=>d.number===n);o&&(o.selected=!1,i.classList.remove("selected"))}),t){const i=t.closest(".empty"),s=this.solitaire.selector;if(i&&s[0]!==null&&s[0][0].number===13){const n=t.parentElement,d=[...n.parentElement.children].findIndex(l=>l===n);console.log("good"),this.solitaire.moveToColumn(s[0],d)}else i&&s[0]!==null&&s[0][0].number!==13&&console.log("bad");if(t.closest(".card")){const n=t.closest(".card"),o=n.dataset.cardType,d=Number(n.dataset.cardNumber),l=this.solitaire.deck[o].find(u=>u.number===d);if(n.dataset.cardOpen==="true")if(l.selected)l.selected=!1;else if(s[0]===null){const u=n.dataset.cardState,C=n.parentNode,N=Array.from(C.children).slice(-1)[0];if((u==="ground"||u==="pick"||u==="stack")&&N===n){if(this.solitaire.isStackDirectly(l)){console.log(1),this.solitaire.clearSelector(),l.selected=!1,n.classList.remove("selected"),this.renderer.update();return}console.log("[SYS] Selected Card",l),l.selected=!0,s[0]=[l]}else if(u==="ground"){const T=Array.from(C.children).filter(p=>p.classList.contains("card")).map(this.convertElToCard.bind(this)),$=T.findIndex(p=>p.type===l.type&&p.number===l.number);if($>-1){const p=T.slice($);p.forEach(G=>G.selected=!0),s[0]=p}}}else console.log(s[0]),console.log(s[1]),s[1]===null&&(s[1]=l,this.solitaire.compareWith(s[0][0],s[1])?(console.log("good"),this.solitaire.moveToColumn(s[0],s[1].column)):console.log("bad"),this.solitaire.clearSelector(),l.selected=!1,n.classList.remove("selected"));this.renderer.update()}else this.solitaire.clearSelector(),this.renderer.update()}}}f=new WeakSet,E=function(){window.addEventListener("click",this.handleSelectCard.bind(this)),window.addEventListener("click",this.handleDeckToPick.bind(this))};const a={TYPES:["heart","diamond","spade","clover"],SHAPE:{heart:"♥",diamond:"◆",spade:"♠",clover:"♣"},TAG:{1:"A",2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:"J",12:"Q",13:"K"},AMOUNT:13},Y=document.querySelector("#app"),O=()=>document.querySelector("#ground"),U=()=>document.querySelector("#stack"),M=()=>document.querySelector("#pick"),K=()=>document.querySelector("#deck"),j=(r,e)=>`/new-solitaire/cards/${r}_${e}.png`;class R{constructor(e){c(this,"solitaire");this.solitaire=e}layout(){Y.innerHTML=`
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
    `}ground(){return this.solitaire.ground.forEach((t,i)=>{O().children[i].innerHTML='<div class="empty"></div>',O().children[i].innerHTML+=t.map((s,n)=>this.groundCardForm(s,n)).join("")})}stack(){const e=this.solitaire.stack,t='<div class="empty"></div>',i=s=>U().querySelector(`#${s}-stack`);Object.entries(e).forEach(([s,n])=>{i(s).innerHTML=t,n.forEach((o,d)=>{i(o.type).innerHTML+=this.stackCardForm(o,d)})})}pick(){const e=this.solitaire.pick.slice(-3);return M().innerHTML='<div class="empty"></div>',e.forEach((t,i)=>{M().innerHTML+=this.pickCardForm(t,i)})}render(){this.layout(),this.update()}update(){this.ground(),this.pick(),this.stack(),this.isEmptyDeck()}isEmptyDeck(){this.solitaire.getCardInDecks().length===0&&K().querySelector(".back").classList.add("zero")}stackCardForm(e,t){return`
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
  `}}var k,A,y,I;class h{constructor(e,t){m(this,k);m(this,y);c(this,"type","back");c(this,"number",0);c(this,"selected",!1);c(this,"state","deck");c(this,"color","none");c(this,"image","");c(this,"isOpen",!1);c(this,"column",-1);this.type=e,this.number=t,v(this,y,I).call(this),v(this,k,A).call(this),this.updateState("deck")}updateState(e){this.state=e}updateColumn(e){return this.column=e,this}open(){this.isOpen=!0}}k=new WeakSet,A=function(){this.image=j(this.type,this.number)},y=new WeakSet,I=function(){switch(this.type){case"back":this.color="none";break;case"diamond":this.color="red";break;case"heart":this.color="red";break;case"spade":this.color="black";break;case"clover":this.color="black";break;default:this.color="none";break}};var b,L,S,_,g,P;class W{constructor(){m(this,b);m(this,S);m(this,g);c(this,"selector",[null,null]);c(this,"deck",{heart:[],diamond:[],spade:[],clover:[]});c(this,"empty",new h("empty",0));c(this,"back",new h("back",0));c(this,"pick",[]);c(this,"stack",{heart:[],diamond:[],spade:[],clover:[]});c(this,"ground",[[],[],[],[],[],[],[]]);v(this,b,L).call(this),v(this,g,P).call(this),console.log(this.deck),console.log(this.ground)}findUsableColumn(){const e=this.ground.findIndex((i,s)=>i.length<s+1),t=this.ground[e];return[e,t]}addGroundColumn(e){const[t,i]=this.findUsableColumn();e.updateState("ground"),e.updateColumn(t),i.push(e),i.length===t+1&&e.open()}asList(){return Object.values(this.deck).flat(1)}getCardInDecks(){return this.asList().filter(e=>e.state==="deck")}getCardInGrounds(){return this.asList().filter(e=>e.state==="ground")}getCardInStacks(){return this.asList().filter(e=>e.state==="stack")}getCardInPicks(){return this.asList().filter(e=>e.state==="pick")}compareWith(e,t){return this.isStackableColorType(e,t)&&this.isStackableNumber(e,t)}isStackableColorType(e,t){return e.color!==t.color}isStackableNumber(e,t){return e.number+1===t.number}isStackDirectly(e){const t=this.stack[e.type],i=t.slice(-1)[0],s=e.column;if(console.log(e.state),e.state==="pick"){const n=this.pick,o=n.findIndex(d=>d.number===e.number&&d.type===e.type);if(o>-1&&(t.length===0&&e.number===1||i&&i.number+1===e.number)){const d=n.splice(o)[0];return console.log(e,d),this.moveToStack(e),!0}}else if(this.ground[s]&&e.state!=="stack"){const n=this.ground[s].findIndex(o=>o.number===e.number&&o.type===e.type);if(n>-1&&(t.length===0&&e.number===1||i&&i.number+1===e.number)){const o=this.ground[s].splice(n)[0];return console.log(o),console.log(t),console.log(i),this.afterCardOpen(s),this.moveToStack(o),!0}}return!1}moveToGround(e,t){e.updateColumn(t),e.updateState("ground")}moveToStack(e){e.updateColumn(-1),e.updateState("stack"),this.stack[e.type].push(e)}moveToColumn(e,t){const i=e[0],s=i.column;if(i.state==="stack"){const n=this.stack[i.type].findIndex(o=>o.number===i.number&&o.type===i.type);if(n>-1){const o=this.stack[i.type].splice(n);this.ground[t].push(...o),this.afterCardOpen(t),this.moveToGround(i,t)}}else if(i.state==="ground"){const n=this.findOrderInColumn(i),o=this.ground[s].splice(n);this.ground[t].push(...o.map(d=>d.updateColumn(t))),this.afterCardOpen(s),this.moveToGround(i,t)}else if(i.state==="pick"){const n=this.findOrderInPickList(i),o=this.pick.splice(n);this.ground[t].push(...o.map(d=>d.updateColumn(t))),this.moveToGround(i,t)}}afterCardOpen(e){this.ground[e].slice(-1)[0]&&(this.ground[e].slice(-1)[0].isOpen=!0)}findOrderInColumn(e){return this.ground[e.column].findIndex(t=>t.type===e.type&&t.number===e.number)}findOrderInPickList(e){return this.pick.findIndex(t=>t.type===e.type&&t.number===e.number)}clearSelector(){this.selector[0]=null,this.selector[1]=null}}b=new WeakSet,L=function(){for(let e of a.TYPES)for(let t=1;t<=a.AMOUNT;t++){const i=new h(e,t);this.deck[e].push(i)}},S=new WeakSet,_=function(){console.log("[SYS] Shuffle start All decks"),this.deck.heart=this.deck.heart.sort((e,t)=>Math.floor(Math.random()*20)-Math.floor(Math.random()*20)).map(e=>{const t=new h(e.type,e.number);return t.column=-1,t.image=e.image,t.isOpen=e.isOpen,t.state=e.state,t.color=e.color,t}),this.deck.diamond=this.deck.diamond.sort((e,t)=>Math.floor(Math.random()*20)-Math.floor(Math.random()*20)).map(e=>{const t=new h(e.type,e.number);return t.column=-1,t.image=e.image,t.isOpen=e.isOpen,t.state=e.state,t.color=e.color,t}),this.deck.spade=this.deck.spade.sort((e,t)=>Math.floor(Math.random()*20)-Math.floor(Math.random()*20)).map(e=>{const t=new h(e.type,e.number);return t.column=-1,t.image=e.image,t.isOpen=e.isOpen,t.state=e.state,t.color=e.color,t}),this.deck.clover=this.deck.clover.sort((e,t)=>Math.floor(Math.random()*20)-Math.floor(Math.random()*20)).map(e=>{const t=new h(e.type,e.number);return t.column=-1,t.image=e.image,t.isOpen=e.isOpen,t.state=e.state,t.color=e.color,t}),console.log("[SYS] Shuffle done All decks")},g=new WeakSet,P=function(){for(let e=0;e<28;e++){const t=Math.floor(Math.random()*a.TYPES.length),i=Math.floor(Math.random()*a.AMOUNT),s=this.deck[a.TYPES[t]][i];if(s.state==="ground"){e--;continue}this.addGroundColumn(s)}};const x=new W,w=new R(x);new F(x,w);w.render();
