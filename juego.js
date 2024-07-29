

let palabraAdivinar;
let cantidadErrores = 0; //Variable que cuenta los errores
let cantAciertos = 0; // Variable que cuenta los aciertos del juego
let totalIntentos = 7; // Cantidad de intentos que restaremos

const btnReiniciar = document.getElementById("reiniciar");//Obtenemos el elemento del reiniciar
const intentosJuego = document.getElementById("intentos"); //Obtenemos el elemento de los intentos para cambiarlo
const canvas = document.getElementById("dibujarCanva"); //Elemento el cual tiene el espacio para graficar
const context = canvas.getContext("2d");// Contexto en el que se manejara el canva


//Vector de palabras que utilizaremos en el juego.
const palabras = [
  'DISCIPLINA', /* 0*/
  'CAMISETA', /* 1*/
  'CARAMELOS', /* 2*/
  'ESTUDIO',   /* 3*/
  'STREAMER', /* 4*/
  'CALISTENIA'   /* 5*/
     

];

//const btn = id('jugar');
const imagen = id('imagen');
//Guardamos en la variable la selección de las letras.
const btn_letras = document.querySelectorAll("#letras button");

//Dibujamos el poste del cual ira dibujado el personaje.
dibujarPoste();
/* Iniciamos el juego con el siguiente método */
iniciar();


btnReiniciar.addEventListener('click', function () {
  // Recargar la página
  location.reload();
});


//Función para dibujar el poste inicial
function dibujarPoste(){
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Restaurar el color de trazo a su valor original
  context.strokeStyle = "#1a3d75"; // Cambia "black" al color deseado
 
  context.moveTo(80, 15);
  context.lineTo(80, 300);
  context.moveTo(80,15);
  context.lineTo(150, 15);
  context.moveTo(150, 15);
  context.lineTo(150, 26);

  context.lineWidth = 5;
  context.stroke();

}

//INCIAMOS EL JUEGO
function iniciar(event) {
  //Deshabilitamos el botón de reinicio
  btnReiniciar.disabled = true;
  intentosJuego.innerHTML = totalIntentos;
  


  cantidadErrores = 0;
  cantAciertos = 0;
  //Obtenemos el elemento p en donde escribiremos los espacios de palabra
  const parrafo = id('palabra_a_adivinar');
  parrafo.innerHTML = '';

  //Obtenemos la cantidad de palabras que tenemos en el vector.
  const cant_palabras = palabras.length;
  //Con el método que creamos obtenemos un valor random para el vector y palabras.
  const valor_al_azar = obtener_random(0, cant_palabras);
  //La palabra a adivinar sera el conjunto de palabras escogido por el valor alazar.
  palabraAdivinar = palabras[valor_al_azar];
  console.log(palabraAdivinar);

  //
  const cant_letras = palabraAdivinar.length;

  //Habilitamos cada botón con este for.
  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = false;


  }

  //Creamos los espacios según la cantidad de letras qeu tenga la palabra.
  for (let i = 0; i < cant_letras; i++) {
    const span = document.createElement('span');
    parrafo.appendChild(span);
  }


}



//Evaluamos el click de las letras  para los botones individualmente.
for (let i = 0; i < btn_letras.length; i++) {
  btn_letras[i].addEventListener('click', click_letras);

}

//Función accionada al realizar el click
function click_letras(event) {
  
  const espacios = document.querySelectorAll('#palabra_a_adivinar span');

  const button = event.target; // Cuál de todas las letras llamó a la función
  //Deshabilitamos el botón ya utilizado.
  button.disabled = true;
  const letra = button.innerHTML;
  //Mostramos en consola cual valor contiene el botón.
  console.log(letra);
  const palabra = palabraAdivinar.toUpperCase();

  let acerto = false;


  for (let i = 0; i < palabra.length; i++) {
    if (letra == palabra[i]) {

      // la variable i es la posición de la letra en la palabra.
      // que coincide con el span al que tenemos que mostrarle esta letra.
      // Si coincide aumentaremos el valor de aciertos y sustituimos el span por la letra.

      espacios[i].innerHTML = letra;
      cantAciertos++;
      acerto = true;
    }
  }

  //Esta es la función con la que graficamos al muñeco.
  function drawHangman(errors) {
    

    

    if (errors == 1) {
      // Restaurar el color de trazo a su valor original
      context.strokeStyle = "black"; // Cambia "black" al color que se desea.
      // Draw head
      context.beginPath();
      context.arc(150, 50, 25, 0, Math.PI * 2);
      context.lineWidth = 3;
      context.stroke();
    }

    if (errors == 2) {
      // Restaurar el color de trazo a su valor original
      context.strokeStyle = "black"; // Cambia "black" que se desea.
      // Draw body
      context.moveTo(150, 75);
      context.lineTo(150, 150);
      context.lineWidth = 3;
      context.stroke();
    }

    if (errors >= 3) {
      // Restaurar el color de trazo a su valor original
      context.strokeStyle = "black"; // Cambia "black" que se desea.
      // Draw left arm
      context.moveTo(150, 85);
      context.lineTo(100, 120);
      context.lineWidth = 3;
      context.stroke();
    }

    if (errors >= 4) {
      // Restaurar el color de trazo a su valor original
      context.strokeStyle = "black"; // Cambia "black" que se desea.
      // Draw right arm
      context.moveTo(150, 85);
      context.lineTo(200, 120);
      context.lineWidth = 3;
      context.stroke();
    }

    if (errors >= 5) {
      // Restaurar el color de trazo a su valor original
      context.strokeStyle = "black"; // Cambia "black" que se desea.
      // Draw left leg
      context.moveTo(150, 150);
      context.lineTo(125, 220);
      context.lineWidth = 3;
      context.stroke();
    }

    if (errors >= 6) {
      // Restaurar el color de trazo a su valor original
      context.strokeStyle = "black"; // Cambia "black" al color deseado
      // Draw right leg
      context.moveTo(150, 150);
      context.lineTo(175, 220);
      context.lineWidth = 3;
      context.stroke();
    }

    if (errors >= 7) {
      context.strokeStyle = "red";

      context.moveTo(150, 75);
      context.lineTo(300, 35);
      context.lineWidth = 3;
      context.stroke();

      
    }
  }

  //Si los aciertos son falsos, es decir, no hay aciertos se suma la cantidad de errores.
  if (acerto == false) {
    cantidadErrores++;
   
   //Reducimos la cantidad de intentos en el párrafo. 
    totalIntentos--;
    intentosJuego.innerHTML = totalIntentos;


    drawHangman(cantidadErrores);
  }

  if (cantidadErrores == 7) {
    id('resultado').innerHTML = "Perdiste, la palabra era: " + palabraAdivinar;
    btnReiniciar.disabled = false;
    game_over();
  } else if (cantAciertos == palabraAdivinar.length) {
    id('resultado').innerHTML = "¡¡Ganaste!!";
    btnReiniciar.disabled = false;
    game_over();
  }

  

  function game_over() {
    for (let i = 0; i < btn_letras.length; i++) {
      btn_letras[i].disabled = true;


    }
  }

 // btn.disabled = false;



}