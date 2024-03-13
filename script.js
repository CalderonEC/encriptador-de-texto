
// Verificar datos introducidos
function verificarTexto() {
    let texto = document.getElementById("texto").value;

    // Convertir a minúsculas, sin acentos y permitir espacios
    texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    texto = texto.replace(/[^\w\s]/g, "").toLowerCase();

    document.getElementById("texto").value = texto;
    if (texto.length > 0 && !accionRealizada) {
        document.getElementById("boton-reiniciar").style.display = "flex";
    }

}

let accionRealizada = false;

// Encriptar
function encriptar() {

    verificarTexto(); 

    let texto = document.getElementById("texto").value;
    let mensajeEncriptado = document.querySelector(".encriptado");

    if (mensajeEncriptado) {
        if (texto.length !== 0) {
            
            let textoCifrado = texto
                .replace(/e/gi, "enter")
                .replace(/i/gi, "imes")
                .replace(/a/gi, "ai")
                .replace(/o/gi, "ober")
                .replace(/u/gi, "ufat");

            // Mostrar el div encriptado y ocultar el div "caja"
            mensajeEncriptado.style.display = "block"; 
            let caja = document.getElementById("caja");
            if (caja) {
                caja.style.display = "none";
            }
            // Texto introducido se transporta encriptado al area correspondiente
            document.getElementById("texto-encriptado").value = textoCifrado;
            accionRealizada = true;
        } else {
        mensajeEncriptado.style.display = "none"; // Ocultar el div encriptado
        swal("Ups!", "Debes ingresar algún texto", "warning");
        }
    }
}   


//Desencriptar
function desencriptar() {
    verificarTexto(); 

    let texto = document.getElementById("texto").value;
    let mensajeEncriptado = document.querySelector(".encriptado");

    if (mensajeEncriptado) {
        if (texto.length !== 0) {
            // Desencriptar el texto según tus reglas
            let textoDescifrado = texto
                .replace(/enter/gi, "e")
                .replace(/imes/gi, "i")
                .replace(/ai/gi, "a")
                .replace(/ober/gi, "o")
                .replace(/ufat/gi, "u");

            // Mostrar el div encriptado y ocultar el div "caja"
            mensajeEncriptado.style.display = "flex";
            let caja = document.getElementById("caja");
            if (caja) {
                caja.style.display = "none";
            }

            // Asignar el texto desencriptado al textarea correspondiente
            document.getElementById("texto-encriptado").value = textoDescifrado;
            accionRealizada = true;
        } else {
            mensajeEncriptado.style.display = "none"; // Ocultar el div encriptado
            swal("Ups!", "Debes ingresar algún texto", "warning");
        } 
    }
}

//BOTONES//

// Función para copiar el texto al portapapeles
function copiarTexto() {
    let texto = document.getElementById("texto-encriptado");

    // Selecciona el texto
    texto.select();
    texto.setSelectionRange(0, 99999); // Para dispositivos móviles

    // Copia el texto al portapapeles
    document.execCommand("copy");

    // Deselecciona el texto
    window.getSelection().removeAllRanges();

}

//Funcion para invertir texto estilo Google Translate
function invertirTexto() {
    if (accionRealizada) {
        let texto = document.getElementById("texto").value;
        let textoEncriptado = document.getElementById("texto-encriptado").value;

        if (texto && textoEncriptado) {
            // Invertir la lógica aquí, por ejemplo, intercambiando los valores
            document.getElementById("texto").value = textoEncriptado;
            document.getElementById("texto-encriptado").value = texto;

        } else {
            // Mostrar mensaje de advertencia con SweetAlert
            swal("¡Ups!", "Debes encriptar o desencriptar antes de invertir.", "warning");
        }

    } else {
        // Mostrar mensaje de advertencia con SweetAlert
        swal("¡Ups!", "Debes encriptar o desencriptar antes de invertir.", "warning");
    }
}

//Funcion para reiniciar todo al estado inicial
function reiniciar() {
    // Restablecer el área de texto y otros elementos según sea necesario
    document.getElementById("texto").value = "";
    document.getElementById("texto-encriptado").value = "";
    document.querySelector(".encriptado").style.display = "none";
    document.getElementById("caja").style.display = "flex";
    accionRealizada = false; // Restablecer la variable de acción realizada
}