var pseudoEntier;
var pseudoSplit;

var prenom;
var nom;
var pseudo;

window.onload = function () {
    
    //on recupère le pseudo
    pseudoEntier = document.querySelector('option').textContent;
    pseudoSplit = pseudoEntier.split(" ");
    
    prenom = pseudoSplit[1];
    nom = pseudoSplit[2];
    pseudo = `${prenom} ${nom}`;
    console.log(`${prenom} - ${nom} - ${pseudo}`);
    // var pseudo = pseudo1.trim();

    // var prenom = "Mikael";
    // var nom = "Dremov";
    // var pseudo = `${prenom} ${nom}`;


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

    // alert("test");
    //on recupere la feuille de style et on la met dans le head
    const lienCss = document.createElement('link');
    lienCss.href = "styleTchat.css";
    lienCss.rel = "stylesheet";
    lienCss.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(lienCss);


    //on récupère le joueur Ru ou Fr
    // const joueurs = document.querySelectorAll("td");
    // console.log(joueurs);


}