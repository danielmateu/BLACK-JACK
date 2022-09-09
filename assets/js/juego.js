//Funcion anonima autoinvocada, nos sirven para crear un nuevo scope que no tiene ninguna referencia por nombre
(() => {
    'use strict'

    let deck = [];
    const 
    tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K'];

    let 
    puntosJugadores = [],
    puntosComputadora = 0;
    
    //Referencias HTML
    const 
    btnPedir = document.querySelector('#btnPedir'),
    btnDetener = document.querySelector('#btnDetener'),
    btnNuevo = document.querySelector('#btnNuevo');

    const 
    divCartasJugadores = document.querySelectorAll('.div-cartas'),
    puntosHTML = document.querySelectorAll('small');

    //Funcion que inicia el juego, creando el deck
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }
    }

    //Esta función crea una nueva baraja
    const crearDeck = () => {
        deck = [];

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
        return _.shuffle(deck); //Arreglo modificado en orden aleatorio
    }
    
    //Esta función me permite tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck'
        }
        return deck.pop();
    }

    //Esta función me devuelve el valor de cada carta dada.
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1); //Eliminamos el último carácter del string

        return (isNaN(valor)) ? (valor === 'A') ? 11 : 10
            : valor * 1;
    }

    //Turno: 0 0 primer Jugador y el último sera la PC
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerHTML = puntosJugadores[turno];
        return puntosJugadores[turno]

    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
            imgCarta.classList.add('carta', 'animate__animated', 'animate__backInUp')
            imgCarta.src = `/assets/cartas/${carta}.png`
            divCartasJugadores[turno].append(imgCarta);
            // divCartasComuptadora.append(imgCarta);
    }

    //TURNO DE LA CPU 
    const turnoComputadora = (puntosMinimos) => {

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            if (puntosMinimos > 21) {

                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

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

    //Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta,0);

        crearCarta(carta,0);

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

        turnoComputadora(puntosJugadores);
    });

    btnNuevo.addEventListener('click', () => {
        // crearDeck()
        console.clear();
        // deck = [];
        // deck = crearDeck();
        inicializarJuego();

        // puntosJugador = 0;
        // puntosComputadora = 0;

        // puntosHTML[0].innerText = 0
        // puntosHTML[1].innerText = 0

        // divCartasJugador.innerHTML = '';
        // divCartasComuptadora.innerHTML = '';

        // btnPedir.disabled = false;
        // btnDetener.disabled = false;

    })

    // //TODO: Borrar 
    // console.log(16);
    // turnoComputadora(16)
})();