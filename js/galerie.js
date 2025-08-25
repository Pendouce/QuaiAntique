const galerieImages = document.getElementById("allImages");

let titre = `<img src=x onerror="window.location.repalce(\'https://google.com\')"/>`;
let imgSource = "../img/Saumon.jpg";
//Recuperer les infos des images
let monImage = getImages(titre, imgSource);

//Ajouter les images dans ce innerHTML
// Le html a l'interieur de gallerieImages est monImage

galerieImages.innerHTML = monImage;

function getImages(titre, urlImage) {
  titre = sanitizeHtml(titre);
  titre = sanitizeHtml(urlImage);
  return `<div class="col p-4">
            <div class="image-card text-white">
              <img class="rounded w-100" src="${urlImage}" alt="Pavé de saumon" />
              <p class="titre-image">${titre}</p>
                <div class="actcion-image-buttons" data-show="admin">
                <button
                  type="button"
                  class="btn btn-outline-light"
                  data-bs-toggle="modal"
                  data-bs-target="#editionPhotoModal"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-light"
                  data-bs-toggle="modal"
                  data-bs-target="#deletePhotoModal"
                  >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>`;
}
