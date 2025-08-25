//Recuperation des elements du DOM
const mailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");

mailInput?.addEventListener("keyup", validateForm);
passwordInput?.addEventListener("keyup", validateForm);

btnSignin?.addEventListener("click", checkCredentials);

function checkCredentials() {
  let dataForm = new FormData(signinForm);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    username: dataForm.get("email"),
    password: dataForm.get("mdp"),
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(apiUrl + "login", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        mailInput?.classList.add("is-invalid");
        passwordInput?.classList.add("is-invalid");
      }
    })
    .then((result) => {
      //api token recuperré lors du test sur l'api
      //je prends token je le stocke en cookie
      //et je le recupere dans le script.js
      //pareil pour le role
      const token = result.token;
      setToken(token);
      setCookie(roleCookieName, result.roles[0], 7); // Set role cookie for 7 days

      window.location.replace("/");
    })
    .catch((error) => console.error(error));
}

//Valider les champs requis du formulaire
function validateForm() {
  const mailOk = validateMail(mailInput);
  const passwordOk = validatePassword(passwordInput);

  //Desactiver le bouton connexion si un des
  //champs n'est pas correctement remplis
  if (mailOk && passwordOk) {
    // @ts-ignore
    btnValidation.disabled = false;
  } else {
    // @ts-ignore
    btnValidation.disabled = true;
  }
}

// Valider le formulaire d'inscription
function validateRequired(input) {
  if (input.value != "") {
    //ok je lui ajoute la classe is-valid
    //et je lui retire la classe is-invalid
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    //pas ok je lui ajoute la classe is-invalid
    //et je lui retire la classe is-valid
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

//Valider le mail avec regex

function validateMail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mailUser = input.value;
  if (mailUser.match(emailRegex)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

//Valider le mot de passe
function validatePassword(input) {
  //Définir mon regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
  const passwordUser = input.value;
  if (passwordUser.match(passwordRegex)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}
