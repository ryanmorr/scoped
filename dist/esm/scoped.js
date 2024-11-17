/*! @ryanmorr/scoped v0.1.3 | https://github.com/ryanmorr/scoped */
/*! @ryanmorr/csscope v0.1.1 | https://github.com/ryanmorr/csscope */
/*! @ryanmorr/amble v0.1.2 | https://github.com/ryanmorr/amble */
const t=/([^{};]*)([;{}])/g,n=/(\r\n|\r|\n)+/g,e=/\t/g,r=/\s{2,}/g,c=/\/\*[\W\w]*?\*\//g,u=/\s*([:;{}])\s*/g,i=/\};+/g,s=/([^:;{}])}/g,o=/^(?:\\.|[\w\-\u00c0-\uFFFF])+/,l=/^:((?:\\.|[\w\u00c0-\uFFFF-])+)(?:\((['"]?)((?:\([^)]+\)|[^()]*)+)\2\))?/,a=/^\[((?:\\.|[\w\u00c0-\uFFFF-])+)\s*(?:(\S?=)\s*(?:(['"])([^]*?)\3|(#?(?:\\.|[\w\u00c0-\uFFFF-])*)|)|)\s*(i)?\]/,f=/@keyframes\s*((?:\\.|[\w\-\u00c0-\uFFFF])+)/gi,g=/^(animation(?:-name)?)\s*:\s*(.*)$/;function F(t,n){1===t.nodeType&&t.setAttribute(n,"");for(let e=0,r=t.children.length;e<r;e++)F(t.children[e],n);return t}function h(h,p="scoped-"+function(){return Math.random().toString(36).substring(2,11)}()){const m=document.createElement("style");return m.setAttribute(p,""),m.innerHTML=function(F,h){const p=[];h=function(t,n,e){return t.replace(f,((t,r)=>(e.push(r),"@keyframes "+n+"-"+r)))}(h,F,p);let m="",d=!1,b=0;return function(o,l){o=function(t){return t.replace(n," ").replace(e," ").replace(r," ").replace(c,"").trim().replace(u,"$1").replace(i,"}").replace(s,"$1;}")}(o),t.lastIndex=0;for(let n;null!=(n=t.exec(o));)l(n[1],n[2])}(h,((t,n)=>{"{"==n?(d&&b++,"@"===t.charAt(0)?(t.startsWith("@keyframes")&&(d=!0,b++),m+=t):m+=d?t:function(t,n){const e="["+n+"]";let r=0,c=!1,u=!1,i=!1;function s(t){r+=t}function f(n){t=t.slice(0,n)+e+t.slice(n),s(e.length)}function g(n,e){return n=r+n,t.substring(n,n+e)}function F(n){s(t.substring(r).match(n)[0].length)}function h(){let n=1;for(;p(t.charAt(r+n));)n++;s(n)}function p(t){return" "===t||"\n"===t||"\t"===t||"\f"===t||"\r"===t}function m(){return!u&&!i}for(;r<t.length;){const n=t.charAt(r);p(n)?(c=!0,h()):">"===n||"~"===n||"+"===n?(m()&&f(c?r-1:r),">>>"===g(0,3)?(t=t.slice(0,c?r-1:r)+(c?"":" ")+t.slice(r+3),i=!0):s(1),u=c=!1,h()):","===n?(m()&&f(p(g(-1,1))?r-1:r),u=i=c=!1,h()):(c&&(m()&&f(r-1),c=!1),"*"===n?s(1):"#"===n||"."===n?(s(1),F(o)):"["===n?(m()&&(f(r),u=!0),F(a)):":"===n?(m()&&(f(r),u=!0),"::"===g(0,2)?(s(2),F(o)):F(l)):o.test(t.substring(r))&&F(o))}return m()&&(t+=e),t}(t.trim(),F),m+="{\n"):"}"==n?(m+="}\n",d&&(b--,0===b&&(d=!1))):";"==n&&(t.startsWith("animation")&&p.length>0?m+=function(t,n,e){const r=t.match(g),c=r[1],u=r[2].split(",");for(let t=0,r=u.length;t<r;t++){const r=u[t].trim().split(" "),c=r[0];e.includes(c)&&(r[0]=n+"-"+c),u[t]=r.join(" ")}return c+":"+u.join(",")}(t,F,p)+";\n":m+=t+";\n")})),m}(p,h),document.head.appendChild(m),t=>F(t,p)}export{h as default};
