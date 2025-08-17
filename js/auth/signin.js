//Recuperation des elements du DOM
const mailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const btnSignin = document.getElementById("btnSignin");

btnSignin?.addEventListener("click", checkCredentials);

function checkCredentials() {
  //infos factices appeler l'api pour verifienr les credentals en bdd
  if (
    // @ts-ignore
    mailInput.value == "test@mail.com" &&
    // @ts-ignore
    passwordInput.value == "azerty"
  ) {
    //il faudra recuperer le vrai token
    const token = "kjhgfdsxcvbnj,k:;k,jhgfdsxcvbn";
    setToken(token);
    //placer se token en cookie
    window.location.replace("/");
  } else {
    mailInput?.classList.add("is-invalid");
    passwordInput?.classList.add("is-invalid");
  }
}
