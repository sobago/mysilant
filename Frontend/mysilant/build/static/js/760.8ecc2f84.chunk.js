"use strict";(self.webpackChunkmysilant=self.webpackChunkmysilant||[]).push([[760],{760:function(e,n,t){t.r(n),t.d(n,{default:function(){return d}});var i=t(885),r={tabs:"MachineList_tabs__Z2KWv",before_table:"MachineList_before_table__tvGC9",counter:"MachineList_counter__zyOfF",error:"MachineList_error__LzcVr",table_container:"MachineList_table_container__eGULS",table_machines:"MachineList_table_machines__iTD6P",delete_button:"MachineList_delete_button__8f0HC",additional:"MachineList_additional__YrCEN"},c=t(791),l={machine_filters:"MachineFilter_machine_filters__AFpGN",filters:"MachineFilter_filters__Rqnux",delete_button:"MachineFilter_delete_button__iQCEe",buttons:"MachineFilter_buttons__aJmsq"},o=t(184);function s(e){var n=(0,c.useState)(""),t=(0,i.Z)(n,2),r=t[0],s=t[1],a=(0,c.useState)(""),u=(0,i.Z)(a,2),d=u[0],h=u[1],_=(0,c.useState)(""),f=(0,i.Z)(_,2),m=f[0],x=f[1],j=(0,c.useState)(""),p=(0,i.Z)(j,2),b=p[0],v=p[1],C=(0,c.useState)(""),k=(0,i.Z)(C,2),g=k[0],y=k[1],S=e.setFilters;return(0,o.jsxs)("div",{className:l.machine_filters,children:[(0,o.jsx)("p",{children:"\u0424\u0438\u043b\u044c\u0442\u0440:"}),(0,o.jsxs)("form",{className:l.filters,onSubmit:function(e){e.preventDefault();var n=[];r&&n.push("machine_model=".concat(r)),d&&n.push("engine_model=".concat(d)),m&&n.push("transmission_model=".concat(m)),b&&n.push("drive_axle_model=".concat(b)),g&&n.push("steer_axle_model=".concat(g)),console.log("?".concat(n.join("&"))),S("?".concat(n.join("&")))},children:[(0,o.jsx)("input",{type:"text",name:"machine_model",placeholder:"\u041c\u043e\u0434\u0435\u043b\u044c \u0442\u0435\u0445\u043d\u0438\u043a\u0438",value:r,onChange:function(e){return n=e.target.value,void s(n.toUpperCase());var n}}),(0,o.jsx)("input",{type:"text",name:"engine_model",placeholder:"\u041c\u043e\u0434\u0435\u043b\u044c \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043b\u044f",value:d,onChange:function(e){return h(e.target.value)}}),(0,o.jsx)("input",{type:"text",name:"transmission_model",placeholder:"\u041c\u043e\u0434\u0435\u043b\u044c \u0442\u0440\u0430\u043d\u0441\u043c\u0438\u0441\u0441\u0438\u0438",value:m,onChange:function(e){return x(e.target.value)}}),(0,o.jsx)("input",{type:"text",name:"drive_axle_model",placeholder:"\u041c\u043e\u0434\u0435\u043b\u044c \u0432\u0435\u0434\u0443\u0449\u0435\u0433\u043e \u043c\u043e\u0441\u0442\u0430",value:b,onChange:function(e){return v(e.target.value)}}),(0,o.jsx)("input",{type:"text",name:"steer_axle_model",placeholder:"\u041c\u043e\u0434\u0435\u043b\u044c \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u043c\u043e\u0433\u043e \u043c\u043e\u0441\u0442\u0430",value:g,onChange:function(e){return y(e.target.value)}}),(0,o.jsxs)("div",{className:l.buttons,children:[(0,o.jsx)("button",{type:"submit",title:"\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c \u0444\u0438\u043b\u044c\u0442\u0440\u044b",children:"\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c"}),(0,o.jsx)("button",{className:l.delete_button,onClick:function(e){e.preventDefault(),s(""),h(""),x(""),v(""),y(""),S("")},title:"\u0421\u0431\u0440\u043e\u0441 \u0444\u0438\u043b\u044c\u0442\u0440\u0430",children:"x"})]})]})]})}var a=t(112),u=c.lazy((function(){return t.e(929).then(t.bind(t,929))}));function d(e){var n=(0,c.useState)("machine_list"),t=(0,i.Z)(n,2),l=t[0],d=t[1],h=(0,c.useState)({}),_=(0,i.Z)(h,2),f=_[0],m=_[1],x=e.directory,j=e.userGroup,p=e.users,b=e.setFilters,v=e.setUpdateList,C=e.loading,k=e.fetchError,g=e.setFetchError,y=e.updateList,S=e.machines,L=e.setMachines,M=function(e){var n="; ".concat(document.cookie).split("; ".concat(e,"="));if(2===n.length)return n.pop().split(";").shift()}("csrftoken"),F=function(e,n){e.preventDefault(),m(n),d("machine_detail")},N=(0,c.useState)({}),w=(0,i.Z)(N,1)[0],Z=function(e){w.hasOwnProperty(e)?(w[e]=!w[e],(0,a.R)(e,S,L,x,!0===w[e]?"increase":"decrease")):(w[e]=!0,(0,a.R)(e,S,L,x,!0===w[e]?"increase":"decrease"))};return(0,o.jsxs)(o.Fragment,{children:["machine_list"===l?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s,{setFilters:b}),(0,o.jsxs)("div",{className:r.before_table,children:[(0,o.jsxs)("div",{className:r.counter,children:["\u0412\u0441\u0435\u0433\u043e: ",S.length]}),k?(0,o.jsx)("div",{className:r.error,children:k}):null]}),(0,o.jsx)("div",{className:r.table_container,children:(0,o.jsxs)("table",{className:r.table_machines,children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{onClick:function(){return Z("machine_model")},children:"\u041c\u043e\u0434\u0435\u043b\u044c"}),(0,o.jsx)("th",{onClick:function(){return Z("machine_number")},children:"\u0417\u0430\u0432. \u2116 \u043c\u0430\u0448\u0438\u043d\u044b"}),(0,o.jsx)("th",{onClick:function(){return Z("engine_model")},children:"\u041c\u043e\u0434\u0435\u043b\u044c \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043b\u044f"}),(0,o.jsx)("th",{onClick:function(){return Z("engine_number")},children:"\u0417\u0430\u0432. \u2116 \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043b\u044f"}),(0,o.jsx)("th",{onClick:function(){return Z("transmission_model")},children:"\u041c\u043e\u0434\u0435\u043b\u044c \u0442\u0440\u0430\u043d\u0441\u043c\u0438\u0441\u0441\u0438\u0438"}),(0,o.jsx)("th",{onClick:function(){return Z("transmission_number")},children:"\u0417\u0430\u0432. \u2116 \u0442\u0440\u0430\u043d\u0441\u043c\u0438\u0441\u0441\u0438\u0438"}),(0,o.jsx)("th",{onClick:function(){return Z("steer_axle_model*\t")},children:"\u041c\u043e\u0434\u0435\u043b\u044c \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u043c\u043e\u0433\u043e \u043c\u043e\u0441\u0442\u0430"}),(0,o.jsx)("th",{onClick:function(){return Z("steer_axle_number")},children:"\u0417\u0430\u0432. \u2116 \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u043c\u043e\u0433\u043e \u043c\u043e\u0441\u0442\u0430"}),(0,o.jsx)("th",{onClick:function(){return Z("drive_axle_model")},children:"\u041c\u043e\u0434\u0435\u043b\u044c \u0432\u0435\u0434\u0443\u0449\u0435\u0433\u043e \u043c\u043e\u0441\u0442\u0430"}),(0,o.jsx)("th",{onClick:function(){return Z("drive_axle_number")},children:"\u0417\u0430\u0432. \u2116 \u0432\u0435\u0434\u0443\u0449\u0435\u0433\u043e \u043c\u043e\u0441\u0442\u0430"}),(0,o.jsx)("th",{onClick:function(){return Z("machine_number")},children:"\u0414\u0430\u0442\u0430 \u043e\u0442\u0433\u0440\u0443\u0437\u043a\u0438 c \u0437\u0430\u0432\u043e\u0434\u0430"}),(0,o.jsx)("th",{children:"\u041f\u043e\u043a\u0443\u043f\u0430\u0442\u0435\u043b\u044c"}),(0,o.jsx)("th",{children:"\u0413\u0440\u0443\u0437\u043e\u043f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044c"}),(0,o.jsx)("th",{children:"\u0410\u0434\u0440\u0435\u0441 \u043f\u043e\u0441\u0442\u0430\u0432\u043a\u0438 (\u044d\u043a\u0441\u043f\u043b\u0443\u0430\u0442\u0430\u0446\u0438\u0438)"}),(0,o.jsx)("th",{children:"\u041a\u043e\u043c\u043f\u043b\u0435\u043a\u0442\u0430\u0446\u0438\u044f (\u0434\u043e\u043f. \u043e\u043f\u0446\u0438\u0438)"}),(0,o.jsx)("th",{children:"\u0421\u0435\u0440\u0432\u0438\u0441\u043d\u0430\u044f \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f"}),"\u041c\u0435\u043d\u0435\u0434\u0436\u0435\u0440"===j?(0,o.jsx)("th",{children:"X"}):null]})}),C?(0,o.jsx)("tbody",{children:(0,o.jsx)("tr",{children:(0,o.jsx)("td",{colSpan:10,children:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."})})}):(0,o.jsx)("tbody",{children:!!S.length>0&&Object.entries(p).length>0&&Object.entries(x).length>0?S.map((function(e){return(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{onClick:function(n){return F(n,e)},children:x.find((function(n){return n.id===e.machine_model})).title}),(0,o.jsx)("td",{onClick:function(n){return F(n,e)},children:e.machine_number}),(0,o.jsx)("td",{onClick:function(n){return F(n,e)},children:x.find((function(n){return n.id===e.engine_model})).title}),(0,o.jsx)("td",{onClick:function(n){return F(n,e)},children:e.engine_number}),(0,o.jsx)("td",{onClick:function(n){return F(n,e)},children:x.find((function(n){return n.id===e.transmission_model})).title}),(0,o.jsx)("td",{onClick:function(n){return F(n,e)},children:e.transmission_number}),(0,o.jsx)("td",{onClick:function(n){return F(n,e)},children:x.find((function(n){return n.id===e.steer_axle_model})).title}),(0,o.jsx)("td",{onClick:function(n){return F(n,e)},children:e.steer_axle_number}),(0,o.jsx)("td",{onClick:function(n){return F(n,e)},children:x.find((function(n){return n.id===e.drive_axle_model})).title}),(0,o.jsx)("td",{onClick:function(n){return F(n,e)},children:e.drive_axle_number}),(0,o.jsx)("td",{onClick:function(n){return F(n,e)},children:new Date(e.shipping_date).toLocaleDateString()}),(0,o.jsx)("td",{onClick:function(n){return F(n,e)},children:p.find((function(n){return n.id===e.customer})).first_name}),(0,o.jsx)("td",{onClick:function(n){return F(n,e)},children:e.consignee}),(0,o.jsx)("td",{onClick:function(n){return F(n,e)},children:e.delivery_address}),(0,o.jsx)("td",{className:r.additional,onClick:function(n){return F(n,e)},children:e.additional}),(0,o.jsx)("td",{onClick:function(n){return F(n,e)},children:p.find((function(n){return n.id===e.service_center})).first_name}),"\u041c\u0435\u043d\u0435\u0434\u0436\u0435\u0440"===j?(0,o.jsx)("td",{children:(0,o.jsx)("button",{type:"button",className:r.delete_button,value:e.id,title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c",onClick:function(n){return function(e,n){e.preventDefault(),window.confirm("\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u043c\u0430\u0448\u0438\u043d\u0443 ".concat(n,"?"))&&fetch("http://localhost:8000/api/machines/".concat(e.target.value),{method:"DELETE",headers:{"Content-Type":"application/json","X-CSRFToken":M},credentials:"include"}).then((function(e){if(e.ok)return e;throw Error("".concat(e.status," ").concat(e.statusText))})).then((function(e){g(""),v(y+1)})).catch((function(e){g("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430. ".concat(e)),console.log(e)}))}(n,e.machine_number)},children:"x"})}):null]},e.id)})):(0,o.jsx)("tr",{children:(0,o.jsx)("td",{colSpan:10,children:"\u041c\u0430\u0448\u0438\u043d\u044b \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u044b"})})})]})})]}):null,"machine_detail"===l?(0,o.jsx)(c.Suspense,{children:(0,o.jsx)(u,{setMachinePage:d,machineProp:f,directory:x,userGroup:e.userGroup,users:p,machines:S})}):null]})}},112:function(e,n,t){t.d(n,{R:function(){return i}});var i=function(e,n,t,i){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"increase",c=n.concat().sort((function(n,t){return"increase"===r?"number"===typeof n[e]&&"downtime"!==e&&"duration"!==e&&"id"!==e?i.find((function(t){return t.id===n[e]})).title>i.find((function(n){return n.id===t[e]})).title?1:-1:n[e]>t[e]?1:-1:"number"===typeof n[e]&&"downtime"!==e&&"duration"!==e&&"id"!==e?i.find((function(t){return t.id===n[e]})).title>i.find((function(n){return n.id===t[e]})).title?-1:1:n[e]>t[e]?-1:1}));t(c)}}}]);
//# sourceMappingURL=760.8ecc2f84.chunk.js.map