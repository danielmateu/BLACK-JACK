//Funcion anonima autoinvocada, nos sirven para crear un nuevo scope que no tiene ninguna referencia por nombre
(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0;
    let puntosComputadora = 0;

    //Referencias HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener')
    const btnNuevo = document.querySelector('#btnNuevo')

    const divCartasJugador = document.querySelector('#jugador-cartas')
    const divCartasComuptadora = document.querySelector('#computadora-cartas')

    const puntosHTML = document.querySelectorAll('small')


    //Esta función crea una nueva baraja
    const crearDeck = () => {

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(`${i}${tipo}`)
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo)
            }
        }

        // console.log(deck);

        deck = _.shuffle(deck); //Arreglo modificado en orden aleatorio
        // console.log(deck);

        return deck;

    }

    crearDeck();

    //Esta función me permite tomar una carta

    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck'
        }

        const carta = deck.pop();

        // console.log(deck);
        // console.log({carta}); //La carta debe ser de la baraja
        return carta;
    }

    //Esta función me devuelve el valor de cada carta dada.

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1); //Eliminamos el último carácter del string

        return (isNaN(valor)) ? (valor === 'A') ? 11 : 10
            : valor * 1;

    }

    const valor = valorCarta(pedirCarta());
    // console.log({valor});


    //TURNO DE LA CPU 

    const turnoComputadora = (puntosMinimos) => {

        do {

            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta)
            puntosHTML[1].innerHTML = '<strong>' + puntosComputadora + '</strong>';

            // <img class='carta' src="./assets/cartas/2S.png" alt=""></img>
            const imgCarta = document.createElement('img');
            imgCarta.classList.add('carta', 'animate__animated', 'animate__backInUp')
            imgCarta.src = `/assets/cartas/${carta}.png`
            divCartasComuptadora.append(imgCarta);

            if (puntosMinimos > 21) {

                break;
            }


        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        // if(puntosComputadora > 21 ){
        //     alert('Mierda! Has ganado... 👾👾')
        // }

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana... 🙃')
            } else if (puntosMinimos > 21) {
                alert('Yo Gano! 🥰')
            } else if (puntosComputadora > 21) {
                alert('Tu ganas... 💩')
            } else {
                alert('Yo Gano! 🥰')
            }
        }, 100)

        // respuestaVictoria()
    }


    const juegoNuevo = () => {
        puntosJugador = 0;
        puntosComputadora = 0;
        puntosHTML[0].innerText = 0
        puntosHTML[1].innerText = 0
        divCartasJugador.innerHTML = '';
        divCartasComuptadora.innerHTML = '';
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        console.clear()

    }

    //Eventos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta)
        // console.log(puntosJugador);
        puntosHTML[0].innerHTML = '<strong>' + puntosJugador + '</strong>';

        // <img class='carta' src="./assets/cartas/2S.png" alt=""></img>
        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta', 'animate__animated', 'animate__backInDown');



        imgCarta.src = `/assets/cartas/${carta}.png`
        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            console.warn('Has perdido! 💀💀')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            btnDetener.disabled = true;
            console.warn('21, Genial! 😉😉');
            turnoComputadora(puntosJugador);
        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    });

    btnNuevo.addEventListener('click', () => {
        // crearDeck()

        juegoNuevo();

    })

    // //TODO: Borrar 
    // console.log(16);
    // turnoComputadora(16)
})();