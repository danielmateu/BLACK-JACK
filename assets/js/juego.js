

// 2C = Two of Clubs ( Tréboles )
// 2D = Two of Diamonds ( Diamantes )
// 2H = Two of Hearts ( Corazones )
// 2S = Two of Spades ( picas )

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];


//Esta función crea una nueva baraja
const  crearDeck = () => {

    for(let i = 2; i < 10; i++){
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

//Esta función me permite tomar una cartas

const pedirCarta = () => {

    if(deck.length === 0){
        throw 'No hay cartas en el deck'
    }

    const carta = deck.pop();

    console.log(deck);
    console.log({carta}); //La carta debe ser de la baraja
    return carta;
}

// deck = [];
// pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0,carta.length - 1); //Eliminamos el último carácter del string
    // console.log({valor});
    //2 = 2; 10 = 10; 3 = 3
    // let puntos = 0


    // if(isNaN(valor)){
    //     // console.log('No es un número');
    //     puntos = (valor === 'A') ? 11 : 10;
    // }else{
    //     // console.log('Es un numero');
    //     puntos = valor * 1; //Transformamos el string a num
    // }

    return (isNaN(valor)) ? (valor === 'A')  ? 11 : 10 
    : valor * 1;

    

    // puntos = valor * 1;

    // console.log(puntos);

}

const valor = valorCarta(pedirCarta());
console.log({valor});
