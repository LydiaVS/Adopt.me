window.onload = () => {
   const img = document.querySelectorAll('.dog-img');
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(res => res.json())
    .then(data =>{
        img.setAttribute('src', data.message);
    })
   
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(data => {
       let lista = document.querySelector(".lista");
      //console.log(data)
      for (const raza in data.message) {

         fetch(`https://dog.ceo/api/breed/${raza}/images/random`)
            .then(res => res.json())
            .then(data =>{
                //img.setAttribute('src', data.message);
                let item=`<li onclick="window.location.href='detalle.html'" class="grid">
                
                <img src="${ data.message}" alt="${raza}"/>
        </li>`;
        lista.innerHTML += item;
            })
        
       
      }

    })

}
