/*! @ryanmorr/scoped v0.1.1 | https://github.com/ryanmorr/scoped */
"use strict";
/*! @ryanmorr/csscope v0.1.1 | https://github.com/ryanmorr/csscope */
/*! @ryanmorr/amble v0.1.2 | https://github.com/ryanmorr/amble */const t=/([^{};]*)([;{}])/g,n=/(\r\n|\r|\n)+/g,e=/\t/g,r=/\s{2,}/g,c=/\/\*[\W\w]*?\*\//g,u=/\s*([:;{}])\s*/g,i=/\};+/g,s=/([^:;{}])}/g,o=/^(?:\\.|[\w\-\u00c0-\uFFFF])+/,l=/^:((?:\\.|[\w\u00c0-\uFFFF-])+)(?:\((['"]?)((?:\([^)]+\)|[^()]*)+)\2\))?/,a=/^\[((?:\\.|[\w\u00c0-\uFFFF-])+)\s*(?:(\S?=)\s*(?:(['"])([^]*?)\3|(#?(?:\\.|[\w\u00c0-\uFFFF-])*)|)|)\s*(i)?\]/,f=/@keyframes\s*((?:\\.|[\w\-\u00c0-\uFFFF])+)/gi,g=/^(animation(?:-name)?)\s*:\s*(.*)$/;function F(t,n){1===t.nodeType&&t.setAttribute(n,"");for(let e=0,r=t.children.length;e<r;e++)F(t.children[e],n);return t}module.exports=function(h,m="scoped-"+function(){return Math.random().toString(36).substring(2,11)}()){const p=document.createElement("style");return p.setAttribute(m,""),p.innerHTML=function(F,h){const m=[];h=function(t,n,e){return t.replace(f,((t,r)=>(e.push(r),"@keyframes "+n+"-"+r)))}(h,F,m);let p="",d=!1,b=0;return function(o,l){o=function(t){return t.replace(n," ").replace(e," ").replace(r," ").replace(c,"").trim().replace(u,"$1").replace(i,"}").replace(s,"$1;}")}(o),t.lastIndex=0;for(let n;null!=(n=t.exec(o));)l(n[1],n[2])}(h,((t,n)=>{"{"==n?(d&&b++,"@"===t.charAt(0)?(t.startsWith("@keyframes")&&(d=!0,b++),p+=t):p+=d?t:function(t,n){const e="["+n+"]";let r=0,c=!1,u=!1,i=!1;function s(t){r+=t}function f(n){t=t.slice(0,n)+e+t.slice(n),s(e.length)}function g(n,e){return n=r+n,t.substring(n,n+e)}function F(n){s(t.substring(r).match(n)[0].length)}function h(){let n=1;for(;m(t.charAt(r+n));)n++;s(n)}function m(t){return" "===t||"\n"===t||"\t"===t||"\f"===t||"\r"===t}function p(){return!u&&!i}for(;r<t.length;){const n=t.charAt(r);m(n)?(c=!0,h()):">"===n||"~"===n||"+"===n?(p()&&f(c?r-1:r),">>>"===g(0,3)?(t=t.slice(0,c?r-1:r)+(c?"":" ")+t.slice(r+3),i=!0):s(1),u=c=!1,h()):","===n?(p()&&f(m(g(-1,1))?r-1:r),u=i=c=!1,h()):(c&&(p()&&f(r-1),c=!1),"*"===n?s(1):"#"===n||"."===n?(s(1),F(o)):"["===n?(p()&&(f(r),u=!0),F(a)):":"===n?(p()&&(f(r),u=!0),"::"===g(0,2)?(s(2),F(o)):F(l)):o.test(t.substring(r))&&F(o))}return p()&&(t+=e),t}(t.trim(),F),p+="{\n"):"}"==n?(p+="}\n",d&&(b--,0===b&&(d=!1))):";"==n&&(t.startsWith("animation")&&m.length>0?p+=function(t,n,e){const r=t.match(g),c=r[1],u=r[2].split(",");for(let t=0,r=u.length;t<r;t++){const r=u[t].trim().split(" "),c=r[0];e.includes(c)&&(r[0]=n+"-"+c),u[t]=r.join(" ")}return c+":"+u.join(",")}(t,F,m)+";\n":p+=t+";\n")})),p}(m,h),document.head.appendChild(p),t=>F(t,m)};