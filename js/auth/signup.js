//Implementer le js de ma page
//Récupérer les éléments du DOM
const inputNom = document.getElementById("nomInput");
const inputPrenom = document.getElementById("prenomInput");
const inputMail = document.getElementById("emailInput");
const inputPassword = document.getElementById("passwordInput");
const inputValidatePassword = document.getElementById("validatePasswordInput");
const btnValidation = document.getElementById("btn-validaton-inscription");

inputNom?.addEventListener("keyup", validateForm);
inputPrenom?.addEventListener("keyup", validateForm);
inputMail?.addEventListener("keyup", validateForm);
inputPassword?.addEventListener("keyup", validateForm);
inputValidatePassword?.addEventListener("keyup", validateForm);

//Valider les champs requis du formulaire
function validateForm() {
  const nomOk = validateRequired(inputNom);
  const prenomOk = validateRequired(inputPrenom);
  const mailOk = validateMail(inputMail);
  const passwordOk = validatePassword(inputPassword);
  const confirmationPasswordOk = validateConfirmationPassword(
    inputValidatePassword,
    inputPassword
  );

  //Desactiver le bouton inscription si un des
  //champs n'est pas correctement remplis
  if (nomOk && prenomOk && mailOk && passwordOk && confirmationPasswordOk) {
    // @ts-ignore
    btnValidation.disabled = false;
  } else {
    // @ts-ignore
    btnValidation.disabled = true;
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

// Valider le mot de passe de confirmation
function validateConfirmationPassword(input, inputpwd) {
  if (input.value === inputpwd.value) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
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
