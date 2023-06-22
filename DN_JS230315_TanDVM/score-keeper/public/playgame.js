window.addEventListener("DOMContentLoaded", async () => {
     await handleGetData();
   });

   async function handleGetData() {
     const response = await fetch("http://localhost:3000/playgame");
     const data = await response.json();
     const thead = document.querySelector('#player')

     let theadContent='<th>#</th>';
     let tbodyContent='';
     data[0].player.forEach((item)=>{
          theadContent +=`<th>${item.name}</th>`
     })
     data.forEach((round,index)=>{
          round.player.forEach((item)=>{
               tbodyContent +=`<td>${item.point}</td>`
     })})

     thead.innerHTML=theadContent;

     
   }