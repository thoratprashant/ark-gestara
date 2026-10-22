import{$ as Me,C as Ep,J as LI,Nr as l$1,Sr as xI,St as RI,_n as ge,gr as vr,m as E$1,rt as N,z as Il}from"./chunk-CLqXLzD4.js";import{C as k,E as ns,I as y,M as te,O as ps,b as ee,g as _,s as N$1,u as Ue}from"./chunk-DUaodsKw.js";var l=(function(i){return i[i.FADING_IN=0]=`FADING_IN`,i[i.VISIBLE=1]=`VISIBLE`,i[i.FADING_OUT=2]=`FADING_OUT`,i[i.HIDDEN=3]=`HIDDEN`,i})(l||{});var E=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=l.HIDDEN;constructor(t,e,n,s=!1){this._renderer=t,this.element=e,this.config=n,this._animationForciblyDisabledThroughCss=s}fadeOut(){this._renderer.fadeOutRipple(this)}};var G=Ue({passive:!0,capture:!0});var b=class{_events=new Map;addHandler(t,e,n,s){let r=this._events.get(e);if(r){let d=r.get(n);d?d.add(s):r.set(n,new Set([s]))}else this._events.set(e,new Map([[n,new Set([s])]])),t.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,G)})}removeHandler(t,e,n){let s=this._events.get(t);if(!s)return;let r=s.get(e);r&&(r.delete(n),r.size===0&&s.delete(e),s.size===0&&(this._events.delete(t),document.removeEventListener(t,this._delegateEventHandler,G)))}_delegateEventHandler=t=>{let e=N$1(t);e&&this._events.get(t.type)?.forEach((n,s)=>{(s===e||s.contains(e))&&n.forEach(r=>r.handleEvent(t))})}};var z={enterDuration:225,exitDuration:150};var J=800;var V=Ue({passive:!0,capture:!0});var Z=[`mousedown`,`touchstart`];var $=[`mouseup`,`mouseleave`,`touchend`,`touchcancel`];var K=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵcmp=xI({type:i,selectors:[[`ng-component`]],hostAttrs:[`mat-ripple-style-loader`,``],decls:0,vars:0,template:function(n,s){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--%NS%mat-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2})}return i})();var D=class i{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new b;constructor(t,e,n,s,r){this._target=t,this._ngZone=e,this._platform=s,s.isBrowser&&(this._containerElement=y(n)),r&&r.get(k).load(K)}fadeInRipple(t,e,n={}){let s=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),r=l$1(l$1({},z),n.animation);n.centered&&(t=s.left+s.width/2,e=s.top+s.height/2);let d=n.radius||Q(t,e,s),Y=t-s.left,X=e-s.top,u=r.enterDuration,o=document.createElement(`div`);o.classList.add(`mat-ripple-element`),o.style.left=`${Y-d}px`,o.style.top=`${X-d}px`,o.style.height=`${d*2}px`,o.style.width=`${d*2}px`,n.color!=null&&(o.style.backgroundColor=n.color),o.style.transitionDuration=`${u}ms`,this._containerElement.appendChild(o);let T=window.getComputedStyle(o),q=T.transitionProperty,y=T.transitionDuration,f=q===`none`||y===`0s`||y===`0s, 0s`||s.width===0&&s.height===0,c=new E(this,o,n,f);o.style.transform=`scale3d(1, 1, 1)`,c.state=l.FADING_IN,n.persistent||(this._mostRecentTransientRipple=c);let h=null;return!f&&(u||r.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let R=()=>{h&&(h.fallbackTimer=null),clearTimeout(I),this._finishRippleTransition(c)},g=()=>this._destroyRipple(c),I=setTimeout(g,u+100);o.addEventListener(`transitionend`,R),o.addEventListener(`transitioncancel`,g),h={onTransitionEnd:R,onTransitionCancel:g,fallbackTimer:I}}),this._activeRipples.set(c,h),(f||!u)&&this._finishRippleTransition(c),c}fadeOutRipple(t){if(t.state===l.FADING_OUT||t.state===l.HIDDEN)return;let e=t.element,n=l$1(l$1({},z),t.config.animation);e.style.transitionDuration=`${n.exitDuration}ms`,e.style.opacity=`0`,t.state=l.FADING_OUT,(t._animationForciblyDisabledThroughCss||!n.exitDuration)&&this._finishRippleTransition(t)}fadeOutAll(){this._getActiveRipples().forEach(t=>t.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(t=>{t.config.persistent||t.fadeOut()})}setupTriggerEvents(t){let e=y(t);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,Z.forEach(n=>{i._eventManager.addHandler(this._ngZone,n,e,this)}))}handleEvent(t){t.type===`mousedown`?this._onMousedown(t):t.type===`touchstart`?this._onTouchStart(t):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{$.forEach(e=>{this._triggerElement.addEventListener(e,this,V)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(t){t.state===l.FADING_IN?this._startFadeOutTransition(t):t.state===l.FADING_OUT&&this._destroyRipple(t)}_startFadeOutTransition(t){let e=t===this._mostRecentTransientRipple,{persistent:n}=t.config;t.state=l.VISIBLE,!n&&(!e||!this._isPointerDown)&&t.fadeOut()}_destroyRipple(t){let e=this._activeRipples.get(t)??null;this._activeRipples.delete(t),this._activeRipples.size||(this._containerRect=null),t===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),t.state=l.HIDDEN,e!==null&&(t.element.removeEventListener(`transitionend`,e.onTransitionEnd),t.element.removeEventListener(`transitioncancel`,e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),t.element.remove()}_onMousedown(t){let e=ee(t),n=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+J;!this._target.rippleDisabled&&!e&&!n&&(this._isPointerDown=!0,this.fadeInRipple(t.clientX,t.clientY,this._target.rippleConfig))}_onTouchStart(t){if(!this._target.rippleDisabled&&!te(t)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=t.changedTouches;if(e)for(let n=0;n<e.length;n++)this.fadeInRipple(e[n].clientX,e[n].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(t=>{let e=t.state===l.VISIBLE||t.config.terminateOnPointerUp&&t.state===l.FADING_IN;!t.config.persistent&&e&&t.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let t=this._triggerElement;t&&(Z.forEach(e=>i._eventManager.removeHandler(e,t,this)),this._pointerUpEventsRegistered&&($.forEach(e=>t.removeEventListener(e,this,V)),this._pointerUpEventsRegistered=!1))}};function Q(i,t,e){let n=Math.max(Math.abs(i-e.left),Math.abs(i-e.right)),s=Math.max(Math.abs(t-e.top),Math.abs(t-e.bottom));return Math.sqrt(n*n+s*s)}var W=new N(`mat-ripple-global-options`);var ct=(()=>{class i{_elementRef=E$1(vr);_animationsDisabled=ns();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=E$1(Me),n=E$1(_),s=E$1(W,{optional:!0}),r=E$1(ge);this._globalOptions=s||{},this._rippleRenderer=new D(this,e,this._elementRef,n,r)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:l$1(l$1(l$1({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,n=0,s){return typeof e==`number`?this._rippleRenderer.fadeInRipple(e,n,l$1(l$1({},this.rippleConfig),s)):this._rippleRenderer.fadeInRipple(0,0,l$1(l$1({},this.rippleConfig),e))}static ɵfac=function(n){return new(n||i)};static ɵdir=LI({type:i,selectors:[[``,`mat-ripple`,``],[``,`matRipple`,``]],hostAttrs:[1,`mat-ripple`],hostVars:2,hostBindings:function(n,s){n&2&&Ep(`mat-ripple-unbounded`,s.unbounded)},inputs:{color:[0,`matRippleColor`,`color`],unbounded:[0,`matRippleUnbounded`,`unbounded`],centered:[0,`matRippleCentered`,`centered`],radius:[0,`matRippleRadius`,`radius`],animation:[0,`matRippleAnimation`,`animation`],disabled:[0,`matRippleDisabled`,`disabled`],trigger:[0,`matRippleTrigger`,`trigger`]},exportAs:[`matRipple`]})}return i})();var ht=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵcmp=xI({type:i,selectors:[[`structural-styles`]],decls:0,vars:0,template:function(n,s){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--%NS%mat-focus-indicator-display, none);
  border-width: var(--%NS%mat-focus-indicator-border-width, 3px);
  border-style: var(--%NS%mat-focus-indicator-border-style, solid);
  border-color: var(--%NS%mat-focus-indicator-border-color, transparent);
  border-radius: var(--%NS%mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --%NS%mat-focus-indicator-display: block;
    --%NS%mat-focus-indicator-fallback-border-style: none;
  }
}
`],encapsulation:2})}return i})();var gt=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=RI({type:i});static ɵinj=Il({imports:[ps]})}return i})();export{ht as a,gt as i,W as n,z as o,ct as r,D as t};