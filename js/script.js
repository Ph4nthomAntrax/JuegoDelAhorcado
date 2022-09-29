String.prototype.replaceAt = function (index, character) {
    return this.substring(0, index) + character + this.substring(index + character.length);
}

//-------------------HTML ELEMENTS---------------// 
let buttonContainer = document.getElementById('button-container');
let sceneContainer = document.getElementById('scene-container');
let newWordContainer = document.getElementById('newWord-container');
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let txtUnderscore = document.getElementById('word-underscore');
let txtInputWord = document.getElementById('word-input');
let btnSearch = document.getElementById('search');
let txtNewWord = document.getElementById('newWord');
let btnJugar = document.getElementById('start-add');
let txtFailed = document.getElementById('failed-word');
let btnRepeat = document.getElementById('repeat');
btnRepeat.addEventListener('click', _ => {
    location.reload();
});

//--------------Words Array---------------//
const palabras = ["ALURA", "ORACLE", "ONE", "JAVASCRIPT", "HTML", "CARACOLES"]
//let tablero = document.getElementById("canva").getContext("2d");

let palabra = palabras[Math.floor(Math.random() * palabras.length)];

let palabraConGuiones = palabra.replace(/./g, "_ ");

let failPalabra = [];

let failCount = 0;
txtUnderscore.value = palabraConGuiones;


function validaEntrada(texto) {
    var soloLetras = /^[A-Z !Ñ]+$/i;
    if (texto == "") return false;
    return soloLetras.test(texto);
}

function searchWord() {
    let fail = true; //flag valida si existe una letra erronea
    let same = true;//flag valida si letra es repetida en el arreglo failPalabra
    let letra = txtInputWord.value.toLocaleUpperCase();

    if (validaEntrada(letra)) {
        //console.log(palabra);
        //recorre la palabra en busca de coincidencias con letra, si se cumple la condicion hace el remplazo 
        //se usa i*2 por el espacio que se deja cuando se convierte en guiones la palabra _ _ _ _ _ _ _ _, de ota manera 
        //nos quedaria una linea asi ______________
        for (let i in palabra) {
            if (letra == palabra[i]) {
                palabraConGuiones = palabraConGuiones.replaceAt(i * 2, letra);
                fail = false;
            }
        }
        if (fail) {
            for (let j in failPalabra) {
                if (letra == failPalabra[j]) {
                    alert('Esta letra ya se uso');
                    same = false;
                }
            }
            if (same) {
                failPalabra.push(letra);
                failCount++;
                //console.log(failCount);
            }
            changeScene(failCount);
        } else {
            if (palabraConGuiones.indexOf('_') < 0) {
                drawSceneWin();
                txtInputWord.disabled = true;
                txtInputWord.style.display = 'none';
                btnSearch.style.display = 'none';
                btnRepeat.style.display = '';
            }
        }
        txtInputWord.value = '';
        txtInputWord.focus();
        txtUnderscore.value = palabraConGuiones;
        txtFailed.value = failPalabra.join('  ');
        //console.log(palabraConGuiones);
    } else {
        alert('Atención! No deben ser utilizados letras con acentos, numeros ó caracteres especiales');
    }

}

//-------------------Funcion iniciar juego-------------------//
function iniciarJuego() {
    buttonContainer.style.display = 'none';
    newWordContainer.style.display = 'none';
    btnRepeat.style.display = 'none';
    txtUnderscore.style.display = '';
    txtInputWord.style.display = '';
    btnSearch.style.display = '';
    sceneContainer.style.display = '';
    txtFailed.value = '';
    let image = document.getElementById('hang');
    txtInputWord.value = '';
    txtInputWord.focus();
    cleanCanvas();
    drawScene(image);
}

//abre div para agregar nuevas palabras 
function verDivPalabras() {
    buttonContainer.style.display = 'none';
    sceneContainer.style.display = 'none';
    btnJugar.style.display = 'none';
    newWordContainer.style.display = '';
    txtNewWord.style.display = '';
    txtNewWord.value = '';
    txtNewWord.focus();
}
//oculta div canvas
function cleanScene() {
    sceneContainer.style.display = 'none';
    newWordContainer.style.display = 'none';
    txtUnderscore.style.display = 'none';
    txtInputWord.style.display = 'none';
    btnSearch.style.display = 'none';
    btnRepeat.style.display = 'none';
}
//-------------------Funciones canvas-------------------//
function cleanCanvas() {
    ctx.clearRect(0, 0, 72, 120);
}

function drawScene(imagen) {
    ctx.drawImage(imagen, 110, 0, 72, 120);
    console.log("imagen agregada al canvas")
}

function drawSceneWin() {
    var text = "¡¡¡FELICIDADES GANASTE!!!";
    ctx.font = "20px Arial";
    ctx.fillStyle = "green";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, 120);
}

function drawSceneLost() {
    var text = "¡¡¡PERDISTE!!!";
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, 120);
}

//intentar usar un switch para cambiar la imagen cada que le usuario falle una letra 
function changeScene(count) {
    switch (count) {
        case 1:
            let image1 = document.getElementById('hanged-1');
            cleanCanvas();
            drawScene(image1);
            break;
        case 2:
            let image2 = document.getElementById('hanged-2');
            cleanCanvas();
            drawScene(image2);
            break;
        case 3:
            let image3 = document.getElementById('hanged-3');
            cleanCanvas();
            drawScene(image3);
            break;
        case 4:
            let image4 = document.getElementById('hanged-4');
            cleanCanvas();
            drawScene(image4);
            break;
        case 5:
            let image5 = document.getElementById('hanged-5');
            cleanCanvas();
            drawScene(image5);
            drawSceneLost();
            txtInputWord.style.display = 'none';
            btnSearch.style.display = 'none';
            btnRepeat.style.display = '';
            break;
    }
}

//-------------------------------------Funcion agregar palabra-------------------------------------//
function addNewWord() {
    let nuevaPalabra = txtNewWord.value.toUpperCase();
    if (validaEntrada(nuevaPalabra)) {
        palabras[palabras.length] = nuevaPalabra;
        txtNewWord.value = '';
        console.log(palabras);
        btnJugar.style.display = '';
    } else {
        alert('Atención! No deben ser utilizados letras con acentos, numeros ó caracteres especiales');
    }
}


