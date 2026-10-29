import{An as iE,At as TP,Cn as gp,D as Fe$1,En as hp,Er as wc,Gn as mE,H as Ir,Hn as li,It as VI,Jt as Zg,Kn as me,Lt as Vh,M as Gv,Mn as jE,Mt as Th,N as H,Nn as jh,Nt as Ti,O as Fh,Or as wl,Ot as Sp,R as IE,S as E,T as Ep,Tn as hm,Ut as Xf,Vn as lh,W as Jf,Wt as Yf,Xn as op,Xt as Zo,Yn as nv,Yt as Zl,_t as Ph,a as Ay,ar as rp,at as N,bt as Ql,cn as b,cr as sE,dn as ba,dt as OI,en as _P,er as pr,et as ME,gt as PI,h as DE,hn as cE,ht as Oo,it as Mh,jn as ip,kn as iD,kt as TE,ln as bE,lr as sp,mr as uE,mt as On,nt as Mc,qt as ZE,rr as qv,rt as Me$1,tt as MP,ur as tD,ut as Np,vr as ut$1,vt as Q,wr as wE,x as Dp,xn as fp,xt as Qt,zn as lE,zt as Wd}from"./chunk-Bw9khoYM.js";import"./main-WADHRXMN.js";import"./chunk-DP3q3xO4.js";import{C as m,N as x,f as Zt,g as ct,h as bt,n as $i,o as Ms,p as _e,w as me$1,x as hs}from"./chunk-BB4rw0TT.js";import{a as gt$1,c as we$1,i as en$1,o as je$1,r as _t,u as xt$1}from"./chunk-CoSDc0RI.js";import{a as ht,r as ct$1}from"./chunk-Bz61P-qa.js";import{_ as pi,f as he,o as T,r as L,u as _i}from"./chunk-sWkJ9DMp.js";import{C as qn,_ as jn,g as fn$1,m as _e$1,n as Gn,o as Je$1,s as Ln,u as Tn$1,x as pn$1}from"./chunk-pnQA4muM.js";import{n as Mi,r as q,t as Ci}from"./chunk-DnyePTwk.js";import{n as Pe$1,t as Be$1}from"./chunk-CRDUqDXr.js";import{n as it,t as It}from"./chunk-CWuAbymR.js";var Ct=[`*`];function Be(a,s){a&1&&wE(0)}var Ae=[`tabListContainer`];var Le=[`tabList`];var Fe=[`tabListInner`];var Oe=[`nextPaginator`];var Ve=[`previousPaginator`];var He=[`content`];function ze(a,s){}var Qe=[`tabBodyWrapper`];var qe=[`tabHeader`];function je(a,s){}function We(a,s){if(a&1&&Jf(0,je,0,0,`ng-template`,12),a&2){let t=IE().$implicit;ip(`cdkPortalOutlet`,t.templateLabel)}}function Ge(a,s){if(a&1&&ZE(0),a&2){let t=IE().$implicit;Np(t.textLabel)}}function $e(a,s){if(a&1){let t=mE();li(0,`div`,7,2),fp(`click`,function(){let n=Ql(t),i=n.$implicit,m=n.$index,I=IE(),N=ME(1);return Zl(I._handleClick(i,N,m))})(`cdkFocusChange`,function(n){let i=Ql(t).$index;return Zl(IE()._tabFocusChanged(n,i))}),sp(2,`span`,8)(3,`div`,9),li(4,`span`,10)(5,`span`,11),iE(6,We,1,1,null,12)(7,Ge,1,1),wc()()()}if(a&2){let t=s.$implicit,e=s.$index,n=ME(1),i=IE();jE(t.labelClass),Dp(`mdc-tab--active`,i.selectedIndex===e),ip(`id`,i._getTabLabelId(t,e))(`disabled`,t.disabled)(`fitInkBarToContent`,i.fitInkBarToContent),op(`tabIndex`,i._getTabIndex(e))(`aria-posinset`,e+1)(`aria-setsize`,i._tabs.length)(`aria-controls`,i._getTabContentId(e))(`aria-selected`,i.selectedIndex===e)(`aria-label`,t.ariaLabel||null)(`aria-labelledby`,!t.ariaLabel&&t.ariaLabelledby?t.ariaLabelledby:null),nv(3),ip(`matRippleTrigger`,n)(`matRippleDisabled`,t.disabled||i.disableRipple),nv(3),sE(t.templateLabel?6:7)}}function Ze(a,s){a&1&&wE(0)}function Ke(a,s){if(a&1){let t=mE();li(0,`mat-tab-body`,13),fp(`_onCentered`,function(){Ql(t);return Zl(IE()._removeTabBodyWrapperHeight())})(`_onCentering`,function(n){Ql(t);return Zl(IE()._setTabBodyWrapperHeight(n))})(`_beforeCentering`,function(n){Ql(t);return Zl(IE()._bodyCentered(n))}),wc()}if(a&2){let t=s.$implicit,e=s.$index,n=IE();jE(t.bodyClass),ip(`id`,n._getTabContentId(e))(`content`,t.content)(`position`,t.position)(`animationDuration`,n._bodyAnimationDuration)(`preserveContent`,n.preserveContent),op(`tabindex`,n.contentTabIndex!=null&&n.selectedIndex===e?n.contentTabIndex:null)(`aria-labelledby`,n._getTabLabelId(t,e))(`aria-hidden`,n.selectedIndex!==e)}}var Ue=new N(`MatTabContent`);var Ye=(()=>{class a{template=E(pr);static ɵfac=function(e){return new(e||a)};static ɵdir=VI({type:a,selectors:[[``,`matTabContent`,``]],features:[iD([{provide:Ue,useExisting:a}])]})}return a})();var Xe=new N(`MatTabLabel`);var Te=new N(`MAT_TAB`);var Je=(()=>{class a extends pi{_closestTab=E(Te,{optional:!0});static ɵfac=(()=>{let t;return function(n){return(t||(t=hm(a)))(n||a)}})();static ɵdir=VI({type:a,selectors:[[``,`mat-tab-label`,``],[``,`matTabLabel`,``]],features:[iD([{provide:Xe,useExisting:a}]),Yf]})}return a})();var Pe=new N(`MAT_TAB_GROUP`);var xt=(()=>{class a{_viewContainerRef=E(Ti);_closestTabGroup=E(Pe,{optional:!0});disabled=!1;get templateLabel(){return this._templateLabel}set templateLabel(t){this._setTemplateLabelInput(t)}_templateLabel;_explicitContent=void 0;_implicitContent;textLabel=``;ariaLabel;ariaLabelledby;labelClass;bodyClass;id=null;_contentPortal=null;get content(){return this._contentPortal}_stateChanges=new Q;position=null;origin=null;isActive=!1;constructor(){E(x).load(ht)}ngOnChanges(t){(t.hasOwnProperty(`textLabel`)||t.hasOwnProperty(`disabled`))&&this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete()}ngOnInit(){this._contentPortal=new L(this._explicitContent||this._implicitContent,this._viewContainerRef)}_setTemplateLabelInput(t){t&&t._closestTab===this&&(this._templateLabel=t)}static ɵfac=function(e){return new(e||a)};static ɵcmp=OI({type:a,selectors:[[`mat-tab`]],contentQueries:function(e,n,i){if(e&1&&hp(i,Je,5)(i,Ye,7,pr),e&2){let m;TE(m=bE())&&(n.templateLabel=m.first),TE(m=bE())&&(n._explicitContent=m.first)}},viewQuery:function(e,n){if(e&1&&gp(pr,7),e&2){let i;TE(i=bE())&&(n._implicitContent=i.first)}},hostAttrs:[`hidden`,``],hostVars:1,hostBindings:function(e,n){e&2&&op(`id`,null)},inputs:{disabled:[2,`disabled`,`disabled`,_P],textLabel:[0,`label`,`textLabel`],ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],labelClass:`labelClass`,bodyClass:`bodyClass`,id:`id`},exportAs:[`matTab`],features:[iD([{provide:Te,useExisting:a}]),Zg],ngContentSelectors:Ct,decls:1,vars:0,template:function(e,n){e&1&&(DE(),Xf(0,Be,1,0,`ng-template`))},encapsulation:2,changeDetection:1})}return a})();var ft=`mdc-tab-indicator--active`;var xe=`mdc-tab-indicator--no-transition`;var gt=class{_items;_currentItem;constructor(s){this._items=s}hide(){this._items.forEach(s=>s.deactivateInkBar()),this._currentItem=void 0}alignToElement(s){let t=this._items.find(n=>n.elementRef.nativeElement===s),e=this._currentItem;if(t!==e&&(e?.deactivateInkBar(),t)){let n=e?.elementRef.nativeElement.getBoundingClientRect?.();t.activateInkBar(n),this._currentItem=t}}};var tn=(()=>{class a{_elementRef=E(Ir);_inkBarElement=null;_inkBarContentElement=null;_fitToContent=!1;get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(t){this._fitToContent!==t&&(this._fitToContent=t,this._inkBarElement&&this._appendInkBarElement())}activateInkBar(t){let e=this._elementRef.nativeElement;if(!t||!e.getBoundingClientRect||!this._inkBarContentElement){e.classList.add(ft);return}let n=e.getBoundingClientRect(),i=t.width/n.width,m=t.left-n.left;e.classList.add(xe),this._inkBarContentElement.style.setProperty(`transform`,`translateX(${m}px) scaleX(${i})`),e.getBoundingClientRect(),e.classList.remove(xe),e.classList.add(ft),this._inkBarContentElement.style.setProperty(`transform`,``)}deactivateInkBar(){this._elementRef.nativeElement.classList.remove(ft)}ngOnInit(){this._createInkBarElement()}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null}_createInkBarElement(){let t=this._elementRef.nativeElement.ownerDocument||document,e=this._inkBarElement=t.createElement(`span`),n=this._inkBarContentElement=t.createElement(`span`);e.className=`mdc-tab-indicator`,n.className=`mdc-tab-indicator__content mdc-tab-indicator__content--underline`,e.appendChild(this._inkBarContentElement),this._appendInkBarElement()}_appendInkBarElement(){this._inkBarElement;(this._fitToContent?this._elementRef.nativeElement.querySelector(`.mdc-tab__content`):this._elementRef.nativeElement).appendChild(this._inkBarElement)}static ɵfac=function(e){return new(e||a)};static ɵdir=VI({type:a,inputs:{fitInkBarToContent:[2,`fitInkBarToContent`,`fitInkBarToContent`,_P]}})}return a})();var Se=(()=>{class a extends tn{elementRef=E(Ir);disabled=!1;focus(){this.elementRef.nativeElement.focus()}getOffsetLeft(){return this.elementRef.nativeElement.offsetLeft}getOffsetWidth(){return this.elementRef.nativeElement.offsetWidth}static ɵfac=(()=>{let t;return function(n){return(t||(t=hm(a)))(n||a)}})();static ɵdir=VI({type:a,selectors:[[``,`matTabLabelWrapper`,``]],hostVars:3,hostBindings:function(e,n){e&2&&(op(`aria-disabled`,!!n.disabled),Dp(`mat-mdc-tab-disabled`,n.disabled))},inputs:{disabled:[2,`disabled`,`disabled`,_P]},features:[Yf]})}return a})();var we={passive:!0};var en=650;var nn=100;function ut(a){let s=a+``;return/^[0-9]+(?:\.[0-9]+)?$/.test(s)?`${a}ms`:/^[0-9]+(?:\.[0-9]+)?(?:ms|s)$/.test(s)?s:``}var an=(()=>{class a{_elementRef=E(Ir);_changeDetectorRef=E(TP);_viewportRuler=E(T);_dir=E(Zt,{optional:!0});_ngZone=E(Me$1);_platform=E(m);_sharedResizeObserver=E(we$1);_injector=E(me);_renderer=E(ba);_animationsDisabled=hs();_eventCleanups;_scrollDistance=0;_selectedIndexChanged=!1;_destroyed=new Q;_showPaginationControls=!1;_disableScrollAfter=!0;_disableScrollBefore=!0;_tabLabelCount;_scrollDistanceChanged=!1;_keyManager;_currentTextContent;_stopScrolling=new Q;disablePagination=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(t){let e=isNaN(t)?0:t;this._selectedIndex!=e&&(this._selectedIndexChanged=!0,this._selectedIndex=e,this._keyManager&&this._keyManager.updateActiveItem(e))}_selectedIndex=0;selectFocusedIndex=new Fe$1;indexFocused=new Fe$1;constructor(){this._eventCleanups=this._ngZone.runOutsideAngular(()=>[this._renderer.listen(this._elementRef.nativeElement,`mouseleave`,()=>this._stopInterval())])}ngAfterViewInit(){this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement,`touchstart`,()=>this._handlePaginatorPress(`before`),we),this._renderer.listen(this._nextPaginator.nativeElement,`touchstart`,()=>this._handlePaginatorPress(`after`),we))}ngAfterContentInit(){let t=this._dir?this._dir.change:lh(`ltr`),e=this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(Mh(32),Vh(this._destroyed)),n=this._viewportRuler.change(150).pipe(Vh(this._destroyed)),i=()=>{this.updatePagination(),this._alignInkBarToSelectedTab()};this._keyManager=new me$1(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>!1),this._keyManager.updateActiveItem(Math.max(this._selectedIndex,0)),Ay(i,{injector:this._injector}),Th(t,n,e,this._items.changes,this._itemsResized()).pipe(Vh(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),i()})}),this._keyManager?.withHorizontalOrientation(this._getLayoutDirection())}),this._keyManager.change.subscribe(m=>{this.indexFocused.emit(m),this._setTabFocus(m)})}_itemsResized(){return typeof ResizeObserver!=`function`?ut$1:this._items.changes.pipe(Fh(this._items),jh(t=>new b(e=>this._ngZone.runOutsideAngular(()=>{let n=new ResizeObserver(i=>e.next(i));return t.forEach(i=>n.observe(i.elementRef.nativeElement)),()=>{n.disconnect()}}))),Ph(1),Qt(t=>t.some(e=>e.contentRect.width>0&&e.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=!1,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=!1,this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._eventCleanups.forEach(t=>t()),this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete()}_handleKeydown(t){if(!ct(t))switch(t.keyCode){case 13:case 32:if(this.focusIndex!==this.selectedIndex){let e=this._items.get(this.focusIndex);e&&!e.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(t))}break;default:this._keyManager?.onKeydown(t)}}_onContentChanges(){let t=this._elementRef.nativeElement.textContent;t!==this._currentTextContent&&(this._currentTextContent=t||``,this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck()}))}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition()}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(t){!this._isValidIndex(t)||this.focusIndex===t||!this._keyManager||this._keyManager.setActiveItem(t)}_isValidIndex(t){return this._items?!!this._items.toArray()[t]:!0}_setTabFocus(t){if(this._showPaginationControls&&this._scrollToLabel(t),this._items&&this._items.length){this._items.toArray()[t].focus();let e=this._tabListContainer.nativeElement;this._getLayoutDirection()==`ltr`?e.scrollLeft=0:e.scrollLeft=e.scrollWidth-e.offsetWidth}}_getLayoutDirection(){return this._dir&&this._dir.value===`rtl`?`rtl`:`ltr`}_updateTabScrollPosition(){if(this.disablePagination)return;let t=this.scrollDistance,e=this._getLayoutDirection()===`ltr`?-t:t;this._tabList.nativeElement.style.transform=`translateX(${Math.round(e)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0)}get scrollDistance(){return this._scrollDistance}set scrollDistance(t){this._scrollTo(t)}_scrollHeader(t){let e=this._tabListContainer.nativeElement.offsetWidth,n=(t==`before`?-1:1)*e/3;return this._scrollTo(this._scrollDistance+n)}_handlePaginatorClick(t){this._stopInterval(),this._scrollHeader(t)}_scrollToLabel(t){if(this.disablePagination)return;let e=this._items?this._items.toArray()[t]:null;if(!e)return;let n=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:i,offsetWidth:m}=e.elementRef.nativeElement,I,N;this._getLayoutDirection()==`ltr`?(I=i,N=I+m):(N=this._tabListInner.nativeElement.offsetWidth-i,I=N-m);let st=this.scrollDistance,wt=this.scrollDistance+n;I<st?this.scrollDistance-=st-I:N>wt&&(this.scrollDistance+=Math.min(N-wt,I-st))}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=!1;else{let n=this._tabListInner.nativeElement.scrollWidth-this._elementRef.nativeElement.offsetWidth>=5;n||(this.scrollDistance=0),n!==this._showPaginationControls&&(this._showPaginationControls=n,this._changeDetectorRef.markForCheck())}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=!0:(this._disableScrollBefore=this.scrollDistance==0,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck())}_getMaxScrollDistance(){return this._tabListInner.nativeElement.scrollWidth-this._tabListContainer.nativeElement.offsetWidth||0}_alignInkBarToSelectedTab(){let t=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,e=t?t.elementRef.nativeElement:null;e?this._inkBar.alignToElement(e):this._inkBar.hide()}_stopInterval(){this._stopScrolling.next()}_handlePaginatorPress(t,e){e&&e.button!=null&&e.button!==0||(this._stopInterval(),On(en,nn).pipe(Vh(Th(this._stopScrolling,this._destroyed))).subscribe(()=>{let{maxScrollDistance:n,distance:i}=this._scrollHeader(t);(i===0||i>=n)&&this._stopInterval()}))}_scrollTo(t){if(this.disablePagination)return{maxScrollDistance:0,distance:0};let e=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(e,t)),this._scrollDistanceChanged=!0,this._checkScrollingControls(),{maxScrollDistance:e,distance:this._scrollDistance}}static ɵfac=function(e){return new(e||a)};static ɵdir=VI({type:a,inputs:{disablePagination:[2,`disablePagination`,`disablePagination`,_P],selectedIndex:[2,`selectedIndex`,`selectedIndex`,MP]},outputs:{selectFocusedIndex:`selectFocusedIndex`,indexFocused:`indexFocused`}})}return a})();var on=(()=>{class a extends an{_items;_tabListContainer;_tabList;_tabListInner;_nextPaginator;_previousPaginator;_inkBar;ariaLabel;ariaLabelledby;disableRipple=!1;ngAfterContentInit(){this._inkBar=new gt(this._items),super.ngAfterContentInit()}_itemSelected(t){t.preventDefault()}static ɵfac=(()=>{let t;return function(n){return(t||(t=hm(a)))(n||a)}})();static ɵcmp=OI({type:a,selectors:[[`mat-tab-header`]],contentQueries:function(e,n,i){if(e&1&&hp(i,Se,4),e&2){let m;TE(m=bE())&&(n._items=m)}},viewQuery:function(e,n){if(e&1&&gp(Ae,7)(Le,7)(Fe,7)(Oe,5)(Ve,5),e&2){let i;TE(i=bE())&&(n._tabListContainer=i.first),TE(i=bE())&&(n._tabList=i.first),TE(i=bE())&&(n._tabListInner=i.first),TE(i=bE())&&(n._nextPaginator=i.first),TE(i=bE())&&(n._previousPaginator=i.first)}},hostAttrs:[1,`mat-mdc-tab-header`],hostVars:4,hostBindings:function(e,n){e&2&&Dp(`mat-mdc-tab-header-pagination-controls-enabled`,n._showPaginationControls)(`mat-mdc-tab-header-rtl`,n._getLayoutDirection()==`rtl`)},inputs:{ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],disableRipple:[2,`disableRipple`,`disableRipple`,_P]},features:[Yf],ngContentSelectors:Ct,decls:13,vars:10,consts:[[`previousPaginator`,``],[`tabListContainer`,``],[`tabList`,``],[`tabListInner`,``],[`nextPaginator`,``],[`mat-ripple`,``,1,`mat-mdc-tab-header-pagination`,`mat-mdc-tab-header-pagination-before`,3,`click`,`mousedown`,`touchend`,`matRippleDisabled`],[1,`mat-mdc-tab-header-pagination-chevron`],[1,`mat-mdc-tab-label-container`,3,`keydown`],[`role`,`tablist`,1,`mat-mdc-tab-list`,3,`cdkObserveContent`],[1,`mat-mdc-tab-labels`],[`mat-ripple`,``,1,`mat-mdc-tab-header-pagination`,`mat-mdc-tab-header-pagination-after`,3,`mousedown`,`click`,`touchend`,`matRippleDisabled`]],template:function(e,n){e&1&&(DE(),li(0,`div`,5,0),fp(`click`,function(){return n._handlePaginatorClick(`before`)})(`mousedown`,function(m){return n._handlePaginatorPress(`before`,m)})(`touchend`,function(){return n._stopInterval()}),sp(2,`div`,6),wc(),li(3,`div`,7,1),fp(`keydown`,function(m){return n._handleKeydown(m)}),li(5,`div`,8,2),fp(`cdkObserveContent`,function(){return n._onContentChanges()}),li(7,`div`,9,3),wE(9),wc()()(),li(10,`div`,10,4),fp(`mousedown`,function(m){return n._handlePaginatorPress(`after`,m)})(`click`,function(){return n._handlePaginatorClick(`after`)})(`touchend`,function(){return n._stopInterval()}),sp(12,`div`,6),wc()),e&2&&(Dp(`mat-mdc-tab-header-pagination-disabled`,n._disableScrollBefore),ip(`matRippleDisabled`,n._disableScrollBefore||n.disableRipple),nv(3),Dp(`_mat-animation-noopable`,n._animationsDisabled),nv(2),op(`aria-label`,n.ariaLabel||null)(`aria-labelledby`,n.ariaLabelledby||null),nv(5),Dp(`mat-mdc-tab-header-pagination-disabled`,n._disableScrollAfter),ip(`matRippleDisabled`,n._disableScrollAfter||n.disableRipple))},dependencies:[ct$1,$i],styles:[`.mat-mdc-tab-header {
  display: flex;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.mdc-tab-indicator .mdc-tab-indicator__content {
  transition-duration: var(--%NS%mat-tab-header-animation-duration, 250ms);
}

.mat-mdc-tab-header-pagination {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  cursor: pointer;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
  box-sizing: content-box;
  outline: 0;
}
.mat-mdc-tab-header-pagination::-moz-focus-inner {
  border: 0;
}
.mat-mdc-tab-header-pagination .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--%NS%mat-tab-inactive-ripple-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination {
  display: flex;
}

.mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after {
  padding-left: 4px;
}
.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(-135deg);
}

.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-pagination-after {
  padding-right: 4px;
}
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(45deg);
}

