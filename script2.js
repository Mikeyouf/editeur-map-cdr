//Calcul du moral
let inputBlesses = document.getElementById('nbrDeBlesses'),
    inputMorts = document.getElementById('nbrDeMorts'),
    inputMoral = document.getElementById('moral'),
    boutonOk = document.getElementById('buttonOk');
  
boutonOk.addEventListener('click', function() {
    let blesses = parseInt(inputBlesses.value, 10),
    morts = parseInt(inputMorts.value, 10),
    moral = parseInt(inputMoral.value, 10),
    pertes = blesses + morts;
    moral = Math.floor((blesses) * (2/pertes) * 5);
    inputMoral.value = moral;
});