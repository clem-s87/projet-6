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

let filtres = document.createElement("nav");

function creerFiltres() {
let Projet = document.getElementById("portfolio");

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

if (token) {
  const AdminElements = document.querySelectorAll(".admin-item");
  AdminElements.forEach(element => {
    element.style.display = "flex";
    const BtnLogout = document.querySelector(".Btnlog");
    BtnLogout.innerText = "logout";
  BtnLogout.addEventListener("click", () =>{
    localStorage.removeItem("authtoken");
    BtnLogout.href = "./index.html"});
    });
    filtres.style.display = "none";
}

else {
  const AdminElements = document.querySelectorAll(".admin-item");
  AdminElements.forEach(element => {
    element.style.display = "none";
    });
}

// Modale overlay

const modale = document.querySelector(".modale");
const overlay = document.querySelector(".overlay");
const BtnModif = document.querySelector(".Btn-modif")
const Btnexit = document.querySelector(".fa-xmark")

BtnModif.addEventListener("click", () => {
    modale.style.display = "block"
    overlay.style.display = "block"
})

Btnexit.addEventListener("click", () => {
    modale.style.display = "none"
    overlay.style.display = "none"
})

  overlay.addEventListener("click", () => {
    modale.style.display = "none"
    overlay.style.display = "none"
  })
  
// Appel API pour la modale

  async function ProjetsMod() {
    const response = await fetch("http://localhost:5678/api/works");
    data = await response.json();    
    console.log(data); 
    Afficherpromod(data);
  }
  

  function Afficherpromod(projets) {
    const Projetsmod = document.querySelector(".modale__body");
  
  
    projets.forEach(project => {
  
      let ContenuImg = document.createElement("img");
      ContenuImg.src = project.imageUrl;
      console.log(projets)

  // Ajout poubelle

      let ConteneurImgIcon = document.createElement("div");
      ConteneurImgIcon.classList.add("modale__imgeticon")
      let ConteneurIcon = document.createElement("div");
      ConteneurIcon.classList.add("modale__conteneuricon")
      let Icon = document.createElement("i");
      Icon.classList.add("fa-solid", "fa-trash-can", "modale__icon")

      Projetsmod.appendChild(ConteneurImgIcon);
      ConteneurImgIcon.appendChild(ContenuImg);
      ConteneurImgIcon.appendChild(ConteneurIcon);
      ConteneurIcon.appendChild(Icon);

//  Suppression projet modale

      ConteneurIcon.dataset.id = project.id
      ConteneurIcon.addEventListener("click", function() {
      SupprimerProjets(project.id);
      Icon.closest(".modale__imgeticon").remove();
  })
  });  
  }

async function SupprimerProjets(id) {
    const token = localStorage.getItem("authtoken");
      const response = await fetch(`http://localhost:5678/api/works/${id}`, {
          method: "DELETE",
          headers: {
              "Accept": "*/*",
              "Authorization": `Bearer ${token}`
          }
      });
    }

getData();
ProjetsMod ();




















