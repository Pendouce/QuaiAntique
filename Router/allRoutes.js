import Route from "./Route.js";
//Définir ici vos routes
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html"),
  new Route("/galerie", "Galerie", "/pages/galerie.html"),
  new Route("/carte", "La carte", "/pages/carte.html"),
  new Route("/reservation", "Les reservations", "/pages/reservation.html"),
  new Route("/account", "Mon compte", "/pages/auth/account.html"),
  new Route(
    "/signin",
    "Connexion",
    "/pages/auth/signin.html",
    "js/auth/signin.js"
  ),
  new Route(
    "/signup",
    "Inscription",
    "/pages/auth/signup.html",
    "/js/auth/signup.js"
  ),
  new Route(
    "/editPassword",
    "Changer de mot de passe",
    "/pages/auth/editPassword.html"
  ),
  new Route("/allresa", "Vos reservations", "/pages/reservations/allResa.html"),
  new Route("/reserver", "Reserver", "/pages/reservations/reserver.html"),
  new Route("/modifCarte", "Modifier la carte", "/pages//modifCarte.html"),
];
//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";
