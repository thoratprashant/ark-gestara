import{$ as Me,An as kh,Bt as Xy,C as Ep,D as Fi,E as Fh,En as ip,Er as yE,Gn as op,In as lp,J as LI,Kn as pp,Kt as _e,L as Ic,M as Gt,Mn as ko,Mr as zl,N as H,Nr as l,O as Fp,P as He,Pn as le,Pr as m,Sr as xI,St as RI,T as Fe,Tn as ih,U as Jf,Ut as Zf,Vn as nE,X as Li,Xt as ai,Y as Lh,_ as Ec,_n as ge,an as dp,cn as el,cr as tE,d as Dc,dn as fp,dr as vE,dt as Oh,er as rp,fn as fr,g as Ea,gr as vr,gt as Q$1,h as EE,ir as sh,j as Gl,k as G,l as DE,lt as Ny,m as E,mn as gE,o as CP,or as su,p as Di,pn as ft,pr as vh,rt as N,tr as rr,tt as Mh,u as DP,un as fE,ut as OE,xn as hp,xt as Qv,y as Eh,yt as Qo,z as Il,zt as XE}from"./chunk-CLqXLzD4.js";import{l as Qn,m as qn}from"./main-DTGAYGQY.js";import{A as rt,C as k,E as ns,M as te,O as ps,S as he,T as le$1,b as ee,n as $e,p as Wt,x as gt}from"./chunk-Bwam2fcf.js";import{a as ht,i as gt$1,r as ct$1}from"./chunk-DY02WLUS.js";import{S as xt,b as vt$1,d as ge$1,i as Pt$1,m as kt$1,p as j,r as L}from"./chunk-DqyNEPFR.js";function ct(s){return Error(`Unable to find icon with the name "${s}"`)}function vt(){return Error(`Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.`)}function mt(s){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${s}".`)}function ut(s){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${s}".`)}var d=class{url;svgText;options;svgElement=null;constructor(m,e,t){this.url=m,this.svgText=e,this.options=t}};var pt=(()=>{class s{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=[`material-icons`,`mat-ligature-font`];constructor(e,t,n,i){this._httpClient=e,this._sanitizer=t,this._errorHandler=i,this._document=n}addSvgIcon(e,t,n){return this.addSvgIconInNamespace(``,e,t,n)}addSvgIconLiteral(e,t,n){return this.addSvgIconLiteralInNamespace(``,e,t,n)}addSvgIconInNamespace(e,t,n,i){return this._addSvgIconConfig(e,t,new d(n,null,i))}addSvgIconResolver(e){return this._resolvers.push(e),this}addSvgIconLiteralInNamespace(e,t,n,i){let o=this._sanitizer.sanitize(G.HTML,n);if(!o)throw ut(n);let a=gt(o);return this._addSvgIconConfig(e,t,new d(``,a,i))}addSvgIconSet(e,t){return this.addSvgIconSetInNamespace(``,e,t)}addSvgIconSetLiteral(e,t){return this.addSvgIconSetLiteralInNamespace(``,e,t)}addSvgIconSetInNamespace(e,t,n){return this._addSvgIconSetConfig(e,new d(t,null,n))}addSvgIconSetLiteralInNamespace(e,t,n){let i=this._sanitizer.sanitize(G.HTML,t);if(!i)throw ut(t);let o=gt(i);return this._addSvgIconSetConfig(e,new d(``,o,n))}registerFontClassAlias(e,t=e){return this._fontCssClassesByAlias.set(e,t),this}classNameForFontAlias(e){return this._fontCssClassesByAlias.get(e)||e}setDefaultFontSetClass(...e){return this._defaultFontSetClass=e,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(e){let t=this._sanitizer.sanitize(G.RESOURCE_URL,e);if(!t)throw mt(e);let n=this._cachedIconsByUrl.get(t);return n?ih(Q(n)):this._loadSvgIconFromConfig(new d(e,null)).pipe(Fh(i=>this._cachedIconsByUrl.set(t,i)),ft(i=>Q(i)))}getNamedSvgIcon(e,t=``){let n=dt(t,e),i=this._svgIconConfigs.get(n);if(i)return this._getSvgFromConfig(i);if(i=this._getIconConfigFromResolvers(t,e),i)return this._svgIconConfigs.set(n,i),this._getSvgFromConfig(i);let o=this._iconSetConfigs.get(t);return o?this._getSvgFromIconSetConfigs(e,o):sh(ct(n))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(e){return e.svgText?ih(Q(this._svgElementFromConfig(e))):this._loadSvgIconFromConfig(e).pipe(ft(t=>Q(t)))}_getSvgFromIconSetConfigs(e,t){let n=this._extractIconWithNameFromAnySet(e,t);if(n)return ih(n);return vh(t.filter(o=>!o.svgText).map(o=>this._loadSvgIconSetFromConfig(o).pipe(el(a=>{let c=`Loading icon set URL: ${this._sanitizer.sanitize(G.RESOURCE_URL,o.url)} failed: ${a.message}`;return this._errorHandler.handleError(new Error(c)),ih(null)})))).pipe(ft(()=>{let o=this._extractIconWithNameFromAnySet(e,t);if(!o)throw ct(e);return o}))}_extractIconWithNameFromAnySet(e,t){for(let n=t.length-1;n>=0;n--){let i=t[n];if(i.svgText&&i.svgText.toString().indexOf(e)>-1){let o=this._svgElementFromConfig(i),a=this._extractSvgIconFromSet(o,e,i.options);if(a)return a}}return null}_loadSvgIconFromConfig(e){return this._fetchIcon(e).pipe(Fh(t=>e.svgText=t),ft(()=>this._svgElementFromConfig(e)))}_loadSvgIconSetFromConfig(e){return e.svgText?ih(null):this._fetchIcon(e).pipe(Fh(t=>e.svgText=t))}_extractSvgIconFromSet(e,t,n){let i=e.querySelector(`[id="${t}"]`);if(!i)return null;let o=i.cloneNode(!0);if(o.removeAttribute(`id`),o.nodeName.toLowerCase()===`svg`)return this._setSvgAttributes(o,n);if(o.nodeName.toLowerCase()===`symbol`)return this._setSvgAttributes(this._toSvgElement(o),n);let a=this._svgElementFromString(gt(`<svg></svg>`));return a.appendChild(o),this._setSvgAttributes(a,n)}_svgElementFromString(e){let t=this._document.createElement(`DIV`);t.innerHTML=e;let n=t.querySelector(`svg`);if(!n)throw Error(`<svg> tag not found`);return n}_toSvgElement(e){let t=this._svgElementFromString(gt(`<svg></svg>`)),n=e.attributes;for(let i=0;i<n.length;i++){let{name:o,value:a}=n[i];o!==`id`&&t.setAttribute(o,a)}for(let i=0;i<e.childNodes.length;i++)e.childNodes[i].nodeType===this._document.ELEMENT_NODE&&t.appendChild(e.childNodes[i].cloneNode(!0));return t}_setSvgAttributes(e,t){return e.setAttribute(`fit`,``),e.setAttribute(`height`,`100%`),e.setAttribute(`width`,`100%`),e.setAttribute(`preserveAspectRatio`,`xMidYMid meet`),e.setAttribute(`focusable`,`false`),t&&t.viewBox&&e.setAttribute(`viewBox`,t.viewBox),e}_fetchIcon(e){let{url:t,options:n}=e,i=n?.withCredentials??!1;if(!this._httpClient)throw vt();if(t==null)throw Error(`Cannot fetch icon from URL "${t}".`);let o=this._sanitizer.sanitize(G.RESOURCE_URL,t);if(!o)throw mt(t);let a=this._inProgressUrlFetches.get(o);if(a)return a;let l=this._httpClient.get(o,{responseType:`text`,withCredentials:i}).pipe(ft(c=>gt(c)),Mh(()=>this._inProgressUrlFetches.delete(o)),Fi());return this._inProgressUrlFetches.set(o,l),l}_addSvgIconConfig(e,t,n){return this._svgIconConfigs.set(dt(e,t),n),this}_addSvgIconSetConfig(e,t){let n=this._iconSetConfigs.get(e);return n?n.push(t):this._iconSetConfigs.set(e,[t]),this}_svgElementFromConfig(e){if(!e.svgElement){let t=this._svgElementFromString(e.svgText);this._setSvgAttributes(t,e.options),e.svgElement=t}return e.svgElement}_getIconConfigFromResolvers(e,t){for(let n=0;n<this._resolvers.length;n++){let i=this._resolvers[n](t,e);if(i)return bt(i)?new d(i.url,null,i.options):new d(i,null)}}static ɵfac=function(t){return new(t||s)(_e(qn,8),_e(Qn),_e(rr,8),_e(He))};static ɵprov=le({token:s,factory:s.ɵfac,providedIn:`root`})}return s})();function Q(s){return s.cloneNode(!0)}function dt(s,m){return s+`:`+m}function bt(s){return!!(s.url&&s.options)}var Mt=[`*`];var yt=new N(`MAT_ICON_DEFAULT_OPTIONS`);var It=new N(`mat-icon-location`,{providedIn:`root`,factory:()=>{let s=E(rr),m=s?s.location:null;return{getPathname:()=>m?m.pathname+m.search:``}}});var _t=[`clip-path`,`color-profile`,`src`,`cursor`,`fill`,`filter`,`marker`,`marker-start`,`marker-mid`,`marker-end`,`mask`,`stroke`];var St=_t.map(s=>`[${s}]`).join(`, `);var Ct=/^url\(['"]?#(.*?)['"]?\)$/;var sn=(()=>{class s{_elementRef=E(vr);_iconRegistry=E(pt);_location=E(It);_errorHandler=E(He);_defaultColor;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(e){e!==this._svgIcon&&(e?this._updateSvgIcon(e):this._svgIcon&&this._clearSvgElement(),this._svgIcon=e)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(e){let t=this._cleanupFontValue(e);t!==this._fontSet&&(this._fontSet=t,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(e){let t=this._cleanupFontValue(e);t!==this._fontIcon&&(this._fontIcon=t,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=H.EMPTY;constructor(){let e=E(new Fp(`aria-hidden`),{optional:!0}),t=E(yt,{optional:!0});t&&(t.color&&(this.color=this._defaultColor=t.color),t.fontSet&&(this.fontSet=t.fontSet)),e||this._elementRef.nativeElement.setAttribute(`aria-hidden`,`true`)}_splitIconName(e){if(!e)return[``,``];let t=e.split(`:`);switch(t.length){case 1:return[``,t[0]];case 2:return t;default:throw Error(`Invalid icon name: "${e}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let e=this._elementsWithExternalReferences;if(e&&e.size){let t=this._location.getPathname();t!==this._previousPath&&(this._previousPath=t,this._prependPathToReferences(t))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(e){this._clearSvgElement();let t=this._location.getPathname();this._previousPath=t,this._cacheChildrenWithExternalReferences(e),this._prependPathToReferences(t),this._elementRef.nativeElement.appendChild(e)}_clearSvgElement(){let e=this._elementRef.nativeElement,t=e.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();t--;){let n=e.childNodes[t];(n.nodeType!==1||n.nodeName.toLowerCase()===`svg`)&&n.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let e=this._elementRef.nativeElement,t=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(n=>n.length>0);this._previousFontSetClass.forEach(n=>e.classList.remove(n)),t.forEach(n=>e.classList.add(n)),this._previousFontSetClass=t,this.fontIcon!==this._previousFontIconClass&&!t.includes(`mat-ligature-font`)&&(this._previousFontIconClass&&e.classList.remove(this._previousFontIconClass),this.fontIcon&&e.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(e){return typeof e==`string`?e.trim().split(` `)[0]:e}_prependPathToReferences(e){let t=this._elementsWithExternalReferences;t&&t.forEach((n,i)=>{n.forEach(o=>{i.setAttribute(o.name,`url('${e}#${o.value}')`)})})}_cacheChildrenWithExternalReferences(e){let t=e.querySelectorAll(St),n=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let i=0;i<t.length;i++)_t.forEach(o=>{let a=t[i],l=a.getAttribute(o),c=l?l.match(Ct):null;if(c){let h=n.get(a);h||(h=[],n.set(a,h)),h.push({name:o,value:c[1]})}})}_updateSvgIcon(e){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),e){let[t,n]=this._splitIconName(e);t&&(this._svgNamespace=t),n&&(this._svgName=n),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(n,t).pipe(Li(1)).subscribe(i=>this._setSvgElement(i),i=>{let o=`Error retrieving icon ${t}:${n}! ${i.message}`;this._errorHandler.handleError(new Error(o))})}}static ɵfac=function(t){return new(t||s)};static ɵcmp=xI({type:s,selectors:[[`mat-icon`]],hostAttrs:[`role`,`img`,1,`mat-icon`,`notranslate`],hostVars:10,hostBindings:function(t,n){t&2&&(rp(`data-mat-icon-type`,n._usingFontIcon()?`font`:`svg`)(`data-mat-icon-name`,n._svgName||n.fontIcon)(`data-mat-icon-namespace`,n._svgNamespace||n.fontSet)(`fontIcon`,n._usingFontIcon()?n.fontIcon:null),OE(n.color?`mat-`+n.color:``),Ep(`mat-icon-inline`,n.inline)(`mat-icon-no-color`,n.color!==`primary`&&n.color!==`accent`&&n.color!==`warn`))},inputs:{color:`color`,inline:[2,`inline`,`inline`,CP],svgIcon:`svgIcon`,fontSet:`fontSet`,fontIcon:`fontIcon`},exportAs:[`matIcon`],ngContentSelectors:Mt,decls:1,vars:0,template:function(t,n){t&1&&(yE(),vE(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--%NS%mat-icon-color, inherit);
}