.mat-mdc-tab-header-pagination-chevron {
  border-style: solid;
  border-width: 2px 2px 0 0;
  height: 8px;
  width: 8px;
  border-color: var(--%NS%mat-tab-pagination-icon-color, var(--%NS%mat-sys-on-surface));
}

.mat-mdc-tab-header-pagination-disabled {
  box-shadow: none;
  cursor: default;
  pointer-events: none;
}
.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron {
  opacity: 0.4;
}

.mat-mdc-tab-list {
  flex-grow: 1;
  position: relative;
  transition: transform 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
._mat-animation-noopable .mat-mdc-tab-list {
  transition: none;
}

.mat-mdc-tab-label-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  z-index: 1;
  border-bottom-style: solid;
  border-bottom-width: var(--%NS%mat-tab-divider-height, 1px);
  border-bottom-color: var(--%NS%mat-tab-divider-color, var(--%NS%mat-sys-surface-variant));
}
.mat-mdc-tab-group-inverted-header .mat-mdc-tab-label-container {
  border-bottom: none;
  border-top-style: solid;
  border-top-width: var(--%NS%mat-tab-divider-height, 1px);
  border-top-color: var(--%NS%mat-tab-divider-color, var(--%NS%mat-sys-surface-variant));
}

.mat-mdc-tab-labels {
  display: flex;
  flex: 1 0 auto;
}
[mat-align-tabs=center] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: center;
}
[mat-align-tabs=end] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: flex-end;
}
.cdk-drop-list .mat-mdc-tab-labels, .mat-mdc-tab-labels.cdk-drop-list {
  min-height: var(--%NS%mat-tab-container-height, 48px);
}

