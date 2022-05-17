window.onload = () => {
      //PINTAR api
      fetch('https://dog.ceo/api/breeds/list/all')
      .then(res => res.json())
      .then(data => {
         let lista = document.querySelector(".list");
  
        for (const raza in data.message) {
  
           fetch(`https://dog.ceo/api/breed/${raza}/images/random`)
              .then(res => res.json())
              .then(data =>{
                  //QUE EL FILTRO CAPTURE EL ALT DE LA IMAGEN
                  let item=`<li class="grid">
                              <img class="perro" src="${data.message}" alt="${raza}"/>
                              <button class="btn2"><svg class="like" width="25" height="22" viewBox="0 0 33 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M28.9037 4.29859C28.1914 3.56987 27.3456 2.9918 26.4148 2.5974C25.484 2.203 24.4862 2 23.4787 2C22.4711 2 21.4734 2.203 20.5425 2.5974C19.6117 2.9918 18.766 3.56987 18.0537 4.29859L16.5754 5.81023L15.0971 4.29859C13.6583 2.82732 11.7069 2.00076 9.67211 2.00076C7.63734 2.00076 5.68591 2.82732 4.24711 4.29859C2.80831 5.76986 2 7.76534 2 9.84603C2 11.9267 2.80831 13.9222 4.24711 15.3935L5.72539 16.9051L16.5754 28L27.4254 16.9051L28.9037 15.3935C29.6163 14.6651 30.1816 13.8003 30.5673 12.8484C30.953 11.8966 31.1515 10.8764 31.1515 9.84603C31.1515 8.81571 30.953 7.79548 30.5673 6.84363C30.1816 5.89178 29.6163 5.02697 28.9037 4.29859Z" stroke="#03A9F4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                              </button>
                              <p class="name">${raza}</p>
                          </li>`;
                  lista.innerHTML += item;
              })
              //FILTRO
              .then(() => {
                let busqueda = new List('lista_perretes', {
                  valueNames: ['name']
                });
          });
  
        }
      })
      //GUARDAR
      let dogs;
      /** Crear / conectar bbdd */
      let db = new PouchDB('perros');
      /** Pintar la lista de usuarios */
      renderDogs();
      /** Escuchar eventos de los botones */
      let btnAdd = document.querySelector(".btn2");
      if (btnAdd){
        btnAdd.addEventListener("click", addDog, false);
      }
      /** Función para añadir usuarios */
      function addDog(){
        let imagn = document.querySelector(".perro");
        let doc ={
          "imagen": imagn.value
        };
      db.put(doc);
      imagn.value=""; 
      renderDogs()
      }
      /** Función para pintar la lista de usuarios */
    function renderDogs(){
      let Favlist = document.querySelectorAll(".fav-list");
      //Retrieving all the documents in PouchDB
      db.allDocs({include_docs: true}, function(err, docs) {
          if (err) {
              return console.log(err);
          } else {                
              dogs = docs.rows;
              Favlist.innerHTML= "";
              dogs.forEach(element => {
                  let user = `
                              <li class="grid">
                              ${element.doc.imagen}
                              <button class="btn3-borrar"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 6H5H21" stroke="#03A9F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#03A9F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M10 11V17" stroke="#03A9F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M14 11V17" stroke="#03A9F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>                              
                              </button>
                              <p class="name">${raza}</p>
                          </li>`;
                  Favlist.innerHTML += user;
              });
              
          }
          let btnsBorrar = document.querySelectorAll(".btn3-borrar");
          btnsBorrar.forEach(item => {
              item.addEventListener("click", (e) => {
                dogs.forEach(element => {
                      if(element.doc.name == e.target.previousSibling.previousSibling.outerText){
                          db.get(element.doc._id).then(function(doc){
                                  return db.remove(doc)
                          });
                          item.parentElement.remove();
      });
  }
  }
    

    

