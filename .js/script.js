//declaration de constante du bouton theme toogle et de la constante corps
const corps = document.body;
const boutonTheme = document.querySelector("#theme-toggle");
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

document.addEventListener("DOMContentLoaded", function () {
    const casesACocher = document.querySelectorAll("input[type='checkbox']");
    const champRecherche = document.querySelector("#search");
    const recettes = document.querySelectorAll(".contenu-recette article");

    // Appliquer le thème stocké
    const themeActuel = localStorage.getItem("theme") || "clair";
    if (themeActuel === "sombre") {
        corps.classList.add("sombre");
        boutonTheme.textContent = "☀️";
        
}})
boutonTheme.addEventListener("click", function () {
    if (corps.classList.contains("sombre")) {
        corps.classList.remove("sombre");
        localStorage.setItem("theme", "clair");
        boutonTheme.textContent = "🌙";
    } else {
        corps.classList.add("sombre");
        localStorage.setItem("theme", "sombre");
        boutonTheme.textContent = "☀️";
    }
});

    // Changement de thème et stockage
    