.mat-mdc-tab::before {
  margin: 5px;
}
@media (forced-colors: active) {
  .mat-mdc-tab[aria-disabled=true] {
    color: GrayText;
  }
}
`],encapsulation:2,changeDetection:1})}return a})();var rn=new N(`MAT_TABS_CONFIG`);var ke=(()=>{class a extends _i{_host=E(vt);_ngZone=E(Me$1);_centeringSub=H.EMPTY;_leavingSub=H.EMPTY;ngOnInit(){super.ngOnInit(),this._centeringSub=this._host._beforeCentering.pipe(Fh(this._host._isCenterPosition())).subscribe(t=>{this._host._content&&t&&!this.hasAttached()&&this._ngZone.run(()=>{Promise.resolve().then(),this.attach(this._host._content)})}),this._leavingSub=this._host._afterLeavingCenter.subscribe(()=>{this._host.preserveContent||this._ngZone.run(()=>this.detach())})}ngOnDestroy(){super.ngOnDestroy(),this._centeringSub.unsubscribe(),this._leavingSub.unsubscribe()}static ɵfac=(()=>{let t;return function(n){return(t||(t=hm(a)))(n||a)}})();static ɵdir=VI({type:a,selectors:[[``,`matTabBodyHost`,``]],features:[Yf]})}return a})();var vt=(()=>{class a{_elementRef=E(Ir);_dir=E(Zt,{optional:!0});_ngZone=E(Me$1);_injector=E(me);_renderer=E(ba);_diAnimationsDisabled=hs();_eventCleanups;_initialized=!1;_fallbackTimer;_positionIndex;_dirChangeSubscription=H.EMPTY;_position;_previousPosition;_onCentering=new Fe$1;_beforeCentering=new Fe$1;_afterLeavingCenter=new Fe$1;_onCentered=new Fe$1(!0);_portalHost;_contentElement;_content;animationDuration=`500ms`;preserveContent=!1;set position(t){this._positionIndex=t,this._computePositionAnimationState()}constructor(){if(this._dir){let t=E(TP);this._dirChangeSubscription=this._dir.change.subscribe(e=>{this._computePositionAnimationState(e),t.markForCheck()})}}ngOnInit(){this._bindTransitionEvents(),this._position===`center`&&(this._setActiveClass(!0),Ay(()=>this._onCentering.emit(this._elementRef.nativeElement.clientHeight),{injector:this._injector})),this._initialized=!0}ngOnDestroy(){clearTimeout(this._fallbackTimer),this._eventCleanups?.forEach(t=>t()),this._dirChangeSubscription.unsubscribe()}_bindTransitionEvents(){this._ngZone.runOutsideAngular(()=>{let t=this._elementRef.nativeElement,e=n=>{n.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.remove(`mat-tab-body-animating`),n.type===`transitionend`&&this._transitionDone())};this._eventCleanups=[this._renderer.listen(t,`transitionstart`,n=>{n.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.add(`mat-tab-body-animating`),this._transitionStarted())}),this._renderer.listen(t,`transitionend`,e),this._renderer.listen(t,`transitioncancel`,e)]})}_transitionStarted(){clearTimeout(this._fallbackTimer);let t=this._position===`center`;this._beforeCentering.emit(t),t&&this._onCentering.emit(this._elementRef.nativeElement.clientHeight)}_transitionDone(){this._position===`center`?this._onCentered.emit():this._previousPosition===`center`&&this._afterLeavingCenter.emit()}_setActiveClass(t){this._elementRef.nativeElement.classList.toggle(`mat-mdc-tab-body-active`,t)}_getLayoutDirection(){return this._dir&&this._dir.value===`rtl`?`rtl`:`ltr`}_isCenterPosition(){return this._positionIndex===0}_computePositionAnimationState(t=this._getLayoutDirection()){this._previousPosition=this._position,this._positionIndex<0?this._position=t==`ltr`?`left`:`right`:this._positionIndex>0?this._position=t==`ltr`?`right`:`left`:this._position=`center`,this._animationsDisabled()?this._simulateTransitionEvents():this._initialized&&(this._position===`center`||this._previousPosition===`center`)&&(clearTimeout(this._fallbackTimer),this._fallbackTimer=this._ngZone.runOutsideAngular(()=>setTimeout(()=>this._simulateTransitionEvents(),100)))}_simulateTransitionEvents(){this._transitionStarted(),Ay(()=>this._transitionDone(),{injector:this._injector})}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration===`0ms`||this.animationDuration===`0s`}static ɵfac=function(e){return new(e||a)};static ɵcmp=OI({type:a,selectors:[[`mat-tab-body`]],viewQuery:function(e,n){if(e&1&&gp(ke,5)(He,5),e&2){let i;TE(i=bE())&&(n._portalHost=i.first),TE(i=bE())&&(n._contentElement=i.first)}},hostAttrs:[1,`mat-mdc-tab-body`],hostVars:1,hostBindings:function(e,n){e&2&&op(`inert`,n._position===`center`?null:``)},inputs:{_content:[0,`content`,`_content`],animationDuration:`animationDuration`,preserveContent:`preserveContent`,position:`position`},outputs:{_onCentering:`_onCentering`,_beforeCentering:`_beforeCentering`,_onCentered:`_onCentered`},decls:3,vars:6,consts:[[`content`,``],[`cdkScrollable`,``,1,`mat-mdc-tab-body-content`],[`matTabBodyHost`,``]],template:function(e,n){e&1&&(li(0,`div`,1,0),Jf(2,ze,0,0,`ng-template`,2),wc()),e&2&&Dp(`mat-tab-body-content-left`,n._position===`left`)(`mat-tab-body-content-right`,n._position===`right`)(`mat-tab-body-content-can-animate`,n._position===`center`||n._previousPosition===`center`)},dependencies:[ke,he],styles:[`.mat-mdc-tab-body {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  overflow: hidden;
  outline: 0;
  flex-basis: 100%;
}
.mat-mdc-tab-body.mat-mdc-tab-body-active {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  flex-grow: 1;
}
.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active {
  overflow-y: hidden;
}

