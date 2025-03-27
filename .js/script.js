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
        const categoriesSelectionnees = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
            .map(caseCochee => caseCochee.value.toLowerCase());
        const texteRecherche = champRecherche.value.toLowerCase();

        recettes.forEach(recette => {
            const categorie = recette.querySelector(".variete-menu").textContent.toLowerCase();
            const temps = recette.querySelector(".temps").textContent.toLowerCase();
            const difficulte = recette.querySelector(".difficulte").textContent.toLowerCase();
            const titre = recette.querySelector("h2").textContent.toLowerCase();
            
            const correspondanceCategorie = categoriesSelectionnees.length === 0 || categoriesSelectionnees.includes(categorie);
            const correspondanceTemps = categoriesSelectionnees.length === 0 || categoriesSelectionnees.includes(temps);
            const correspondanceDifficulte = categoriesSelectionnees.length === 0 || categoriesSelectionnees.includes(difficulte);
            const correspondanceRecherche = titre.includes(texteRecherche);

            if (correspondanceCategorie && correspondanceTemps && correspondanceDifficulte && correspondanceRecherche) {
                recette.style.display = "block";
            } else {
                recette.style.display = "none";
            }
        });
    }

    casesACocher.forEach(caseCochee => {
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
        
}})

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

