var j=Object.defineProperty;var J=(o,e,t)=>e in o?j(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var a=(o,e,t)=>(J(o,typeof e!="symbol"?e+"":e,t),t),Q=(o,e,t)=>{if(!e.has(o))throw TypeError("Cannot "+t)};var v=(o,e,t)=>{if(e.has(o))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(o):e.set(o,t)};var h=(o,e,t)=>(Q(o,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var T,q;class V{constructor(e,t){v(this,T);a(this,"solitaire");a(this,"renderer");h(this,T,q).call(this),this.solitaire=e,this.renderer=t}removeAllListeners(){window.removeEventListener("click",this.handleSelectCard.bind(this)),window.removeEventListener("click",this.handleDeckToPick.bind(this)),window.removeEventListener("click",this.handleRestartGame.bind(this)),window.removeEventListener("resize",this.handleResize.bind(this))}handleAutoComplete(e){const t=this,i=e.target;if(i.id!=="auto-complete")return;this.renderer.active_auto_complete=!0,this.renderer.auto_complete=!1,i.remove();function s(){const r=t.solitaire.ground.filter(n=>n.length);for(let n=0;n<r.length;n++){const d=r[n],m=d.slice(-1)[0];if(m){const c=t.solitaire.stack[m.type];if(c.length===0){const l=d.splice(-1)[0];l.updateColumn(-1),l.updateState("stack"),c.push(l),t.renderer.update()}else if(c.slice(-1)[0].number+1===m.number){const l=d.splice(-1)[0];l.updateColumn(-1),l.updateState("stack"),c.push(l),t.renderer.update()}else return}else return}r.some(n=>n.length>0)&&setTimeout(()=>{s()},100)}s()}handleResize(){innerWidth>768?this.renderer.update():this.renderer.update()}handleRestartGame(e){e.target.id==="restart"&&(this.solitaire.regame(),this.renderer.render(),this.renderer.soundShuffle())}convertElToCard(e){return this.solitaire.deck[e.dataset.cardType].find(t=>t.number===Number(e.dataset.cardNumber))}handleDeckToPick(e){const t=e.target;if(t&&t.closest("#deck")){const s=this.solitaire.store;if(s.length>0){const r=s.shift();r.updateState("pick"),r.open(),this.solitaire.pick.push(r),this.renderer.soundPick()}else this.solitaire.store.push(...this.solitaire.pick.splice(0).map(r=>(r.isOpen=!1,r.updateColumn(-1),r.updateState("deck"),r))),this.renderer.soundShuffle();this.renderer.update()}}handleSelectCard(e){const t=e.target;if(document.querySelectorAll(".card").forEach(i=>{const s=i.dataset.cardType,r=Number(i.dataset.cardNumber),n=this.solitaire.deck[s].find(d=>d.number===r);n&&(n.selected=!1,i.classList.remove("selected"))}),t){const i=t.closest(".empty"),s=this.solitaire.selector,r=this.solitaire.mode==="development";if(i&&s[0]!==null&&(r||s[0][0].number===13)){const n=t.parentElement,m=[...n.parentElement.children].findIndex(c=>c===n);console.log("good"),this.solitaire.moveToColumn(s[0],m),this.renderer.update(),this.renderer.soundPick()}else i&&s[0]!==null&&(r||s[0][0].number!==13)&&console.log("bad");if(t.closest(".card")){const n=t.closest(".card"),d=n.dataset.cardType,m=Number(n.dataset.cardNumber),c=this.solitaire.deck[d].find(l=>l.number===m);if(n.dataset.cardOpen==="true")if(c.selected)c.selected=!1;else if(s[0]===null){const l=n.dataset.cardState,u=n.parentNode,I=Array.from(u.children).slice(-1)[0];if((l==="ground"||l==="pick"||l==="stack")&&I===n){if(this.solitaire.isStackDirectly(c)){this.solitaire.clearSelector(),c.selected=!1,n.classList.remove("selected"),this.renderer.update(),this.renderer.soundPick();return}c.selected=!0,s[0]=[c]}else if(l==="ground"){const S=Array.from(u.children).filter(f=>f.classList.contains("card")).map(this.convertElToCard.bind(this)),C=S.findIndex(f=>f.type===c.type&&f.number===c.number);if(C>-1){const f=S.slice(C);f.forEach(Y=>Y.selected=!0),s[0]=f}}}else s[1]===null&&c.state==="ground"?(s[1]=c,this.solitaire.compareWith(s[0][0],s[1])?(console.log("good"),this.solitaire.moveToColumn(s[0],s[1].column),this.renderer.soundPick()):console.log("bad"),this.solitaire.clearSelector(),c.selected=!1,n.classList.remove("selected")):(this.solitaire.clearSelector(),c.selected=!1,n.classList.remove("selected"));this.renderer.update()}else this.solitaire.clearSelector()}}}T=new WeakSet,q=function(){window.addEventListener("click",this.handleAutoComplete.bind(this)),window.addEventListener("click",this.handleSelectCard.bind(this)),window.addEventListener("click",this.handleDeckToPick.bind(this)),window.addEventListener("click",this.handleRestartGame.bind(this)),window.addEventListener("resize",this.handleResize.bind(this))};const p={TYPES:["heart","diamond","spade","clover"],SHAPE:{heart:"♥",diamond:"◆",spade:"♠",clover:"♣"},TAG:{1:"A",2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:"J",12:"Q",13:"K"},AMOUNT:13},G=document.querySelector("#app"),N=()=>document.querySelector("#ground"),B=()=>document.querySelector("#stack"),D=()=>document.querySelector("#pick"),H=()=>document.querySelector("#deck"),O=()=>document.querySelector("#timer"),X=()=>document.querySelector("#auto-complete"),Z=(o,e)=>`/new-solitaire/cards/${o}_${e}.png`,ee=o=>{const e=Math.floor(o*10/60)%60,t=Math.floor(o*10)%60,i=Math.floor(o*1e3)%100;return`${e}:${t}.${i.toString().padStart(2,"0")}`},F=()=>innerWidth>768,M=()=>F(),w=o=>M()?`background-image: url('${o.image}');`:"",P=o=>`${M()?"<!--":""}
  <div class="card-top">
    <span>
      ${p.SHAPE[o.type]}
    </span>
    <span>
      ${p.TAG[o.number]}
    </span>
  </div>
  <div class="card-mid">
    ${p.SHAPE[o.type]}
  </div>
  <div class="card-bottom">
    <span>
      ${p.SHAPE[o.type]}
    </span>
    <span>
      ${p.TAG[o.number]}
    </span>
  </div>
  ${M()?"-->":""}`;class te{constructor(e){a(this,"solitaire");a(this,"timer");a(this,"auto_complete",!1);a(this,"active_auto_complete",!1);this.solitaire=e}renderTimer(){clearInterval(this.timer);let e=0;O().innerHTML="00:00",this.startTimer(e)}startTimer(e){this.timer=setInterval(()=>{const t=ee(e+=.001);let i=9,s=setInterval(()=>{i===0&&clearTimeout(s),O().innerHTML=`${t}${i}`,i--},1);O().innerHTML=`${t}0`},10)}layout(){G.innerHTML=`
      <!-- <div id="timer"></div> -->
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
    `}ground(){return this.solitaire.ground.forEach((t,i)=>{N().children[i].innerHTML='<div class="empty"></div>',N().children[i].innerHTML+=t.map((s,r)=>this.groundCardForm(s,r)).join("")})}stack(){const e=this.solitaire.stack,t='<div class="empty"></div>',i=s=>B().querySelector(`#${s}-stack`);Object.entries(e).forEach(([s,r])=>{i(s).innerHTML=t,r.forEach((n,d)=>{i(n.type).innerHTML+=this.stackCardForm(n,d)})})}pick(){const e=this.solitaire.pick.slice(-3);return D().innerHTML='<div class="empty"></div>',e.forEach((t,i)=>{D().innerHTML+=this.pickCardForm(t,i)})}render(){this.layout(),this.update()}update(){this.ground(),this.pick(),this.stack(),this.isEmptyDeck(),this.auto_complete&&!X()&&(G.innerHTML+='<button id="auto-complete">AUTO COMPLETE!!</button>')}isWin(){this.solitaire.store.length===0&&this.solitaire.getCardInStacks().length===52&&alert("이겼습니다!!!🌟")}checkAutoStack(){const e=this.solitaire.store.length===0;if(this.solitaire.pick.length===0&&e){const i=this.solitaire.ground.slice(0),s=Object.assign({},this.solitaire.stack);let r=!1;for(;i.every(n=>n.length!==0);){const n=s.diamond.slice(-1)[0],d=s.heart.slice(-1)[0],m=s.spade.slice(-1)[0],c=s.clover.slice(-1)[0];for(let l of i){const u=l.slice(-1)[0];if(!u)continue;const I=u.number===n.number+1&&u.type===n.type,S=u.number===d.number+1&&u.type===d.type,C=u.number===m.number+1&&u.type===m.type,f=u.number===c.number+1&&u.type===c.type;if(I){s.diamond.push(s.diamond.splice(-1)[0]);break}else if(S){s.heart.push(s.heart.splice(-1)[0]);break}else if(C){s.spade.push(s.spade.splice(-1)[0]);break}else if(f){s.clover.push(s.clover.splice(-1)[0]);break}else{r=!0;break}}if(r)break}!r&&!this.auto_complete&&!this.active_auto_complete&&(this.auto_complete=!0),this.auto_complete&&this.solitaire.getCardInGrounds().length>0&&(this.auto_complete=!0,this.active_auto_complete=!1),console.log(r?"no auto complete":"auto complete")}}isEmptyDeck(){this.solitaire.store.length===0?H().querySelector(".back").classList.add("zero"):H().querySelector(".back").classList.remove("zero")}stackCardForm(e,t){return`
      <div
      class="card${e.selected?" selected":""}"
      data-card-column="${e.column}"
      data-card-open="${e.isOpen}"
      data-card-number="${e.number}"
      data-card-type="${e.type}"
      data-card-state="${e.state}"
      style="top: 0px; left: 0px; ${w(e)}">
      ${P(e)}
      </div>
    `}groundCardForm(e,t){return`<div
    class="card${e.selected?" selected":""}"
    data-card-column="${e.column}"
    data-card-open="${e.isOpen}"
    data-card-number="${e.number}"
    data-card-type="${e.type}"
    data-card-state="${e.state}"
    style="top: ${F()?t*22:t*15}px; ${w(e)}">
    ${P(e)}
  </div>`}pickCardForm(e,t){return`
    <div
    class="card${e.selected?" selected":""}"
    data-card-column="${e.column}"
    data-card-open="${e.isOpen}"
    data-card-number="${e.number}"
    data-card-type="${e.type}"
    data-card-state="${e.state}"
    style="left: ${t*22}px; ${w(e)}">
    ${P(e)}
    </div>
  `}soundPick(){var e=new Audio("/new-solitaire/sounds/pick_sound.mp4");e.currentTime=.05,e.volume=.7,e.play()}soundShuffle(){var e=new Audio("/new-solitaire/sounds/shuffle_sound.mp4");e.currentTime=.01,e.volume=.5,e.play()}}var L,R,E,U;class k{constructor(e,t){v(this,L);v(this,E);a(this,"type","back");a(this,"number",0);a(this,"selected",!1);a(this,"state","deck");a(this,"color","none");a(this,"image","");a(this,"isOpen",!1);a(this,"column",-1);this.type=e,this.number=t,h(this,E,U).call(this),h(this,L,R).call(this),this.updateState("deck")}updateState(e){this.state=e}updateColumn(e){return this.column=e,this}open(){this.isOpen=!0}}L=new WeakSet,R=function(){this.image=Z(this.type,this.number)},E=new WeakSet,U=function(){switch(this.type){case"back":this.color="none";break;case"diamond":this.color="red";break;case"heart":this.color="red";break;case"spade":this.color="black";break;case"clover":this.color="black";break;default:this.color="none";break}};var b,A,$,z,y,x,g,_;class se{constructor(e){v(this,b);v(this,$);v(this,y);v(this,g);a(this,"empty",new k("empty",0));a(this,"back",new k("back",0));a(this,"mode","development");a(this,"selector",[null,null]);a(this,"deck",{heart:[],diamond:[],spade:[],clover:[]});a(this,"store",[]);a(this,"pick",[]);a(this,"stack",{heart:[],diamond:[],spade:[],clover:[]});a(this,"ground",[[],[],[],[],[],[],[]]);this.mode=e||"development",h(this,b,A).call(this),this.mode==="development"?h(this,$,z).call(this):h(this,y,x).call(this),h(this,g,_).call(this)}regame(){this.selector=[null,null],this.deck={heart:[],diamond:[],spade:[],clover:[]},this.empty=new k("empty",0),this.back=new k("back",0),this.store=[],this.pick=[],this.stack={heart:[],diamond:[],spade:[],clover:[]},this.ground=[[],[],[],[],[],[],[]],h(this,b,A).call(this),h(this,y,x).call(this),h(this,g,_).call(this)}findUsableColumn(){const e=this.ground.findIndex((i,s)=>i.length<s+1),t=this.ground[e];return[e,t]}addGroundColumn(e){const[t,i]=this.findUsableColumn();e.updateState("ground"),e.updateColumn(t),i.push(e),i.length===t+1&&e.open()}asList(){return Object.values(this.deck).flat(1)}getCardInDecks(){return this.asList().filter(e=>e.state==="deck")}getCardInGrounds(){return this.asList().filter(e=>e.state==="ground")}getCardInStacks(){return this.asList().filter(e=>e.state==="stack")}getCardInPicks(){return this.asList().filter(e=>e.state==="pick")}compareWith(e,t){return this.isStackableColorType(e,t)&&this.isStackableNumber(e,t)}isStackableColorType(e,t){return e.color!==t.color}isStackableNumber(e,t){return e.number+1===t.number}isStackDirectly(e){const t=this.stack[e.type],i=t.slice(-1)[0],s=e.column;if(e.state==="pick"){const r=this.pick,n=r.findIndex(d=>d.number===e.number&&d.type===e.type);if(n>-1&&(t.length===0&&e.number===1||i&&i.number+1===e.number))return r.splice(n)[0],this.moveToStack(e),!0}else if(this.ground[s]&&e.state!=="stack"){const r=this.ground[s].findIndex(n=>n.number===e.number&&n.type===e.type);if(r>-1&&(t.length===0&&e.number===1||i&&i.number+1===e.number)){const n=this.ground[s].splice(r)[0];return this.afterCardOpen(s),this.moveToStack(n),!0}}return!1}moveToGround(e,t){e.updateColumn(t),e.updateState("ground")}moveToStack(e){e.updateColumn(-1),e.updateState("stack"),this.stack[e.type].push(e)}moveToColumn(e,t){const i=e[0],s=i.column;if(i.state==="stack"){const r=this.stack[i.type].findIndex(n=>n.number===i.number&&n.type===i.type);if(r>-1){const n=this.stack[i.type].splice(r);this.ground[t].push(...n),this.afterCardOpen(t),this.moveToGround(i,t)}}else if(i.state==="ground"){const r=this.findOrderInColumn(i),n=this.ground[s].splice(r);this.ground[t].push(...n.map(d=>d.updateColumn(t))),this.afterCardOpen(s),this.moveToGround(i,t)}else if(i.state==="pick"){const r=this.findOrderInPickList(i),n=this.pick.splice(r);this.ground[t].push(...n.map(d=>d.updateColumn(t))),this.moveToGround(i,t)}}afterCardOpen(e){this.ground[e].slice(-1)[0]&&(this.ground[e].slice(-1)[0].isOpen=!0)}findOrderInColumn(e){return this.ground[e.column].findIndex(t=>t.type===e.type&&t.number===e.number)}findOrderInPickList(e){return this.pick.findIndex(t=>t.type===e.type&&t.number===e.number)}clearSelector(){this.selector[0]=null,this.selector[1]=null}}b=new WeakSet,A=function(){for(let e of p.TYPES)for(let t=1;t<=p.AMOUNT;t++){const i=new k(e,t);this.deck[e].push(i)}},$=new WeakSet,z=function(){for(let e of p.TYPES)for(let t=12;t>=6;t--){const i=this.deck[e][t],s=p.TYPES.findIndex(r=>r===e);i.updateState("ground"),i.updateColumn(s),i.open(),this.ground[s].push(i)}},y=new WeakSet,x=function(){for(let e=0;e<28;e++){const t=Math.floor(Math.random()*p.TYPES.length),i=Math.floor(Math.random()*p.AMOUNT),s=this.deck[p.TYPES[t]][i];if(s.state==="ground"){e--;continue}this.addGroundColumn(s)}},g=new WeakSet,_=function(){const e=this.getCardInDecks();for(;e.length!==0;){const t=e.splice(Math.floor(Math.random()*e.length),1)[0];this.store.push(t)}};const K=new se("production"),W=new te(K);new V(K,W);W.render();
