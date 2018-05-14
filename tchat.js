window.onload = function () {
    // //on récupère la div où va aller le bouton
    // const divInformation = document.getElementById("informations");
    // //on lui colle le bouton que l'on crée
    // const divElt = document.createElement("div");
    // divElt.innerHTML = `<button type="button" id="openPopup">Tchat CDR</button>`;
    // divInformation.appendChild(divElt);

    // //fonction qui ouvre la popup au clic
    // const openPopup = document.getElementById("openPopup");
    // openPopup.addEventListener("click", function () {
    //     window.open("https://editeur-map-cdr.netlify.com/tchatpopup.html", "tchat CDR", 'menubar=yes, scrollbars=yes, top=20, left=500, width=370, height=450');
    // });

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

    let database = firebase.database();

    //on recupère le pseudo
    // const pseudoEntier = document.querySelector('option').textContent;
    // const pseudo = pseudoEntier.split(" ");
    // const prenom = pseudo[1];
    // const nom = pseudo[2];
    const prenom = "Mikael";
    const nom = "Dremov";

    //envoyer le message dans la div message
    boutonEnvoyer.addEventListener("click", function () {
        //on capture le message dans le textarea
        let message = document.getElementById('inputMessageElt').value;

        //on vide l'input
        document.getElementById('inputMessageElt').value = " ";

        firebase.database().ref('messages').push({
            prenom: prenom,
            nom: nom,
            text: message
        });
    });

    let listenMessages = firebase.database().ref('messages');

    var startListening = function () {
        listenMessages.on('child_added', function (snapshot) {
            let messages = snapshot.val();

            const prenom = messages.prenom;
            const nom = messages.nom;
            const message = messages.text;

            //on crée une balise li pour y mettre le message
            const liElt = document.createElement('li');
            liElt.innerHTML = `
            <p class="pseudoChat">${prenom} ${nom} dit: </p>
            <p class="messageChat">- ${message}</p>
            `;

            const ulEltMessage = document.getElementById('listeMessage');
            ulEltMessage.appendChild(liElt);
        });
    }
    // ecouter les changements
    startListening();

}