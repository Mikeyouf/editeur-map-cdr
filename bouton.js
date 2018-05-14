window.onload = function () {
    //on récupère la div où va aller le bouton
    const divInformation = document.getElementById("informations");
    //on lui colle le bouton que l'on crée
    const divElt = document.createElement("div");
    divElt.innerHTML = `<button type="button" id="openPopup">Tchat CDR</button>`;
    divInformation.appendChild(divElt);

    //fonction qui ouvre la popup au clic
    const openPopup = document.getElementById("openPopup");
    openPopup.addEventListener("click", function () {
        window.open("https://editeur-map-cdr.netlify.com/tchatpopup.html", "tchat CDR", 'menubar=yes, scrollbars=yes, top=20, left=500, width=370, height=450');
    });
}