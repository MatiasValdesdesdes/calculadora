const pantalla = document.querySelector('.pantalla');
let operacionPendiente = '';
let numeroAnterior = '';
let operatorActual = null;
let reiniciarPantalla = false;

function agregar(valor) {
    if (reiniciarPantalla) {
        pantalla.value = '';
        reiniciarPantalla = false;
    }



    if (['+', '-', '*', '/'].includes(valor)) {
        if (operatorActual !== null) {
            calcular();
        }

        numeroAnterior = pantalla.value;
        operatorActual = valor;
        reiniciarPantalla = true;
    }
    
     else {
        pantalla.value += valor;
        }

}


function limpiar() {
    pantalla.value = '';
    operacionPendiente = '';
    numeroAnterior = '';
    operatorActual = null;
}


function retroceso() {
    pantalla.value = pantalla.value.slice(0, -1);
}



function calcular() {
    if (operatorActual === null || reiniciarPantalla) return;

    const numero1 = parseFloat(numeroAnterior);

    const numero2 = parseFloat(pantalla.value);

    if (isNaN(numero1) || isNaN(numero2)) {
        pantalla.value = 'Error';

        setTimeout(limpiar, 1500);
        return;
    }

    let resultado;
    switch (operatorActual) {
        case '+':
            resultado = numero1 + numero2;
            break;

        case '-':
            resultado = numero1 - numero2;
            break;

        case '*':
            resultado = numero1 * numero2;
            break;

        case '/':
            resultado = numero2 !== 0 ? numero1 / numero2 : 'Error';
            break;
    }
    
    resultado = Math.round(resultado * 100000000) / 100000000;
    pantalla.value = resultado;
    operatorActual = null;
    numeroAnterior = '';
    reiniciarPantalla = true;
}

function raizCuadrada() {
    let numero = parseFloat(pantalla.value);
    if (isNaN(numero)) {
        pantalla.value = 'Error';
        setTimeout(limpiar, 1500);
        return;
    }
    pantalla.value = Math.sqrt(numero);
}


document.addEventListener('keydown', (event) => {
    event.preventDefault();
    const key = event.key;
    if (/[0-9+\-*/.]/.test(key)) {
        agregar(key);

    } else if (key === 'Enter') {
        calcular();

    } else if (key === 'Escape') {
        limpiar();

    } else if (key === 'Backspace') {
        retroceso();
    }


});

