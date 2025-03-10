let data = [];
let categories = [];


// Fonction appel API

async function getData() {
  
    const response = await fetch("http://localhost:5678/api/works");  
    data = await response.json();  
    console.log(data);
    afficherProjets(data);
    creerFiltres();
  }

async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  categories = await response.json();
  console.log(categories);
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
const Btnexit = document.querySelectorAll(".fa-xmark")
const BtnAjout = document.querySelector(".overlay__btn")
const modaleAjout = document.querySelector(".modale__ajout")
const Btnfleche = document.querySelector(".fa-arrow-left")

BtnModif.addEventListener("click", () => {
    modale.style.display = "flex"
    overlay.style.display = "block"
})

Btnexit.forEach(btn => {
  btn.addEventListener("click", () => {
      Resetmodale ()
      modale.style.display = "none"
      overlay.style.display = "none"
      modaleAjout.style.display = "none"
  })
})

overlay.addEventListener("click", () => {
    Resetmodale ()
    modale.style.display = "none"
    overlay.style.display = "none"
    modaleAjout.style.display = "none"
  })

BtnAjout.addEventListener("click", () => {
    modale.style.display = "none"
    modaleAjout.style.display = "flex"
})

Btnfleche.addEventListener("click", () => {
  Resetmodale ()
  modale.style.display = "flex"
  overlay.style.display = "block"
  modaleAjout.style.display = "none"
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

    while (Projetsmod.firstChild) {
      Projetsmod.removeChild(Projetsmod.firstChild);
    }
  
  
  
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

      ConteneurIcon.dataset.id = project.id;
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
      if (response.ok) {
        // Mettre à jour les données après suppression
        data = data.filter(project => project.id !== id);
        afficherProjets(data)
    } else {
        console.error("Erreur lors de la suppression du projet");
    }
}


// Ajout projets

const Pictoimg = document.querySelector(".fa-image");
const Labelfile = document.querySelector(".btn-photo");
const Textfile = document.querySelector("p");
const Inputfile = document.querySelector("#ajout-photo");
const Maxsize = 4*1024*1024;
let NvelleImg = document.getElementById("nouvelle-img")
const Form = document.getElementById("form-photo")
titreInput = document.getElementById("titre-form")
categorieSelect = document.getElementById("categorie-form")

Inputfile.addEventListener( "change", (event) => {
  const file = event.target.files[0];

if (file) {
  if (file.size <= Maxsize) {
    Pictoimg.style.display = "none";
    Labelfile.style.display = "none";
    Textfile.style.display = "none";
    const reader = new FileReader();
    reader.onload = function (e) {
      NvelleImg.src = e.target.result; 
      NvelleImg.style.display = "block"; 
    };

    reader.readAsDataURL(file); 

  } else {
    alert("Le fichier est trop gros. La taille maximale est de 4 Mo.");
  }
}
});

function Resetmodale () {
  NvelleImg.src = "";
  NvelleImg.style.display = "none";

  Pictoimg.style.display = "flex";
  Labelfile.style.display = "flex";
  Textfile.style.display = "flex";

  Inputfile.value = "";
}

Form.addEventListener("submit", function (event) {
  event.preventDefault();

  const file = Inputfile.files[0];
  const titre = titreInput.value;
  const categorieName = categorieSelect.value;

  if (!file || !titre || !categorieName) {
    alert("Veuillez remplir tous les champs (image, titre et catégorie).");
    return;
  }

  const categorie = categories.find(cat => cat.name === categorieName);
  if (!categorie) {
    alert("Catégorie non trouvée.");
    return;
  }

const Formdata = new FormData();
Formdata.append("image", file);
Formdata.append("title", titre);
Formdata.append("category", categorie.id);


fetch("http://localhost:5678/api/works", {
  method: "POST",
  body: Formdata,
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("authtoken")}`,
  }
})
  .then((response) => response.json()) 
  .then((newProject) => {
    console.log("Réponse de l'API : ", newProject);
    alert("L'image a été envoyée avec succès !");
    data.push(newProject);
    Afficherpromod(data);
    Resetmodale ();
    Form.reset(); 
    NvelleImg.style.display = "none"; 
    afficherProjets(data);
  })
  .catch((error) => {
    
    console.error("Erreur d'envoi :", error);
    alert("Une erreur est survenue. Veuillez réessayer.");
  })
});


getData();
ProjetsMod();
getCategories();
