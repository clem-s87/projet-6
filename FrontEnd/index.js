let data = []; 

// Fonction appel API

async function getData() {
  
    const response = await fetch("http://localhost:5678/api/works");  
    data = await response.json();  
    console.log(data);
    afficherProjets(data)
    creerFiltres()
  }

// Fonction pour afficher les projets

function afficherProjets(projets) {
  let ConteneurFig = document.querySelector(".gallery");

  // Boucle pour enlever le code HTML
  while (ConteneurFig.firstChild) {
    ConteneurFig.removeChild(ConteneurFig.firstChild);
}

// Boucle pour intégrer les nouvelles balises de chaques projets

projets.forEach(project => {

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

// Filtres

function creerFiltres() {
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

BtnTous.addEventListener("click", function() {
  afficherProjets(data);
});

BtnObj.addEventListener("click", function() {
  const filtresObj = data.filter(project => project.category.name === "Objets");
  afficherProjets(filtresObj);
});

BtnApp.addEventListener("click", function() {
  const filtresApp = data.filter(project => project.category.name === "Appartements");
  afficherProjets(filtresApp); 
});

BtnHetR.addEventListener("click", function() {
  const filtresHetR = data.filter(project => project.category.name === "Hotels & restaurants");
  afficherProjets(filtresHetR);  
});
}

// Passage affichage admin utilisateur

const token = localStorage.getItem("authtoken");
console.log(token)

if (token) {
  const AdminElements = document.querySelectorAll(".admin-item");
  AdminElements.forEach(element => {
    element.style.display = "flex";
    const BtnLogout = document.querySelector(".Btnlog");
    BtnLogout.innerText = "logout";
  });
}
else {
  const AdminElements = document.querySelectorAll(".admin-item");
  AdminElements.forEach(element => {
    element.style.display = "none";
  });
}

//  Enlever le token du local storage lorsque l'utilisateur clique sur logout

if (BtnLogout = "logout") {
  addEventListener ("click", function() {
      localStorage.removeItem("authtoken")
  });
}



getData();


















