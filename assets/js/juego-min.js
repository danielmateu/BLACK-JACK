const miModulo=(()=>{"use strict";let e=[],f=["C","D","H","S"],g=["A","J","Q","K"],h=[],i=0,a=document.querySelector("#btnPedir"),b=document.querySelector("#btnDetener"),c=document.querySelector("#btnNuevo"),j=document.querySelectorAll(".div-cartas"),k=document.querySelectorAll("small"),d=(d=2)=>{e=l(),h=[];for(let c=0;c<d;c++)h.push(0);k.forEach(a=>a.innerText=0),j.forEach(a=>a.innerHTML=""),a.disabled=!1,b.disabled=!1},l=()=>{e=[];for(let a=2;a<=10;a++)for(let b of f)e.push(`${a}${b}`);for(let c of f)for(let d of g)e.push(d+c);return _.shuffle(e)},m=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},n=b=>{let a=b.substring(0,b.length-1);return isNaN(a)?"A"===a?11:10:1*a},o=(b,a)=>(h[a]=h[a]+n(b),k[a].innerHTML=h[a],h[a]),p=(b,c)=>{let a=document.createElement("img");a.classList.add("carta"),a.src=`/assets/cartas/${b}.png`,j[c].append(a)},q=a=>{do{let b=m();p(b,h.length-1),i=o(b,h.length-1)}while(i<a&&a<=21)r()},r=()=>{let[a,b]=h;setTimeout(()=>{b===a?alert("Nadie gana... \u{1F643}"):a>21?alert("Yo Gano! \u{1F970}"):b>21?alert("Tu ganas... \u{1F4A9}"):alert("Yo Gano! \u{1F970}")},100)};return a.addEventListener("click",()=>{let d=m(),c=o(d,0);p(d,0),c>21?(console.warn("Has perdido! \u{1F480}\u{1F480}"),a.disabled=!0,b.disabled=!0,q(c)):21===c&&(b.disabled=!0,console.warn("21, Genial! \u{1F609}\u{1F609}"),q(c))}),b.addEventListener("click",()=>{a.disabled=!0,b.disabled=!0,q(h[0])}),c.addEventListener("click",()=>{d()}),{nuevoJuego:d}})()