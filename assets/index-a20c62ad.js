var j=Object.defineProperty;var W=(o,e,t)=>e in o?j(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var a=(o,e,t)=>(W(o,typeof e!="symbol"?e+"":e,t),t),J=(o,e,t)=>{if(!e.has(o))throw TypeError("Cannot "+t)};var v=(o,e,t)=>{if(e.has(o))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(o):e.set(o,t)};var f=(o,e,t)=>(J(o,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var S,H;class Q{constructor(e,t){v(this,S);a(this,"solitaire");a(this,"renderer");f(this,S,H).call(this),this.solitaire=e,this.renderer=t}removeAllListeners(){window.removeEventListener("click",this.handleSelectCard.bind(this)),window.removeEventListener("click",this.handleDeckToPick.bind(this)),window.removeEventListener("click",this.handleRestartGame.bind(this)),window.removeEventListener("resize",this.handleResize.bind(this))}handleAutoComplete(e){const t=this,i=e.target;if(i.id!=="auto-complete")return;this.renderer.active_auto_complete=!0,this.renderer.auto_complete=!1,i.remove();function s(){const r=t.solitaire.ground.filter(n=>n.length);for(let n=0;n<r.length;n++){const c=r[n],d=c.slice(-1)[0];if(d){const l=t.solitaire.stack[d.type];if(l.length===0){const u=c.splice(-1)[0];u.updateColumn(-1),u.updateState("stack"),l.push(u),t.renderer.update()}else if(l.slice(-1)[0].number+1===d.number){const u=c.splice(-1)[0];u.updateColumn(-1),u.updateState("stack"),l.push(u),t.renderer.update()}else return}else return}r.some(n=>n.length>0)&&setTimeout(()=>{s()},100)}s()}handleResize(){innerWidth>768?this.renderer.update():this.renderer.update()}handleRestartGame(e){e.target.id==="restart"&&(this.solitaire.regame(),this.renderer.render())}convertElToCard(e){return this.solitaire.deck[e.dataset.cardType].find(t=>t.number===Number(e.dataset.cardNumber))}handleDeckToPick(e){const t=e.target;if(t&&t.closest("#deck")){const s=this.solitaire.store;if(s.length>0){const r=s.shift();r.updateState("pick"),r.open(),this.solitaire.pick.push(r)}else this.solitaire.store.push(...this.solitaire.pick.splice(0).map(r=>(r.isOpen=!1,r.updateColumn(-1),r.updateState("deck"),r)));this.renderer.update()}}handleSelectCard(e){const t=e.target;if(document.querySelectorAll(".card").forEach(i=>{const s=i.dataset.cardType,r=Number(i.dataset.cardNumber),n=this.solitaire.deck[s].find(c=>c.number===r);n&&(n.selected=!1,i.classList.remove("selected"))}),t){const i=t.closest(".empty"),s=this.solitaire.selector;if(i&&s[0]!==null&&s[0][0].number===13){const r=t.parentElement,c=[...r.parentElement.children].findIndex(d=>d===r);console.log("good"),this.solitaire.moveToColumn(s[0],c),this.renderer.update()}else i&&s[0]!==null&&s[0][0].number!==13&&console.log("bad");if(t.closest(".card")){const r=t.closest(".card"),n=r.dataset.cardType,c=Number(r.dataset.cardNumber),d=this.solitaire.deck[n].find(l=>l.number===c);if(r.dataset.cardOpen==="true")if(d.selected)d.selected=!1;else if(s[0]===null){const l=r.dataset.cardState,u=r.parentNode,m=Array.from(u.children).slice(-1)[0];if((l==="ground"||l==="pick"||l==="stack")&&m===r){if(this.solitaire.isStackDirectly(d)){this.solitaire.clearSelector(),d.selected=!1,r.classList.remove("selected"),this.renderer.update();return}d.selected=!0,s[0]=[d]}else if(l==="ground"){const y=Array.from(u.children).filter(h=>h.classList.contains("card")).map(this.convertElToCard.bind(this)),g=y.findIndex(h=>h.type===d.type&&h.number===d.number);if(g>-1){const h=y.slice(g);h.forEach(O=>O.selected=!0),s[0]=h}}}else s[1]===null&&d.state==="ground"?(s[1]=d,this.solitaire.compareWith(s[0][0],s[1])?(console.log("good"),this.solitaire.moveToColumn(s[0],s[1].column)):console.log("bad"),this.solitaire.clearSelector(),d.selected=!1,r.classList.remove("selected")):(this.solitaire.clearSelector(),d.selected=!1,r.classList.remove("selected"));this.renderer.update()}else this.solitaire.clearSelector()}}}S=new WeakSet,H=function(){window.addEventListener("click",this.handleAutoComplete.bind(this)),window.addEventListener("click",this.handleSelectCard.bind(this)),window.addEventListener("click",this.handleDeckToPick.bind(this)),window.addEventListener("click",this.handleRestartGame.bind(this)),window.addEventListener("resize",this.handleResize.bind(this))};const p={TYPES:["heart","diamond","spade","clover"],SHAPE:{heart:"♥",diamond:"◆",spade:"♠",clover:"♣"},TAG:{1:"A",2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:"J",12:"Q",13:"K"},AMOUNT:13},x=document.querySelector("#app"),G=()=>document.querySelector("#ground"),V=()=>document.querySelector("#stack"),N=()=>document.querySelector("#pick"),D=()=>document.querySelector("#deck"),I=()=>document.querySelector("#timer"),B=()=>document.querySelector("#auto-complete"),X=(o,e)=>`/new-solitaire/cards/${o}_${e}.png`,Z=o=>{const e=Math.floor(o*10/60)%60,t=Math.floor(o*10)%60,i=Math.floor(o*1e3)%100;return`${e}:${t}.${i.toString().padStart(2,"0")}`},_=()=>innerWidth>768,P=()=>_(),w=o=>P()?`background-image: url('${o.image}');`:"",M=o=>`${P()?"<!--":""}
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
  ${P()?"-->":""}`;class ee{constructor(e){a(this,"solitaire");a(this,"timer");a(this,"auto_complete",!1);a(this,"active_auto_complete",!1);this.solitaire=e}renderTimer(){clearInterval(this.timer);let e=0;I().innerHTML="00:00",this.startTimer(e)}startTimer(e){this.timer=setInterval(()=>{const t=Z(e+=.001);let i=9,s=setInterval(()=>{i===0&&clearTimeout(s),I().innerHTML=`${t}${i}`,i--},1);I().innerHTML=`${t}0`},10)}layout(){x.innerHTML=`
      <div id="timer"></div>
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
    `}ground(){return this.solitaire.ground.forEach((t,i)=>{G().children[i].innerHTML='<div class="empty"></div>',G().children[i].innerHTML+=t.map((s,r)=>this.groundCardForm(s,r)).join("")})}stack(){const e=this.solitaire.stack,t='<div class="empty"></div>',i=s=>V().querySelector(`#${s}-stack`);Object.entries(e).forEach(([s,r])=>{i(s).innerHTML=t,r.forEach((n,c)=>{i(n.type).innerHTML+=this.stackCardForm(n,c)})})}pick(){const e=this.solitaire.pick.slice(-3);return N().innerHTML='<div class="empty"></div>',e.forEach((t,i)=>{N().innerHTML+=this.pickCardForm(t,i)})}render(){this.layout(),this.renderTimer(),this.update()}update(){this.ground(),this.pick(),this.stack(),this.isEmptyDeck(),this.checkAutoStack(),this.auto_complete&&!B()&&(x.innerHTML+='<button id="auto-complete">AUTO COMPLETE!!</button>')}checkAutoStack(){const e=this.solitaire.store.length===0;if(this.solitaire.pick.length===0&&e){const i=this.solitaire.ground.slice(0),s=Object.assign({},this.solitaire.stack);let r=!1;for(;i.every(n=>n.length!==0);){const n=s.diamond.slice(-1)[0],c=s.heart.slice(-1)[0],d=s.spade.slice(-1)[0],l=s.clover.slice(-1)[0];for(let u of i){const m=u.slice(-1)[0];if(!m)continue;const y=m.number===n.number+1&&m.type===n.type,g=m.number===c.number+1&&m.type===c.type,h=m.number===d.number+1&&m.type===d.type,O=m.number===l.number+1&&m.type===l.type;if(y){s.diamond.push(s.diamond.splice(-1)[0]);break}else if(g){s.heart.push(s.heart.splice(-1)[0]);break}else if(h){s.spade.push(s.spade.splice(-1)[0]);break}else if(O){s.clover.push(s.clover.splice(-1)[0]);break}else{r=!0;break}}if(r)break}!r&&!this.auto_complete&&!this.active_auto_complete&&(this.auto_complete=!0)}}isEmptyDeck(){this.solitaire.store.length===0?D().querySelector(".back").classList.add("zero"):D().querySelector(".back").classList.remove("zero")}stackCardForm(e,t){return`
      <div
      class="card${e.selected?" selected":""}"
      data-card-column="${e.column}"
      data-card-open="${e.isOpen}"
      data-card-number="${e.number}"
      data-card-type="${e.type}"
      data-card-state="${e.state}"
      style="top: 0px; left: 0px; ${w(e)}">
      ${M(e)}
      </div>
    `}groundCardForm(e,t){return`<div
    class="card${e.selected?" selected":""}"
    data-card-column="${e.column}"
    data-card-open="${e.isOpen}"
    data-card-number="${e.number}"
    data-card-type="${e.type}"
    data-card-state="${e.state}"
    style="top: ${_()?t*22:t*15}px; ${w(e)}">
    ${M(e)}
  </div>`}pickCardForm(e,t){return`
    <div
    class="card${e.selected?" selected":""}"
    data-card-column="${e.column}"
    data-card-open="${e.isOpen}"
    data-card-number="${e.number}"
    data-card-type="${e.type}"
    data-card-state="${e.state}"
    style="left: ${t*22}px; ${w(e)}">
    ${M(e)}
    </div>
  `}}var C,q,T,F;class k{constructor(e,t){v(this,C);v(this,T);a(this,"type","back");a(this,"number",0);a(this,"selected",!1);a(this,"state","deck");a(this,"color","none");a(this,"image","");a(this,"isOpen",!1);a(this,"column",-1);this.type=e,this.number=t,f(this,T,F).call(this),f(this,C,q).call(this),this.updateState("deck")}updateState(e){this.state=e}updateColumn(e){return this.column=e,this}open(){this.isOpen=!0}}C=new WeakSet,q=function(){this.image=X(this.type,this.number)},T=new WeakSet,F=function(){switch(this.type){case"back":this.color="none";break;case"diamond":this.color="red";break;case"heart":this.color="red";break;case"spade":this.color="black";break;case"clover":this.color="black";break;default:this.color="none";break}};var b,A,L,R,E,U,$,z;class te{constructor(){v(this,b);v(this,L);v(this,E);v(this,$);a(this,"empty",new k("empty",0));a(this,"back",new k("back",0));a(this,"selector",[null,null]);a(this,"deck",{heart:[],diamond:[],spade:[],clover:[]});a(this,"store",[]);a(this,"pick",[]);a(this,"stack",{heart:[],diamond:[],spade:[],clover:[]});a(this,"ground",[[],[],[],[],[],[],[]]);f(this,b,A).call(this),f(this,L,R).call(this)}regame(){this.selector=[null,null],this.deck={heart:[],diamond:[],spade:[],clover:[]},this.empty=new k("empty",0),this.back=new k("back",0),this.store=[],this.pick=[],this.stack={heart:[],diamond:[],spade:[],clover:[]},this.ground=[[],[],[],[],[],[],[]],f(this,b,A).call(this),f(this,E,U).call(this),f(this,$,z).call(this)}findUsableColumn(){const e=this.ground.findIndex((i,s)=>i.length<s+1),t=this.ground[e];return[e,t]}addGroundColumn(e){const[t,i]=this.findUsableColumn();e.updateState("ground"),e.updateColumn(t),i.push(e),i.length===t+1&&e.open()}asList(){return Object.values(this.deck).flat(1)}getCardInDecks(){return this.asList().filter(e=>e.state==="deck")}getCardInGrounds(){return this.asList().filter(e=>e.state==="ground")}getCardInStacks(){return this.asList().filter(e=>e.state==="stack")}getCardInPicks(){return this.asList().filter(e=>e.state==="pick")}compareWith(e,t){return this.isStackableColorType(e,t)&&this.isStackableNumber(e,t)}isStackableColorType(e,t){return e.color!==t.color}isStackableNumber(e,t){return e.number+1===t.number}isStackDirectly(e){const t=this.stack[e.type],i=t.slice(-1)[0],s=e.column;if(e.state==="pick"){const r=this.pick,n=r.findIndex(c=>c.number===e.number&&c.type===e.type);if(n>-1&&(t.length===0&&e.number===1||i&&i.number+1===e.number))return r.splice(n)[0],this.moveToStack(e),!0}else if(this.ground[s]&&e.state!=="stack"){const r=this.ground[s].findIndex(n=>n.number===e.number&&n.type===e.type);if(r>-1&&(t.length===0&&e.number===1||i&&i.number+1===e.number)){const n=this.ground[s].splice(r)[0];return this.afterCardOpen(s),this.moveToStack(n),!0}}return!1}moveToGround(e,t){e.updateColumn(t),e.updateState("ground")}moveToStack(e){e.updateColumn(-1),e.updateState("stack"),this.stack[e.type].push(e)}moveToColumn(e,t){const i=e[0],s=i.column;if(i.state==="stack"){const r=this.stack[i.type].findIndex(n=>n.number===i.number&&n.type===i.type);if(r>-1){const n=this.stack[i.type].splice(r);this.ground[t].push(...n),this.afterCardOpen(t),this.moveToGround(i,t)}}else if(i.state==="ground"){const r=this.findOrderInColumn(i),n=this.ground[s].splice(r);this.ground[t].push(...n.map(c=>c.updateColumn(t))),this.afterCardOpen(s),this.moveToGround(i,t)}else if(i.state==="pick"){const r=this.findOrderInPickList(i),n=this.pick.splice(r);this.ground[t].push(...n.map(c=>c.updateColumn(t))),this.moveToGround(i,t)}}afterCardOpen(e){this.ground[e].slice(-1)[0]&&(this.ground[e].slice(-1)[0].isOpen=!0)}findOrderInColumn(e){return this.ground[e.column].findIndex(t=>t.type===e.type&&t.number===e.number)}findOrderInPickList(e){return this.pick.findIndex(t=>t.type===e.type&&t.number===e.number)}clearSelector(){this.selector[0]=null,this.selector[1]=null}}b=new WeakSet,A=function(){for(let e of p.TYPES)for(let t=1;t<=p.AMOUNT;t++){const i=new k(e,t);this.deck[e].push(i)}},L=new WeakSet,R=function(){for(let e of p.TYPES)for(let t=12;t>=0;t--){const i=this.deck[e][t],s=p.TYPES.findIndex(r=>r===e);i.updateState("ground"),i.updateColumn(s),i.open(),this.ground[s].push(i)}},E=new WeakSet,U=function(){for(let e=0;e<28;e++){const t=Math.floor(Math.random()*p.TYPES.length),i=Math.floor(Math.random()*p.AMOUNT),s=this.deck[p.TYPES[t]][i];if(s.state==="ground"){e--;continue}this.addGroundColumn(s)}},$=new WeakSet,z=function(){const e=this.getCardInDecks();for(;e.length!==0;){const t=e.splice(Math.floor(Math.random()*e.length),1)[0];this.store.push(t)}};const Y=new te,K=new ee(Y);new Q(Y,K);K.render();
