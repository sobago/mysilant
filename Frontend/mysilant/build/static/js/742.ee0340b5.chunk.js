"use strict";(self.webpackChunkmysilant=self.webpackChunkmysilant||[]).push([[742],{742:function(e,t,n){n.r(t),n.d(t,{default:function(){return p}});var s=n(192);var r=n(885),a={users:"AllUsers_users__GFMHx",table_container:"AllUsers_table_container__xB8Jd",users_table:"AllUsers_users_table__r+9Cu",error_message:"AllUsers_error_message__MsU1t",add_btn:"AllUsers_add_btn__QOvt+"},i=n(791),u=n(683),o={complaints_detail:"AllUsersDetail_complaints_detail__cOoxv",close_button:"AllUsersDetail_close_button__6QEu5",textarea:"AllUsersDetail_textarea__tptSh",pass_change:"AllUsersDetail_pass_change__Qw1F1",submit:"AllUsersDetail_submit__szzkc",status_ok:"AllUsersDetail_status_ok__ZMjIc",status_error:"AllUsersDetail_status_error__HPNl9"},l=n(184);function c(e){var t=e.userDetailItem,n=e.setUsersPage,s=e.usersPage,a=e.setUpdateList,c=e.updateList,d=(0,i.useState)({}),f=(0,r.Z)(d,2),h=f[0],p=f[1],_=(0,i.useState)(),m=(0,r.Z)(_,2),x=m[0],j=m[1],b=(0,i.useState)(""),v=(0,r.Z)(b,2),g=v[0],y=v[1],S=(0,i.useState)(""),k=(0,r.Z)(S,2),w=k[0],C=k[1],N=(0,i.useState)(0),O=(0,r.Z)(N,2),D=O[0],T=O[1],Z=(0,i.useState)(""),U=(0,r.Z)(Z,2),P=U[0],A=U[1],E=(0,i.useState)({}),F=(0,r.Z)(E,2),I=F[0],L=F[1],R=(0,i.useState)(!1),X=(0,r.Z)(R,2),G=X[0],J=X[1],M=(0,i.useState)("\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u0434\u043b\u044f \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f"),Q=(0,r.Z)(M,2),z=Q[0],H=Q[1],q=(0,i.useState)(!1),B=(0,r.Z)(q,2),V=B[0],W=B[1],Y=function(e){var t="; ".concat(document.cookie).split("; ".concat(e,"="));if(2===t.length)return t.pop().split(";").shift()}("csrftoken");(0,i.useEffect)((function(){t.hasOwnProperty("id")&&p((0,u.Z)({},t))}),[t]),(0,i.useEffect)((function(){h.hasOwnProperty("username")&&(j(h.id),y(h.first_name),C(h.username),h.is_staff?T(3):h.groups.includes(1)?T(1):h.groups.includes(2)&&T(2)),"user_create"===s&&H("")}),[h,s]);return(0,l.jsxs)("div",{className:o.complaints_detail,children:["user_create"===s?(0,l.jsx)("h3",{children:"\u0414\u041e\u0411\u0410\u0412\u041b\u0415\u041d\u0418\u0415 \u041d\u041e\u0412\u041e\u0413\u041e \u041f\u041e\u041b\u042c\u0417\u041e\u0412\u0410\u0422\u0415\u041b\u042f."}):null,(0,l.jsx)("button",{type:"button",className:o.close_button,title:"\u0417\u0430\u043a\u0440\u044b\u0442\u044c",onClick:function(e){e.preventDefault(),n("user_list")},children:"X"}),(0,l.jsxs)("form",{autoComplete:"off",onSubmit:function(e){"user_detail"===s?function(e){if(e.preventDefault(),J(!0),!w)return L({className:o.status_error,statusText:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f"}),J(!1),null;var t={first_name:g,username:w};P&&(t.password=P),1===D||2===D?(t.groups=[],t.groups.push(D),t.is_staff=0):3===D&&(t.is_staff=1),fetch("http://localhost:8000/api/users_adm/".concat(x),{method:"PUT",headers:{"Content-Type":"application/json","X-CSRFToken":Y},body:JSON.stringify(t),credentials:"include"}).then((function(e){if(e.ok)return e.json();throw Error("".concat(e.status," ").concat(e.statusText))})).then((function(e){p(e),L({className:o.status_ok,statusText:"\u0414\u0430\u043d\u043d\u044b\u0435 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u044b"}),a(c+1)})).catch((function(e){L({className:o.status_error,statusText:"\u0414\u0430\u043d\u043d\u044b\u0435 \u043d\u0435 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u044b, \u043e\u0448\u0438\u0431\u043a\u0430 \n ".concat(e)}),console.log(e)})).finally((function(){J(!1)}))}(e):"user_create"===s&&function(e){if(e.preventDefault(),!w)return L({className:o.status_error,statusText:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f"}),J(!1),null;if(!P)return L({className:o.status_error,statusText:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c"}),J(!1),null;if(0===D)return L({className:o.status_error,statusText:"\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u0433\u0440\u0443\u043f\u043f\u0443 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f"}),J(!1),null;J(!0);var t={first_name:g,password:P,username:w};3===D&&(t.is_staff=1),1!==D&&2!==D||(t.groups=[],t.groups.push(D),t.is_staff=0),fetch("http://localhost:8000/api/users_adm/",{method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":Y},body:JSON.stringify(t),credentials:"include"}).then((function(e){if(e.ok)return e.json();throw Error("".concat(e.status," ").concat(e.statusText))})).then((function(e){p(e),L({className:o.status_ok,statusText:"\u0417\u0430\u043f\u0438\u0441\u044c \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0430"}),a(c+1),W(!0)})).catch((function(e){L({className:o.status_error,statusText:"\u0417\u0430\u043f\u0438\u0441\u044c \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0430, \u043e\u0448\u0438\u0431\u043a\u0430 \n ".concat(e)}),console.log(e)})).finally((function(){J(!1)}))}(e)},children:[(0,l.jsxs)("label",{children:["\u0418\u043c\u044f",(0,l.jsx)("input",{type:"text",name:"first_name",value:g,onChange:function(e){return y(e.target.value)}})]}),(0,l.jsxs)("label",{children:["\u0418\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f:",(0,l.jsx)("input",{type:"text",name:"username",value:w,onChange:function(e){return C(e.target.value)}})]}),(0,l.jsxs)("label",{children:["\u041f\u0430\u0440\u043e\u043b\u044c: ","\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u0434\u043b\u044f \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f"===z?(0,l.jsx)("div",{className:o.pass_change,onClick:function(){return H("")},children:z}):(0,l.jsx)("input",{type:"password",name:"password",value:P,onChange:function(e){return A(e.target.value)}})]}),(0,l.jsxs)("label",{children:["\u0413\u0440\u0443\u043f\u043f\u0430:",(0,l.jsxs)("select",{value:D||0,onChange:function(e){return T(+e.target.value)},children:[(0,l.jsx)("option",{name:"none",disabled:!0,value:0,children:"===\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0437 \u0441\u043f\u0438\u0441\u043a\u0430==="}),(0,l.jsx)("option",{name:"client",value:1,children:"\u041a\u043b\u0438\u0435\u043d\u0442"}),(0,l.jsx)("option",{name:"service",value:2,children:"\u0421\u0435\u0440\u0432\u0438\u0441\u043d\u0430\u044f \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f"}),(0,l.jsx)("option",{name:"manager",value:3,children:"\u041c\u0435\u043d\u0435\u0434\u0436\u0435\u0440"})]})]}),(0,l.jsxs)("div",{className:o.submit,children:["user_detail"===s?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("button",{type:"submit",name:"submit",children:"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c"}),(0,l.jsx)("button",{type:"button",name:"delete",onClick:function(e){return function(e,t){e.preventDefault(),window.confirm("\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f ".concat(t.username,"?"))&&fetch("http://localhost:8000/api/users_adm/".concat(t.id),{method:"DELETE",headers:{"Content-Type":"application/json","X-CSRFToken":Y},credentials:"include"}).then((function(e){if(e.ok)return n("user_list"),a(c+1),e;throw Error("".concat(e.status," ").concat(e.statusText))})).catch((function(e){L({className:o.status_error,statusText:"\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430 \n ".concat(e)}),console.log(e)}))}(e,h)},children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"})]}):null,"user_create"===s?(0,l.jsx)("button",{type:"submit",disabled:V,name:"submit",children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"}):null,G?(0,l.jsx)("div",{className:o.status_ok,children:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."}):null,I?(0,l.jsx)("div",{className:I.className,children:I.statusText}):null]})]})]})}var d={machine_filters:"AllUsersFilter_machine_filters__ImfoI",filters:"AllUsersFilter_filters__FVc+4",delete_button:"AllUsersFilter_delete_button__Sh8q9",buttons:"AllUsersFilter_buttons__YDN4W"};function f(e){var t=e.setFilters,n=(0,i.useState)(""),s=(0,r.Z)(n,2),a=s[0],u=s[1],o=(0,i.useState)(""),c=(0,r.Z)(o,2),f=c[0],h=c[1];return(0,l.jsxs)("div",{className:d.machine_filters,children:[(0,l.jsx)("p",{children:"\u0424\u0438\u043b\u044c\u0442\u0440:"}),(0,l.jsxs)("form",{className:d.filters,onSubmit:function(e){e.preventDefault();var n=[];a&&n.push("first_name=".concat(a)),f&&n.push("username=".concat(f)),console.log("?".concat(n.join("&"))),t("?".concat(n.join("&")))},children:[(0,l.jsx)("input",{type:"text",name:"first_name",placeholder:"\u0418\u043c\u044f",value:a,onChange:function(e){return u(e.target.value)}}),(0,l.jsx)("input",{type:"text",name:"username",placeholder:"\u0418\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f",value:f,onChange:function(e){return h(e.target.value)}}),(0,l.jsxs)("div",{className:d.buttons,children:[(0,l.jsx)("button",{type:"submit",title:"\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c \u0444\u0438\u043b\u044c\u0442\u0440\u044b",children:"\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c"}),(0,l.jsx)("button",{className:d.delete_button,onClick:function(e){e.preventDefault(),u(""),h(""),t("")},title:"\u0421\u0431\u0440\u043e\u0441 \u0444\u0438\u043b\u044c\u0442\u0440\u0430",children:"x"})]})]})]})}var h=n(112);function p(e){var t=e.directory,n=e.users,u=e.userGroup,o=e.machines,d=(0,i.useState)({}),p=(0,r.Z)(d,2),_=p[0],m=p[1],x=(0,i.useState)(""),j=(0,r.Z)(x,2),b=j[0],v=j[1],g=(0,i.useState)(!1),y=(0,r.Z)(g,2),S=y[0],k=y[1],w=(0,i.useState)(""),C=(0,r.Z)(w,2),N=C[0],O=C[1],D=(0,i.useState)("user_list"),T=(0,r.Z)(D,2),Z=T[0],U=T[1],P=(0,i.useState)({}),A=(0,r.Z)(P,2),E=A[0],F=A[1],I=(0,i.useState)(0),L=(0,r.Z)(I,2),R=L[0],X=L[1];(0,i.useEffect)((function(){k(!0),fetch("http://localhost:8000/api/users_adm/".concat(N),{headers:{"Content-Type":"application/json;charset=utf-8"},credentials:"include"}).then((function(e){if(e.ok)return e.json();throw Error("".concat(e.status," ").concat(e.statusText))})).then((function(e){var t,n=function(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=(0,s.Z)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,o=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return u=e.done,e},e:function(e){o=!0,i=e},f:function(){try{u||null==n.return||n.return()}finally{if(o)throw i}}}}(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;r.is_staff?r.group="\u041c\u0435\u043d\u0435\u0434\u0436\u0435\u0440":r.groups.includes(2)?r.group="\u0421\u0435\u0440\u0432\u0438\u0441\u043d\u0430\u044f \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f":r.groups.includes(1)&&(r.group="\u041a\u043b\u0438\u0435\u043d\u0442")}}catch(a){n.e(a)}finally{n.f()}m(e),v(""),k(!1)})).catch((function(e){v("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430. ".concat(e)),console.log(e),k(!1)}))}),[N,R]);var G=function(e,t){e.preventDefault(),F(t),U("user_detail")},J=(0,i.useState)({}),M=(0,r.Z)(J,1)[0],Q=function(e){M.hasOwnProperty(e)?(M[e]=!M[e],(0,h.R)(e,_,m,t,!0===M[e]?"increase":"decrease")):(M[e]=!0,(0,h.R)(e,_,m,t,!0===M[e]?"increase":"decrease"))};return(0,l.jsxs)("div",{className:a.users,children:["user_create"===Z?(0,l.jsx)(c,{directory:t,userDetailItem:{id:0,first_name:"",password:void 0,username:"",groups:[]},userGroup:u,users:n,machines:o,setUsersPage:U,usersPage:Z,setUpdateList:X}):null,"user_detail"===Z?(0,l.jsx)(c,{userDetailItem:E,setUsersPage:U,usersPage:Z,setUpdateList:X,updateList:R}):null,"user_list"===Z?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("button",{type:"button",className:a.add_btn,onClick:function(e){e.preventDefault(),U("user_create")},children:"+ \u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f"}),(0,l.jsx)(f,{setFilters:O}),(0,l.jsx)("div",{className:a.table_container,children:(0,l.jsxs)("table",{className:a.users_table,children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{onClick:function(){return Q("id")},children:"ID"}),(0,l.jsx)("th",{onClick:function(){return Q("first_name")},children:"\u0418\u043c\u044f"}),(0,l.jsx)("th",{onClick:function(){return Q("username")},children:"\u0418\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f"}),(0,l.jsx)("th",{onClick:function(){return Q("group")},children:"\u0413\u0440\u0443\u043f\u043f\u0430"})]})}),S?(0,l.jsx)("tbody",{children:(0,l.jsx)("tr",{children:(0,l.jsx)("td",{colSpan:4,children:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."})})}):(0,l.jsxs)("tbody",{children:[_.length>0?_.map((function(e){return(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{onClick:function(t){return G(t,e)},children:e.id}),(0,l.jsx)("td",{onClick:function(t){return G(t,e)},children:e.first_name}),(0,l.jsx)("td",{onClick:function(t){return G(t,e)},children:e.username}),(0,l.jsx)("td",{onClick:function(t){return G(t,e)},children:e.group})]},e.id)})):(0,l.jsx)("tr",{children:(0,l.jsx)("td",{colSpan:4,children:"\u0422\u041e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u044b"})}),b?(0,l.jsx)("tr",{children:(0,l.jsx)("td",{colSpan:4,className:a.error_message,children:b})}):null]})]})})]}):null]})}},112:function(e,t,n){n.d(t,{R:function(){return s}});var s=function(e,t,n,s){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"increase",a=t.concat().sort((function(t,n){return"increase"===r?"number"===typeof t[e]&&"downtime"!==e&&"duration"!==e&&"id"!==e?s.find((function(n){return n.id===t[e]})).title>s.find((function(t){return t.id===n[e]})).title?1:-1:t[e]>n[e]?1:-1:"number"===typeof t[e]&&"downtime"!==e&&"duration"!==e&&"id"!==e?s.find((function(n){return n.id===t[e]})).title>s.find((function(t){return t.id===n[e]})).title?-1:1:t[e]>n[e]?-1:1}));n(a)}},683:function(e,t,n){n.d(t,{Z:function(){return i}});var s=n(142);function r(e,t,n){return(t=(0,s.Z)(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}}}]);
//# sourceMappingURL=742.ee0340b5.chunk.js.map