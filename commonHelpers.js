import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f,i as d}from"./assets/vendor-77e16229.js";const y=document.getElementById("datetime-picker"),n=document.querySelector("[data-start]"),p=document.querySelector("[data-days]"),b=document.querySelector("[data-hours]"),D=document.querySelector("[data-minutes]"),g=document.querySelector("[data-seconds]");let s=null,i=null;const o=t=>t<10?`0${t}`:t,E=()=>{const e=s-new Date;if(e<=0){clearInterval(i),d.error({title:"Error",message:"The countdown has finished!",position:"topRight",backgroundColor:"#ef4040"});return}const{days:a,hours:c,minutes:u,seconds:r}=C(e);p.textContent=o(a),b.textContent=o(c),D.textContent=o(u),g.textContent=o(r)},C=t=>{const r=Math.floor(t/864e5),l=Math.floor(t%864e5/36e5),m=Math.floor(t%864e5%36e5/6e4),h=Math.floor(t%864e5%36e5%6e4/1e3);return{days:r,hours:l,minutes:m,seconds:h}};n.setAttribute("disabled",!0);const k=()=>{f(y,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){s=t[0],s<=new Date?d.error({title:"Error",message:"Please choose a date in the future",position:"topRight",backgroundColor:"#ef4040"}):n.removeAttribute("disabled")}}),n.addEventListener("click",()=>{n.setAttribute("disabled",!0),i=setInterval(E,1e3)})};k();
//# sourceMappingURL=commonHelpers.js.map
