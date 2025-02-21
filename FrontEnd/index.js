async function getData() {
  
    const response = await fetch("http://localhost:5678/api/works");  
    const data = await response.json();  
    console.log(data);


let ConteneurFig = document.querySelector(".gallery");

data.forEach(project => {

  let ContenuFig = document.createElement("figure");

  let ContenuImg = document.createElement("img");
  ContenuImg.src = project.imageUrl;
  ContenuImg.alt = project.title;

  let ContenuFigcap = document.createElement("figcaption")
  ContenuFigcap.innerText = project.title

  ConteneurFig.appendChild(ContenuFig);
  ContenuFig.appendChild(ContenuImg);
  ContenuFig.appendChild(ContenuFigcap);
});

}


getData()















