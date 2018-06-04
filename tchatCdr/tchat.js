window.onload = function () {
    //scroll to down
    function scrollToTop(scrollDuration) {
        var scrollStep = window.scrollY / (scrollDuration / 15),
            scrollInterval = setInterval(function () {
                if (window.scrollY != 0) {
                    window.scrollBy(0, scrollStep);
                } else clearInterval(scrollInterval);
            }, 15);
    }

    const decodeURL = decodeURI(window.location.href);
    const params = decodeURL.split("?")[1].split("&").reduce((p, c) => {
        const param = c.split("=");
        p[param[0]] = param[1];
        return p;
    }, {});

    const prenom = params.prenom;
    const nom = params.nom;
    const pseudo = params.pseudo;
    const nation = params.nation;

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

    //GESTION DES CHANNELS
    //on récupère les 3 boutons
    //et les 3 div parents associé
    const channelRuFr = document.querySelector("#mainTchatButton");
    const mainDivChannel = document.querySelector("#mainChat");
    // mainDivChannel.style.display = "block";
    const channelRu = document.querySelector("#ruTchatButton");
    const ruDivChannel = document.querySelector("#mainChatRu");
    // ruDivChannel.style.display = "none";
    const channelFr = document.querySelector("#frTchatButton");
    const frDivChannel = document.querySelector("#mainChatFr");
    // frDivChannel.style.display = "none";

    //channel RU / FR
    channelRuFr.addEventListener("click", function () {
        if(mainDivChannel === "none") {
            mainDivChannel.style.display = "block";
            ruDivChannel.style.display = "none";
            frDivChannel.style.display = "none";
        }
    });

    //channel RU
    channelRu.addEventListener("click", function () {
        if(ruDivChannel === "none") {
            mainDivChannel.style.display = "none";
            ruDivChannel.style.display = "block";
            frDivChannel.style.display = "none";
        }
    });

    //channel Fr
    channelFr.addEventListener("click", function () {
        if(frDivChannel === "none") {
            mainDivChannel.style.display = "none";
            ruDivChannel.style.display = "none";
            frDivChannel.style.display = "block";
        }
    });

    const boutonEnvoyer = document.querySelector("#boutonEnvoyerMain");
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
        scrollToTop(2500);
        //on vide l'input
        textArea.value = "";
        textArea.style.focus = "auto";
    });

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
            <p class="pseudoChat">${messages.pseudo}</p>
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

            window.focus();
            scrollToTop(2500);
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