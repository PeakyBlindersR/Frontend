template_index="";
fetch("http://localhost:5219/api/Notas")
.then((r) => r.json())
 .then((data) => {
    console.log(data);
    let nota = document.getElementById("notas");
    data.forEach((element) => {
        template_index += `
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${element.Title}</h5>
                    <p class="card-text">${element.Content}</p>
                    <p>${element.Date}</p>
                </div>
            </div>
        </div>
     `;
     nota.innerHTML = template_index;
    });
  });
