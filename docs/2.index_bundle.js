(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{469:function(t,n,e){"use strict";e.r(n);var i=e(520),a=e(488);for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);e(511);var s=e(7),r=Object(s.a)(a.default,i.a,i.b,!1,null,null,null);n.default=r.exports},472:function(t,n,e){"use strict";e.r(n);var i=e(473),a=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,function(){return i[t]})}(o);n.default=a.a},473:function(t,n,e){var i,a,o;a=[n],void 0===(o="function"==typeof(i=function(t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={props:["events","config"],data:function(){return{charmedName:void 0,mainContent:[]}},methods:{animateIn:function(t,n,e,i,a){var o,s,r,c,u=this;s=e||.6,r=n||.1,c=i||.3,o={opacity:1,x:"0%",y:"0%",scaleX:1,scaleY:1,ease:Power4.easeOut,delay:c};for(var f=function(){var n=u,e=t[l],i=void 0;if(l>=t.length-1&&a){var c={onComplete:function(){n.events.$emit(a)}};i=Object.assign(c,o)}else i=o;TweenLite.to(e,s,i),s+=r},l=0;l<t.length;l++)f()},animateContent:function(){this.toggleContainer(this.$refs.container),this.animateIn(this.charmedName,this.$props.config.increment,this.$props.config.duration,this.$props.config.delay,this.$props.config.eventName),this.animateIn(this.mainContent,this.$props.config.increment+.25,this.$props.config.duration+.15,this.$props.config.delay+.1,this.$props.config.eventName)},initTitle:function(){var t=[].slice.call(this.$refs.container.querySelectorAll(".header"));if(t[0]){for(var n=t[t.length-1].nextElementSibling;n;)this.mainContent.push(n),n=n.nextElementSibling;this.charmedName=this.charmWords(t),console.log(this.charmedName),this.animateContent()}},toggleContainer:function(t){var n=0;"0"===t.style.opacity&&(n=1),TweenLite.set(t,{opacity:n})},initEventListeners:function(){this.events.$on("app-loaded",this.initTitle),this.events.$on("page-transitioned",this.initTitle)}},created:function(){this.initEventListeners()},mounted:function(){this.toggleContainer(this.$refs.container)},beforeDestroy:function(){this.events.$off("app-loaded",this.initTitle),this.events.$off("page-transitioned",this.initTitle)}};t.default=n})?i.apply(n,a):i)||(t.exports=o)},474:function(t,n,e){},475:function(t,n,e){"use strict";e.r(n);var i=e(478),a=e(472);for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);e(476);var s=e(7),r=Object(s.a)(a.default,i.a,i.b,!1,null,null,null);n.default=r.exports},476:function(t,n,e){"use strict";var i=e(474);e.n(i).a},478:function(t,n,e){"use strict";var i=function(){var t=this.$createElement;return(this._self._c||t)("div",{ref:"container"},[this._t("default")],2)},a=[];e.d(n,"a",function(){return i}),e.d(n,"b",function(){return a})},488:function(t,n,e){"use strict";e.r(n);var i=e(489),a=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,function(){return i[t]})}(o);n.default=a.a},489:function(t,n,e){var i,a,o;a=[n,e(510),e(475)],void 0===(o="function"==typeof(i=function(t,n,i){"use strict";var a=e(14);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n=a(n);var o={name:"Contact",props:["events"],data:function(){return{}},components:{"display-content":(i=a(i)).default},computed:{animationConfig:function(){return{increment:.052,duration:.4,delay:.3,eventName:void 0}},resume:function(){return n.default}}};t.default=o})?i.apply(n,a):i)||(t.exports=o)},490:function(t,n,e){},510:function(t,n,e){t.exports=e.p+"documents/kyle+resume_11-29-18-9598c836faa8819afa08718c1fe40852.pdf"},511:function(t,n,e){"use strict";var i=e(490);e.n(i).a},520:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("div",{staticClass:"contact container"},[e("div",{staticClass:"content inner-content"},[e("display-content",{staticClass:"display-container",attrs:{events:t.events,config:t.animationConfig}},[e("h1",{staticClass:"header"},[t._v("Contact")]),t._v(" "),e("section",{staticClass:"info"},[e("p",[t._v("\n            Feel free to reach out by email.\n          ")]),t._v(" "),e("ul",[e("li",[e("a",{staticClass:"link-btn",attrs:{href:"mailto:kyle.evan.p@gmail.com"}},[t._v("\n                  kyle.evan.p@gmail.com\n                ")])])])]),t._v(" "),e("section",{staticClass:"info"},[e("h2",[t._v("Professional Resources")]),t._v(" "),e("ul",[e("li",[e("a",{staticClass:"link-btn",attrs:{target:"_blank",href:"#",type:"button",disabled:""}},[t._v("\n                Letter of Reference\n              ")]),t._v(" "),e("a",{staticClass:"link-btn",attrs:{target:"_blank",href:t.resume}},[t._v("\n                Resume\n              ")])])])]),t._v(" "),e("section",{staticClass:"info"},[e("h2",[t._v("GitHub")]),t._v(" "),e("ul",[e("li",[e("a",{staticClass:"link-btn",attrs:{target:"_blank",href:"https://github.com/KyleEvan"}},[t._v("\n                github.com/KyleEvan\n              ")])])])])])],1)])])},a=[];e.d(n,"a",function(){return i}),e.d(n,"b",function(){return a})}}]);
//# sourceMappingURL=2.index_bundle.js.map