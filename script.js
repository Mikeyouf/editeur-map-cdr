const buttonValider = document.getElementById('valider'),
    inputDiv = document.getElementById('nbrDiv'),
    inputNbrCol = document.getElementById('nbrCol'),
    sectionContainer = document.getElementById('container'),
    buttonReset = document.getElementById('reset'),
    buttonSave = document.getElementById('save'),
    sectionInputs = document.getElementById('inputsRadio'),
    sectionInputsHiver = document.getElementById('inputsRadio1'),
    sectionInputsUniteRu = document.getElementById('inputsRadio2'),
    sectionInputsUniteFr = document.getElementById('inputsRadio3'),
    sectionInputsSauvegarde = document.getElementById('inputsRadio4'),
    buttonTerrainEte = document.getElementById('forSummer'),
    buttonTerrainHiver = document.getElementById('forWinter'),
    buttonUniteRu = document.getElementById('forUniteRu'),
    buttonUniteFr = document.getElementById('forUniteFr'),
    buttonSaves = document.getElementById('sauvegardes'),
    formRadio = document.querySelectorAll('form'),

    choixSaison = document.getElementById('choixSaison'),
    choixSaisonEte = document.getElementById('ete'),
    choixSaisonHiver = document.getElementById('hiver'),

    //div de placement des sauvegardes
    divEltSaves = document.getElementById('putSaves'),

    selectElt = document.getElementById('myselect'),

    lienElements = document.querySelectorAll('a');



//let regex = new RegExp ('/[0-9]/');
//let array = [],
let div = document.createElement('div'),
    nbrDivElt = inputDiv.value,
    nbrColElt = inputNbrCol.value,
    nbrsOfSaves = 0,
    id = 0;

const savesSession = {
    'array' : []
};

function BuildTable(NrLines, NbrCells) {
//    savesSession.array.id = 'monArray';
    savesSession.array.push('<table><tbody>');
    for (let i = 0; i < NrLines; i++) {
        savesSession.array.push('<tr>');
        var cells = [];
        for (let j = 0; j < NbrCells; j++) {
            if (j != 0 && i != 0) {
                savesSession.array.push('<td class="clic terrain plaine"></td>');
            } else {
                if (j == 0) {
                    savesSession.array.push('<td class="terrain coordonnee">' + i + '</td>');
                }
                if (i == 0 && j != 0) {
                    savesSession.array.push('<td class="terrain coordonnee">' + j + '</td>');
                }
            }
        }
        savesSession.array.push('</tr>');
    }

    savesSession.array.push('</tbody></table>');
    div.innerHTML = savesSession.array.join('');


    sectionContainer.appendChild(div.getElementsByTagName('table')[0]);

    const tdElement = document.querySelectorAll('td');

    document.querySelectorAll('.clic').forEach(tdElement => {
        tdElement.addEventListener('click', event => {
            returnInputRadio(tdElement.classList, tdElement);
        });
    });

}

function saveHtml(idSave) {
    window.localStorage.setItem(idSave, JSON.stringify(savesSession.array));
}

function loadHtml(idSave) {
    if (!JSON.parse(window.localStorage.getItem(idSave))) return;

    const arrayJSON = JSON.parse(window.localStorage.getItem(idSave));
    savesSession.array = arrayJSON;

    sectionContainer.innerHTML = savesSession.array.join('');
}

function returnInputRadio(classe, divElt) {
    if (id == 0) {
        for (let i = 0; i < formRadio[0].length; i++) {
            if (formRadio[0][i].checked) {
                classe = formRadio[0][i].value;
                if (!divElt.classList.contains(classe) && (!divElt.classList.contains('coordonnee'))) {
                    divElt.classList = ' ';
                    divElt.classList.add('clic', 'terrain', classe);
                }
            }
        }
    } else if (id == 1) {
        for (let i = 0; i < formRadio[1].length; i++) {
            if (formRadio[1][i].checked) {
                classe = formRadio[1][i].value;
                if (!divElt.classList.contains(classe) && (!divElt.classList.contains('coordonnee'))) {
                    divElt.classList = ' ';
                    divElt.classList.add('clic', 'terrain', classe);
                }
            }
        }
    } else if (id == 2) {
        for (let i = 0; i < formRadio[2].length; i++) {
            if (formRadio[2][i].checked) {
                classe = formRadio[2][i].value;
                if (!divElt.classList.contains(classe) && (!divElt.classList.contains('coordonnee'))) {
                    divElt.classList = ' ';
                    divElt.classList.add('clic', 'terrain', classe);
                }
            }
        }
    } else if (id == 3) {
        for (let i = 0; i < formRadio[3].length; i++) {
            if (formRadio[3][i].checked) {
                classe = formRadio[3][i].value;
                if (!divElt.classList.contains(classe) && (!divElt.classList.contains('coordonnee'))) {
                    divElt.classList = ' ';
                    divElt.classList.add('clic', 'terrain', classe);
                }
            }
        }
    }

}

