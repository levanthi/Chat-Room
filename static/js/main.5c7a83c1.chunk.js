(this.webpackJsonpchat_app=this.webpackJsonpchat_app||[]).push([[0],{22:function(e,t,n){e.exports={chatSection:"main_chatSection__3HH8F",chatBox:"main_chatBox__34CnR",sendGroup:"main_sendGroup__1Ih-c",chatItem:"main_chatItem__2Kwf7",name:"main_name__19Ubd",time:"main_time__1ty5m",me:"main_me__1NZQ8"}},27:function(e,t,n){e.exports={header:"main_header__1eVGv",members:"main_members__3W1fB",invite:"main_invite__w5SZs",userInvite:"main_userInvite__1cSMb",appear:"main_appear__ynNLe",error:"main_error__G3gii"}},30:function(e,t,n){e.exports={roomList:"main_roomList__2Lf01",list:"main_list__SHIZv",slideTop:"main_slideTop__IV1N8",addRoom:"main_addRoom__4CBbs",addRoombox:"main_addRoombox__3nx6z",appear:"main_appear__3rs8o"}},32:function(e,t,n){e.exports={userInfo:"main_userInfo__3mXAp",user:"main_user__89aq3",logout:"main_logout__1Zxo0"}},33:function(e,t,n){e.exports={editForm:"main_editForm__2qoDd"}},38:function(e,t,n){e.exports={home:"main_home__3yhlU"}},39:function(e,t,n){e.exports={chatroom:"main_chatroom__1uN1S"}},40:function(e,t,n){e.exports={SideBar:"main_SideBar__2n53m"}},41:function(e,t,n){e.exports={chatWindow:"main_chatWindow__3RwQU"}},50:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),c=n(36),s=n.n(c),o=n(17),i=n(7),l=n(6),u=n(37),j=n(8),m=(Object(u.a)({apiKey:"AIzaSyD7qlRtJFMoX3kS3meXSTVK5FJyLYSjQZE",authDomain:"chat-app-b6c92.firebaseapp.com",databaseURL:"https://chat-app-b6c92-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"chat-app-b6c92",storageBucket:"chat-app-b6c92.appspot.com",messagingSenderId:"813309308115",appId:"1:813309308115:web:f894823381c23bed0ab826",measurementId:"G-BYW0P6GBV7"}),Object(j.c)()),d=(n(50),n(16)),b=n.n(d),h=n(20),f=n(9),p=n.n(f),O=n(1),v=document.querySelector.bind(document);document.querySelectorAll.bind(document);function x(e){var t,n={},a=v(e.form);function r(e,a){for(var r=0;r<n[a.selector].length&&!(t=n[a.selector][r](e.value));r++);t&&(e.parentElement.classList.add(p.a.invalid),e.parentElement.querySelector("span").innerText=t)}a&&(e.rules.forEach((function(e){Array.isArray(n[e.selector])?n[e.selector].push(e.test):n[e.selector]=[e.test];var t=a.querySelector(e.selector);t.onblur=function(){r(t,e)},t.oninput=function(){t.parentElement.classList.remove(p.a.invalid),t.parentElement.querySelector("span").innerText=""}})),a.onsubmit=function(t){t.preventDefault(),e.rules.forEach((function(e){r(a.querySelector(e.selector),e)}))})}x.isRequired=function(e,t){return{selector:e,test:function(e){return e.trim()?void 0:t||"vui l\xf2ng nh\u1eadp tr\u01b0\u1eddng n\xe0y!"}}},x.minLength=function(e,t,n){return{selector:e,test:function(e){return e.length>=t?void 0:n||"Tr\u01b0\u1eddng n\xe0y t\xf4i t\u1ed1i thi\u1ec3u ".concat(t," k\xed t\u1ef1!")}}};var g=function(){var e=Object(l.f)(),t=Object(a.useState)(""),n=Object(i.a)(t,2),r=n[0],c=n[1],s=Object(a.useState)(""),o=Object(i.a)(s,2),u=o[0],d=o[1],f=(Object(a.useRef)(),Object(a.useContext)(Me).setUser),v=Object(a.useRef)();return Object(a.useEffect)((function(){x({form:"#form1",rules:[x.isRequired("#accountName","Vui l\xf2ng nh\u1eadp t\xean t\xe0i kho\u1ea3n!"),x.isRequired("#password","Vui l\xf2ng nh\u1eadp m\u1eadt kh\u1ea9u"),x.minLength("#password",6,"m\u1eadt kh\u1ea9u ph\u1ea3i t\u1ed1i thi\u1ec3u 6 k\xed t\u1ef1!")]})}),[]),Object(O.jsx)("div",{className:p.a.login,children:Object(O.jsxs)("form",{id:"form1",children:[Object(O.jsx)("h2",{style:{marginTop:"0"},children:"\u0110\u0103ng Nh\u1eadp"}),Object(O.jsxs)("div",{className:p.a.formGroup,children:[Object(O.jsx)("label",{htmlFor:"accountName",children:"T\xean t\xe0i kho\u1ea3n"}),Object(O.jsx)("input",{value:r,type:"text",name:"accountName",id:"accountName",placeholder:"VD: expample123",onChange:function(e){c(e.target.value),v.current.innerText=""}}),Object(O.jsx)("span",{className:p.a.errorMessage})]}),Object(O.jsxs)("div",{className:p.a.formGroup,children:[Object(O.jsx)("label",{htmlFor:"password",children:"M\u1eadt kh\u1ea9u"}),Object(O.jsx)("input",{value:u,type:"password",name:"password",id:"password",onChange:function(e){d(e.target.value),v.current.innerText=""}}),Object(O.jsx)("span",{className:p.a.errorMessage})]}),Object(O.jsx)("span",{ref:v}),Object(O.jsx)("button",{onClick:Object(h.a)(b.a.mark((function t(){var n,a;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(r&&u.length>=6)){t.next=4;break}return n=Object(j.f)(m),t.next=4,Object(j.b)(Object(j.a)(n,"users/"+r)).then((function(t){t.exists()&&(a=t.val()).password===u?(sessionStorage.setItem("user",a),f(a),e("/chatroom")):v.current.innerText="Username or password incorrect!"})).catch((function(e){console.error(e)}));case 4:case"end":return t.stop()}}),t)}))),children:"\u0110\u0103ng Nh\u1eadp"})]})})},y=n(19),w=n(14),N=n(13);var C=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2?arguments[2]:void 0;Object(j.g)(Object(j.f)(m,e+t),Object(w.a)({},n)).then((function(){console.log("susscess")})).catch((function(e){return console.log(e)}))},S=document.querySelector.bind(document),_=document.querySelectorAll.bind(document);function k(e,t){for(;null!==e;){if(e.parentElement.classList.contains(t))return e.parentElement;e=e.parentElement}}var A="name",q="accountName",M="password",E="passwordConfirmation",I="gender",T={name:"",accountName:"",password:"",passwordConfirmation:"",gender:null};function V(e){return{action:I,payload:e}}function R(e,t){switch(t.action){case A:return Object(w.a)(Object(w.a)({},e),{},{name:t.payload});case q:return Object(w.a)(Object(w.a)({},e),{},{accountName:t.payload});case M:return Object(w.a)(Object(w.a)({},e),{},{password:t.payload});case E:return Object(w.a)(Object(w.a)({},e),{},{passwordConfirmation:t.payload});case I:return Object(w.a)(Object(w.a)({},e),{},{gender:t.payload});default:return e}}function B(e){var t,n={},a=S(e.form);if(a){var r=function(e,a,r){if(r=k(e,p.a.formGroup),e)for(var c=0;c<n[a.selector].length&&!(t=n[a.selector][c](e.value));c++);t&&(r.classList.add(p.a.invalid),r.querySelector("span").innerText=t)};e.rules.forEach((function(e){var t=a.querySelector(e.selector),c=k(t,p.a.formGroup);Array.isArray(n[e.selector])?n[e.selector].push(e.test):n[e.selector]=[e.test],t.onblur=function(){r(t,e)},t.oninput=function(){c.classList.remove(p.a.invalid),c.querySelector("span").innerText=""}})),a.querySelector("button").onclick=function(){e.rules.forEach((function(e){var t=a.querySelector(e.selector),n=k(t,p.a.formGroup);r(t,e,n)}))}}}B.isRequired=function(e,t){return{selector:e,test:function(e){return e.trim()?void 0:t||"Vui l\xf2ng nh\u1eadp tr\u01b0\u1eddng n\xe0y!"}}},B.isPassword=function(e,t){return{selector:e,test:function(e){return e.length>=6?void 0:"m\u1eadt kh\u1ea9u ph\u1ea3i t\u1ed1i thi\u1ec3u ".concat(t," k\xed t\u1ef1!")}}},B.isPasswordComfirmation=function(e,t,n){return{selector:e,test:function(e){return e===t()?void 0:n||"Nh\u1eadp l\u1ea1i kh\xf4ng ch\xednh x\xe1c!"}}};var D=function(){var e=Object(l.f)(),t=Object(a.useReducer)(R,T),n=Object(i.a)(t,2),r=n[0],c=n[1],s=Object(a.useRef)(),o=Object(a.useRef)();return Object(a.useEffect)((function(){B({form:"#form1",rules:[B.isRequired("#name","vui l\xf2ng nh\u1eadp t\xean \u0111\u1ea7y \u0111\u1ee7!"),B.isRequired("#accountName","vui l\xf2ng nh\u1eadp t\xean t\xe0i kho\u1ea3n!"),B.isRequired("#password","vui l\xf2ng nh\u1eadp m\u1eadt kh\u1ea9u!"),B.isPassword("#password",6),B.isRequired("#password_confirmation","vui l\xf2ng nh\u1eadp l\u1ea1i m\u1eadt kh\u1ea9u!"),B.isPassword("#password_confirmation",6),B.isPasswordComfirmation("#password_confirmation",(function(){return S("#form1").querySelector("#password").value}),"M\u1eadt kh\u1ea9u x\xe1c nh\u1eadn kh\xf4ng ch\xednh x\xe1c!")]}),Object(y.a)(_("input[type=radio]")).forEach((function(e){e.onchange=function(){S("#gender").querySelector("span").innerText=""}}))}),[]),Object(a.useEffect)((function(){S("#form1").onsubmit=function(t){if(t.preventDefault(),r.gender?(S("#gender").querySelector("span").innerText="",S("#gender").classList.remove(p.a.invalid)):(S("#gender").querySelector("span").innerText="vui l\xf2ng ch\u1ecdn gi\u1edbi t\xednh",S("#gender").classList.add(p.a.invalid)),!S(".".concat(p.a.invalid))){var n=r;delete n.passwordConfirmation,console.log(n);var a=Object(j.f)(m);Object(j.b)(Object(j.a)(a,"users/".concat(n.accountName))).then((function(t){t.exists()?o.current.innerText="Username is exsisted!":(C("users/",n.accountName,n),alert("SignUp susscess! signin please!!!"),e("/signin"))})).catch((function(e){console.error(e)}))}}}),[r]),Object(O.jsxs)("div",{className:Object(N.a)(p.a.login),children:[Object(O.jsxs)("form",{action:"POST",id:"form1",autoComplete:"off",children:[Object(O.jsxs)("div",{className:Object(N.a)(p.a.formHeader),children:[Object(O.jsx)("h1",{className:Object(N.a)(p.a.formHeading),children:"\u0110\u0103ng k\xed th\xe0nh vi\xean"}),Object(O.jsx)("p",{className:Object(N.a)(p.a.formPara),children:"C\xf9ng nhau h\u1ecdc l\u1eadp tr\xecnh mi\u1ec5n ph\xed t\u1ea1i f8"})]}),Object(O.jsxs)("div",{className:Object(N.a)(p.a.formGroup),children:[Object(O.jsx)("label",{htmlFor:"name",children:"T\xean \u0111\u1ea7y \u0111\u1ee7"}),Object(O.jsx)("input",{value:r.name,type:"text",name:"name",id:"name",placeholder:"VD: L\xea V\u0103n Thi",onChange:function(e){var t;c((t=e.target.value,{action:A,payload:t}))}}),Object(O.jsx)("span",{className:Object(N.a)(p.a.errorMessage)})]}),Object(O.jsxs)("div",{className:Object(N.a)(p.a.formGroup),children:[Object(O.jsx)("label",{htmlFor:"accountName",children:"T\xean t\xe0i kho\u1ea3n"}),Object(O.jsx)("input",{value:r.accountName,name:"accountName",id:"accountName",placeholder:"VD: example1001",onChange:function(e){var t;c((t=e.target.value,{action:q,payload:t})),o.current.innerText=""}}),Object(O.jsx)("span",{className:Object(N.a)(p.a.errorMessage)})]}),Object(O.jsxs)("div",{className:Object(N.a)(p.a.formGroup),children:[Object(O.jsx)("label",{htmlFor:"password",children:"M\u1eadt kh\u1ea9u"}),Object(O.jsx)("input",{value:r.password,type:"password",name:"password",id:"password",placeholder:"M\u1eadt kh\u1ea9u",onChange:function(e){var t;c((t=e.target.value,{action:M,payload:t}))}}),Object(O.jsx)("span",{className:Object(N.a)(p.a.errorMessage)})]}),Object(O.jsxs)("div",{className:Object(N.a)(p.a.formGroup),children:[Object(O.jsx)("label",{htmlFor:"password_confirmation",children:"Nh\u1eadp l\u1ea1i m\u1eadt kh\u1ea9u"}),Object(O.jsx)("input",{value:r.passwordConfirmation,type:"password",name:"password_confirmation",id:"password_confirmation",placeholder:"Nh\u1eadp l\u1ea1i m\u1eadt kh\u1ea9u",onChange:function(e){var t;c((t=e.target.value,{action:E,payload:t}))}}),Object(O.jsx)("span",{className:Object(N.a)(p.a.errorMessage)})]}),Object(O.jsxs)("div",{id:"gender",className:Object(N.a)(p.a.formGroup),children:[Object(O.jsx)("label",{children:"Gi\u1edbi t\xednh"}),Object(O.jsxs)("div",{children:[Object(O.jsx)("input",{type:"radio",name:"gender",value:"male",onChange:function(e){return c(V(e.target.value))}}),"Nam"]}),Object(O.jsxs)("div",{children:[Object(O.jsx)("input",{type:"radio",name:"gender",value:"female",onChange:function(e){return c(V(e.target.value))}}),"Nu"]}),Object(O.jsxs)("div",{children:[Object(O.jsx)("input",{type:"radio",name:"gender",value:"other",onChange:function(e){return c(V(e.target.value))}}),"Khac"]}),Object(O.jsx)("span",{className:Object(N.a)(p.a.errorMessage)})]}),Object(O.jsx)("span",{ref:o}),Object(O.jsx)("button",{ref:s,className:Object(N.a)(p.a.button),children:"\u0110\u0103ng k\xfd"})]}),Object(O.jsx)("script",{src:"../../library/Validator"})]})},L=n(38),U=n.n(L);var z=function(){return Object(O.jsxs)("div",{className:Object(N.a)(U.a.home),children:[Object(O.jsx)("h2",{children:"WELCOME TO CHAT APP"}),Object(O.jsx)(o.b,{to:"/signin",children:"\u0110\u0103ng Nh\u1eadp"}),Object(O.jsx)(o.b,{to:"/signup",children:"\u0110\u0103ng K\xfd"})]})},G=n(39),P=n.n(G),F=n(40),K=n.n(F),X=n(32),J=n.n(X),Y="data:image/png;base64,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";var H,W=function(){var e=Object(l.f)(),t=Object(a.useContext)(Me),n=t.user,r=t.setUser;return Object(O.jsxs)("div",{className:J.a.userInfo,children:[Object(O.jsxs)("div",{className:J.a.user,children:[Object(O.jsx)(o.b,{to:"/useredit",children:Object(O.jsx)("img",{src:n.avata||Y,alt:"avata"})}),Object(O.jsx)("span",{children:n.name})]}),Object(O.jsx)("button",{className:J.a.logout,onClick:function(){sessionStorage.removeItem("user"),r(void 0),e("/signin")},children:"\u0110\u0103ng xu\u1ea5t"})]})},Z=n(30),Q=n.n(Z),$=["title","titleId"];function ee(){return ee=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},ee.apply(this,arguments)}function te(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function ne(e,t){var n=e.title,r=e.titleId,c=te(e,$);return a.createElement("svg",ee({"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"greater-than",className:"svg-inline--fa fa-greater-than fa-w-12",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512",ref:t,"aria-labelledby":r},c),n?a.createElement("title",{id:r},n):null,H||(H=a.createElement("path",{fill:"currentColor",d:"M365.52 209.85L59.22 67.01c-16.06-7.49-35.15-.54-42.64 15.52L3.01 111.61c-7.49 16.06-.54 35.15 15.52 42.64L236.96 256.1 18.49 357.99C2.47 365.46-4.46 384.5 3.01 400.52l13.52 29C24 445.54 43.04 452.47 59.06 445l306.47-142.91a32.003 32.003 0 0 0 18.48-29v-34.23c-.01-12.45-7.21-23.76-18.49-29.01z"})))}var ae,re=a.forwardRef(ne),ce=(n.p,["title","titleId"]);function se(){return se=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},se.apply(this,arguments)}function oe(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function ie(e,t){var n=e.title,r=e.titleId,c=oe(e,ce);return a.createElement("svg",se({"aria-hidden":"true",focusable:"false","data-prefix":"far","data-icon":"plus-square",className:"svg-inline--fa fa-plus-square fa-w-14",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",ref:t,"aria-labelledby":r},c),n?a.createElement("title",{id:r},n):null,ae||(ae=a.createElement("path",{fill:"currentColor",d:"M352 240v32c0 6.6-5.4 12-12 12h-88v88c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-88h-88c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h88v-88c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v88h88c6.6 0 12 5.4 12 12zm96-160v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"})))}var le=a.forwardRef(ie);n.p;var ue=function(){var e=Object(a.useRef)(),t=Object(a.useState)(""),n=Object(i.a)(t,2),r=n[0],c=n[1],s=Object(a.useState)(""),o=Object(i.a)(s,2),l=o[0],u=o[1],d=Object(a.useContext)(Me),b=d.user,h=d.setChatWindow;return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)("div",{className:Q.a.roomList,children:[Object(O.jsx)("input",{style:{display:"none"},type:"checkbox",id:"roomlist"}),Object(O.jsx)("label",{htmlFor:"roomlist",children:Object(O.jsx)(re,{})}),Object(O.jsx)("span",{children:"Danh s\xe1ch ph\xf2ng"}),Object(O.jsxs)("ul",{className:Q.a.list,children:[b.rooms?b.rooms.map((function(e){return Object(O.jsx)("li",{onClick:function(){return function(e){var t=Object(j.f)(m);Object(j.b)(Object(j.a)(t,"chatrooms/"+e)).then((function(e){e.exists()?h(e.val()):console.log("No data available")})).catch((function(e){console.error(e)}))}(e.id)},children:e.name},e.id)})):"",Object(O.jsxs)("li",{className:Q.a.addRoom,onClick:function(){return e.current.style.display="block"},children:[Object(O.jsx)(le,{}),"Th\xeam ph\xf2ng"]})]})]}),Object(O.jsxs)("div",{ref:e,className:Q.a.addRoombox,children:[Object(O.jsx)("span",{onClick:function(){e.current.style.display="none",c(""),u("")},children:"\xd7"}),Object(O.jsx)("h4",{children:"Room name"}),Object(O.jsx)("input",{value:r,placeholder:"Enter room name",onChange:function(e){return c(e.target.value)}}),Object(O.jsx)("h4",{children:"Description"}),Object(O.jsx)("textarea",{value:l,placeholder:"Description of room",onChange:function(e){return u(e.target.value)}}),Object(O.jsx)("button",{onClick:function(){var t=Math.random().toString(36).substr(2,9);C("chatrooms/",t,{name:r,description:l,members:[{username:b.accountName}],chatbox:[],id:t});var n=b.rooms||[];n.unshift({id:t,name:r}),C("users/",b.accountName,Object(w.a)(Object(w.a)({},b),{},{rooms:n})),e.current.style.display="none",c(""),u("")},children:"ADD"})]})]})};var je,me=function(){return Object(O.jsxs)("div",{className:K.a.SideBar,children:[Object(O.jsx)(W,{}),Object(O.jsx)(ue,{})]})},de=n(41),be=n.n(de),he=n(27),fe=n.n(he),pe=["title","titleId"];function Oe(){return Oe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},Oe.apply(this,arguments)}function ve(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function xe(e,t){var n=e.title,r=e.titleId,c=ve(e,pe);return a.createElement("svg",Oe({"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"user-plus",className:"svg-inline--fa fa-user-plus fa-w-20",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 512",ref:t,"aria-labelledby":r},c),n?a.createElement("title",{id:r},n):null,je||(je=a.createElement("path",{fill:"currentColor",d:"M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"})))}var ge=a.forwardRef(xe);n.p;var ye=function(){var e=Object(a.useContext)(Me).chatWindow,t=Object(a.useState)(),n=Object(i.a)(t,2),r=n[0],c=n[1],s=Object(a.useRef)(),o=Object(a.useRef)();return console.log(r),Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)("div",{ref:s,className:fe.a.userInvite,children:[Object(O.jsx)("div",{onClick:function(){s.current.style.display="none",c("")},children:"x"}),Object(O.jsx)("h3",{children:"Invite"}),Object(O.jsx)("input",{placeholder:"Enter username...",value:r,onChange:function(e){o.current.style.display="none",c(e.target.value)}}),Object(O.jsx)("p",{ref:o,className:fe.a.error,children:"User not found, retry one more time please!"}),Object(O.jsx)("button",{onClick:function(){var t=Object(j.f)(m);Object(j.b)(Object(j.a)(t,"users/".concat(r))).then((function(n){if(n.exists()){var a=n.val().rooms||[];a.some((function(t){return t.id===e.id}))||(a=[{id:e.id,name:e.name}].concat(Object(y.a)(a)));var c={};c["users/".concat(r,"/rooms")]=a,console.log(c),Object(j.h)(t,c),s.current.style.display="none"}else o.current.style.display="block"})).catch((function(e){console.error(e)}))},children:"ADD"})]}),e?Object(O.jsxs)("div",{className:fe.a.header,children:[Object(O.jsxs)("div",{children:[Object(O.jsx)("h4",{children:e.name}),Object(O.jsx)("span",{children:e.description})]}),Object(O.jsxs)("div",{children:[Object(O.jsxs)("span",{onClick:function(){s.current.style.display="block"},className:fe.a.invite,children:[Object(O.jsx)(ge,{}),Object(O.jsx)("span",{children:"M\u1eddi"})]}),Object(O.jsxs)("span",{className:fe.a.members,children:[Object(O.jsx)("img",{src:e.members[0].avata?e.members[0].avata:Y,alt:"image"}),e.members[1]?Object(O.jsx)("img",{src:e.members[1].avata?e.members[1].avata:Y,alt:"image"}):"",e.members.length>=3?Object(O.jsx)("span",{style:{justifyContent:"center"},children:e.members.length-2}):""]})]})]}):Object(O.jsx)("h1",{style:{margin:"40px auto"},children:"Vui l\xf2ng ch\u1ecdn room chat!!!"})]})},we=n(22),Ne=n.n(we);var Ce=function(){var e=Object(a.useState)(""),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(a.useContext)(Me),s=c.chatWindow,o=c.user,l=Object(a.useState)(),u=Object(i.a)(l,2),d=u[0],b=u[1];function h(){if(n){var e=new Date,t={message:n,avata:o.avata||"",name:o.name,time:e.toLocaleString(),account:o.accountName},a=Object(j.f)(m,"chatrooms/".concat(s.id,"/chatBox")),c=Object(j.e)(a);Object(j.g)(c,t),r("")}}function f(e){if(e===o.accountName)return Ne.a.me}if(Object(a.useEffect)((function(){if(s){var e=Object(j.f)(m,"chatrooms/"+s.id+"/chatBox");Object(j.d)(e,(function(e){b(e.val())}))}}),[s]),s){var p=[];for(var v in s.chatBox||(s.chatBox={}),d)p.unshift(d[v]);return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("div",{className:Ne.a.chatSection,children:Object(O.jsx)("div",{className:Ne.a.chatBox,children:p.map((function(e){return Object(O.jsxs)("div",{className:Object(N.a)(Ne.a.chatItem,f(e.account)),children:[Object(O.jsxs)("div",{children:[Object(O.jsx)("img",{src:e.avata||Y,alt:"image"}),Object(O.jsx)("span",{className:Ne.a.name,children:e.name}),Object(O.jsx)("span",{className:Ne.a.time,children:e.time})]}),Object(O.jsx)("p",{children:e.message})]},e.time)}))})}),Object(O.jsxs)("div",{className:Ne.a.sendGroup,children:[Object(O.jsx)("input",{placeholder:"message...",value:n,onChange:function(e){return r(e.target.value)},onKeyDown:function(e){"Enter"===e.key&&h()}}),Object(O.jsx)("button",{onClick:h,children:"G\u1eedi"})]})]})}return Object(O.jsx)(O.Fragment,{})};var Se=function(){return Object(O.jsxs)("div",{className:be.a.chatWindow,children:[Object(O.jsx)(ye,{}),Object(O.jsx)(Ce,{})]})};var _e=function(){return Object(O.jsxs)("div",{className:P.a.chatroom,children:[Object(O.jsx)(me,{}),Object(O.jsx)(Se,{})]})},ke=n(33),Ae=n.n(ke);var qe=function(){var e=Object(a.useContext)(Me).user,t=Object(a.useState)(),n=Object(i.a)(t,2),r=n[0],c=n[1],s=Object(a.useState)(),o=Object(i.a)(s,2),u=o[0],d=o[1],b=Object(l.f)();return Object(a.useEffect)((function(){c(e.name),d(e.avata)}),[e]),Object(O.jsxs)("form",{className:Ae.a.editForm,children:[Object(O.jsx)("span",{children:"Name"}),Object(O.jsx)("input",{value:r,onChange:function(e){c(e.target.value)},className:Ae.a.name}),Object(O.jsx)("span",{children:"Avata URL"}),Object(O.jsx)("input",{value:u,onChange:function(e){d(e.target.value)},className:Ae.a.avata}),Object(O.jsx)("button",{onClick:function(t){if(t.preventDefault(),r){var n={};n["users/".concat(e.accountName,"/name")]=r,n["users/".concat(e.accountName,"/avata")]=u,Object(j.h)(Object(j.f)(m),n),b("/chatroom")}},children:"UPDATE"})]})},Me=Object(a.createContext)();var Ee=function(){var e=Object(a.useState)(),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(),s=Object(i.a)(c,2),o=s[0],u=s[1],d=Object(l.f)(),b=Object(a.useRef)();return Object(a.useLayoutEffect)((function(){var e=JSON.parse(sessionStorage.getItem("user"));e&&(r(e),d("/chatroom"))}),[]),Object(a.useEffect)((function(){var e=b.current,t=Object(j.f)(m,"users/"+e);Object(j.d)(t,(function(e){var t=e.val();r(t)}))}),[b.current]),Object(a.useEffect)((function(){n&&(sessionStorage.setItem("user",JSON.stringify(n)),b.current=n.accountName)}),[n]),Object(O.jsx)(Me.Provider,{value:{user:n,setUser:r,chatWindow:o,setChatWindow:u},children:Object(O.jsxs)(l.c,{children:[Object(O.jsx)(l.a,{path:"/signin",element:n?Object(O.jsx)(_e,{}):Object(O.jsx)(g,{setUser:r})}),Object(O.jsx)(l.a,{path:"/signup",element:n?Object(O.jsx)(_e,{}):Object(O.jsx)(D,{})}),Object(O.jsx)(l.a,{path:"/chatroom",element:n?Object(O.jsx)(_e,{}):Object(O.jsx)(z,{})}),Object(O.jsx)(l.a,{path:"/useredit",element:n?Object(O.jsx)(qe,{}):Object(O.jsx)(g,{})}),Object(O.jsx)(l.a,{path:"/",element:n?Object(O.jsx)(_e,{}):Object(O.jsx)(z,{})})]})})},Ie=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,53)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};s.a.render(Object(O.jsx)(o.a,{children:Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(Ee,{})})}),document.getElementById("root")),Ie()},9:function(e,t,n){e.exports={login:"main_login__22hVo",formHeading:"main_formHeading__2k895",formPara:"main_formPara__2JWuK",formGroup:"main_formGroup__26tHh",invalid:"main_invalid__1BBJU"}}},[[52,1,2]]]);
//# sourceMappingURL=main.5c7a83c1.chunk.js.map