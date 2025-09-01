let l=[];const f=document.getElementById("file-input"),g=document.getElementById("drop-zone"),b=document.getElementById("settings-panel"),m=document.getElementById("preview-panel"),d=document.getElementById("progress-panel"),v=document.getElementById("quality-slider"),F=document.getElementById("quality-value"),y=document.getElementById("background-color"),u=document.getElementById("background-preset"),w=document.getElementById("convert-btn"),P=document.getElementById("reset-btn"),c=document.getElementById("results-container"),L=document.getElementById("progress-bar");f.addEventListener("change",k);g.addEventListener("dragover",C);g.addEventListener("drop",$);v.addEventListener("input",B);u.addEventListener("change",S);w.addEventListener("click",z);P.addEventListener("click",N);function k(t){const e=t.target;l=Array.from(e.files||[]).filter(n=>n.type==="image/png"),l.length>0&&E()}function C(t){t.preventDefault(),g.classList.add("border-blue-400","bg-blue-50")}function $(t){t.preventDefault(),g.classList.remove("border-blue-400","bg-blue-50");const e=Array.from(t.dataTransfer?.files||[]).filter(n=>n.type==="image/png");e.length>0?(l=e,E()):alert("Please select PNG files only.")}function E(){b.classList.remove("hidden"),w.textContent=`Convert ${l.length} PNG file${l.length>1?"s":""} to JPG`}function B(){F.textContent=v.value}function S(){u.value!=="custom"&&(y.value=u.value)}async function z(){if(l.length===0)return;d.classList.remove("hidden"),m.classList.add("hidden"),c.innerHTML="";const t=parseInt(v.value)/100,e=y.value;try{const n=[];for(let o=0;o<l.length;o++){const s=l[o],i=await j(s,t,e);n.push(i);const a=(o+1)/l.length*100;L.style.width=`${a}%`}d.classList.add("hidden"),M(n)}catch(n){d.classList.add("hidden"),alert("Error converting images: "+n.message)}}async function j(t,e,n){return new Promise((o,s)=>{const i=document.createElement("canvas"),a=i.getContext("2d"),r=new Image;r.onload=()=>{i.width=r.width,i.height=r.height,a.fillStyle=n,a.fillRect(0,0,i.width,i.height),a.drawImage(r,0,0),i.toBlob(h=>{const x=t.size,I=h.size,R=t.name.replace(".png",".jpg");o({originalFile:t,convertedBlob:h,fileName:R,originalSize:x,newSize:I,quality:Math.round(e*100)})},"image/jpeg",e)},r.onerror=()=>s(new Error("Failed to load image")),r.src=URL.createObjectURL(t)})}function M(t){if(m.classList.remove("hidden"),t.forEach((e,n)=>{const o=document.createElement("div");o.className="bg-gray-50 p-4 rounded-lg";const s=(e.originalSize-e.newSize)/e.originalSize*100,i=s>0?`${s.toFixed(1)}% smaller`:`${Math.abs(s).toFixed(1)}% larger`;o.innerHTML=`
        <div class="flex items-center justify-between mb-3">
          <div>
            <h4 class="font-medium text-gray-900">${e.fileName}</h4>
            <p class="text-sm text-gray-500">
              ${p(e.originalSize)} → ${p(e.newSize)} 
              (${i})
            </p>
          </div>
          <button onclick="downloadFile('${n}')" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
            Download
          </button>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-medium text-gray-700 mb-2">Original (PNG)</p>
            <img src="${URL.createObjectURL(e.originalFile)}" alt="Original" class="w-full h-32 object-cover rounded border">
          </div>
          <div>
            <p class="text-sm font-medium text-gray-700 mb-2">Converted (JPG, ${e.quality}%)</p>
            <img src="${URL.createObjectURL(e.convertedBlob)}" alt="Converted" class="w-full h-32 object-cover rounded border">
          </div>
        </div>
      `,c.appendChild(o)}),window.conversionResults=t,t.length>1){const e=document.createElement("button");e.className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",e.textContent=`Download All ${t.length} JPG Files`,e.onclick=G,c.appendChild(e)}}function U(t){const e=window.conversionResults[t],n=document.createElement("a");n.href=URL.createObjectURL(e.convertedBlob),n.download=e.fileName,n.click(),URL.revokeObjectURL(n.href)}function G(){window.conversionResults.forEach((t,e)=>{setTimeout(()=>{U(e.toString())},e*100)})}function N(){l=[],f.value="",b.classList.add("hidden"),m.classList.add("hidden"),d.classList.add("hidden"),c.innerHTML="",L.style.width="0%",window.conversionResults=null}function p(t){if(t===0)return"0 Bytes";const e=1024,n=["Bytes","KB","MB","GB"],o=Math.floor(Math.log(t)/Math.log(e));return parseFloat((t/Math.pow(e,o)).toFixed(2))+" "+n[o]}B();