.mat-icon {
  -webkit-user-select: none;
  user-select: none;
  background-repeat: no-repeat;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  overflow: hidden;
}
.mat-icon.mat-icon-inline {
  font-size: inherit;
  height: inherit;
  line-height: inherit;
  width: inherit;
}
.mat-icon.mat-ligature-font[fontIcon]::before {
  content: attr(fontIcon);
}

[dir=rtl] .mat-icon-rtl-mirror {
  transform: scale(-1, 1);
}

.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {
  display: block;
}
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {
  margin: auto;
}
`],encapsulation:2})}return s})();var rn=(()=>{class s{static ɵfac=function(t){return new(t||s)};static ɵmod=RI({type:s});static ɵinj=Il({imports:[ps]})}return s})();var Tt=[[[`mat-icon`],[``,`matMenuItemIcon`,``]],`*`];var kt=[`mat-icon, [matMenuItemIcon]`,`*`];function Pt(s,m){s&1&&(su(),ai(0,`svg`,2),ip(1,`polygon`,3),Ic())}var Dt=[`*`];function Nt(s,m){if(s&1){let e=fE();Ec(0,`div`,0),fp(`click`,function(){Gl(e);return zl(gE().closed.emit(`click`))})(`animationstart`,function(n){Gl(e);return zl(gE()._onAnimationStart(n.animationName))})(`animationend`,function(n){Gl(e);return zl(gE()._onAnimationDone(n.animationName))})(`animationcancel`,function(n){Gl(e);return zl(gE()._onAnimationDone(n.animationName))}),Ec(1,`div`,1),vE(2),Dc()()}if(s&2){let e=gE();OE(e._classList),Ep(`mat-menu-panel-animations-disabled`,e._animationsDisabled)(`mat-menu-panel-exit-animation`,e._panelAnimationState===`void`)(`mat-menu-panel-animating`,e._isAnimating()),lp(`id`,e.panelId),rp(`aria-label`,e.ariaLabel||null)(`aria-labelledby`,e.ariaLabelledby||null)(`aria-describedby`,e.ariaDescribedby||null)}}var ue=new N(`MAT_MENU_PANEL`);var me=(()=>{class s{_elementRef=E(vr);_document=E(rr);_focusMonitor=E($e);_parentMenu=E(ue,{optional:!0});_changeDetectorRef=E(DP);role=`menuitem`;disabled=!1;disableRipple=!1;_hovered=new Q$1;_focused=new Q$1;_highlighted=!1;_triggersSubmenu=!1;constructor(){E(k).load(ht),this._parentMenu?.addItem?.(this)}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?`-1`:`0`}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),t=e.querySelectorAll(`mat-icon, .material-icons`);for(let n=0;n<t.length;n++)t[n].remove();return e.textContent?.trim()||``}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static ɵfac=function(t){return new(t||s)};static ɵcmp=xI({type:s,selectors:[[``,`mat-menu-item`,``]],hostAttrs:[1,`mat-mdc-menu-item`,`mat-focus-indicator`],hostVars:8,hostBindings:function(t,n){t&1&&dp(`click`,function(o){return n._checkDisabled(o)})(`mouseenter`,function(){return n._handleMouseEnter()}),t&2&&(rp(`role`,n.role)(`tabindex`,n._getTabIndex())(`aria-disabled`,n.disabled)(`disabled`,n.disabled||null),Ep(`mat-mdc-menu-item-highlighted`,n._highlighted)(`mat-mdc-menu-item-submenu-trigger`,n._triggersSubmenu))},inputs:{role:`role`,disabled:[2,`disabled`,`disabled`,CP],disableRipple:[2,`disableRipple`,`disableRipple`,CP]},exportAs:[`matMenuItem`],ngContentSelectors:kt,decls:5,vars:3,consts:[[1,`mat-mdc-menu-item-text`],[`matRipple`,``,1,`mat-mdc-menu-ripple`,3,`matRippleDisabled`,`matRippleTrigger`],[`viewBox`,`0 0 5 10`,`focusable`,`false`,`aria-hidden`,`true`,1,`mat-mdc-menu-submenu-icon`],[`points`,`0,0 5,5 0,10`]],template:function(t,n){t&1&&(yE(Tt),vE(0),ai(1,`span`,0),vE(2,1),Ic(),ip(3,`div`,1),tE(4,Pt,2,0,`:svg:svg`,2)),t&2&&(Xy(3),op(`matRippleDisabled`,n.disableRipple||n.disabled)(`matRippleTrigger`,n._getHostElement()),Xy(),nE(n._triggersSubmenu?4:-1))},dependencies:[ct$1],encapsulation:2})}return s})();var At=new N(`MatMenuContent`);var Ot=new N(`mat-menu-default-options`,{providedIn:`root`,factory:()=>({overlapTrigger:!1,xPosition:`after`,yPosition:`below`,backdropClass:`cdk-overlay-transparent-backdrop`})});var ce=`_mat-menu-enter`;var q=`_mat-menu-exit`;var K=(()=>{class s{_elementRef=E(vr);_changeDetectorRef=E(DP);_injector=E(ge);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=ns();_allItems;_directDescendantItems=new Qo;_classList={};_panelAnimationState=`void`;_animationDone=new Q$1;_isAnimating=ko(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;get panelClass(){return this._previousPanelClass}set panelClass(e){let t=this._previousPanelClass,n=l({},this._classList);t&&t.length&&t.split(` `).forEach(i=>{n[i]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(` `).forEach(i=>{n[i]=!0}),this._elementRef.nativeElement.className=``),this._classList=n}_previousPanelClass=``;get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new Fe;close=this.closed;panelId=E(he).getId(`mat-menu-panel-`);constructor(){let e=E(Ot);this.overlayPanelClass=e.overlayPanelClass||``,this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new le$1(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit(`tab`)),this._directDescendantItems.changes.pipe(kh(this._directDescendantItems),Oh(e=>Eh(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState===`enter`&&t.activeItem?._hasFocus()){let n=e.toArray(),i=Math.max(0,Math.min(n.length-1,t.activeItemIndex||0));n[i]&&!n[i].disabled?t.setActiveItem(i):t.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(kh(this._directDescendantItems),Oh(t=>Eh(...t.map(n=>n._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,n=this._keyManager;switch(t){case 27:rt(e)||(e.preventDefault(),this.closed.emit(`keydown`));break;case 37:this.parentMenu&&this.direction===`ltr`&&this.closed.emit(`keydown`);break;case 39:this.parentMenu&&this.direction===`rtl`&&this.closed.emit(`keydown`);break;default:(t===38||t===40)&&n.setFocusOrigin(`keyboard`),n.onKeydown(e);return}}focusFirstItem(e=`program`){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=Ny(()=>{let t=this._resolvePanel();if(!t||!t.contains(document.activeElement)){let n=this._keyManager;n.setFocusOrigin(e).setFirstItemActive(),!n.activeItem&&t&&t.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=m(l({},this._classList),{"mat-menu-before":e===`before`,"mat-menu-after":e===`after`,"mat-menu-above":t===`above`,"mat-menu-below":t===`below`}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let t=e===q;(t||e===ce)&&(t&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(t?`void`:`enter`),this._isAnimating.set(!1))}_onAnimationStart(e){(e===ce||e===q)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?`enter`:`void`,e){if(this._keyManager.activeItemIndex===0){let t=this._resolvePanel();t&&(t.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(q),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?ce:q)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(kh(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest(`[role="menu"]`)),e}static ɵfac=function(t){return new(t||s)};static ɵcmp=xI({type:s,selectors:[[`mat-menu`]],contentQueries:function(t,n,i){if(t&1&&pp(i,At,5)(i,me,5)(i,me,4),t&2){let o;EE(o=DE())&&(n.lazyContent=o.first),EE(o=DE())&&(n._allItems=o),EE(o=DE())&&(n.items=o)}},viewQuery:function(t,n){if(t&1&&hp(fr,5),t&2){let i;EE(i=DE())&&(n.templateRef=i.first)}},hostVars:3,hostBindings:function(t,n){t&2&&rp(`aria-label`,null)(`aria-labelledby`,null)(`aria-describedby`,null)},inputs:{backdropClass:`backdropClass`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],xPosition:`xPosition`,yPosition:`yPosition`,overlapTrigger:[2,`overlapTrigger`,`overlapTrigger`,CP],hasBackdrop:[2,`hasBackdrop`,`hasBackdrop`,e=>e==null?null:CP(e)],panelClass:[0,`class`,`panelClass`],classList:`classList`},outputs:{closed:`closed`,close:`close`},exportAs:[`matMenu`],features:[XE([{provide:ue,useExisting:s}])],ngContentSelectors:Dt,decls:1,vars:0,consts:[[`tabindex`,`-1`,`role`,`menu`,1,`mat-mdc-menu-panel`,3,`click`,`animationstart`,`animationend`,`animationcancel`,`id`],[1,`mat-mdc-menu-content`]],template:function(t,n){t&1&&(yE(),Jf(0,Nt,3,12,`ng-template`))},styles:[`mat-menu {
  display: none;
}

