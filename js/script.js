//Reference permettant de recuperer le cookie
const tokenCookieName = "accessToken";
const roleCookieName = "role";
const apiurl = "http://127.0.0.1:8000/api/";

const signoutBtn = document.getElementById("signout-btn");
signoutBtn?.addEventListener("click", signout);

function getRole() {
  return getCookie(roleCookieName);
}

//deconexion
function signout() {
  //efface le cookie
  eraseCookie(tokenCookieName);
  eraseCookie(roleCookieName);
  //redirection vers la page d'accueil
  window.location.reload();
}

//place le token dans un cookie
//cookie valide pendant 7 jours
//dans 7 jours l'utilisateur devra se reconnecter
function setToken(token) {
  setCookie(tokenCookieName, token, 7);
}

function getToken() {
  return getCookie(tokenCookieName);
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

//gestion de la connexion
//si le token est present
//l'utilisateur est connecté
function isConnected() {
  if (getToken() == null || getToken() == undefined) {
    return false;
  } else {
    return true;
  }
}

//if (isConnected()) {
//  alert("Je suis connecté");
//} else {
//  alert("Je ne suis pas connecté");
//}

const loader = document.getElementById("loader");
document.addEventListener("DOMContentLoaded", () => {
  showAndHideElementsForRoles();
  // Masquer le loader
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("d-none");
});

/*
  disconected
  connected(admin ou client)
    admin
    client
*/

function showAndHideElementsForRoles() {
  const userConnected = isConnected();
  const role = getRole();

  let allElementsToEdit = document.querySelectorAll("[data-show]");
  //Parcourir tous les elements qui ont un data-show
  //et pour chaque elements regarder la valeur de data-show
  //et afficher ou cacher l'element en fonction de la valeur de data-show
  allElementsToEdit.forEach((element) => {
    // @ts-ignore
    switch (element.dataset.show) {
      case "disconnected": //si utilitasteur connecter il ne voit pas le bouton connexion
        if (userConnected) {
          element.classList.add("d-none");
        }
        break;
      case "connected": //si utilisateur non connecter il ne voit pas le bouton deconnexion
        if (!userConnected) {
          element.classList.add("d-none");
        }
        break;
      case "admin":
        if (!userConnected || role != "admin") {
          element.classList.add("d-none");
        }
        break;
      case "client":
        if (!userConnected || role != "client") {
          element.classList.add("d-none");
        }
        break;
    }
  });
}

function sanitizeHtml(text) {
  // Créez un élément HTML temporaire de type "div"
  const tempHtml = document.createElement("div");

  // Affectez le texte reçu en tant que contenu texte de l'élément "tempHtml"
  tempHtml.textContent = text;

  // Utilisez .innerHTML pour récupérer le contenu de "tempHtml"
  // Cela va "neutraliser" ou "échapper" tout code HTML potentiellement malveillant
  return tempHtml.innerHTML;
}
