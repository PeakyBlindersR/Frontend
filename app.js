template_index="";
fetch("http://localhost:5219/api/Notas")
.then((r) => r.json())
 .then((data) => {
    console.log(data);
    
    if (Array.isArray(data)) {
        data.forEach((element) => {
            const title = element.title
            const content = element.content
            const date = element.date
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
                        <button type="submit" class="btn btn-primary mb-2">Editar</button>
                        <button type="submit" class="btn btn-danger mb-2">Eliminar</button>
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
