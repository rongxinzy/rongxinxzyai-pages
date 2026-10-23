(function(){"use strict";function u(n,f){const t=[];let l=[],o="",i=!1;const h=()=>{l.push({v:o}),o=""},r=()=>{h(),(l.some(e=>e.v.length>0)||t.length>0)&&t.push(l),l=[]};for(let e=0;e<n.length;e++){const s=n[e];s==='"'?i&&n[e+1]==='"'?(o+='"',e++):i=!i:!i&&s===f?h():!i&&(s===`
`||s==="\r")?(s==="\r"&&n[e+1]===`
`&&e++,r()):o+=s}(o.length>0||l.length>0)&&r();const c=t.reduce((e,s)=>Math.max(e,s.length),0);for(const e of t)for(;e.length<c;)e.push({v:""});return{rows:t,colCount:c}}self.onmessage=n=>{const{text:f,delimiter:t}=n.data;self.postMessage(u(f,t))}})();
