(this["webpackJsonpgo-wild"]=this["webpackJsonpgo-wild"]||[]).push([[8],{546:function(e,t,n){"use strict";var a=n(25),i=n(1),c=Object(a.a)(Object(i.jsxs)("svg",{width:"100%",height:"100%",viewBox:"0 0 22 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(i.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M18 11V8C18 4.13401 14.866 1 11 1C7.13401 1 4 4.13401 4 8V11C4 14.3 1 15.1 1 17C1 18.7 4.9 20 11 20C17.1 20 21 18.7 21 17C21 15.1 18 14.3 18 11Z",stroke:"#09110E",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),Object(i.jsx)("path",{d:"M10.9995 22C9.98853 22 9.03853 21.966 8.14453 21.9C8.5357 23.1478 9.69187 23.997 10.9995 23.997C12.3072 23.997 13.4634 23.1478 13.8545 21.9C12.9605 21.966 12.0105 22 10.9995 22Z",fill:"#09110E"})]}),"WorkspaceNotification");t.a=c},581:function(e,t,n){"use strict";n.r(t);var a,i=n(20),c=n(506),s=n(591),r=n(596),o=n(592),l=n(597),u=n(595),d=n(0),b=n(116),j=n(29),p=n(546),h=n(193),m=n(24),f=n.n(m),x=n(21),O=n(32),g=n(15),v=n(584),w=n(527),y=n(588),C=n(90);!function(e){e.TermsAndConditions="Terms & Conditions",e.FAQ="FAQ",e.EWaiver="E - Waiver"}(a||(a={}));var S,k,A,D,q,T,F,G,M,V,E,W,B,P=a,Q=n(590),L=n(594),N=n(1),z=Object(j.a)(Q.a)(S||(S=Object(i.a)(['\n  && {\n    color: #c0c0c0;\n    font-family: "Gilroy-Bold";\n  }\n']))),J=Object(j.a)(L.a)(k||(k=Object(i.a)(["\n  && {\n    border: 0;\n    border-radius: 0;\n    &.MuiToggleButton-root {\n      color: #c0c0c0;\n    }\n    &.Mui-selected {\n      background-color: transparent;\n      color: #000000;\n      border-bottom: 3px solid #e4572e;\n    }\n  }\n"]))),R=function(e){var t=e.tabOpened,n=e.onTabChange;return Object(N.jsxs)(z,{value:t,exclusive:!0,onChange:n,"aria-label":"Guideline Tabs",sx:{px:"1em"},children:[Object(N.jsx)(J,{value:P.TermsAndConditions,"aria-label":P.TermsAndConditions,children:P.TermsAndConditions}),Object(N.jsx)(J,{value:P.FAQ,"aria-label":P.FAQ,children:P.FAQ}),Object(N.jsx)(J,{value:P.EWaiver,"aria-label":P.EWaiver,children:P.EWaiver})]})},Z=function(e){var t=e.date,n=e.type;return Object(N.jsxs)($,{py:1,children:[Object(N.jsx)(H,{variant:"subtitle2",children:t.toLocaleDateString()}),Object(N.jsxs)(u.a,{fontFamily:"Poppins",children:[" ",n," "]})]})},$=Object(j.a)(c.a)(A||(A=Object(i.a)(["\n  && {\n    border-bottom: 1px solid #efefef;\n  }\n"]))),H=Object(j.a)(u.a)(D||(D=Object(i.a)(['\n  && {\n    color: #979797;\n    font-weight: 600;\n    font-family: "Poppins";\n  }\n']))),I=function(e){var t=e.logs,n=t[t.length-1].date;return Object(N.jsxs)(Y,{pl:2,children:[Object(N.jsxs)(U,{variant:"h5",mb:2,children:[n.toLocaleString("default",{month:"long"})," ",n.getDate(),", ",n.getFullYear()]}),Object(N.jsx)(u.a,{sx:{opacity:"0.3",fontFamily:"Poppins"},children:"Update Logs"}),t.map((function(e,t,n){var a=n[n.length-1-t];return Object(N.jsx)(Z,{date:a.date,type:a.type},"".concat(a.type,"-").concat(t))}))]})},U=Object(j.a)(u.a)(q||(q=Object(i.a)(['\n  && {\n    color: #000;\n    font-weight: 700;\n    font-family: "Gilroy-SemiBold", "Gilroy-Bold";\n  }\n']))),Y=Object(j.a)(c.a)(T||(T=Object(i.a)(["\n  && {\n    height: 100%;\n    border-left: 1px dashed rgba(0, 0, 0, 0.2);\n    color: #979797;\n    overflow-y: auto;\n  }\n"]))),_=function(){var e=Object(d.useState)(P.TermsAndConditions),t=Object(g.a)(e,2),n=t[0],a=t[1],i=Object(d.useState)(te),s=Object(g.a)(i,2),r=s[0],o=(s[1],Object(d.useState)(ne)),l=Object(g.a)(o,2),u=l[0],b=(l[1],Object(d.useState)(ae)),j=Object(g.a)(b,2),p=j[0],h=(j[1],Object(d.useState)(ie)),m=Object(g.a)(h,2),v=m[0],w=m[1],y=Object(d.useState)(te),S=Object(g.a)(y,2),k=S[0],A=S[1],D=function(e,t){switch(a(t),t){case P.TermsAndConditions:A(r);break;case P.FAQ:A(u);break;case P.EWaiver:A(p)}};return Object(N.jsx)(ee,{children:Object(N.jsx)(c.a,{padding:3,sx:{height:"calc(100% - 101px)"},children:Object(N.jsx)(C.a,{initialValues:{textValue:k},onSubmit:function(){var e=Object(O.a)(f.a.mark((function e(t,a){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.setSubmitting,e.abrupt("return",w((function(e){return[].concat(Object(x.a)(e),[{type:n,date:new Date}])})));case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),enableReinitialize:!0,children:function(e){var t=e.values,a=e.touched,i=e.handleBlur,s=e.handleSubmit,r=e.handleChange;return Object(N.jsxs)("form",{noValidate:!0,onSubmit:s,style:{height:"100%"},children:[Object(N.jsx)(R,{tabOpened:n,onTabChange:D}),Object(N.jsxs)(c.a,{display:"flex",height:"100%",pb:2,children:[Object(N.jsx)(c.a,{flex:"3",pr:2,children:Object(N.jsx)(K,{"aria-label":"Guidlines textarea",value:t.textValue,onBlur:i("textValue"),onChange:r("textValue")})}),Object(N.jsx)(c.a,{flex:"1",children:Object(N.jsx)(I,{logs:v})})]}),Object(N.jsx)(X,{$touched:a.textValue,type:"submit",children:"Save"})]})}})})})},K=Object(j.a)(v.a)(F||(F=Object(i.a)(['\n  && {\n    border: 1px solid #e4e4e4;\n    border-radius: 20px;\n    padding: 1.5em;\n    resize: none;\n    background-color: #fff;\n    outline: none;\n    color: #898a8d;\n    height: 100% !important;\n    width: 100%;\n    overflow-y: auto !important;\n    line-height: 24px;\n    font-family: "Gilroy-Medium";\n  }\n']))),X=Object(j.a)(w.a)(G||(G=Object(i.a)(["\n  && {\n    background-color: ",";\n    color: #fff;\n    height: 50px;\n    width: 177px;\n  }\n"])),(function(e){return e.$touched?"#1D140C":"#021f3d"})),ee=Object(j.a)(y.a)(M||(M=Object(i.a)(["\n  && {\n    box-shadow: none;\n    border-radius: 20px;\n    width: 100%;\n    height: 100%;\n    background-color: #fff;\n  }\n"]))),te="Aliquam eu nunc sit amet dolor aliquet elementum. Duis a feugiat nisl. Praesent at enim erat. Suspendisse cursus tristique felis vel dictum. Nam tempus diam ac massa venenatis tempor a ultricies orci. Donec nibh orci, egestas eget lacus sit amet, venenatis egestas odio. Maecenas odio ante, mattis eu faucibus hendrerit, commodo in sapien. In hac habitasse platea dictumst. Curabitur euismod orci dui, a laoreet nulla mattis quis. Sed a elementum nisi, at molestie turpis. Cras finibus nibh sapien, et vulputate sem vulputate a. Maecenas sit amet lacinia lectus. Vivamus in diam ut lorem congue fermentum nec nec lectus. Donec blandit turpis eget finibus rhoncus.",ne="Maecenas et erat mattis, molestie felis nec, tincidunt dolor. Mauris tristique gravida justo quis ornare. Duis facilisis nisl ut mi rhoncus, et consequat metus vulputate. Donec et dolor leo. Etiam vitae enim vel sapien placerat luctus et eu metus. Donec feugiat vitae nibh a congue. Praesent nec neque sed arcu fermentum feugiat et sit amet nisl. Aliquam id tristique turpis.",ae="Pellentesque accumsan commodo lacus quis dapibus. Duis laoreet felis et ipsum consequat, vitae efficitur lorem ultricies. Phasellus ultricies sed ante sed vulputate. Donec non iaculis turpis. Nulla feugiat mi id enim molestie interdum. Nam erat dolor, finibus sed tincidunt vel, fermentum ac velit. Vivamus ac arcu non augue ornare tincidunt quis vitae urna.",ie=[{date:new Date("December 31, 1975, 23:15:30 GMT+11:00"),type:P.TermsAndConditions},{date:new Date("Jan 1, 2020, 23:15:30 GMT+11:00"),type:P.FAQ}],ce=n(117),se=(t.default=function(){var e=Object(h.a)().settings;return Object(d.useEffect)((function(){ce.a.push({event:"page_view"})}),[]),Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(b.a,{children:Object(N.jsx)("title",{children:"Guidelines | Go Wild"})}),Object(N.jsx)(c.a,{sx:{backgroundColor:"#1D140C",minHeight:"100%",pt:"55px",pb:"61px"},children:Object(N.jsxs)(se,{maxWidth:!!e.compact&&"xl",sx:{pl:"28px !important",pr:"89px !important"},children:[Object(N.jsxs)(s.a,{container:!0,justifyContent:"space-between",children:[Object(N.jsx)(s.a,{item:!0,children:Object(N.jsx)(re,{children:"Guidelines"})}),Object(N.jsxs)(oe,{item:!0,children:[Object(N.jsx)(le,{children:Object(N.jsx)(r.a,{children:Object(N.jsx)(p.a,{})})}),Object(N.jsx)(c.a,{children:Object(N.jsx)(o.a,{src:"/static/mock-images/avatars/gowild.png",sx:{width:44,height:44}})})]})]}),Object(N.jsx)(c.a,{sx:{mt:"27px",height:"calc(100vh - 157px)"},children:Object(N.jsx)(_,{})})]})})]})},Object(j.a)(l.a)(V||(V=Object(i.a)(['\n  && {\n    padding-left: "70px !important";\n    padding-right: "60px !important";\n  }\n'])))),re=Object(j.a)(u.a)(E||(E=Object(i.a)(['\n  && {\n    font-family: "Samsung Sharp Sans Bold";\n    font-style: normal;\n    font-weight: 700;\n    font-size: 40px;\n    line-height: 50px;\n    color: #ffffff;\n    margin-left: 38px;\n  }\n']))),oe=Object(j.a)(s.a)(W||(W=Object(i.a)(["\n  && {\n    /* padding-left: 8px; */\n    margin-bottom: 7.5px;\n    width: 353px;\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-end;\n    align-items: center;\n  }\n"]))),le=Object(j.a)(c.a)(B||(B=Object(i.a)(["\n  && {\n    width: 48px;\n    height: 48px;\n    background: #ffffff;\n    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.03);\n    border-radius: 10px;\n    margin-left: auto;\n    margin-right: 71px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n"])))}}]);
//# sourceMappingURL=8.c02c8985.chunk.js.map