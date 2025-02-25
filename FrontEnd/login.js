const LoginForm = document.getElementById("login-form")

LoginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const LoginData = {
    email : email,
    password: password
};

try {
    const response = await fetch("http://localhost:5678/api/users/login",{
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(LoginData),
    })

if(!response.ok) {
    throw new Error("Echec de la connexion");
}

const data = await response.json();
const token = data.token;

localStorage.setItem("authtoken", token);

window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html"; 
} catch (error) {

  alert('Identifiants incorrects ou erreur de serveur. Essayez encore.');
}
});