.mat-mdc-tab-body-content {
  height: 100%;
  overflow: auto;
  transform: none;
  visibility: hidden;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content, .mat-mdc-tab-body-active > .mat-mdc-tab-body-content {
  visibility: visible;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content {
  min-height: 1px;
}
.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content {
  overflow: hidden;
}

.mat-tab-body-content-can-animate {
  transition: transform var(--%NS%mat-tab-body-animation-duration) 1ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable .mat-tab-body-content-can-animate {
  transition: none;
}

.mat-tab-body-content-left {
  transform: translate3d(-100%, 0, 0);
}

.mat-tab-body-content-right {
  transform: translate3d(100%, 0, 0);
}
`],encapsulation:2,changeDetection:1})}return a})();var Ie=(()=>{class a{_elementRef=E(Ir);_changeDetectorRef=E(TP);_ngZone=E(Me$1);_tabsSubscription=H.EMPTY;_tabLabelSubscription=H.EMPTY;_tabBodySubscription=H.EMPTY;_diAnimationsDisabled=hs();_bodyAnimationDuration;_headerAnimationDuration;_allTabs;_tabBodies;_tabBodyWrapper;_tabHeader;_tabs=new Zo;_indexToSelect=0;_lastFocusedTabIndex=null;_tabBodyWrapperHeight=0;color;get fitInkBarToContent(){return this._fitInkBarToContent}set fitInkBarToContent(t){this._fitInkBarToContent=t,this._changeDetectorRef.markForCheck()}_fitInkBarToContent=!1;stretchTabs=!0;alignTabs=null;dynamicHeight=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(t){this._indexToSelect=isNaN(t)?null:t}_selectedIndex=null;headerPosition=`above`;get animationDuration(){return this._animationDuration}set animationDuration(t){this._animationDuration=t,t&&typeof t==`object`?(this._bodyAnimationDuration=ut(t.body),this._headerAnimationDuration=ut(t.header)):this._headerAnimationDuration=this._bodyAnimationDuration=ut(t)}_animationDuration;get contentTabIndex(){return this._contentTabIndex}set contentTabIndex(t){this._contentTabIndex=isNaN(t)?null:t}_contentTabIndex=null;disablePagination=!1;disableRipple=!1;preserveContent=!1;get backgroundColor(){return this._backgroundColor}set backgroundColor(t){let e=this._elementRef.nativeElement.classList;e.remove(`mat-tabs-with-background`,`mat-background-${this.backgroundColor}`),t&&e.add(`mat-tabs-with-background`,`mat-background-${t}`),this._backgroundColor=t}_backgroundColor;ariaLabel;ariaLabelledby;selectedIndexChange=new Fe$1;focusChange=new Fe$1;animationDone=new Fe$1;selectedTabChange=new Fe$1(!0);_groupId;_isServer=!E(m).isBrowser;constructor(){let t=E(rn,{optional:!0});this._groupId=E(_e).getId(`mat-tab-group-`),this.animationDuration=t&&t.animationDuration?t.animationDuration:`500ms`,this.disablePagination=t&&t.disablePagination!=null?t.disablePagination:!1,this.dynamicHeight=t&&t.dynamicHeight!=null?t.dynamicHeight:!1,t?.contentTabIndex!=null&&(this.contentTabIndex=t.contentTabIndex),this.preserveContent=!!t?.preserveContent,this.fitInkBarToContent=t&&t.fitInkBarToContent!=null?t.fitInkBarToContent:!1,this.stretchTabs=t&&t.stretchTabs!=null?t.stretchTabs:!0,this.alignTabs=t&&t.alignTabs!=null?t.alignTabs:null}ngAfterContentChecked(){let t=this._indexToSelect=this._clampTabIndex(this._indexToSelect);if(this._selectedIndex!=t){let e=this._selectedIndex==null;if(!e){this.selectedTabChange.emit(this._createChangeEvent(t));let n=this._tabBodyWrapper.nativeElement;n.style.minHeight=n.clientHeight+`px`}Promise.resolve().then(()=>{this._tabs.forEach((n,i)=>n.isActive=i===t),e||(this.selectedIndexChange.emit(t),this._tabBodyWrapper.nativeElement.style.minHeight=``)})}this._tabs.forEach((e,n)=>{e.position=n-t,this._selectedIndex!=null&&e.position==0&&!e.origin&&(e.origin=t-this._selectedIndex)}),this._selectedIndex!==t&&(this._selectedIndex=t,this._lastFocusedTabIndex=null,this._changeDetectorRef.markForCheck())}ngAfterContentInit(){this._subscribeToAllTabChanges(),this._subscribeToTabLabels(),this._tabsSubscription=this._tabs.changes.subscribe(()=>{let t=this._clampTabIndex(this._indexToSelect);if(t===this._selectedIndex){let e=this._tabs.toArray(),n;for(let i=0;i<e.length;i++)if(e[i].isActive){this._indexToSelect=this._selectedIndex=i,this._lastFocusedTabIndex=null,n=e[i];break}!n&&e[t]&&Promise.resolve().then(()=>{e[t].isActive=!0,this.selectedTabChange.emit(this._createChangeEvent(t))})}this._changeDetectorRef.markForCheck()})}ngAfterViewInit(){this._tabBodySubscription=this._tabBodies.changes.subscribe(()=>this._bodyCentered(!0))}_subscribeToAllTabChanges(){this._allTabs.changes.pipe(Fh(this._allTabs)).subscribe(t=>{this._tabs.reset(t.filter(e=>e._closestTabGroup===this||!e._closestTabGroup)),this._tabs.notifyOnChanges()})}ngOnDestroy(){this._tabs.destroy(),this._tabsSubscription.unsubscribe(),this._tabLabelSubscription.unsubscribe(),this._tabBodySubscription.unsubscribe()}realignInkBar(){this._tabHeader&&this._tabHeader._alignInkBarToSelectedTab()}updatePagination(){this._tabHeader&&this._tabHeader.updatePagination()}focusTab(t){let e=this._tabHeader;e&&(e.focusIndex=t)}_focusChanged(t){this._lastFocusedTabIndex=t,this.focusChange.emit(this._createChangeEvent(t))}_createChangeEvent(t){let e=new yt;return e.index=t,this._tabs&&this._tabs.length&&(e.tab=this._tabs.toArray()[t]),e}_subscribeToTabLabels(){this._tabLabelSubscription&&this._tabLabelSubscription.unsubscribe(),this._tabLabelSubscription=Th(...this._tabs.map(t=>t._stateChanges)).subscribe(()=>this._changeDetectorRef.markForCheck())}_clampTabIndex(t){return Math.min(this._tabs.length-1,Math.max(t||0,0))}_getTabLabelId(t,e){return t.id||`${this._groupId}-label-${e}`}_getTabContentId(t){return`${this._groupId}-content-${t}`}_setTabBodyWrapperHeight(t){if(!this.dynamicHeight||!this._tabBodyWrapperHeight){this._tabBodyWrapperHeight=t;return}let e=this._tabBodyWrapper.nativeElement;e.style.height=this._tabBodyWrapperHeight+`px`,this._tabBodyWrapper.nativeElement.offsetHeight&&(e.style.height=t+`px`)}_removeTabBodyWrapperHeight(){let t=this._tabBodyWrapper.nativeElement;this._tabBodyWrapperHeight=t.clientHeight,t.style.height=``,this._ngZone.run(()=>this.animationDone.emit())}_handleClick(t,e,n){e.focusIndex=n,t.disabled||(this.selectedIndex=n)}_getTabIndex(t){return t===(this._lastFocusedTabIndex??this.selectedIndex)?0:-1}_tabFocusChanged(t,e){t&&t!==`mouse`&&t!==`touch`&&(this._tabHeader.focusIndex=e)}_bodyCentered(t){t&&this._tabBodies?.forEach((e,n)=>e._setActiveClass(n===this._selectedIndex))}_bodyAnimationsDisabled(){return this._diAnimationsDisabled||this._bodyAnimationDuration===`0`||this._bodyAnimationDuration===`0ms`}static ɵfac=function(e){return new(e||a)};static ɵcmp=OI({type:a,selectors:[[`mat-tab-group`]],contentQueries:function(e,n,i){if(e&1&&hp(i,xt,5),e&2){let m;TE(m=bE())&&(n._allTabs=m)}},viewQuery:function(e,n){if(e&1&&gp(Qe,5)(qe,5)(vt,5),e&2){let i;TE(i=bE())&&(n._tabBodyWrapper=i.first),TE(i=bE())&&(n._tabHeader=i.first),TE(i=bE())&&(n._tabBodies=i)}},hostAttrs:[1,`mat-mdc-tab-group`],hostVars:13,hostBindings:function(e,n){e&2&&(op(`mat-align-tabs`,n.alignTabs),jE(`mat-`+(n.color||`primary`)),Ep(`--%NS%mat-tab-body-animation-duration`,n._bodyAnimationDuration)(`--%NS%mat-tab-header-animation-duration`,n._headerAnimationDuration),Dp(`mat-mdc-tab-group-dynamic-height`,n.dynamicHeight)(`mat-mdc-tab-group-inverted-header`,n.headerPosition===`below`)(`mat-mdc-tab-group-stretch-tabs`,n.stretchTabs))},inputs:{color:`color`,fitInkBarToContent:[2,`fitInkBarToContent`,`fitInkBarToContent`,_P],stretchTabs:[2,`mat-stretch-tabs`,`stretchTabs`,_P],alignTabs:[0,`mat-align-tabs`,`alignTabs`],dynamicHeight:[2,`dynamicHeight`,`dynamicHeight`,_P],selectedIndex:[2,`selectedIndex`,`selectedIndex`,MP],headerPosition:`headerPosition`,animationDuration:`animationDuration`,contentTabIndex:[2,`contentTabIndex`,`contentTabIndex`,MP],disablePagination:[2,`disablePagination`,`disablePagination`,_P],disableRipple:[2,`disableRipple`,`disableRipple`,_P],preserveContent:[2,`preserveContent`,`preserveContent`,_P],backgroundColor:`backgroundColor`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`]},outputs:{selectedIndexChange:`selectedIndexChange`,focusChange:`focusChange`,animationDone:`animationDone`,selectedTabChange:`selectedTabChange`},exportAs:[`matTabGroup`],features:[iD([{provide:Pe,useExisting:a}])],ngContentSelectors:Ct,decls:9,vars:8,consts:[[`tabHeader`,``],[`tabBodyWrapper`,``],[`tabNode`,``],[3,`indexFocused`,`selectFocusedIndex`,`selectedIndex`,`disableRipple`,`disablePagination`,`aria-label`,`aria-labelledby`],[`role`,`tab`,`matTabLabelWrapper`,``,`cdkMonitorElementFocus`,``,1,`mdc-tab`,`mat-mdc-tab`,`mat-focus-indicator`,3,`id`,`mdc-tab--active`,`class`,`disabled`,`fitInkBarToContent`],[1,`mat-mdc-tab-body-wrapper`],[`role`,`tabpanel`,3,`id`,`class`,`content`,`position`,`animationDuration`,`preserveContent`],[`role`,`tab`,`matTabLabelWrapper`,``,`cdkMonitorElementFocus`,``,1,`mdc-tab`,`mat-mdc-tab`,`mat-focus-indicator`,3,`click`,`cdkFocusChange`,`id`,`disabled`,`fitInkBarToContent`],[1,`mdc-tab__ripple`],[`mat-ripple`,``,1,`mat-mdc-tab-ripple`,3,`matRippleTrigger`,`matRippleDisabled`],[1,`mdc-tab__content`],[1,`mdc-tab__text-label`],[3,`cdkPortalOutlet`],[`role`,`tabpanel`,3,`_onCentered`,`_onCentering`,`_beforeCentering`,`id`,`content`,`position`,`animationDuration`,`preserveContent`]],template:function(e,n){e&1&&(DE(),li(0,`mat-tab-header`,3,0),fp(`indexFocused`,function(m){return n._focusChanged(m)})(`selectFocusedIndex`,function(m){return n.selectedIndex=m}),lE(2,$e,8,17,`div`,4,cE),wc(),iE(4,Ze,1,0),li(5,`div`,5,1),lE(7,Ke,1,10,`mat-tab-body`,6,cE),wc()),e&2&&(ip(`selectedIndex`,n.selectedIndex||0)(`disableRipple`,n.disableRipple)(`disablePagination`,n.disablePagination),rp(`aria-label`,n.ariaLabel)(`aria-labelledby`,n.ariaLabelledby),nv(2),uE(n._tabs),nv(2),sE(n._isServer?4:-1),nv(),Dp(`_mat-animation-noopable`,n._bodyAnimationsDisabled()),nv(2),uE(n._tabs))},dependencies:[on,Se,bt,ct$1,_i,vt],styles:[`.mdc-tab {
  min-width: 90px;
  padding: 0 24px;
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  outline: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  z-index: 1;
  touch-action: manipulation;
}

.mdc-tab__content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  pointer-events: none;
}

.mdc-tab__text-label {
  transition: 150ms color linear;
  display: inline-block;
  line-height: 1;
  z-index: 2;
}

.mdc-tab--active .mdc-tab__text-label {
  transition-delay: 100ms;
}

._mat-animation-noopable .mdc-tab__text-label {
  transition: none;
}

.mdc-tab-indicator {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.mdc-tab-indicator__content {
  transition: var(--%NS%mat-tab-header-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left;
  opacity: 0;
}

.mdc-tab-indicator__content--underline {
  align-self: flex-end;
  box-sizing: border-box;
  width: 100%;
  border-top-style: solid;
}

.mdc-tab-indicator--active .mdc-tab-indicator__content {
  opacity: 1;
}

._mat-animation-noopable .mdc-tab-indicator__content, .mdc-tab-indicator--no-transition .mdc-tab-indicator__content {
  transition: none;
}

.mat-mdc-tab-ripple.mat-mdc-tab-ripple {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.mat-mdc-tab {
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration: none;
  background: none;
  height: var(--%NS%mat-tab-container-height, 48px);
  font-family: var(--%NS%mat-tab-label-text-font, var(--%NS%mat-sys-title-small-font));
  font-size: var(--%NS%mat-tab-label-text-size, var(--%NS%mat-sys-title-small-size));
  letter-spacing: var(--%NS%mat-tab-label-text-tracking, var(--%NS%mat-sys-title-small-tracking));
  line-height: var(--%NS%mat-tab-label-text-line-height, var(--%NS%mat-sys-title-small-line-height));
  font-weight: var(--%NS%mat-tab-label-text-weight, var(--%NS%mat-sys-title-small-weight));
}
.mat-mdc-tab.mdc-tab {
  flex-grow: 0;
}
.mat-mdc-tab .mdc-tab-indicator__content--underline {
  border-color: var(--%NS%mat-tab-active-indicator-color, var(--%NS%mat-sys-primary));
  border-top-width: var(--%NS%mat-tab-active-indicator-height, 2px);
  border-radius: var(--%NS%mat-tab-active-indicator-shape, 0);
}
.mat-mdc-tab:hover .mdc-tab__text-label {
  color: var(--%NS%mat-tab-inactive-hover-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-tab:focus .mdc-tab__text-label {
  color: var(--%NS%mat-tab-inactive-focus-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label {
  color: var(--%NS%mat-tab-active-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,
.mat-mdc-tab.mdc-tab--active .mat-ripple-element {
  background-color: var(--%NS%mat-tab-active-ripple-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--%NS%active:hover .mdc-tab__text-label {
  color: var(--%NS%mat-tab-active-hover-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--%NS%active:hover .mdc-tab-indicator__content--underline {
  border-color: var(--%NS%mat-tab-active-hover-indicator-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-tab.mdc-tab--%NS%active:focus .mdc-tab__text-label {
  color: var(--%NS%mat-tab-active-focus-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--%NS%active:focus .mdc-tab-indicator__content--underline {
  border-color: var(--%NS%mat-tab-active-focus-indicator-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-tab.mat-mdc-tab-disabled {
  opacity: 0.4;
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content {
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,
.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element {
  background-color: var(--%NS%mat-tab-disabled-ripple-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-tab .mdc-tab__ripple::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  background-color: var(--%NS%mat-tab-inactive-ripple-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-tab .mdc-tab__text-label {
  color: var(--%NS%mat-tab-inactive-label-text-color, var(--%NS%mat-sys-on-surface));
  display: inline-flex;
  align-items: center;
}
.mat-mdc-tab .mdc-tab__content {
  position: relative;
  pointer-events: auto;
}
.mat-mdc-tab:hover .mdc-tab__ripple::before {
  opacity: 0.04;
}
.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before, .mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before {
  opacity: 0.12;
}
.mat-mdc-tab .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--%NS%mat-tab-inactive-ripple-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs > .mat-mdc-tab-header .mat-mdc-tab {
  flex-grow: 1;
}

.mat-mdc-tab-group {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination {
  background-color: var(--%NS%mat-tab-background-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label {
  color: var(--%NS%mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mdc-tab-indicator__content--underline {
  border-color: var(--%NS%mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label {
  color: var(--%NS%mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline {
  border-color: var(--%NS%mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-focus-indicator::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-focus-indicator::before {
  border-color: var(--%NS%mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mdc-tab__ripple::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mdc-tab__ripple::before {
  background-color: var(--%NS%mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron {
  color: var(--%NS%mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header {
  flex-direction: column-reverse;
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline {
  align-self: flex-start;
}

.mat-mdc-tab-body-wrapper {
  position: relative;
  overflow: hidden;
  display: flex;
  transition: height 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
`],encapsulation:2,changeDetection:1})}return a})();var yt=class{index;tab};var Me=(()=>{class a{static ɵfac=function(e){return new(e||a)};static ɵmod=PI({type:a});static ɵinj=wl({imports:[Ms]})}return a})();function ln(a,s){if(a&1){let t=mE();li(0,`button`,47),fp(`click`,function(){Ql(t);return Zl(IE(2).cancelProfileChanges())}),ZE(1,` Cancel `),wc(),li(2,`button`,48),fp(`click`,function(){Ql(t);return Zl(IE(2).saveProfile())}),sp(3,`img`,49),li(4,`span`),ZE(5,`Save Changes`),wc()()}if(a&2){let t=IE(2);nv(2),ip(`disabled`,t.profileForm.pristine)}}function dn(a,s){if(a&1){let t=mE();li(0,`button`,50),fp(`click`,function(){Ql(t);return Zl(IE(2).editProfile())}),sp(1,`img`,51),li(2,`span`),ZE(3,`Edit Profile`),wc()()}}function cn(a,s){if(a&1&&iE(0,ln,6,1)(1,dn,4,0,`button`,46),a&2)sE(IE().profileEditing()?0:1)}function mn(a,s){if(a&1){let t=mE();li(0,`button`,47),fp(`click`,function(){Ql(t);return Zl(IE().cancelPasswordChange())}),ZE(1,` Cancel `),wc(),li(2,`button`,48),fp(`click`,function(){Ql(t);return Zl(IE().savePassword())}),sp(3,`img`,49),li(4,`span`),ZE(5,`Save Password`),wc()()}if(a&2){let t=IE();nv(2),ip(`disabled`,t.passwordForm.pristine)}}function bn(a,s){a&1&&(li(0,`mat-error`),ZE(1,`First name is required.`),wc())}function pn(a,s){a&1&&(li(0,`mat-error`),ZE(1,`Last name is required.`),wc())}function _n(a,s){a&1&&(li(0,`mat-error`),ZE(1,`Email address is required.`),wc())}function hn(a,s){a&1&&(li(0,`mat-error`),ZE(1,`Enter a valid email address.`),wc())}function fn(a,s){a&1&&(li(0,`mat-error`),ZE(1,`Phone number is required.`),wc())}function un(a,s){a&1&&(li(0,`mat-error`),ZE(1,`Department is required.`),wc())}function gn(a,s){if(a&1&&(li(0,`mat-option`,30),ZE(1),wc()),a&2){let t=s.$implicit;ip(`value`,t),nv(),Np(t)}}function vn(a,s){a&1&&(li(0,`mat-error`),ZE(1,`System role is required.`),wc())}function yn(a,s){a&1&&(li(0,`mat-error`),ZE(1,`Current password is required.`),wc())}function Cn(a,s){a&1&&(li(0,`mat-error`),ZE(1,`New password is required.`),wc())}function xn(a,s){a&1&&(li(0,`mat-error`),ZE(1,`Use at least 8 characters.`),wc())}function wn(a,s){a&1&&(li(0,`mat-error`),ZE(1,`Please confirm the new password.`),wc())}function kn(a,s){a&1&&(li(0,`mat-error`),ZE(1,`Passwords do not match.`),wc())}var Tn=a=>{let s=a.get(`newPassword`)?.value,t=a.get(`confirmPassword`)?.value;return s&&t&&s!==t?{passwordsDoNotMatch:!0}:null};var Ne=class a{formBuilder=E(Ln);systemRoles=[`Administrator`,`Institution Admin`,`Clinical Admin`];activeTabIndex=Oo(0);profileEditing=Oo(!1);currentPasswordVisible=Oo(!1);newPasswordVisible=Oo(!1);confirmPasswordVisible=Oo(!1);profileForm=this.formBuilder.nonNullable.group({firstName:[`John`,_e$1.required],lastName:[`Smith`,_e$1.required],email:[`admin@gestara.com`,[_e$1.required,_e$1.email]],phoneNumber:[`+1 (555) 019-2834`,_e$1.required],department:[`Platform Administration`,_e$1.required],systemRole:[`Administrator`,_e$1.required]});savedProfile=this.profileForm.getRawValue();passwordForm=this.formBuilder.nonNullable.group({currentPassword:[``,_e$1.required],newPassword:[``,[_e$1.required,_e$1.minLength(8)]],confirmPassword:[``,_e$1.required]},{validators:Tn});constructor(){this.profileForm.disable({emitEvent:!1})}editProfile(){this.profileEditing.set(!0),this.profileForm.enable({emitEvent:!1})}cancelProfileChanges(){this.profileForm.reset(this.savedProfile),this.profileForm.disable({emitEvent:!1}),this.profileEditing.set(!1)}saveProfile(){if(this.profileForm.invalid){this.profileForm.markAllAsTouched();return}this.savedProfile=this.profileForm.getRawValue(),this.profileForm.markAsPristine(),this.profileForm.markAsUntouched(),this.profileForm.disable({emitEvent:!1}),this.profileEditing.set(!1)}cancelPasswordChange(){this.passwordForm.reset(),this.currentPasswordVisible.set(!1),this.newPasswordVisible.set(!1),this.confirmPasswordVisible.set(!1)}savePassword(){if(this.passwordForm.invalid){this.passwordForm.markAllAsTouched();return}this.cancelPasswordChange()}static ɵfac=function(t){return new(t||a)};static ɵcmp=OI({type:a,selectors:[[`app-admin-profile`]],decls:97,vars:23,consts:[[1,`admin-profile-page`],[`aria-labelledby`,`admin-profile-name`,1,`admin-profile-hero`],[1,`admin-profile-hero__avatar`],[`src`,`assets/admin/profile/profile-user.svg`,`alt`,``,`width`,`44`,`height`,`44`],[1,`admin-profile-hero__identity`],[1,`admin-profile-hero__title`],[`id`,`admin-profile-name`],[`aria-hidden`,`true`],[3,`href`],[`aria-label`,`Profile settings`,1,`admin-profile-card`],[1,`admin-profile-card__actions`],[`animationDuration`,`200ms`,`preserveContent`,``,1,`admin-profile-tabs`,3,`selectedIndexChange`],[`label`,`Personal Information`],[1,`admin-profile-form`,3,`ngSubmit`,`formGroup`],[1,`admin-profile-fields`],[1,`admin-field`],[`for`,`admin-profile-first-name`,1,`admin-field__label`],[`appearance`,`outline`,`subscriptSizing`,`dynamic`,1,`admin-form-field`,`admin-profile-field`],[`id`,`admin-profile-first-name`,`matInput`,``,`formControlName`,`firstName`,`autocomplete`,`given-name`],[`for`,`admin-profile-last-name`,1,`admin-field__label`],[`id`,`admin-profile-last-name`,`matInput`,``,`formControlName`,`lastName`,`autocomplete`,`family-name`],[`for`,`admin-profile-email`,1,`admin-field__label`],[`id`,`admin-profile-email`,`matInput`,``,`type`,`email`,`formControlName`,`email`,`autocomplete`,`email`],[`for`,`admin-profile-phone`,1,`admin-field__label`],[`id`,`admin-profile-phone`,`matInput`,``,`type`,`tel`,`formControlName`,`phoneNumber`,`autocomplete`,`tel`],[`for`,`admin-profile-department`,1,`admin-field__label`],[`id`,`admin-profile-department`,`matInput`,``,`formControlName`,`department`],[`id`,`admin-profile-role-label`,1,`admin-field__label`],[`appearance`,`outline`,`subscriptSizing`,`dynamic`,1,`admin-form-field`,`admin-form-field--select`,`admin-profile-field`],[`formControlName`,`systemRole`,`panelClass`,`admin-select-panel`,`aria-labelledby`,`admin-profile-role-label`],[3,`value`],[`label`,`Change Password`],[1,`admin-profile-form`,`admin-profile-password`,3,`formGroup`],[1,`admin-profile-password__current`],[`for`,`admin-profile-current-password`,1,`admin-field__label`],[`matPrefix`,``,`src`,`assets/auth/password.svg`,`alt`,``,`width`,`16`,`height`,`16`,1,`admin-profile-field__icon`],[`id`,`admin-profile-current-password`,`matInput`,``,`formControlName`,`currentPassword`,`placeholder`,`Enter current password`,`autocomplete`,`current-password`,3,`type`],[`matIconButton`,``,`matSuffix`,``,`type`,`button`,`aria-label`,`Show or hide current password`,1,`admin-profile-field__visibility`,3,`click`],[`alt`,``,`width`,`16`,`height`,`16`,3,`src`],[1,`admin-profile-password__grid`],[`for`,`admin-profile-new-password`,1,`admin-field__label`],[`id`,`admin-profile-new-password`,`matInput`,``,`formControlName`,`newPassword`,`placeholder`,`Enter new password`,`autocomplete`,`new-password`,3,`type`],[`matIconButton`,``,`matSuffix`,``,`type`,`button`,`aria-label`,`Show or hide new password`,1,`admin-profile-field__visibility`,3,`click`],[`for`,`admin-profile-confirm-password`,1,`admin-field__label`],[`id`,`admin-profile-confirm-password`,`matInput`,``,`formControlName`,`confirmPassword`,`placeholder`,`Confirm new password`,`autocomplete`,`new-password`,3,`type`],[`matIconButton`,``,`matSuffix`,``,`type`,`button`,`aria-label`,`Show or hide confirmed password`,1,`admin-profile-field__visibility`,3,`click`],[`matButton`,`filled`,`type`,`button`,1,`app-button`,`app-button--primary`,`admin-profile-card__edit`],[`matButton`,`filled`,`type`,`button`,1,`app-button`,`app-button--secondary`,3,`click`],[`matButton`,`filled`,`type`,`button`,1,`app-button`,`app-button--primary`,3,`click`,`disabled`],[`src`,`assets/admin/add-institution/submit.svg`,`alt`,``,`width`,`16`,`height`,`16`],[`matButton`,`filled`,`type`,`button`,1,`app-button`,`app-button--primary`,`admin-profile-card__edit`,3,`click`],[`src`,`assets/admin/profile/edit-profile.svg`,`alt`,``,`width`,`14`,`height`,`14`]],template:function(t,e){t&1&&(li(0,`main`,0)(1,`section`,1)(2,`span`,2),sp(3,`img`,3),wc(),li(4,`div`,4)(5,`div`,5)(6,`h1`,6),ZE(7),wc(),li(8,`span`),ZE(9,`Super Admin`),wc()(),li(10,`p`),ZE(11,`Administrator `),li(12,`i`,7),ZE(13,`•`),wc(),ZE(14,` Gestara Healthcare Platform`),wc(),li(15,`a`,8),ZE(16),wc()()(),li(17,`section`,9)(18,`div`,10),iE(19,cn,2,1)(20,mn,6,1),wc(),li(21,`mat-tab-group`,11),fp(`selectedIndexChange`,function(i){return e.activeTabIndex.set(i)}),li(22,`mat-tab`,12)(23,`form`,13),fp(`ngSubmit`,function(){return e.saveProfile()}),li(24,`div`,14)(25,`div`,15)(26,`label`,16),ZE(27,`First Name`),wc(),li(28,`mat-form-field`,17),sp(29,`input`,18),qv(),iE(30,bn,2,0,`mat-error`),wc()(),li(31,`div`,15)(32,`label`,19),ZE(33,`Last Name`),wc(),li(34,`mat-form-field`,17),sp(35,`input`,20),qv(),iE(36,pn,2,0,`mat-error`),wc()(),li(37,`div`,15)(38,`label`,21),ZE(39,`Email Address`),wc(),li(40,`mat-form-field`,17),sp(41,`input`,22),qv(),iE(42,_n,2,0,`mat-error`)(43,hn,2,0,`mat-error`),wc()(),li(44,`div`,15)(45,`label`,23),ZE(46,`Phone Number`),wc(),li(47,`mat-form-field`,17),sp(48,`input`,24),qv(),iE(49,fn,2,0,`mat-error`),wc()(),li(50,`div`,15)(51,`label`,25),ZE(52,`Department`),wc(),li(53,`mat-form-field`,17),sp(54,`input`,26),qv(),iE(55,un,2,0,`mat-error`),wc()(),li(56,`div`,15)(57,`label`,27),ZE(58,`System Role`),wc(),li(59,`mat-form-field`,28)(60,`mat-select`,29),lE(61,gn,2,2,`mat-option`,30,cE),wc(),qv(),iE(63,vn,2,0,`mat-error`),wc()()()()(),li(64,`mat-tab`,31)(65,`form`,32)(66,`div`,33)(67,`div`,15)(68,`label`,34),ZE(69,`Current Password`),wc(),li(70,`mat-form-field`,17),sp(71,`img`,35)(72,`input`,36),qv(),li(73,`button`,37),fp(`click`,function(){return e.currentPasswordVisible.set(!e.currentPasswordVisible())}),sp(74,`img`,38),wc(),iE(75,yn,2,0,`mat-error`),wc()()(),li(76,`div`,39)(77,`div`,15)(78,`label`,40),ZE(79,`New Password`),wc(),li(80,`mat-form-field`,17),sp(81,`img`,35)(82,`input`,41),qv(),li(83,`button`,42),fp(`click`,function(){return e.newPasswordVisible.set(!e.newPasswordVisible())}),sp(84,`img`,38),wc(),iE(85,Cn,2,0,`mat-error`)(86,xn,2,0,`mat-error`),wc()(),li(87,`div`,15)(88,`label`,43),ZE(89,`Confirm New Password`),wc(),li(90,`mat-form-field`,17),sp(91,`img`,35)(92,`input`,44),qv(),li(93,`button`,45),fp(`click`,function(){return e.confirmPasswordVisible.set(!e.confirmPasswordVisible())}),sp(94,`img`,38),wc(),iE(95,wn,2,0,`mat-error`)(96,kn,2,0,`mat-error`),wc()()()()()()()()),t&2&&(nv(7),Sp(` Dr. `,e.profileForm.controls.firstName.value,` `,e.profileForm.controls.lastName.value,` `),nv(8),ip(`href`,tD(`mailto:`,e.profileForm.controls.email.value),Wd),nv(),Mc(` `,e.profileForm.controls.email.value,` `),nv(3),sE(e.activeTabIndex()===0?19:20),nv(4),ip(`formGroup`,e.profileForm),nv(6),Gv(),nv(),sE(e.profileForm.controls.firstName.touched&&e.profileForm.controls.firstName.hasError(`required`)?30:-1),nv(5),Gv(),nv(),sE(e.profileForm.controls.lastName.touched&&e.profileForm.controls.lastName.hasError(`required`)?36:-1),nv(5),Gv(),nv(),sE(e.profileForm.controls.email.touched&&e.profileForm.controls.email.hasError(`required`)?42:e.profileForm.controls.email.touched&&e.profileForm.controls.email.hasError(`email`)?43:-1),nv(6),Gv(),nv(),sE(e.profileForm.controls.phoneNumber.touched&&e.profileForm.controls.phoneNumber.hasError(`required`)?49:-1),nv(5),Gv(),nv(),sE(e.profileForm.controls.department.touched&&e.profileForm.controls.department.hasError(`required`)?55:-1),nv(5),Gv(),nv(),uE(e.systemRoles),nv(2),sE(e.profileForm.controls.systemRole.touched&&e.profileForm.controls.systemRole.hasError(`required`)?63:-1),nv(2),ip(`formGroup`,e.passwordForm),nv(7),ip(`type`,e.currentPasswordVisible()?`text`:`password`),Gv(),nv(2),ip(`src`,e.currentPasswordVisible()?`assets/auth/visibility-off.svg`:`assets/auth/visibility.svg`,Wd),nv(),sE(e.passwordForm.controls.currentPassword.touched&&e.passwordForm.controls.currentPassword.hasError(`required`)?75:-1),nv(7),ip(`type`,e.newPasswordVisible()?`text`:`password`),Gv(),nv(2),ip(`src`,e.newPasswordVisible()?`assets/auth/visibility-off.svg`:`assets/auth/visibility.svg`,Wd),nv(),sE(e.passwordForm.controls.newPassword.touched&&e.passwordForm.controls.newPassword.hasError(`required`)?85:e.passwordForm.controls.newPassword.touched&&e.passwordForm.controls.newPassword.hasError(`minlength`)?86:-1),nv(7),ip(`type`,e.confirmPasswordVisible()?`text`:`password`),Gv(),nv(2),ip(`src`,e.confirmPasswordVisible()?`assets/auth/visibility-off.svg`:`assets/auth/visibility.svg`,Wd),nv(),sE(e.passwordForm.controls.confirmPassword.touched&&e.passwordForm.controls.confirmPassword.hasError(`required`)?95:e.passwordForm.controls.confirmPassword.touched&&e.passwordForm.hasError(`passwordsDoNotMatch`)?96:-1))},dependencies:[qn,Gn,Je$1,Tn$1,jn,pn$1,fn$1,It,it,en$1,je$1,gt$1,_t,xt$1,Be$1,Pe$1,Mi,Ci,q,Me,xt,Ie],styles:[`[_nghost-%COMP%]{display:block;font-family:Inter,Arial,sans-serif}.admin-profile-page[_ngcontent-%COMP%]{display:flex;min-width:0;flex-direction:column;gap:32px;color:#111827}.admin-profile-hero[_ngcontent-%COMP%]{display:flex;min-width:0;align-items:center;gap:24px;padding:32px;border:1px solid #f3f4f6;border-radius:24px;background:#fff}.admin-profile-hero__avatar[_ngcontent-%COMP%]{display:grid;flex:0 0 96px;width:96px;height:96px;place-items:center;border-radius:50%;background:linear-gradient(135deg,#2dd4bf,#0d9488);box-shadow:0 4px 6px #0d948821}.admin-profile-hero__avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:44px;height:44px}.admin-profile-hero__identity[_ngcontent-%COMP%]{min-width:0;flex:1}.admin-profile-hero__identity[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .admin-profile-hero__identity[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;margin:0;font-size:14px;font-weight:400;line-height:20px}.admin-profile-hero__identity[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:8px;color:#6b7280}.admin-profile-hero__identity[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-style:normal}.admin-profile-hero__identity[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{margin-top:4px;color:#9ca3af;text-decoration:none}.admin-profile-hero__title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px}.admin-profile-hero__title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;color:#111827;font-size:var(--%NS%app-font-size-28px);font-weight:700;line-height:36px}.admin-profile-hero__title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding:4px 8px;border-radius:6px;background:#0d94881a;color:#0d9488;font-size:12px;font-weight:600;line-height:normal}.admin-profile-card[_ngcontent-%COMP%]{position:relative;min-width:0;padding:24px;border:1px solid #f3f4f6;border-radius:16px;background:#fff;box-shadow:0 4px 6px #00000005}.admin-profile-card__actions[_ngcontent-%COMP%]{position:absolute;z-index:2;top:24px;right:24px;display:flex;align-items:center;justify-content:flex-end;gap:20px}.admin-profile-card__actions[_ngcontent-%COMP%]   .app-button[_ngcontent-%COMP%]{min-width:92px}.admin-profile-card__actions[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;width:16px;height:16px}.admin-profile-card__actions[_ngcontent-%COMP%]   .admin-profile-card__edit[_ngcontent-%COMP%]{--%NS%mat-button-filled-container-shape: 10px;min-width:136px}.admin-profile-card__actions[_ngcontent-%COMP%]   .admin-profile-card__edit[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:14px;height:14px}.admin-profile-form[_ngcontent-%COMP%]{padding-top:20px}.admin-profile-fields[_ngcontent-%COMP%], .admin-profile-password__grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.admin-profile-field__icon[_ngcontent-%COMP%]{width:16px;height:16px;margin-right:10px}.admin-profile-field__visibility[_ngcontent-%COMP%]{width:32px;height:32px;padding:8px}.admin-profile-field__visibility[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;width:16px;height:16px}.admin-profile-password[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px}.admin-profile-password__current[_ngcontent-%COMP%]{width:calc(50% - 8px)}[_nghost-%COMP%]     .admin-profile-tabs{--%NS%mat-tab-divider-height: 0;--%NS%mat-tab-active-indicator-color: #0d9488;--%NS%mat-tab-active-focus-indicator-color: #0d9488;--%NS%mat-tab-active-hover-indicator-color: #0d9488}[_nghost-%COMP%]     .admin-profile-tabs .mat-mdc-tab-header{border-bottom:0}[_nghost-%COMP%]     .admin-profile-tabs .mat-mdc-tab-label-container, [_nghost-%COMP%]     .admin-profile-tabs .mat-mdc-tab-list{flex-grow:0}[_nghost-%COMP%]     .admin-profile-tabs .mat-mdc-tab{min-width:auto;height:40px;padding:0 8px}[_nghost-%COMP%]     .admin-profile-tabs .mat-mdc-tab:first-child{margin-right:24px}[_nghost-%COMP%]     .admin-profile-tabs .mdc-tab__text-label{color:#73808c;font-family:Inter,Arial,sans-serif;font-size:var(--%NS%app-font-size-18px);font-weight:600;line-height:28px}[_nghost-%COMP%]     .admin-profile-tabs .mat-mdc-tab.mdc-tab--active .mdc-tab__text-label{color:#111827}[_nghost-%COMP%]     .admin-profile-tabs .mdc-tab-indicator__content--underline{border-color:#0d9488;border-top-width:2px}[_nghost-%COMP%]     .admin-profile-tabs .mat-mdc-tab-body-content{overflow:hidden}[_nghost-%COMP%]     .admin-profile-field{--%NS%mdc-outlined-text-field-container-shape: 8px;--%NS%mdc-outlined-text-field-outline-color: #e5e7eb;--%NS%mdc-outlined-text-field-hover-outline-color: #d1d5db;--%NS%mdc-outlined-text-field-focus-outline-color: #0d9488;--%NS%mdc-outlined-text-field-input-text-color: #111827;--%NS%mat-form-field-container-height: 42px;--%NS%mat-form-field-container-vertical-padding: 10px}[_nghost-%COMP%]     .admin-profile-field .mat-mdc-text-field-wrapper{height:42px;padding:0 14px;background:#faf9f7}[_nghost-%COMP%]     .admin-profile-field .mat-mdc-form-field-flex{height:42px;align-items:center}[_nghost-%COMP%]     .admin-profile-field .mat-mdc-form-field-infix{min-height:42px;padding-top:10px;padding-bottom:10px}[_nghost-%COMP%]     .admin-profile-field .mat-mdc-form-field-subscript-wrapper{display:block}[_nghost-%COMP%]     .admin-profile-field.mat-form-field-disabled .mat-mdc-text-field-wrapper{border-color:#e5e7eb;background:#f3f4f6}[_nghost-%COMP%]     .admin-profile-field input.mat-mdc-input-element, [_nghost-%COMP%]     .admin-profile-field .mat-mdc-select-value-text{color:#111827;font-size:14px;line-height:20px}[_nghost-%COMP%]     .admin-profile-field .mat-mdc-form-field-icon-prefix, [_nghost-%COMP%]     .admin-profile-field .mat-mdc-form-field-icon-suffix{display:flex;align-items:center;padding:0}@media(max-width:767.98px){.admin-profile-page[_ngcontent-%COMP%]{gap:24px}.admin-profile-hero[_ngcontent-%COMP%]{align-items:flex-start;gap:16px;padding:24px 20px}.admin-profile-hero__avatar[_ngcontent-%COMP%]{flex-basis:72px;width:72px;height:72px}.admin-profile-hero__avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:36px;height:36px}.admin-profile-hero__title[_ngcontent-%COMP%]{align-items:flex-start;flex-direction:column;gap:4px}.admin-profile-hero__title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:var(--%NS%app-font-size-23px);line-height:30px}.admin-profile-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:20px 16px}.admin-profile-card__actions[_ngcontent-%COMP%]{position:static;order:-1;width:100%;gap:12px;margin-bottom:12px}.admin-profile-card__actions[_ngcontent-%COMP%]   .app-button[_ngcontent-%COMP%]{min-width:0}.admin-profile-fields[_ngcontent-%COMP%], .admin-profile-password__grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.admin-profile-password__current[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]     .admin-profile-tabs .mat-mdc-tab{padding:0 4px}[_nghost-%COMP%]     .admin-profile-tabs .mat-mdc-tab:first-child{margin-right:12px}[_nghost-%COMP%]     .admin-profile-tabs .mdc-tab__text-label{font-size:15px}}`]})};export{Ne as AdminProfile};