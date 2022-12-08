export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input
            .parentElement
            .classList
            .remove("input-container--invalid");
        input
            .parentElement
            .querySelector(".input-message-error")
            .innerHTML = "";
    } else {
        input
            .parentElement
            .classList
            .add("input-container--invalid");
        input
            .parentElement
            .querySelector(".input-message-error")
            .innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }

}

const tipoDeErrores = ["valueMissing", "typeMismatch", "patternMismatch", "customError"];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre puede estar vacío.",
    },
    email: {
        valueMissing: "El campo correo puede estar vacío.",
        typeMismatch: "El correo no es válido.",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío.",
        patternMismatch: "6-12 caracteres, por lo menos 1 mayúscula y una minúscula, 1 número y sin caracteres especiales.",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío.",
        customError: "Debes tener 18 años de edad.",
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números.",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "La ciudad debe contener entre 4 a 15 caracteres.",
    },
    estado: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "El estado debe contener entre 4 a 15 caracteres.",
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input)
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })

    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}