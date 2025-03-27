//Déclaration de constante du bouton theme toogle et de la constante body
const body = document.body;
const boutonTheme = document.querySelector("#theme-toggle");

//Thème est déjà stocké dans localStorage
const themeEnregistre = localStorage.getItem("theme");
// Applique le thème stocké si disponible
if (themeEnregistre) {
  body.classList.add(themeEnregistre);
  boutonTheme.classList.add(themeEnregistre);
}

/** Fonction qui ... **/
document.addEventListener("DOMContentLoaded", function () {
  const casesACocher = document.querySelectorAll("input[type='checkbox']");
  const champRecherche = document.querySelector("#search");
  const recettes = document.querySelectorAll(".contenu-recette article");

  function filtrerRecettes() {
    const categoriesSelectionnees = Array.from(
      document.querySelectorAll("input[type='checkbox']:checked")
    ).map((caseCochee) => caseCochee.value.toLowerCase());
    const texteRecherche = champRecherche.value.toLowerCase();

    recettes.forEach((recette) => {
      const categorie = recette
        .querySelector(".variete-menu")
        .textContent.toLowerCase();
      const temps = recette.querySelector(".temps").textContent.toLowerCase();
      const difficulte = recette
        .querySelector(".difficulte")
        .textContent.toLowerCase();
      const titre = recette.querySelector("h2").textContent.toLowerCase();

      const correspondanceCategorie =
        categoriesSelectionnees.length === 0 ||
        categoriesSelectionnees.includes(categorie);
      const correspondanceTemps =
        categoriesSelectionnees.length === 0 ||
        categoriesSelectionnees.includes(temps);
      const correspondanceDifficulte =
        categoriesSelectionnees.length === 0 ||
        categoriesSelectionnees.includes(difficulte);
      const correspondanceRecherche = titre.includes(texteRecherche);

      if (
        correspondanceCategorie &&
        correspondanceTemps &&
        correspondanceDifficulte &&
        correspondanceRecherche
      ) {
        recette.style.display = "block";
      } else {
        recette.style.display = "none";
      }
    });
  }

  casesACocher.forEach((caseCochee) => {
    caseCochee.addEventListener("change", filtrerRecettes);
  });

  champRecherche.addEventListener("input", filtrerRecettes);
});

/** Fonction qui recherche les recettes ... **/
document.addEventListener("DOMContentLoaded", function () {
  const casesACocher = document.querySelectorAll("input[type='checkbox']");
  const champRecherche = document.querySelector("#search");
  const recettes = document.querySelectorAll(".contenu-recette article");

  // Appliquer le thème stocké
  const themeActuel = localStorage.getItem("theme") || "light";
  if (themeActuel === "dark") {
    body.classList.add("dark");
    boutonTheme.textContent = "☀️";
  }
});

// Change le thème lorsque l'utilisateur clique sur le bouton
boutonTheme.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.replace("light", "dark");
    boutonTheme.classList.replace("light", "dark");
    boutonTheme.textContent = "☀️";
    // Sauvegarde le thème sombre
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.replace("dark", "light");
    boutonTheme.classList.replace("dark", "light");
    boutonTheme.textContent = "🌙";
    // Sauvegarde le thème clair
    localStorage.setItem("theme", "light");
  }
});

//document.addEventListener("DOMContentLoaded", () => {
  //renderFavorites();
//});
// Récupérer les éléments nécessaires
const addFavoriteButtons = document.querySelectorAll(".add-favorite");
const favoritesList = document.getElementById("favorites-list");
const noFavoritesMessage = document.getElementById("no-favorites-message");

// Vérifier si des favoris existent déjà dans le localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Fonction pour afficher les favoris
function renderFavorites() {
  //favoritesList.innerHTML = ""; // Réinitialiser la liste
  if (favorites.length === 0) {
    noFavoritesMessage.style.display = "block";
  } else {
    noFavoritesMessage.style.display = "none";
    favorites.forEach((favorite) => {
      const favoriteElement = document.createElement("div");
      favoriteElement.classList.add("favorite");
      favoriteElement.innerHTML = `
        <h3>${favorite.name}</h3>
        
      `;
      // Ajouter l'élément au DOM
      favoritesList.appendChild(favoriteElement);

      // Ajouter un gestionnaire pour supprimer un favori
      favoriteElement
        .querySelector(".remove-favorite")
        .addEventListener("click", () => {
          removeFavorite(favorite);
        });
    });
  }
}

// Fonction pour ajouter un favori
function addFavorite(recipe) {
  if (!favorites.some((fav) => fav.name === recipe.name)) {
    favorites.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
    console.log(favorites);
  }
}

// Fonction pour supprimer un favori
function removeFavorite(recipe) {
  favorites = favorites.filter((fav) => fav.name !== recipe.name);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

// Fonction pour récupérer les informations de recette
function getRecipeInfo(recipeElement) {
  const name = recipeElement.querySelector("h2").textContent;
  const imgSrc = recipeElement.querySelector("img").src;
  return { name, imgSrc };
}

// Ajout des événements pour les boutons "Ajouter aux favoris"
addFavoriteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const recipeElement = e.target.closest("article");
    const recipe = getRecipeInfo(recipeElement);
    addFavorite(recipe);
  });
});

// Initialiser les favoris dès que la page est chargée
renderFavorites();
