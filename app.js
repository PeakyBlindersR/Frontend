//Hacer una petición mediante el metodo fetch a la base de datos luego pintarlas en el html por medio del template de js.
template_index="";
fetch("http://localhost:5219/api/Notas")
.then((r) => r.json())
 .then((data) => {
    console.log(data);
    if (Array.isArray(data)) {
        data.forEach((element) => {
            let title = element.title
            let content = element.content
            let date = element.date
            let id = element.id
            template_index += `
            <div class="col-md-3 col-sm-6 col-lg-3">
                <div class="card">
                    <div class="card-header">
                    <h4 class="card-title text-uppercase fw-bold">${title}</h4>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${content}</p>
                    </div>
                    <div class="card-footer">
                        <p>${date}</p>
                    </div>
                    <div class="d-flex justify-content-center gap-2 mt-2">
                        <a href="./Actualizar.html">
                          <button class="btn btn-primary mb-2" onclick="llenarNota(${id})">Editar</button>
                        </a>
                        <button class="btn btn-danger mb-2" onclick="eliminarNota(${id})">Eliminar</button>
                    </div>
                </div>
            </div>
         `;
        });
    } else {
        console.error("Data is not an array");
    }
    let nota = document.getElementById("notas");
    nota.innerHTML = template_index;
  });

  //Hacer una petición mediante el metodo fetch para crear notas en la base de datos
  function crearNota(){
    let Title = document.getElementById("titulo").value;
    let Content = document.getElementById("contenido").value;
    let Date = document.getElementById("fecha").value;
    
    let nota = {
      title: Title,
      content: Content,
      date: Date
    };
    console.log(nota);
    fetch("http://localhost:5219/api/Notas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nota),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        location.href = "";
      })
      .catch((error) => {
        console.error("Error creando nota:", error);
        // Handle error (e.g., display error message to user)
      });
  };

  //Hacer una petición mediante el metodo fetch para eliminar notas en la base de datos
  function eliminarNota(id){
    fetch(`http://localhost:5219/api/Notas/${id}`, {
      method: "DELETE",
    })
     .then((r) => r.json())
     .then((data) => {
        console.log(data);
        location.href = "";
      })
     .catch((error) => {
        console.error("Error eliminando nota:", error);
        // Handle error (e.g., display error message to user)
      });
  };

  //función para llenar la nota con la información que se va a modificar
  function llenarNota(id){
    fetch(`http://localhost:5219/api/Notas/${id}`)
     .then((r) => r.json())
     .then((data) => {
        console.log(data);
        console.log(id);
        document.getElementById("titulo_edit").value = data.title;
        document.getElementById("contenido_edit").value = data.content;
        document.getElementById("fecha_edit").value = data.date;
        document.getElementById("id_edit").value = data.id;
      })
     .catch((error) => {
        console.error("Error llenando nota:", error);
        // Handle error (e.g., display error message to user)
      });
  }

  /* function llenarNota(id) {
    fetch(`http://localhost:5219/api/Notas/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched data:", data); // Inspect the data object
        document.getElementById("titulo_edit").value = data.title;
        document.getElementById("contenido_edit").value = data.content;
        document.getElementById("fecha_edit").value = data.date;
        document.getElementById("id_edit").value = data.id;
      })
      .catch(error => {
        console.error("Error llenando nota:", error);
        // Handle errors (e.g., display error message to user)
      });
  } */
  
  
  //Hacer una petición mediante el metodo fetch para actualizar notas en la base de datos
  function actualizarNota(){
    let Title = document.getElementById("titulo_edit").value;
    let Content = document.getElementById("contenido_edit").value;
    let Date = document.getElementById("fecha_edit").value;
    let id = document.getElementById("id_edit").value;
    
    let nota = {
      title: Title,
      content: Content,
      date: Date
    };
    console.log(nota);
    fetch(`http://localhost:5219/api/Notas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nota),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        location.href = "";
      })
      .catch((error) => {
        console.error("Error actualizando nota:", error);
        // Handle error (e.g., display error message to user)
      });
  }
  
  //Hacer una petición fetch para buscar en la base de datos
  /* fetch("http://localhost:5219/api/Notas")
  .then((r) => r.json())
  .then((data) => {
    document.getElementById("searchString").addEventListener("keyup", () => {
      template_notas = ""
      let valor = document.getElementById("searchString").value.toUpperCase();
      let resultado = data.filter(item => item.title.toUpperCase().includes(valor));
      let nota = document.getElementById("notas");
      nota.innerHTML = ""
      for (let element of resultado){
        template_notas += `
        <div class="col-md-3 col-sm-6 col-lg-3">
            <div class="card">
                <div class="card-header">
                <h4 class="card-title text-uppercase fw-bold">${element.title}</h4>
                </div>
                <div class="card-body">
                    <p class="card-text">${element.content}</p>
                </div>
                <div class="card-footer">
                    <p>${element.date}</p>
                </div>
                <div class="d-flex justify-content-center gap-2 mt-2">
                    <a href="./Actualizar.html">
                      <button class="btn btn-primary mb-2" onclick="llenarNota(${element.id})">Editar</button>
                    </a>
                    <button class="btn btn-danger mb-2" onclick="eliminarNota(${element.id})">Eliminar</button>
                </div>
            </div>
        </div>
     `;
      nota.innerHTML = template_notas;
      }
    })
  }) */