.mat-mdc-menu-content {
  margin: 0;
  padding: 8px 0;
  outline: 0;
}
.mat-mdc-menu-content,
.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  flex: 1;
  white-space: normal;
  font-family: var(--%NS%mat-menu-item-label-text-font, var(--%NS%mat-sys-label-large-font));
  line-height: var(--%NS%mat-menu-item-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-size: var(--%NS%mat-menu-item-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-menu-item-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  font-weight: var(--%NS%mat-menu-item-label-text-weight, var(--%NS%mat-sys-label-large-weight));
}

@keyframes _mat-menu-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-menu-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-menu-panel {
  min-width: 112px;
  max-width: 280px;
  overflow: auto;
  box-sizing: border-box;
  outline: 0;
  animation: _mat-menu-enter 120ms cubic-bezier(0, 0, 0.2, 1);
  border-radius: var(--%NS%mat-menu-container-shape, var(--%NS%mat-sys-corner-extra-small));
  background-color: var(--%NS%mat-menu-container-color, var(--%NS%mat-sys-surface-container));
  box-shadow: var(--%NS%mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  will-change: transform, opacity;
}
.mat-mdc-menu-panel.mat-menu-panel-exit-animation {
  animation: _mat-menu-exit 100ms 25ms linear forwards;
}
.mat-mdc-menu-panel.mat-menu-panel-animations-disabled {
  animation: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating {
  pointer-events: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating:has(.mat-mdc-menu-content:empty) {
  display: none;
}
@media (forced-colors: active) {
  .mat-mdc-menu-panel {
    outline: solid 1px;
  }
}
.mat-mdc-menu-panel .mat-divider {
  border-top-color: var(--%NS%mat-menu-divider-color, var(--%NS%mat-sys-surface-variant));
  margin-bottom: var(--%NS%mat-menu-divider-bottom-spacing, 8px);
  margin-top: var(--%NS%mat-menu-divider-top-spacing, 8px);
}

.mat-mdc-menu-item {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  color: inherit;
  font-size: inherit;
  background: none;
  text-decoration: none;
  margin: 0;
  min-height: 48px;
  padding-left: var(--%NS%mat-menu-item-leading-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-trailing-spacing, 12px);
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-menu-item::-moz-focus-inner {
  border: 0;
}
[dir=rtl] .mat-mdc-menu-item {
  padding-left: var(--%NS%mat-menu-item-trailing-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-leading-spacing, 12px);
}
.mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--%NS%mat-menu-item-with-icon-leading-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-with-icon-trailing-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--%NS%mat-menu-item-with-icon-trailing-spacing, 12px);
  padding-right: var(--%NS%mat-menu-item-with-icon-leading-spacing, 12px);
}
.mat-mdc-menu-item, .mat-mdc-menu-item:visited, .mat-mdc-menu-item:link {
  color: var(--%NS%mat-menu-item-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-menu-item .mat-icon-no-color,
.mat-mdc-menu-item .mat-mdc-menu-submenu-icon {
  color: var(--%NS%mat-menu-item-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-menu-item[disabled] {
  cursor: default;
  opacity: 0.38;
}
.mat-mdc-menu-item[disabled]::after {
  display: block;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.mat-mdc-menu-item:focus {
  outline: 0;
}
.mat-mdc-menu-item .mat-icon {
  flex-shrink: 0;
  margin-right: var(--%NS%mat-menu-item-spacing, 12px);
  height: var(--%NS%mat-menu-item-icon-size, 24px);
  width: var(--%NS%mat-menu-item-icon-size, 24px);
}
[dir=rtl] .mat-mdc-menu-item {
  text-align: right;
}
[dir=rtl] .mat-mdc-menu-item .mat-icon {
  margin-right: 0;
  margin-left: var(--%NS%mat-menu-item-spacing, 12px);
}
.mat-mdc-menu-item:not([disabled]):hover {
  background-color: var(--%NS%mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-menu-item:not([disabled]).cdk-program-focused, .mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused, .mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted {
  background-color: var(--%NS%mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
@media (forced-colors: active) {
  .mat-mdc-menu-item {
    margin-top: 1px;
  }
}

.mat-mdc-menu-submenu-icon {
  width: var(--%NS%mat-menu-item-icon-size, 24px);
  height: 10px;
  fill: currentColor;
  padding-left: var(--%NS%mat-menu-item-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-submenu-icon {
  padding-right: var(--%NS%mat-menu-item-spacing, 12px);
  padding-left: 0;
}
[dir=rtl] .mat-mdc-menu-submenu-icon polygon {
  transform: scaleX(-1);
  transform-origin: center;
}
@media (forced-colors: active) {
  .mat-mdc-menu-submenu-icon {
    fill: CanvasText;
  }
}

.mat-mdc-menu-item .mat-mdc-menu-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
`],encapsulation:2})}return s})();var Lt=new N(`mat-menu-scroll-strategy`,{providedIn:`root`,factory:()=>{let s=E(ge);return()=>kt$1(s)}});var w=new WeakMap;var Bt=(()=>{class s{_canHaveBackdrop;_element=E(vr);_viewContainerRef=E(Di);_menuItemInstance=E(me,{optional:!0,self:!0});_dir=E(Wt,{optional:!0});_focusMonitor=E($e);_ngZone=E(Me);_injector=E(ge);_scrollStrategy=E(Lt);_changeDetectorRef=E(DP);_animationsDisabled=ns();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=H.EMPTY;_menuCloseSubscription=H.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e?(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t===`click`||t===`tab`)&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t)})):this._destroyMenu(),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let t=E(ue,{optional:!0});this._parentMaterialMenu=t instanceof K?t:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&w.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value===`rtl`?`rtl`:`ltr`}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let t=this._menu;if(this._menuOpen||!t)return;this._pendingRemoval?.unsubscribe();let n=w.get(t);w.set(t,this),n&&n!==this&&n._closeMenu();let i=this._createOverlay(t),o=i.getConfig(),a=o.positionStrategy;this._setPosition(t,a),this._canHaveBackdrop?o.hasBackdrop=t.hasBackdrop==null?!this._triggersSubmenu():t.hasBackdrop:o.hasBackdrop=t.hasBackdrop??!1,i.hasAttached()||(i.attach(this._getPortal(t)),t.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),t.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,t.direction=this.dir,e&&t.focusFirstItem(this._openedBy||`program`),this._setIsMenuOpen(!0),t instanceof K&&(t._setIsOpen(!0),t._directDescendantItems.changes.pipe(Lh(t.close)).subscribe(()=>{a.withLockedPosition(!1).reapplyLastPosition(),a.withLockedPosition(!0)}))}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}_destroyMenu(e){let t=this._overlayRef,n=this._menu;!t||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),n instanceof K&&this._ownsMenu(n)?(this._pendingRemoval=n._animationDone.pipe(Li(1)).subscribe(()=>{t.detach(),w.has(n)||n.lazyContent?.detach()}),n._setIsOpen(!1)):(t.detach(),n?.lazyContent?.detach()),n&&this._ownsMenu(n)&&w.delete(n),this.restoreFocus&&(e===`keydown`||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=Pt$1(this._injector,t),this._overlayRef.keydownEvents().subscribe(n=>{this._menu instanceof K&&this._menu._handleKeydown(n)})}return this._overlayRef}_getOverlayConfig(e){return new j({positionStrategy:xt(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(`.mat-menu-panel, .mat-mdc-menu-panel`),backdropClass:e.backdropClass||`cdk-overlay-transparent-backdrop`,panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||`ltr`,disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(n=>{this._ngZone.run(()=>{let i=n.connectionPair.overlayX===`start`?`after`:`before`,o=n.connectionPair.overlayY===`top`?`below`:`above`;e.setPositionClasses(i,o)})})}_setPosition(e,t){let[n,i]=e.xPosition===`before`?[`end`,`start`]:[`start`,`end`],[o,a]=e.yPosition===`above`?[`bottom`,`top`]:[`top`,`bottom`],[l,c]=[o,a],[h,G]=[n,i],x=0;if(this._triggersSubmenu()){if(G=n=e.xPosition===`before`?`start`:`end`,i=h=n===`end`?`start`:`end`,this._parentMaterialMenu){if(this._parentInnerPadding==null){let de=this._parentMaterialMenu.items.first;this._parentInnerPadding=de?de._getHostElement().offsetTop:0}x=o===`bottom`?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(l=o===`top`?`bottom`:`top`,c=a===`top`?`bottom`:`top`);t.withPositions([{originX:n,originY:l,overlayX:h,overlayY:o,offsetY:x},{originX:i,originY:l,overlayX:G,overlayY:o,offsetY:x},{originX:n,originY:c,overlayX:h,overlayY:a,offsetY:-x},{originX:i,originY:c,overlayX:G,overlayY:a,offsetY:-x}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),t=this._overlayRef.detachments();return Eh(e,this._parentMaterialMenu?this._parentMaterialMenu.closed:ih(),this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(Gt(o=>this._menuOpen&&o!==this._menuItemInstance)):ih(),t)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new L(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return w.get(e)===this}_triggerIsAriaDisabled(){return CP(this._element.nativeElement.getAttribute(`aria-disabled`))}static ɵfac=function(t){Qv()};static ɵdir=LI({type:s})}return s})();var On=(()=>{class s extends Bt{_cleanupTouchstart;_hoverSubscription=H.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new Fe;onMenuOpen=this.menuOpened;menuClosed=new Fe;onMenuClose=this.menuClosed;constructor(){super(!0);let e=E(Ea);this._cleanupTouchstart=e.listen(this._element.nativeElement,`touchstart`,t=>{te(t)||(this._openedBy=`touch`)},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){ee(e)||(this._openedBy=e.button===0?`mouse`:void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy=`keyboard`),this.triggersSubmenu()&&(t===39&&this.dir===`ltr`||t===37&&this.dir===`rtl`)&&(this._openedBy=`keyboard`,this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!==`void`&&(this._openedBy=`mouse`,this._openMenu(!1))}))}static ɵfac=function(t){return new(t||s)};static ɵdir=LI({type:s,selectors:[[``,`mat-menu-trigger-for`,``],[``,`matMenuTriggerFor`,``]],hostAttrs:[1,`mat-mdc-menu-trigger`],hostVars:3,hostBindings:function(t,n){t&1&&dp(`click`,function(o){return n._handleClick(o)})(`mousedown`,function(o){return n._handleMousedown(o)})(`keydown`,function(o){return n._handleKeydown(o)}),t&2&&rp(`aria-haspopup`,n.menu?`menu`:null)(`aria-expanded`,n.menuOpen)(`aria-controls`,n.menuOpen?n.menu?.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,`mat-menu-trigger-for`,`_deprecatedMatMenuTriggerFor`],menu:[0,`matMenuTriggerFor`,`menu`],menuData:[0,`matMenuTriggerData`,`menuData`],restoreFocus:[0,`matMenuTriggerRestoreFocus`,`restoreFocus`]},outputs:{menuOpened:`menuOpened`,onMenuOpen:`onMenuOpen`,menuClosed:`menuClosed`,onMenuClose:`onMenuClose`},exportAs:[`matMenuTrigger`],features:[Zf]})}return s})();var Ln=(()=>{class s{static ɵfac=function(t){return new(t||s)};static ɵmod=RI({type:s});static ɵinj=Il({imports:[gt$1,ge$1,ps,vt$1]})}return s})();export{rn as a,me as i,Ln as n,sn as o,On as r,K as t};