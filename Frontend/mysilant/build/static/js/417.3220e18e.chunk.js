"use strict";(self.webpackChunkmysilant=self.webpackChunkmysilant||[]).push([[417],{417:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var s=n(885),r=n(791),u={main:"Main_main__F2ek1",btn_createmachine:"Main_btn_createmachine__bnBf2"},c=n(184),a=r.lazy((function(){return n.e(426).then(n.bind(n,426))})),i=r.lazy((function(){return n.e(157).then(n.bind(n,157))})),o=r.lazy((function(){return n.e(760).then(n.bind(n,760))})),l=r.lazy((function(){return n.e(937).then(n.bind(n,937))})),h=r.lazy((function(){return n.e(475).then(n.bind(n,475))})),p=r.lazy((function(){return n.e(742).then(n.bind(n,742))})),d=r.lazy((function(){return n.e(364).then(n.bind(n,364))}));function f(e){var t=(0,r.useState)([]),n=(0,s.Z)(t,2),f=n[0],j=n[1],x=(0,r.useState)({}),y=(0,s.Z)(x,2),m=y[0],G=y[1],S=(0,r.useState)("list"),b=(0,s.Z)(S,2),g=b[0],_=b[1],k=(0,r.useState)(0),Z=(0,s.Z)(k,2),E=Z[0],z=Z[1],P=(0,r.useState)(0),C=(0,s.Z)(P,2),T=C[0],w=C[1],v=(0,r.useState)(""),F=(0,s.Z)(v,2),M=F[0],D=F[1],L=(0,r.useState)(!1),N=(0,s.Z)(L,2),U=N[0],B=N[1],q=(0,r.useState)(""),A=(0,s.Z)(q,2),H=A[0],I=A[1],J=(0,r.useState)([]),K=(0,s.Z)(J,2),O=K[0],Q=K[1];return(0,r.useEffect)((function(){B(!0),fetch("http://localhost:8000/api/machines/".concat(M),{headers:{"Content-Type":"application/json;charset=utf-8"},credentials:"include"}).then((function(e){if(e.ok)return e.json();throw Error("".concat(e.status," ").concat(e.statusText))})).then((function(e){Q(e),I(""),B(!1)})).catch((function(e){I("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430. ".concat(e)),console.log(e),B(!1)}))}),[M,E]),(0,r.useEffect)((function(){fetch("http://localhost:8000/api/directory/",{headers:{"Content-Type":"application/json;charset=utf-8"},credentials:"include"}).then((function(e){if(e.ok)return e.json();throw Error("".concat(e.status," ").concat(e.statusText))})).then((function(e){j(e)}))}),[T]),(0,r.useEffect)((function(){fetch("http://localhost:8000/api/users",{headers:{"Content-Type":"application/json;charset=utf-8"},credentials:"include"}).then((function(e){if(e.ok)return e.json();throw Error("".concat(e.status," ").concat(e.statusText))})).then((function(e){G(e)}))}),[]),(0,c.jsxs)("div",{className:u.main,children:["\u041c\u0435\u043d\u0435\u0434\u0436\u0435\u0440"===e.userGroup||"\u0421\u0435\u0440\u0432\u0438\u0441\u043d\u0430\u044f \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f"===e.userGroup?(0,c.jsx)(r.Suspense,{children:(0,c.jsx)(a,{userGroup:e.userGroup,setPage:_,page:g})}):null,"\u041c\u0435\u043d\u0435\u0434\u0436\u0435\u0440"===e.userGroup&&"list"===g?(0,c.jsx)("button",{className:u.btn_createmachine,onClick:function(){return _("machine_create")},children:"+ \u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043c\u0430\u0448\u0438\u043d\u0443"}):null,"machine_create"===g?(0,c.jsx)(r.Suspense,{children:(0,c.jsx)(i,{directory:f,userGroup:e.userGroup,users:m,page:g,setPage:_})}):null,"list"===g?(0,c.jsx)(r.Suspense,{children:(0,c.jsx)(o,{setPage:_,directory:f,userGroup:e.userGroup,users:m,setUpdateList:z,setFilters:D,loading:U,updateList:E,setFetchError:I,fetchError:H,machines:O,setMachines:Q})}):null,"tos"===g?(0,c.jsx)(r.Suspense,{children:(0,c.jsx)(l,{setPage:_,directory:f,userGroup:e.userGroup,users:m,machines:O})}):null,"complaints"===g?(0,c.jsx)(r.Suspense,{children:(0,c.jsx)(h,{setPage:_,directory:f,userGroup:e.userGroup,users:m,machines:O})}):null,"users"===g?(0,c.jsx)(r.Suspense,{children:(0,c.jsx)(p,{setPage:_,directory:f,userGroup:e.userGroup,users:m,machines:O})}):null,"directories"===g?(0,c.jsx)(r.Suspense,{children:(0,c.jsx)(d,{setPage:_,directory:f,userGroup:e.userGroup,updateDir:T,setUpdateDir:w})}):null]})}}}]);
//# sourceMappingURL=417.3220e18e.chunk.js.map