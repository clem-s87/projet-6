let data = []; 

// Fonction appel API

async function getData() {
  
    const response = await fetch("http://localhost:5678/api/works");  
    const data = await response.json();  
    console.log(data);


let ConteneurFig = document.querySelector(".gallery");

// Boucle pour enlever le code HTML

while (ConteneurFig.firstChild) {
  ConteneurFig.removeChild(ConteneurFig.firstChild);
}

// Boucle pour intégrer les nouvelles balises de chaques projets

data.forEach(project => {

  let ContenuFig = document.createElement("figure");

  let ContenuImg = document.createElement("img");
  ContenuImg.src = project.imageUrl;
  ContenuImg.alt = project.title;

  let ContenuFigcap = document.createElement("figcaption");
  ContenuFigcap.innerText = project.title;

  ConteneurFig.appendChild(ContenuFig);
  ContenuFig.appendChild(ContenuImg);
  ContenuFig.appendChild(ContenuFigcap);
});
}
getData()

// Filtres

let Projet = document.getElementById("portfolio");
let filtres = document.createElement("nav");
let secondChild = Projet.children[1];

Projet.insertBefore(filtres, secondChild);

let BtnTous = document.createElement("button");
let BtnObj = document.createElement("button");
let BtnApp = document.createElement("button");
let BtnHetR = document.createElement("button");

BtnTous.textContent = "Tous"
BtnObj.textContent = "Objets"
BtnApp.textContent = "Appartements"
BtnHetR.textContent = "Hôtels & restaurants"

filtres.appendChild(BtnTous);
filtres.appendChild(BtnObj);
filtres.appendChild(BtnApp);
filtres.appendChild(BtnHetR);

BtnObj.addEventListener("click", function(){
  const filtresObj = data.filter(project => project.category.name === "Objets")
  console.log(data)
})


















