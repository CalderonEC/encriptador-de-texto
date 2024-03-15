let accionRealizada = false;
let mapeo = {
    "ai": "a",
    "enter": "e",
    "imes": "i",
    "ober": "o",
    "ufat": "u"
};
let mapeoInverso = {};
for (let clave in mapeo) {
    mapeoInverso[mapeo[clave]] = clave;
}


// Verificar datos introducidos
function verificarTexto() {
    let texto = document.getElementById("texto").value;

    // Convertir a minúsculas, sin acentos y permitir espacios
    texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    texto = texto.replace(/[^a-z\s]/ig, "").toLowerCase();

    document.getElementById("texto").value = texto;
    if (texto.length > 0) {
        document.getElementById("boton-reiniciar").style.display = "flex";
    } else {
        document.getElementById("boton-reiniciar").style.display = "none";
    }

}

// Encriptar
function encriptar() {

    verificarTexto(); 

    let texto = document.getElementById("texto").value;
    let mensajeEncriptado = document.querySelector(".encriptado");

    if (mensajeEncriptado) {
        if (texto.length !== 0) {
            
            let textoCifrado = "";
            for (let i = 0; i < texto.length; i++) {
                let letra = texto[i];
                switch (letra.toLowerCase()) {
                    case "a":
                        textoCifrado += "ai";
                        break;
                    case "e":
                        textoCifrado += "enter";
                        break;
                    case "i":
                        textoCifrado += "imes";
                        break;
                    case "o":
                        textoCifrado += "ober";
                        break;
                    case "u":
                        textoCifrado += "ufat";
                        break;
                    default:
                        textoCifrado += letra;
                }
            }

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
    let textoEncriptado = document.getElementById("texto-encriptado").value.trim();
    let textoOriginal = document.getElementById("texto").value.trim();

    let textoDesencriptado = "";

    if (textoEncriptado) {
        let palabrasEncriptadas = textoEncriptado.split(" ");
        let desencriptacionExitosa = true;
        for (let palabra of palabrasEncriptadas) {
            if (mapeoInverso[palabra]) {
                textoDesencriptado += mapeoInverso[palabra] + " ";
            } else {
                // Si la palabra no está en el mapeo inverso, la desencriptación falló
                desencriptacionExitosa = false;
                break;
            }
        }

        if (!desencriptacionExitosa) {
            // Aplicar la lógica de reemplazo para manejar "jaimes"
            textoDesencriptado = textoEncriptado.replace(/ai/g, "a")
                                                  .replace(/enter/g, "e")
                                                  .replace(/imes/g, "i")
                                                  .replace(/ober/g, "o")
                                                  .replace(/ufat/g, "u");
        }

        // Mostrar el div encriptado y ocultar el div "caja"
        let encriptadoDiv = document.querySelector(".encriptado");
        encriptadoDiv.style.display = "block";

        let cajaDiv = document.getElementById("caja");
        if (cajaDiv) {
            cajaDiv.style.display = "none";
        }

        // Asignar el resultado al textarea correspondiente
        document.getElementById("texto-encriptado").value = textoDesencriptado.trim();
        accionRealizada = true;
    } else {
        // Si no hay texto encriptado, pero hay texto original, aplicar la lógica de reemplazo
        if (textoOriginal) {
            textoDesencriptado = textoOriginal.replace(/ai/g, "a")
                                               .replace(/enter/g, "e")
                                               .replace(/imes/g, "i")
                                               .replace(/ober/g, "o")
                                               .replace(/ufat/g, "u");
        } else {
            // Mostrar un mensaje de advertencia si no hay texto encriptado ni texto original
            swal("Ups!", "Debes ingresar algún texto encriptado", "warning");
            return; // Salir de la función sin realizar más acciones
        }

        // Mostrar el div encriptado y ocultar el div "caja"
        let encriptadoDiv = document.querySelector(".encriptado");
        encriptadoDiv.style.display = "block";

        let cajaDiv = document.getElementById("caja");
        if (cajaDiv) {
            cajaDiv.style.display = "none";
        }

        // Asignar el resultado al textarea correspondiente
        document.getElementById("texto-encriptado").value = textoDesencriptado.trim();
        accionRealizada = true;
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
    verificarTexto()
}