choixSaison.addEventListener('click', function () {
    const tdElts = document.querySelectorAll('td');
    for (i = 0; i < tdElts.length; i++) {
        if (!tdElts[i].classList.contains('coordonnee') && tdElts[i].classList.contains('plaine') || tdElts[i].classList.contains('plaineH')) {
            if (choixSaisonEte.checked) {
                tdElts[i].classList = '';
                tdElts[i].classList.add('clic', 'terrain', 'plaine');
                sectionInputs.style.zIndex = 20;
                sectionInputsHiver.style.zIndex = 0;
            } else {
                tdElts[i].classList = '';
                tdElts[i].classList.add('clic', 'terrain', 'plaineH');
                sectionInputs.style.zIndex = 0;
                sectionInputsHiver.style.zIndex = 20;
            }
        }
    }
});

//sauvegarde
//buttonSave.addEventListener('click', function () {
//    const valInputElt = document.getElementById('inputSave').value;
//    let saves = savesSession.array;
//
//    //on crée le lien de sauvegarde
//    const spanElt = document.createElement('span');
//
//    if (nbrsOfSaves < 3) {
//        spanElt.innerHTML = `<a href='#' class='liens' id='save${nbrsOfSaves}'>${valInputElt}</a></br>`;
//        divEltSaves.appendChild(spanElt);
//        change_value(valInputElt, nbrsOfSaves);
//        nbrsOfSaves++;
//        
//    }
//    
//    document.querySelectorAll('.liens').forEach(lienElements => {
////        array = [];
//        savesSession.array.id = nbrsOfSaves;
//        savesSession.array.push(sectionContainer.innerHTML);
//        saveHtml(lienElements.id);
//    })
//    
//});

function change_value(input, id) {
    choix = selectElt.selectedIndex // Récupération de l'index du <option> choisi
    valeur_cherchee = selectElt.options[choix].value; // Récupération du texte du <option> d'index "choice"
    selectElt.options[id].text = input;
}



window.addEventListener('load', function () {
    sectionInputs.style.zIndex = 20;
    sectionInputsHiver.style.zIndex = 0;
    sectionInputsUniteFr.style.zIndex = 0;
    sectionInputsUniteRu.style.zIndex = 0;
    sectionInputsSauvegarde.style.zIndex = 0;

//    if(!lienElements.id) {
//        sectionContainer.innerHTML = '';
//        loadHtml('save0');
//        sectionContainer.innerHTML = savesSession.array.join('');
//    }

    const tdElement = document.querySelectorAll('td');

    document.querySelectorAll('.clic').forEach(tdElement => {
        tdElement.addEventListener('click', event => {
            returnInputRadio(tdElement.classList, tdElement);
        });
    });
});

buttonTerrainEte.addEventListener('click', function () {
    sectionInputs.style.zIndex = 20;
    sectionInputsHiver.style.zIndex = 0;
    sectionInputsUniteFr.style.zIndex = 0;
    sectionInputsUniteRu.style.zIndex = 0;
    sectionInputsSauvegarde.style.zIndex = 0;
    id = 0;
});

buttonTerrainHiver.addEventListener('click', function () {
    sectionInputs.style.zIndex = 0;
    sectionInputsHiver.style.zIndex = 20;
    sectionInputsUniteFr.style.zIndex = 0;
    sectionInputsUniteRu.style.zIndex = 0;
    sectionInputsSauvegarde.style.zIndex = 0;
    id = 1;
});

buttonUniteRu.addEventListener('click', function () {
    sectionInputs.style.zIndex = 0;
    sectionInputsHiver.style.zIndex = 0;
    sectionInputsUniteFr.style.zIndex = 0;
    sectionInputsUniteRu.style.zIndex = 20;
    sectionInputsSauvegarde.style.zIndex = 0;
    id = 2;
});

buttonUniteFr.addEventListener('click', function () {
    sectionInputs.style.zIndex = 0;
    sectionInputsHiver.style.zIndex = 0;
    sectionInputsUniteFr.style.zIndex = 20;
    sectionInputsUniteRu.style.zIndex = 0;
    sectionInputsSauvegarde.style.zIndex = 0;
    id = 3;
});

buttonSaves.addEventListener('click', function () {
    sectionInputs.style.zIndex = 0;
    sectionInputsHiver.style.zIndex = 0;
    sectionInputsUniteFr.style.zIndex = 0;
    sectionInputsUniteRu.style.zIndex = 0;
    sectionInputsSauvegarde.style.zIndex = 20;
    id = 4;
});

//Ajouter le tableau
buttonValider.addEventListener('click', function (e) {
    e.preventDefault();
    if (nbrColElt != '' && nbrDivElt != '' && sectionContainer.innerHTML == '') {
//        if(!lienElements.id) {
//            loadHtml(lienElements.id);
//        }

        nbrDivElt++;
        nbrColElt++;

        BuildTable(nbrColElt, nbrDivElt);
//        saveHtml(lienElements.id);
    }
});

//permet de faire un reset du plateau
buttonReset.addEventListener('click', function (e) {
    e.preventDefault();

    sectionContainer.innerHTML = '';
    sectionContainer.style.border = 'none';
    savesSession.array = [];
    
//    window.localStorage.removeItem('save0');
//    
//    saveHtml(lienElements.id);
    window.location.reload();
});
