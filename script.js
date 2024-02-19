//Verificar datos introducidos 

function verificarTexto() {
    let texto = document.getElementById("texto").value;

       texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      texto = texto.replace(/[^\w\s]/g, "").toLowerCase();

    document.getElementById("texto").value = texto;
}

//Encriptar
function encriptar() {
    let texto = document.getElementById("texto").value;
    let tituloMensaje = document.getElementById("titulo-mensaje");
    let parrafo = document.getElementById("parrafo");
    let dibujito = document.getElementById("dibujito")

    let textoCifrado = texto
        .replace(/e/gi, "enter")
        .replace(/i/gi, "imes")
        .replace(/a/gi, "ai")
        .replace(/o/gi, "ober")
        .replace(/u/gi, "ufat")
    
 if (texto.length != 0) {
    document.getElementById("texto").value = textoCifrado;
    tituloMensaje.textContent = "Texto encriptado con éxito";
    parrafo.textContent = "";
    dibujito.src = "./img/encriptado.png";
    dibujito.alt = "Imagen de texto encriptado"
    } else {
        dibujito.src = "./img/muñeco.png";
        tituloMensaje.textContent = "Mensaje no encontrado";
        parrafo.textContent = "Ingresa el texto que deseas encriptar o desencriptar";
        swal("Ups!", "Debes ingresar algún texto", "warning");
    }
}

//Desencriptar
function desencriptar() {
    let texto = document.getElementById("texto").value;
    let tituloMensaje = document.getElementById("titulo-mensaje");
    let parrafo = document.getElementById("parrafo");
    let dibujito = document.getElementById("dibujito");

    let textoCifrado = texto
        .replace(/enter/gi, "e")
        .replace(/imes/gi, "i")
        .replace(/ai/gi, "a")
        .replace(/ober/gi, "o")
        .replace(/ufat/gi, "u")

        if (texto.length != 0) {
            document.getElementById("texto").value = textoCifrado;
            tituloMensaje.textContent = "Texto desencriptado con éxito";
            parrafo.textContent = "";
            dibujito.src = "./img/desencriptado.png";
            dibujito.alt = "Imagen de texto desencriptado"
        } else {
            dibujito.src = "./img/muñeco.png";
            tituloMensaje.textContent = "Mensaje no encontrado";
            parrafo.textContent = "Ingresa el texto que deseas encriptar o desencriptar";
            swal("Ups!", "Debes ingresar algún texto", "warning");
        }
}


//BOTONES//

// Función para copiar el texto al portapapeles
function copiarTexto() {
    let texto = document.getElementById("texto");

    // Selecciona el texto
    texto.select();
    texto.setSelectionRange(0, 99999); // Para dispositivos móviles

    // Copia el texto al portapapeles
    document.execCommand("copy");

    // Deselecciona el texto
    window.getSelection().removeAllRanges();

}

