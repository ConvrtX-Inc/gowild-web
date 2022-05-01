(this["webpackJsonpgo-wild"]=this["webpackJsonpgo-wild"]||[]).push([[10],{561:function(n,t,e){"use strict";var r=e(21),c=e(5),i=e(10),a=e(2),o=e(0),s=(e(7),e(9)),d=e(42),u=e(498),g=e(448),p=e(8),m=e(16);var l=o.createContext(),b=e(190),x=e(264);function v(n){return Object(b.a)("MuiGrid",n)}var f=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],j=Object(x.a)("MuiGrid",["root","container","item","zeroMinWidth"].concat(Object(r.a)([0,1,2,3,4,5,6,7,8,9,10].map((function(n){return"spacing-xs-".concat(n)}))),Object(r.a)(["column-reverse","column","row-reverse","row"].map((function(n){return"direction-xs-".concat(n)}))),Object(r.a)(["nowrap","wrap-reverse","wrap"].map((function(n){return"wrap-xs-".concat(n)}))),Object(r.a)(f.map((function(n){return"grid-xs-".concat(n)}))),Object(r.a)(f.map((function(n){return"grid-sm-".concat(n)}))),Object(r.a)(f.map((function(n){return"grid-md-".concat(n)}))),Object(r.a)(f.map((function(n){return"grid-lg-".concat(n)}))),Object(r.a)(f.map((function(n){return"grid-xl-".concat(n)}))))),w=e(1),S=["className","columns","columnSpacing","component","container","direction","item","lg","md","rowSpacing","sm","spacing","wrap","xl","xs","zeroMinWidth"];function O(n){var t=parseFloat(n);return"".concat(t).concat(String(n).replace(String(t),"")||"px")}function h(n,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t||!n||n<=0)return[];if("string"===typeof n&&!Number.isNaN(Number(n))||"number"===typeof n)return[e["spacing-xs-".concat(String(n))]||"spacing-xs-".concat(String(n))];var r=n.xs,c=n.sm,i=n.md,a=n.lg,o=n.xl;return[Number(r)>0&&(e["spacing-xs-".concat(String(r))]||"spacing-xs-".concat(String(r))),Number(c)>0&&(e["spacing-sm-".concat(String(c))]||"spacing-sm-".concat(String(c))),Number(i)>0&&(e["spacing-md-".concat(String(i))]||"spacing-md-".concat(String(i))),Number(a)>0&&(e["spacing-lg-".concat(String(a))]||"spacing-lg-".concat(String(a))),Number(o)>0&&(e["spacing-xl-".concat(String(o))]||"spacing-xl-".concat(String(o)))]}var W=Object(p.a)("div",{name:"MuiGrid",slot:"Root",overridesResolver:function(n,t){var e=n.ownerState,c=e.container,i=e.direction,a=e.item,o=e.lg,s=e.md,d=e.sm,u=e.spacing,g=e.wrap,p=e.xl,m=e.xs,l=e.zeroMinWidth;return[t.root,c&&t.container,a&&t.item,l&&t.zeroMinWidth].concat(Object(r.a)(h(u,c,t)),["row"!==i&&t["direction-xs-".concat(String(i))],"wrap"!==g&&t["wrap-xs-".concat(String(g))],!1!==m&&t["grid-xs-".concat(String(m))],!1!==d&&t["grid-sm-".concat(String(d))],!1!==s&&t["grid-md-".concat(String(s))],!1!==o&&t["grid-lg-".concat(String(o))],!1!==p&&t["grid-xl-".concat(String(p))]])}})((function(n){var t=n.ownerState;return Object(a.a)({boxSizing:"border-box"},t.container&&{display:"flex",flexWrap:"wrap",width:"100%"},t.item&&{margin:0},t.zeroMinWidth&&{minWidth:0},"wrap"!==t.wrap&&{flexWrap:t.wrap})}),(function(n){var t=n.theme,e=n.ownerState,r=Object(d.d)({values:e.direction,breakpoints:t.breakpoints.values});return Object(d.b)({theme:t},r,(function(n){var t={flexDirection:n};return 0===n.indexOf("column")&&(t["& > .".concat(j.item)]={maxWidth:"none"}),t}))}),(function(n){var t=n.theme,e=n.ownerState,r=e.container,i=e.rowSpacing,a={};if(r&&0!==i){var o=Object(d.d)({values:i,breakpoints:t.breakpoints.values});a=Object(d.b)({theme:t},o,(function(n){var e=t.spacing(n);return"0px"!==e?Object(c.a)({marginTop:"-".concat(O(e))},"& > .".concat(j.item),{paddingTop:O(e)}):{}}))}return a}),(function(n){var t=n.theme,e=n.ownerState,r=e.container,i=e.columnSpacing,a={};if(r&&0!==i){var o=Object(d.d)({values:i,breakpoints:t.breakpoints.values});a=Object(d.b)({theme:t},o,(function(n){var e=t.spacing(n);return"0px"!==e?Object(c.a)({width:"calc(100% + ".concat(O(e),")"),marginLeft:"-".concat(O(e))},"& > .".concat(j.item),{paddingLeft:O(e)}):{}}))}return a}),(function(n){var t,e=n.theme,r=n.ownerState;return e.breakpoints.keys.reduce((function(n,c){var i={};if(r[c]&&(t=r[c]),!t)return n;if(!0===t)i={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if("auto"===t)i={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{var o=Object(d.d)({values:r.columns,breakpoints:e.breakpoints.values}),s="object"===typeof o?o[c]:o;if(void 0===s||null===s)return n;var u="".concat(Math.round(t/s*1e8)/1e6,"%"),g={};if(r.container&&r.item&&0!==r.columnSpacing){var p=e.spacing(r.columnSpacing);if("0px"!==p){var m="calc(".concat(u," + ").concat(O(p),")");g={flexBasis:m,maxWidth:m}}}i=Object(a.a)({flexBasis:u,flexGrow:0,maxWidth:u},g)}return 0===e.breakpoints.values[c]?Object.assign(n,i):n[e.breakpoints.up(c)]=i,n}),{})})),k=o.forwardRef((function(n,t){var e=Object(m.a)({props:n,name:"MuiGrid"}),c=Object(u.a)(e),d=c.className,p=c.columns,b=c.columnSpacing,x=c.component,f=void 0===x?"div":x,j=c.container,O=void 0!==j&&j,k=c.direction,M=void 0===k?"row":k,N=c.item,z=void 0!==N&&N,y=c.lg,G=void 0!==y&&y,B=c.md,C=void 0!==B&&B,F=c.rowSpacing,D=c.sm,R=void 0!==D&&D,J=c.spacing,L=void 0===J?0:J,T=c.wrap,A=void 0===T?"wrap":T,E=c.xl,H=void 0!==E&&E,I=c.xs,P=void 0!==I&&I,_=c.zeroMinWidth,q=void 0!==_&&_,K=Object(i.a)(c,S),Q=F||L,U=b||L,V=o.useContext(l),X=O?p||12:V,Y=Object(a.a)({},c,{columns:X,container:O,direction:M,item:z,lg:G,md:C,sm:R,rowSpacing:Q,columnSpacing:U,wrap:A,xl:H,xs:P,zeroMinWidth:q}),Z=function(n){var t=n.classes,e=n.container,c=n.direction,i=n.item,a=n.lg,o=n.md,s=n.sm,d=n.spacing,u=n.wrap,p=n.xl,m=n.xs,l={root:["root",e&&"container",i&&"item",n.zeroMinWidth&&"zeroMinWidth"].concat(Object(r.a)(h(d,e)),["row"!==c&&"direction-xs-".concat(String(c)),"wrap"!==u&&"wrap-xs-".concat(String(u)),!1!==m&&"grid-xs-".concat(String(m)),!1!==s&&"grid-sm-".concat(String(s)),!1!==o&&"grid-md-".concat(String(o)),!1!==a&&"grid-lg-".concat(String(a)),!1!==p&&"grid-xl-".concat(String(p))])};return Object(g.a)(l,v,t)}(Y);return Object(w.jsx)(l.Provider,{value:X,children:Object(w.jsx)(W,Object(a.a)({ownerState:Y,className:Object(s.a)(Z.root,d),as:f,ref:t},K))})}));t.a=k},574:function(n,t,e){"use strict";e.r(t);var r=e(0),c=e(116),i=e(454),a=e(542),o=e(561),s=e(539),d=e(193),u=e(117),g=e(1);t.default=function(){var n=Object(d.a)().settings;return Object(r.useEffect)((function(){u.a.push({event:"page_view"})}),[]),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(c.a,{children:Object(g.jsx)("title",{children:"Dashboard: Overview | Go Wild"})}),Object(g.jsx)(i.a,{sx:{backgroundColor:"#FAFBFC",minHeight:"100%",py:8},children:Object(g.jsx)(a.a,{maxWidth:!!n.compact&&"xl",children:Object(g.jsx)(o.a,{container:!0,spacing:3,children:Object(g.jsx)(o.a,{alignItems:"center",container:!0,justifyContent:"space-between",spacing:3,item:!0,xs:12,children:Object(g.jsx)(o.a,{item:!0,children:Object(g.jsx)(s.a,{color:"textSecondary",variant:"overline",children:"Dashboard"})})})})})})]})}}}]);
//# sourceMappingURL=10.072fb94c.chunk.js.map