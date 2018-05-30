window.onload = function () {
    const pseudoEntier = document.querySelector('option').textContent;
    const pseudoSplit = pseudoEntier.split(" ");

    const prenom = pseudoSplit[1];
    const nom = pseudoSplit[2];
    const pseudo = `${prenom} ${nom}`;

    //on récupère la div où va aller le bouton
    const divInformation = document.getElementById("informations");
    //on lui colle le bouton que l'on crée
    const divElt = document.createElement("div");
    divElt.innerHTML = `<button type="button" id="openPopup">Tchat CDR</button>`;
    divInformation.appendChild(divElt);
    const encodeURL = encodeURI("https://editeur-map-cdr.netlify.com/tchatCdr/tchatPopup.html?prenom="+prenom+"&nom="+nom+"&pseudo="+pseudo);
    //fonction qui ouvre la popup au clic
    const openPopup = document.getElementById("openPopup");
    openPopup.addEventListener("click", function() {
        window.open(encodeURL, "tchat CDR", 'menubar=yes, scrollbars=yes, top=20, left=700, width=390, height=650');
    });

    //on recupere la feuille de style et on la met dans le head
    const lienCss = document.createElement('link');
    lienCss.href = "styleTchat.css";
    lienCss.rel = "stylesheet";
    lienCss.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(lienCss);


    //on récupère le joueur Ru ou Fr
    const divVisu = this.document.querySelector(".tableau_visu");
    const joueurs = divVisu.querySelectorAll("td");
    const joueursArray = Array.from(joueurs);
    const resultJoueurs = joueursArray.filter(
        (element) => element !== classList.contain("coord")
    );
        
        // item => item.querySelectorAll(".coord"));
    console.log(resultJoueurs);
}