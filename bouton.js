window.onload = function () {
        //on recupère le pseudo
        const pseudoEntier = document.querySelector('option').textContent;
        const pseudoSplit = pseudoEntier.split(" ");
        const prenom = pseudoSplit[1];
        const nom = pseudoSplit[2];
        const pseudo = `${prenom} ${nom}`;
        // var pseudo = pseudo1.trim();
        console.log(`${pseudoEntier} - ${prenom} - ${nom} - ${pseudo}`);
    // alert("test");
    //on recupere la feuille de style et on la met dans le head
    const lienCss = document.createElement('link');
    lienCss.href = "styleTchat.css";
    lienCss.rel = "stylesheet";
    lienCss.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(lienCss);

    //on récupère la div où va aller le bouton
    const divInformation = document.getElementById("informations");
    //on lui colle le bouton que l'on crée
    const divElt = document.createElement("div");
    divElt.innerHTML = `<button type="button" id="openPopup">Tchat CDR</button>`;
    divInformation.appendChild(divElt);

    //fonction qui ouvre la popup au clic
    const openPopup = document.getElementById("openPopup");
    openPopup.addEventListener("click", function () {
        window.open("https://editeur-map-cdr.netlify.com/tchatPopup.html", "tchat CDR", 'menubar=yes, scrollbars=no, top=20, left=700, width=370, height=450');
    });

    //https://editeur-map-cdr.netlify.com/tchatPopup.html



    //on récupère le joueur Ru ou Fr
    // const joueurs = document.querySelectorAll("td");
    // console.log(joueurs);


}