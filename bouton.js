// var pseudoEntier;
// var pseudoSplit;

// var prenom;
// var nom;
// var pseudo;

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

    //on recupère le pseudo
    const pseudoEntier = document.querySelector('option').textContent;
    const pseudoSplit = pseudoEntier.split(" ");
    
    const prenom = pseudoSplit[1];
    const nom = pseudoSplit[2];
    const pseudo = `${prenom} ${nom}`;
    console.log(`${prenom} - ${nom} - ${pseudo}`);
    // var pseudo = pseudo1.trim();

    // var prenom = "Mikael";
    // var nom = "Dremov";
    // var pseudo = `${prenom} ${nom}`;

    // const prenom1 = `${prenom}`;
// const nom1 = `${nom}`;
// const pseudo1 = `${prenom1} ${nom1}`;




// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC0hDMeatsFgqlMWHFpSoex45_I88G-7CQ",
    authDomain: "chat-cdr-62f5a.firebaseapp.com",
    databaseURL: "https://chat-cdr-62f5a.firebaseio.com",
    projectId: "chat-cdr-62f5a",
    storageBucket: "chat-cdr-62f5a.appspot.com",
    messagingSenderId: "128044416867"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const boutonEnvoyer = document.querySelector("#boutonEnvoyer");
const textArea = document.querySelector("#inputMessageElt");
textArea.addEventListener("keyup", function () {
    boutonEnvoyer.disabled = textArea.value.length > 120 ? true : false;
});

//envoyer le message dans la div message
boutonEnvoyer.addEventListener("click", function () {
    //on capture le message dans le textarea
    const message = document.getElementById('inputMessageElt').value;
    const now = Date.now();
    const messageId = now;
    const ref = firebase.database().ref('messages');
    const nation = "Ru";

    if (message !== "") {
        ref.push({
            prenom: `${prenom}`,
            nom: `${nom}`,
            pseudo: `${pseudo}`,
            text: `${message}`,
            messageId: `${messageId}`,
            nation: `${nation}`
        });
    }

    //on vide l'input
    textArea.value = "";
    textArea.style.focus = "auto";
});

//pour le test
// const prenom = prenom;
// const nom = nom;
// const pseudo = pseudo;
// const nation = "";

const listenMessages = firebase.database().ref('messages');


const startListening = function () {
    listenMessages.on('child_added', function (snapshot) {
        const messages = snapshot.val();
        
        //const de CSS
        const userClassRu = messages.pseudo === pseudo && messages.nation === "Ru" ? "messageContentRu" : " ";
        const userClassFr = messages.pseudo === pseudo && messages.nation === "Fr" ? "messageContentFr" : " ";
        const noUserClassFr = messages.pseudo !== pseudo && messages.nation === "Fr" ? "messageContentLeftFr" : " ";
        const noUserClassRu = messages.pseudo !== pseudo && messages.nation === "Ru" ? "messageContentLeftRu" : " ";
        

        //on crée une balise li pour y mettre le message
        const liElt = document.createElement('li');

        liElt.innerHTML = `
        <div class="message ${userClassRu} ${userClassFr} ${noUserClassRu} ${noUserClassFr}">
        <p class="pseudoChat">${messages.prenom} ${messages.nom}</p>
        <p class="messageChat"> ${messages.text}</p>
        </div>
        `;

        const ulEltMessage = document.getElementById('listeMessage');
        ulEltMessage.appendChild(liElt);

        //supprime au delà d'un certain nombre de messages
        const divMessageEntier = document.querySelectorAll(".message");
        Object.keys(divMessageEntier).slice(0, -20).map(
            key => divMessageEntier[key].remove()
        );
    });

    //suppression des anciens messages
    listenMessages.on("value", function (snapshot) {
        const messages = snapshot.val();
        if (!messages) {
            return
        }
        if (Object.keys(messages).length > 25) {
            const query = listenMessages.orderByChild('messages').limitToFirst(5);
            const updates = {};
            query.on('value', function (snapshot) {
                snapshot.forEach(child => updates[child.key] = null);
            });
            return listenMessages.update(updates);
        }
    });

}

// ecouter les changements
startListening();



}