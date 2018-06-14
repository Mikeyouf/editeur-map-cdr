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

    // DATE
    // les noms de jours / mois
    const jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
    const mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
    // on recupere la date
    const date = new Date();
    // on construit le message
    let messageDate = jours[date.getDay()] + " "; // nom du jour
    messageDate += date.getDate() + " "; // numero du jour
    messageDate += mois[date.getMonth()] + " "; // mois
    messageDate += date.getHours() + ":"; //heure
    const minutesTemp = date.getMinutes();
    const minutes = minutesTemp < 10 ? `0${minutesTemp}` : minutesTemp;
    messageDate += minutes; // minutes

    // DECODE URL
    const decodeURL = decodeURI(window.location.href);
    const params = decodeURL.split("?")[1].split("&").reduce((p, c) => {
        const param = c.split("=");
        p[param[0]] = param[1];
        return p;
    }, {});

    var stateObj = { foo: "bar" };
    window.history.pushState(stateObj, "tchat cdr", "popup.html");

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

    const channelRu = document.querySelector("#ruTchatButton");
    channelRu.disabled = nation == "Ru" ? false : true;
    const ruDivChannel = document.querySelector("#mainChatRu");

    const channelFr = document.querySelector("#frTchatButton");
    channelFr.disabled = nation == "Fr" ? false : true;
    const frDivChannel = document.querySelector("#mainChatFr");
    if (nation === "Ru") {
        channelRu.style.display = "block";
        channelFr.style.display = "none";
    } else {
        channelRu.style.display = "none";
        channelFr.style.display = "block";
    }

    // position de départ
    mainDivChannel.style.display = "block";
    ruDivChannel.style.display = "none";
    frDivChannel.style.display = "none";

    //channel RU / FR
    channelRuFr.addEventListener("click", function () {
        if (mainDivChannel.style.display === "none") {
            mainDivChannel.style.display = "block";
            ruDivChannel.style.display = "none";
            frDivChannel.style.display = "none";
        }
    });

    const boutonEnvoyer = document.querySelector("#boutonEnvoyerMain");
    const textArea = document.querySelector("#inputMessageElt");
    textArea.addEventListener("keyup", function () {
        boutonEnvoyer.disabled = textArea.value.length > 140 ? true : false;
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
                date: `${messageDate}`,
                pseudo: `${pseudo}`,
                text: `${message}`,
                messageId: `${messageId}`,
                nation: `${nation}`
            });
        }
        
        //on vide l'input
        textArea.value = "";
        textArea.style.focus = "auto";
        // scrollToTop(2500);
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
            // const userMessage = htmlspecialchars(messages.text);

            liElt.innerHTML = `
            <div class="message ${userClassRu} ${userClassFr} ${noUserClassRu} ${noUserClassFr}">
            <p class="pseudoChat">${messages.pseudo}</p>
            <p class="date">${messages.date}</p>
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
            // const chatZone = document.querySelector(".messages");
            // chatZone.scrollTop = chatZone.scrollHeight;
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

    //channel RU
    channelRu.addEventListener("click", function () {
        if (ruDivChannel.style.display === "none") {
            mainDivChannel.style.display = "none";
            ruDivChannel.style.display = "block";
            frDivChannel.style.display = "none";
        }
    });

    const boutonEnvoyerRu = document.querySelector("#boutonEnvoyerRu");
    const textAreaRu = document.querySelector("#inputMessageEltRu");
    textAreaRu.addEventListener("keyup", function () {
        boutonEnvoyerRu.disabled = textAreaRu.value.length > 120 ? true : false;
    });

    //envoyer le message dans la div message
    boutonEnvoyerRu.addEventListener("click", function () {

        //on capture le message dans le textarea
        const message = document.getElementById('inputMessageEltRu').value;
        const now = Date.now();
        const messageId = now;
        const ref = firebase.database().ref('messagesRu');

        if (message !== "") {
            ref.push({
                date: `${messageDate}`,
                pseudo: `${pseudo}`,
                text: `${message}`,
                messageId: `${messageId}`,
                nation: `${nation}`
            });
        }
        
        //on vide l'input
        textAreaRu.value = "";
        textAreaRu.style.focus = "auto";
        // scrollToTop(2500);
    });

    const listenMessagesRu = firebase.database().ref('messagesRu');
    const startListeningRu = function () {
        listenMessagesRu.on('child_added', function (snapshot) {
            const messages = snapshot.val();

            //const de CSS
            const userClassRu = messages.pseudo === pseudo && messages.nation === "Ru" ? "messageContentRu" : " ";
            const noUserClassRu = messages.pseudo !== pseudo && messages.nation === "Ru" ? "messageContentLeftRu" : " ";

            //on crée une balise li pour y mettre le message
            const liElt = document.createElement('li');

            liElt.innerHTML = `
            <div class="messageRu ${userClassRu} ${noUserClassRu}">
            <p class="pseudoChat">${messages.pseudo}</p>
            <p class="date">${messages.date}</p>
            <p class="messageChat"> ${messages.text}</p>
            </div>
            `;

            const ulEltMessage = document.getElementById('listeMessageRu');
            ulEltMessage.appendChild(liElt);

            //supprime au delà d'un certain nombre de messages
            const divMessageEntier = document.querySelectorAll(".messageRu");
            Object.keys(divMessageEntier).slice(0, -20).map(
                key => divMessageEntier[key].remove()
            );

            window.focus();
            scrollToTop(2500);
            // const chatZone = document.querySelector(".messages");
            // chatZone.scrollTop = chatZone.scrollHeight;
        });

        //suppression des anciens messages
        listenMessagesRu.on("value", function (snapshot) {
            const messages = snapshot.val();
            if (!messages) {
                return
            }
            if (Object.keys(messages).length > 25) {
                const query = listenMessages.orderByChild('messagesRu').limitToFirst(5);
                const updates = {};
                query.on('value', function (snapshot) {
                    snapshot.forEach(child => updates[child.key] = null);
                });
                return listenMessages.update(updates);
            }
        });

    }

    // ecouter les changements
    startListeningRu();

    //channel Fr
    channelFr.addEventListener("click", function () {
        if (frDivChannel.style.display === "none") {
            mainDivChannel.style.display = "none";
            ruDivChannel.style.display = "none";
            frDivChannel.style.display = "block";
        }
    });

    const boutonEnvoyerFr = document.querySelector("#boutonEnvoyerFr");
    const textAreaFr = document.querySelector("#inputMessageEltFr");
    textAreaFr.addEventListener("keyup", function () {
        boutonEnvoyerFr.disabled = textAreaFr.value.length > 120 ? true : false;
    });

    //envoyer le message dans la div message
    boutonEnvoyerFr.addEventListener("click", function () {

        //on capture le message dans le textarea
        const message = document.getElementById('inputMessageEltFr').value;
        const now = Date.now();
        const messageId = now;
        const ref = firebase.database().ref('messagesFr');
        
        if (message !== "") {
            ref.push({
                date: `${messageDate}`,
                pseudo: `${pseudo}`,
                text: `${message}`,
                messageId: `${messageId}`,
                nation: `${nation}`
            });
        }
        
        //on vide l'input
        textAreaFr.value = "";
        textAreaFr.style.focus = "auto";
        // scrollToTop(2500);
    });

    const listenMessagesFr = firebase.database().ref('messagesFr');
    const startListeningFr = function () {
        listenMessagesFr.on('child_added', function (snapshot) {
            const messages = snapshot.val();

            //const de CSS
            const userClassFr = messages.pseudo === pseudo && messages.nation === "Fr" ? "messageContentFr" : " ";
            const noUserClassFr = messages.pseudo !== pseudo && messages.nation === "Fr" ? "messageContentLeftFr" : " ";

            //on crée une balise li pour y mettre le message
            const liElt = document.createElement('li');

            liElt.innerHTML = `
            <div class="messageFr ${userClassFr} ${noUserClassFr}">
            <p class="pseudoChat">${messages.pseudo}</p>
            <p class="date">${messages.date}</p>
            <p class="messageChat"> ${messages.text}</p>
            </div>
            `;

            const ulEltMessage = document.getElementById('listeMessageFr');
            ulEltMessage.appendChild(liElt);

            //supprime au delà d'un certain nombre de messages
            const divMessageEntier = document.querySelectorAll(".messageFr");
            Object.keys(divMessageEntier).slice(0, -20).map(
                key => divMessageEntier[key].remove()
            );

            window.focus();
            scrollToTop(2500);
            // const chatZone = document.querySelector(".messages");
            // chatZone.scrollTop = chatZone.scrollHeight;
        });

        //suppression des anciens messages
        listenMessagesFr.on("value", function (snapshot) {
            const messages = snapshot.val();
            if (!messages) {
                return
            }
            if (Object.keys(messages).length > 25) {
                const query = listenMessages.orderByChild('messagesFr').limitToFirst(5);
                const updates = {};
                query.on('value', function (snapshot) {
                    snapshot.forEach(child => updates[child.key] = null);
                });
                return listenMessages.update(updates);
            }
        });

    }

    // ecouter les changements
    startListeningFr();

}