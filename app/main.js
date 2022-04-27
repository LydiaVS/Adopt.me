window.onload = () => {
   /* const img = document.querySelectorAll('.dog-img');
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(res => res.json())
    .then(data =>{
        img.setAttribute('src', data.message);
    })*/
   
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(data => {
       let lista = document.querySelector(".lista");
      //console.log(data)
      for (const raza in data.message) {

       //fetchImgDog(raza)
       
        //const imgperro = await fetch(`https://dog.ceo/api/breed/${raza}/images/random`);
         //console.log(`${imgperro}`);
         fetch(`https://dog.ceo/api/breed/${raza}/images/random`)
            .then(res => res.json())
            .then(data =>{
                //img.setAttribute('src', data.message);
                let item=`<li>
                <span class="name">${raza}</span>
                <img src="${ data.message}" alt="blabla"/>
        </li>`;
        lista.innerHTML += item;
            })
        
       
      }

    })

}
