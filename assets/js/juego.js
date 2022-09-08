

// 2C = Two of Clubs ( Tréboles )
// 2D = Two of Diamonds ( Diamantes )
// 2H = Two of Hearts ( Corazones )
// 2S = Two of Spades ( picas )

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias HTML
const btnPedir = document.querySelector('#btnPedir');

const divCartasJugador = document.querySelector('#jugador-cartas')
const puntosHTML = document.querySelectorAll('small')


//Esta función crea una nueva baraja
const  crearDeck = () => {

    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(`${i}${tipo}`)
        }
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo)
        }
    }

    // console.log(deck);

    deck = _.shuffle(deck); //Arreglo modificado en orden aleatorio
    console.log(deck);

    return deck;

}

crearDeck();

//Esta función me permite tomar una carta

const pedirCarta = () => {

    if(deck.length === 0){
        throw 'No hay cartas en el deck'
    }

    const carta = deck.pop();

    // console.log(deck);
    // console.log({carta}); //La carta debe ser de la baraja
    return carta;
}

//Esta función me devuelve el valor de cada carta dada.

const valorCarta = (carta) => {

    const valor = carta.substring(0,carta.length - 1); //Eliminamos el último carácter del string

    return (isNaN(valor)) ? (valor === 'A')  ? 11 : 10 
    : valor * 1;

}

const valor = valorCarta(pedirCarta());
// console.log({valor});


//Eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta)
    // console.log(puntosJugador);
    puntosHTML[0].innerHTML = '<strong>' + puntosJugador + '</strong>';

    // <img class='carta' src="./assets/cartas/2S.png" alt=""></img>
    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta')
    imgCarta.src=`/assets/cartas/${carta}.png`
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        console.warn('Has perdido! 💀💀')
        btnPedir.disabled = true;
    }else if(puntosJugador === 21){
        console.warn('21, Genial! 😉😉');
    }

});
