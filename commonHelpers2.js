import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as r}from"./assets/vendor-77e16229.js";const s=document.querySelector(".form");s.addEventListener("submit",o=>{o.preventDefault();const t=parseInt(s.delay.value),i=s.state.value;new Promise((e,m)=>{setTimeout(()=>{i==="fulfilled"?e(t):i==="rejected"&&m(t)},t)}).then(e=>{r.success({title:"✅ Fulfilled promise",message:`Promise fulfilled in ${e}ms`})}).catch(e=>{r.error({title:"❌ Rejected promise",message:`Promise rejected in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map
