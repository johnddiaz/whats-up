(this["webpackJsonpwhats-up"]=this["webpackJsonpwhats-up"]||[]).push([[0],{24:function(e,t,n){e.exports={root:"Avatar_root__Kd_qp",img:"Avatar_img__3V-MN",badge:"Avatar_badge__3Amf_"}},27:function(e,t,n){e.exports={root:"ChatPreview_root__ZRdO5",textRoot:"ChatPreview_textRoot__2r08x"}},28:function(e,t,n){},31:function(e,t,n){e.exports={root:"Header_root__2uEfk"}},32:function(e,t,n){e.exports={root:"BottomSettings_root__3V1F-"}},37:function(e,t,n){},39:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},48:function(e,t,n){},53:function(e,t,n){"use strict";n.r(t);var r=n(4),a=n.n(r),s=n(29),o=n.n(s),i=(n(37),n(12)),c=n.n(i),u=n(30),l=n(14),d=n(6),f=(n(39),n(28),n(27)),p=n.n(f),h=n(2);var v=function(e){return Object(h.jsx)("div",{className:p.a.root,onClick:function(){e.onPreviewClick(e.conversation.id)},children:Object(h.jsxs)("div",{className:p.a.textRoot,children:[Object(h.jsx)("h4",{style:{margin:"0 0 8px"},children:e.conversation.name||e.conversation.id}),Object(h.jsx)("p",{style:{margin:"0"},children:e.conversation.otherUsers.length>0?e.conversation.otherUsers.map((function(e,t,n){return 1===n.length||t===n.length-1?e.userName||e.id:"".concat(e.userName||e.id,", ")})):"No users here."})]})})},b=n(5),m=n(24),j=n.n(m);function g(e){var t="sm"===e.size?{height:"28px",width:"28px"}:{height:"36px",width:"36px"},n="sm"===e.size?{height:"8px",width:"8px",marginTop:"-12px",marginLeft:"21px"}:{height:"11px",width:"11px",marginTop:"-14px",marginLeft:"24px"};return Object(h.jsxs)("div",{className:j.a.root,style:Object(b.a)(Object(b.a)({},t),e.style),children:[Object(h.jsx)("img",{src:e.photoURL,alt:"profile pic",className:j.a.img,style:t}),e.badgeState&&Object(h.jsx)("div",{className:j.a.badge,style:Object(b.a)({backgroundColor:"online"===e.badgeState?"#57ba14":"#f9fff5"},n)})]})}var x=n(31),O=n.n(x);function y(e){return Object(h.jsx)("header",{className:O.a.root,children:e.children})}var w=function(e){var t;return Object(h.jsxs)(y,{children:[(null===(t=e.user)||void 0===t?void 0:t.photoURL)&&Object(h.jsx)(g,{photoURL:e.user.photoURL,size:"sm",badgeState:e.userState}),Object(h.jsx)("h3",{style:{marginLeft:"16px",fontSize:"1.3em"},children:"Whats Up"})]})};n(41),n(42);var S=function(e){var t=r.useState(!1),n=Object(d.a)(t,2),a=n[0],s=n[1],o=e.isSender?"interactionmessage-self":"interactionmessage-friend",i=e.placementClass?e.placementClass:"",c={};return e.squishAbove&&(c[e.isSender?"borderTopRightRadius":"borderTopLeftRadius"]="3px"),e.squishBelow&&(c[e.isSender?"borderBottomRightRadius":"borderBottomLeftRadius"]="3px"),Object(h.jsxs)("div",{className:i,ref:e.newestMessageRef,style:Object(b.a)({display:"flex",flexDirection:"column"},e.marginTop?{marginTop:e.marginTop}:void 0),children:[e.showName&&!e.isSender&&Object(h.jsx)("p",{style:Object(b.a)({marginBottom:"2px",marginTop:"0px",textAlign:e.isSender?"right":"left",fontSize:"12px"},e.isSender?null:{marginLeft:"56px"}),children:e.message.senderName}),Object(h.jsxs)("div",{style:{display:"flex",alignSelf:e.isSender?"flex-end":"flex-start"},children:[!e.isSender&&Object(h.jsx)("div",{style:{marginRight:"8px",height:"36px",width:"36px"},children:e.avatar}),Object(h.jsx)("p",{id:"interactionmessage-text",className:o,style:Object(b.a)(Object(b.a)({},c),{},{whiteSpace:"pre-wrap"}),onClick:function(){return s((function(e){return!e}))},children:e.message.content})]}),a&&Object(h.jsx)("p",{style:Object(b.a)(Object(b.a)({marginTop:"4px",textAlign:e.isSender?"right":"left"},e.isSender?{marginRight:"12px"}:{marginLeft:"56px"}),{},{fontSize:"10px",marginBottom:"0px"}),children:new Date(e.message.createdAt).toLocaleString()})]})},k=1e3,C=36e5;function N(e){var t=e.days,n=e.hours,r=e.mins,a=e.secs,s=e.millis,o=0;return t&&(o+=24*t*C),n&&(o+=n*C),r&&(o+=6e4*r),a&&(o+=a*k),s&&(o+=s),o}function _(e){var t=e.millis,n=0;return t&&(n+=t/k),n}var U=function(e){var t=r.useRef(null);return r.useEffect((function(){t.current&&t.current.scrollIntoView({behavior:"smooth"})}),[e.messages.length]),Object(h.jsx)("div",{id:"interaction-root",children:function(){var n=e.messages.reduce((function(e,t,n,r){var a=_({millis:Number.parseInt(t.createdAt)});if(n>0)if(r[n-1].sender===t.sender){var s=r[n-1].createdAt;a-_({millis:Number.parseInt(s)})<60?(e.squishAbove[t.id]=!0,e.marginTop[t.id]="1px"):e.marginTop[t.id]="12px"}else e.marginTop[t.id]="30px";if(r.length>0&&n<r.length-1&&r[n+1].sender===t.sender){var o=r[n+1].createdAt;_({millis:Number.parseInt(o)})-a<60&&(e.squishBelow[t.id]=!0,e.messagesWithoutAvatar[t.id]=!0)}return e}),{squishAbove:{},squishBelow:{},messagesWithoutAvatar:{},marginTop:{}}),a=new Date,s=new Intl.DateTimeFormat("en-US",{weekday:"long"}),o=new Intl.DateTimeFormat("en-US",{month:"short"});return e.messages.map((function(i,c,u){var l=!(!e.userId||e.userId!==i.sender),d=e.statuses[i.sender],f=new Date(i.createdAt),p=!1;if(0===c)p=!0;else{var v=new Date(u[c-1].createdAt);p=0===c||v.toDateString()!==f.toDateString()||v.getTime()>=f.getTime()+N({hours:3})}var b=f.getHours(),m=f.getMinutes();b=b<10?"".concat(0,b):b,m=m<10?"".concat(0,m):m;var j,x="".concat(b,":").concat(m);if(p)if(f.toDateString()===a.toDateString())j="Today";else if(f.toDateString()===new Date(a.getTime()-N({days:1})).toDateString())j="Yesterday";else{var O=N({hours:a.getHours(),mins:a.getMinutes(),secs:a.getSeconds(),millis:a.getMilliseconds()});if(f.getTime()>new Date(a.getTime()-(N({days:6})+O)).getTime())j=s.format(f);else{var y=o.format(f);j="".concat(s.format(f),", ").concat(y," ").concat(f.getDate())}}return Object(h.jsxs)(r.Fragment,{children:[p&&j&&Object(h.jsx)("p",{style:{textAlign:"center",marginTop:"30px",marginBottom:"8px"},children:"".concat(j," - ").concat(x)},"tmln-".concat(i.id)),Object(h.jsx)(S,{message:i,newestMessageRef:c===e.messages.length-1?t:void 0,isSender:l,userStatus:d,avatar:l||!i.photoURL||n.messagesWithoutAvatar[i.id]?null:Object(h.jsx)(g,{photoURL:i.photoURL,badgeState:d.state}),squishAbove:n.squishAbove[i.id],squishBelow:n.squishBelow[i.id],showName:!n.squishAbove[i.id],placementClass:e.userId&&e.userId===i.sender?"interactionmessage-placement-self":"interactionmessage-placement-friend",marginTop:n.marginTop[i.id]},i.id)]},"rf-".concat(i.id))}))}()})};n(43);var I=function(e){return Object(h.jsxs)("div",{id:"interactionmessageeditor-root",children:[Object(h.jsx)("textarea",{onChange:e.handleMessageChange,value:e.currentDraft}),Object(h.jsx)("input",{type:"button",value:"Send",onClick:e.handleSend})]})};function R(e){return Object(h.jsx)("div",{style:{display:"flex",flexDirection:"column",flexGrow:2,flexBasis:0,maxWidth:"700px"},children:e.children})}function L(e){return Object(h.jsx)("div",{style:{display:"flex",flexDirection:"column",backgroundColor:"grey",flexGrow:3,flexBasis:0},children:e.children})}function T(e){return Object(h.jsxs)("div",{style:{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"},children:[Object(h.jsx)("button",{style:{margin:"4px"},onClick:function(){return e.showSignInPopup("google")},children:"Sign in with Google"}),Object(h.jsx)("button",{style:{margin:"4px"},onClick:function(){return e.showSignInPopup("github")},children:"Sign in with Github"})]})}var A=n(10);var D={apiKey:"AIzaSyA51jM6IryfHm1HnzmXo66QQQCcRK1ld0M",authDomain:"whats-up-ce34e.firebaseapp.com",projectId:"whats-up-ce34e",storageBucket:"whats-up-ce34e.appspot.com",messagingSenderId:"6258283268",appId:"1:6258283268:web:91c3f62da6da184d583651",measurementId:"G-K13ZDZ04JX"};function B(){var e=function(e){var t=Object(r.useState)((function(){var t=localStorage.getItem(e);return!!t&&JSON.parse(t)||null})),n=Object(d.a)(t,2),a=n[0],s=n[1];return Object(r.useEffect)((function(){localStorage.setItem(e,JSON.stringify(a))}),[e,a]),[a,s]}("firebaseUser"),t=Object(d.a)(e,2),n=t[0],a=t[1],s=Object(r.useState)(null),o=Object(d.a)(s,2),i=o[0],u=o[1],f=Object(r.useState)(null),p=Object(d.a)(f,2),h=p[0],v=p[1];function b(){return(b=Object(l.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.a.database().ref("users/".concat(t.uid)).once("value");case 2:if(!e.sent.val()){e.next=8;break}return e.next=6,A.a.database().ref("users/".concat(t.uid)).update({userName:t.displayName,photoURL:t.photoURL});case 6:e.next=11;break;case 8:return console.log("User ".concat(t.uid," does not exist. Creating now.")),e.next=11,A.a.database().ref("users/".concat(t.uid)).set({userName:t.displayName,photoURL:t.photoURL});case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(r.useEffect)((function(){0===A.a.apps.length&&A.a.initializeApp(D);var e=new A.a.auth.GithubAuthProvider,t=new A.a.auth.GoogleAuthProvider;u(e),v(t),A.a.auth().onAuthStateChanged((function(e){e?(a(e),function(e){b.apply(this,arguments)}(e)):a(null)}))}),[]),[n,function(e){var t;if("github"===e&&i)t=i;else{if("google"!==e||!h)return;t=h}A.a.auth().signInWithPopup(t).catch((function(e){console.error("Unable to log in with error ".concat(e))}))}]}n(48);var F=function(e){function t(t){t.preventDefault(),e.dispatchForm({type:"toggle_person",payload:t.target.dataset.personid})}return Object(h.jsxs)("div",{id:"InteractionCreator-root",children:[Object(h.jsx)("h4",{style:{marginTop:"0"},children:"Choose a conversation name (optional)"}),Object(h.jsx)("input",{id:"conversation-name-input",type:"text",value:e.formState.newConversationName,onChange:function(t){return e.dispatchForm({type:"set_conversation_name",payload:t.currentTarget.value})}}),Object(h.jsx)("h4",{children:"Select people to add *"}),Object(h.jsx)("div",{children:e.users.filter((function(t){return t.id!==e.userId})).map((function(n){return Object(h.jsxs)("div",{className:"hover",style:{display:"flex",justifyContent:"left",alignItems:"center",minWidth:"20px",userSelect:"none",padding:"8px 16px",border:"1px solid #737373",borderRadius:"3px",marginTop:"8px",backgroundColor:e.formState.peopleForNewConversation.includes(n.id)?"#696969":void 0},"data-personid":n.id,onClick:t,children:[n.photoURL&&Object(h.jsx)(g,{photoURL:n.photoURL,badgeState:e.userStatuses[n.id].state,style:{marginRight:"8px"}}),n.userName]},"pselect-".concat(n.id))}))})]})},E=n(15);var P=n(22),M=n(19);var z=function(e){return Object(h.jsxs)(y,{children:[Object(h.jsx)("div",{onClick:e.back,style:{display:"flex",backgroundColor:"black",color:"white",borderRadius:"5px",cursor:"pointer",padding:"8px 8px 8px 0"},children:Object(h.jsx)(P.a,{icon:M.a,size:"lg"})}),Object(h.jsx)("h3",{style:{marginLeft:"8px"},children:e.conversation.name})]})};function K(e){var t=r.useState(e.displayName),n=Object(d.a)(t,2),a=n[0],s=n[1];return Object(h.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:Object(h.jsxs)("form",{style:{display:"flex",flexDirection:"column",padding:"8px"},onSubmit:function(t){t.preventDefault(),a?e.updateProfile({displayName:a}):console.error("Username was not valid.")},children:[Object(h.jsxs)("div",{style:{display:"flex",padding:"4px",marginBottom:"16px",flexDirection:"column"},children:[Object(h.jsx)("label",{htmlFor:"username-input",style:{paddingBottom:"4px"},children:"Username"}),Object(h.jsx)("input",{id:"username-input",type:"text",placeholder:"Type in the user name",value:a,onChange:function(e){return s(e.target.value)}})]}),Object(h.jsx)("input",{type:"submit",value:"Save"})]})})}function q(e,t){switch(t.type){case"return_to_main":case"select_conversation":return Object(b.a)(Object(b.a)({},e),{},{showConversationForm:!1,showUserSettings:!1});case"show_conversation_form":return Object(b.a)(Object(b.a)({},e),{},{showConversationForm:!0,showUserSettings:!1});case"show_user_settings":return Object(b.a)(Object(b.a)({},e),{},{showConversationForm:!1,showUserSettings:!0});default:return e}}var W=n(21);var G=n(32),J=n.n(G);var V=function(e){return Object(h.jsx)("div",{className:J.a.root,children:Object(h.jsx)("button",{onClick:e.logOut,children:"Log Out"})})};function H(e,t){switch(t.type){case"set_conversation_name":return Object(b.a)(Object(b.a)({},e),{},{newConversationName:t.payload});case"toggle_person":return e.peopleForNewConversation.includes(t.payload)?Object(b.a)(Object(b.a)({},e),{},{peopleForNewConversation:e.peopleForNewConversation.filter((function(e){return e!==t.payload}))}):Object(b.a)(Object(b.a)({},e),{},{peopleForNewConversation:[].concat(Object(E.a)(e.peopleForNewConversation),[t.payload])});default:return e}}var Q,X=(Q=function(e){var t,n,s,o,i,f=A.a.apps.length>0,p=function(e,t){var n=Object(r.useState)([]),a=Object(d.a)(n,2),s=a[0],o=a[1],i=Object(r.useState)(null),u=Object(d.a)(i,2),f=u[0],p=u[1],h=Object(r.useState)([]),v=Object(d.a)(h,2),m=v[0],j=v[1];return Object(r.useEffect)((function(){try{if(!e||!t)return;var n=A.a.database(),r="userConversations/".concat(t),a=n.ref(r);return Object(l.a)(c.a.mark((function e(){var r,s,i,u,l,d,f;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.orderByKey().once("value");case 2:if(r=e.sent,s=[],i="",!r.exists()){e.next=20;break}return u=[],l=[],r.forEach((function(e){u.push(n.ref("conversations/".concat(e.key)).orderByKey().once("value")),l.push(n.ref("conversationUsers/".concat(e.key)).orderByKey().once("value"))})),e.next=11,Promise.all(u);case 11:return d=e.sent,e.next=14,Promise.all(l);case 14:f=e.sent,r.forEach((function(e){if(e.key){var n={id:e.key,otherUsers:[],name:""},r=d.find((function(t){return t.ref.key===e.key})),a=f.find((function(t){return t.ref.key===e.key}));r&&(n.name=r.val().name),a&&a.forEach((function(e){e.key&&e.key!==t&&n.otherUsers.push({id:e.key,userName:e.child("userName").val()})})),s.push(n)}})),o(s),i=s.length>0?s[s.length-1].id:"",e.next=22;break;case 20:o([]),p(null);case 22:a.orderByKey().startAfter(i).on("child_added",(function(e,r){var a=e.key;if(a){var s={id:a,otherUsers:[],name:""};n.ref("conversations/".concat(a)).orderByKey().once("value").then((function(e){s.name=e.val().name,n.ref("conversationUsers/".concat(a)).orderByKey().once("value").then((function(e){e.forEach((function(e){e.key&&e.key!==t&&s.otherUsers.push({id:e.key,userName:e.child("userName").val()})})),o((function(e){return[].concat(Object(E.a)(e),[s])}))}))}))}}));case 23:case"end":return e.stop()}}),e)})))(),function(){a.off("child_added")}}catch(s){return void console.error(s)}}),[e,t]),Object(r.useEffect)((function(){try{if(!e||!t||!f)return;var n=A.a.database(),r="messages/".concat(f),a=n.ref(r);return Object(l.a)(c.a.mark((function e(){var t,n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.orderByKey().once("value");case 2:t=e.sent,n=[],t.exists()?(t.forEach((function(e){if(e.key){var t=e.toJSON();n.push(Object(b.a)(Object(b.a)({},t),{},{id:e.key}))}})),j(n)):j([]),r=n.length>0?n[n.length-1].id:"",a.orderByKey().startAfter(r).on("child_added",(function(e,t){if(e.key){var n=e.toJSON(),r=Object(b.a)(Object(b.a)({},n),{},{id:e.key});j((function(e){return[].concat(Object(E.a)(e),[r])}))}}));case 7:case"end":return e.stop()}}),e)})))(),function(){a.off("child_added")}}catch(s){console.error(s)}}),[e,t,f]),{messages:m,conversations:s,conversationId:f,setConversationId:p}}(f,null===(t=e.user)||void 0===t?void 0:t.uid),m=p.messages,j=p.conversations,g=p.conversationId,x=p.setConversationId,O=g?j.find((function(e){return e.id===g})):null,S=function(e,t){var n=r.useState({}),a=Object(d.a)(n,2),s=a[0],o=a[1],i=r.useState([]),u=Object(d.a)(i,2),f=u[0],p=u[1];return r.useEffect((function(){if(e&&t){var n=A.a.database(),r=n.ref("/status/"+t),a=n.ref(".info/connected"),s={state:"offline",lastChanged:A.a.database.ServerValue.TIMESTAMP},o={state:"online",lastChanged:A.a.database.ServerValue.TIMESTAMP};return a.on("value",(function(e){e.val()&&r.onDisconnect().set(s).then((function(){r.set(o)}))})),function(){a.off("value")}}}),[e,t]),r.useEffect((function(){if(e){var t=A.a.database(),n=t.ref("/status");return Object(l.a)(c.a.mark((function e(){var r,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="",a={},e.next=4,t.ref("/status").orderByKey().once("value");case 4:e.sent.forEach((function(e){e.key&&(r=e.key,a[e.key]={state:e.child("state").val(),lastChanged:e.child("lastChanged").val()})})),o(a),n.startAfter(r).on("child_added",(function(e){var t=e.key;t&&o((function(n){return Object(b.a)(Object(b.a)({},n),{},Object(W.a)({},t,{state:e.child("state").val(),lastChanged:e.child("lastChanged").val()}))}))})),n.on("child_changed",(function(e){var t=e.key;t&&o((function(n){return Object(b.a)(Object(b.a)({},n),{},Object(W.a)({},t,{state:e.child("state").val(),lastChanged:e.child("lastChanged").val()}))}))}));case 9:case"end":return e.stop()}}),e)})))(),function(){n.off("child_added"),n.off("child_changed")}}}),[e]),r.useEffect((function(){if(e){var t=A.a.database(),n=t.ref("/users");return Object(l.a)(c.a.mark((function e(){var r,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="",a=[],e.next=4,t.ref("/users").orderByKey().once("value");case 4:e.sent.forEach((function(e){e.key&&(r=e.key,a.push({id:e.key,userName:e.child("userName").val(),photoURL:e.child("photoURL").val()}))})),p(a),n.startAfter(r).on("child_added",(function(e){var t=e.key;t&&p((function(n){return[].concat(Object(E.a)(n),[{id:t,userName:e.child("userName").val(),photoURL:e.child("photoURL").val()}])}))})),n.on("child_changed",(function(e){var t=e.key;t&&p((function(n){var r=Object(E.a)(n),a=r.find((function(e){return e.id===t}));return a&&(a.userName=e.child("userName").val(),a.photoURL=e.child("photoURL").val()),r}))}));case 9:case"end":return e.stop()}}),e)})))(),function(){n.off("child_added"),n.off("child_changed")}}}),[e]),[f,s]}(f,null===(n=e.user)||void 0===n?void 0:n.uid),k=Object(d.a)(S,2),C=k[0],N=k[1],_=function(){var e=Object(r.useState)(),t=Object(d.a)(e,2),n=t[0],a=t[1];return Object(r.useEffect)((function(){function e(){var e=window.innerWidth;a(e>=1920?"xl":e>=1280?"lg":e>=960?"md":e>=700?"sm":"xs")}return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]),n}(),T=a.a.useState(""),D=Object(d.a)(T,2),B=D[0],G=D[1],J=function(){var e=Object(r.useReducer)(q,{showConversationForm:!1,showUserSettings:!1}),t=Object(d.a)(e,2);return[t[0],t[1]]}(),Q=Object(d.a)(J,2),X=Q[0],Z=Q[1],Y=function(){var e=Object(r.useReducer)(H,{newConversationName:"",peopleForNewConversation:[]}),t=Object(d.a)(e,2);return[t[0],t[1]]}(),$=Object(d.a)(Y,2),ee=$[0],te=$[1];function ne(e){re({type:"select_conversation",conversationId:e})}function re(e){Z({type:e.type}),x(e.conversationId||null)}function ae(){return(ae=Object(l.a)(c.a.mark((function t(){var n,r,a,s,o,i,l,d;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.user){t.next=5;break}return console.error("not logged in"),t.abrupt("return");case 5:if(0!==ee.peopleForNewConversation.length){t.next=8;break}return console.error("no friends to add"),t.abrupt("return");case 8:return t.prev=8,n=A.a.database(),t.next=12,Promise.all(ee.peopleForNewConversation.map((function(e){return n.ref("users/".concat(e)).once("value")})));case 12:r=t.sent,a=Object(u.a)(r),t.prev=14,a.s();case 16:if((s=a.n()).done){t.next=23;break}if((o=s.value).val()){t.next=21;break}return alert("Friend ID ".concat(o.key," does not exist.")),t.abrupt("return");case 21:t.next=16;break;case 23:t.next=28;break;case 25:t.prev=25,t.t0=t.catch(14),a.e(t.t0);case 28:return t.prev=28,a.f(),t.finish(28);case 31:return t.next=33,n.ref("conversations").push();case 33:return i=t.sent,l=i.key,t.next=37,i.set({createdAt:A.a.database.ServerValue.TIMESTAMP,creatorId:e.user.uid,name:ee.newConversationName});case 37:return(d={})["userConversations/".concat(e.user.uid,"/").concat(l)]={invitedBy:e.user.uid},d["conversationUsers/".concat(l,"/").concat(e.user.uid)]={invitedBy:e.user.uid,userName:e.user.displayName},r.forEach((function(t){var n,r;d["userConversations/".concat(t.key,"/").concat(l)]={invitedBy:null===(n=e.user)||void 0===n?void 0:n.uid},d["conversationUsers/".concat(l,"/").concat(t.key)]={invitedBy:null===(r=e.user)||void 0===r?void 0:r.uid,userName:t.child("userName").val()||""}})),t.next=43,n.ref().update(d);case 43:l&&re({type:"select_conversation",conversationId:l}),t.next=49;break;case 46:t.prev=46,t.t1=t.catch(8),alert("something went wrong: ".concat(t.t1));case 49:case"end":return t.stop()}}),t,null,[[8,46],[14,25,28,31]])})))).apply(this,arguments)}function se(){return(se=Object(l.a)(c.a.mark((function t(n){var r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),e.user&&f){t.next=4;break}return console.error("not logged in"),t.abrupt("return");case 4:return r={sender:e.user.uid,senderName:e.user.displayName||"",createdAt:A.a.database.ServerValue.TIMESTAMP,content:B,photoURL:e.user.photoURL},t.next=7,A.a.database().ref("messages/".concat(g)).push();case 7:t.sent.set(r,(function(e){e?alert("something went wrong... ".concat(e)):G("")}));case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function oe(){re({type:"return_to_main"})}var ie="xs"!==_||"xs"===_&&(g||X.showConversationForm||X.showUserSettings),ce="xs"!==_||"xs"===_&&!g&&!X.showConversationForm&&!X.showUserSettings;return Object(h.jsxs)("div",{id:"app-root",children:[ce&&Object(h.jsxs)(R,{children:[Object(h.jsx)(w,{user:e.user,userState:e.user&&(null===(s=N[e.user.uid])||void 0===s?void 0:s.state)}),Object(h.jsxs)("div",{onClick:function(e){e.preventDefault(),re({type:"show_conversation_form"})},className:"hover",style:{margin:"16px 0",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center"},children:["New conversation",Object(h.jsx)("div",{style:{display:"flex",height:"32px",width:"32px",backgroundColor:"black",alignItems:"center",justifyContent:"center",color:"white",borderRadius:"5px",marginLeft:"8px"},children:Object(h.jsx)(P.a,{icon:M.b,size:"sm"})})]}),Object(h.jsx)("div",{style:{height:"100%",padding:"0px 0px 16px"},children:Object(h.jsx)("div",{children:Object(h.jsx)("div",{style:{overflow:"auto"},children:j.map((function(e){return Object(h.jsx)(v,{conversation:e,onPreviewClick:ne},e.id)}))})})}),Object(h.jsx)(V,{logOut:function(){A.a.auth().signOut().catch((function(e){window.alert("Unable to sign out with error ".concat(e))}))},openUserSettings:function(e){e.preventDefault(),re({type:"show_user_settings"})}})]}),ie&&Object(h.jsx)(L,{children:O&&e.user?Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(z,{backIcon:"xs"===_?"<":"X",back:oe,conversation:O}),Object(h.jsx)(U,{userId:e.user.uid,conversation:O,messages:m,statuses:N}),Object(h.jsx)(I,{currentDraft:B,handleMessageChange:function(e){e.preventDefault(),G(e.target.value)},handleSend:function(e){return se.apply(this,arguments)}})]}):X.showConversationForm?Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)(y,{children:[Object(h.jsx)("div",{onClick:oe,style:{display:"flex",backgroundColor:"black",color:"white",borderRadius:"5px",cursor:"pointer",padding:"8px 8px 8px 0"},children:Object(h.jsx)(P.a,{icon:M.a,size:"lg"})}),Object(h.jsx)("h3",{style:{marginLeft:"8px"},children:"New conversation"}),Object(h.jsx)("div",{onClick:function(){return ae.apply(this,arguments)},style:{cursor:"pointer",padding:"8px 0 8px 8px",marginLeft:"auto"},children:"Create"})]}),Object(h.jsx)(F,{userId:null===(o=e.user)||void 0===o?void 0:o.uid,users:C,userStatuses:N,formState:ee,dispatchForm:te})]}):X.showUserSettings?Object(h.jsx)(K,{displayName:(null===(i=e.user)||void 0===i?void 0:i.displayName)||"",updateProfile:function(t){var n;null===(n=e.user)||void 0===n||n.updateProfile(t).catch((function(e){alert("user profile not updated with error ".concat(e))}))}}):null})]})},function(e){var t=B(),n=Object(d.a)(t,2),r=n[0],a=n[1];return r?Object(h.jsx)(Q,Object(b.a)({user:r},e)):Object(h.jsx)(T,{showSignInPopup:a})}),Z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,54)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,s=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),s(e),o(e)}))};o.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(X,{})}),document.getElementById("root")),Z()}},[[53,1,2]]]);
//# sourceMappingURL=main.679b5b22.chunk.js.map