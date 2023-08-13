//debugger;

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const datosUsuario = capturarDatosForm(event)
    
    fetch("http://localhost:3000/usuarios",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        }.then((resultado) => {
            refrescarTabla();
        })
    );
        
});

function capturarDatosForm(event){
    const elementosSeleccionados = event.target.elements;
    
    const nombreUsuario = elementosSeleccionados.nombre.value;
    const apellidoUsuario = elementosSeleccionados.apellido.value;
    const edadUsuario = elementosSeleccionados.edad.value;
    const contrasena = elementosSeleccionados.contrasena.value;

    return {
        nombre: nombreUsuario,
        apellido: apellidoUsuario,
        edad:edadUsuario,
        contrasena: contrasena
    }
    
}

async function listarUsuariosAPI(){

    const response = await fetch("http://localhost:3000/usuarios");

    const usuarios = await response.json();

    return usuarios;
}


async function escribirTabla(usuarios){

    usuarios.forEach(usuario => {
        agregarFilaTabla(usuario);
    });
    
}

async function agregarFilaTabla(usuario){

    const tabla = document.getElementById("id_tabla");

    const fila =  tabla.insertRow(0);

    const nombre = fila.insertCell(0);
    const apellido = fila.insertCell(1);
    const edad = fila.insertCell(2);
    const contrasena = fila.insertCell(3);

    nombre.innerHTML = usuario.nombre;
    apellido.innerHTML = usuario.apellido;
    edad.innerHTML = usuario.edad;
    contrasena.innerHTML = usuario.contrasena;
}

async function refrescarTabla(){
    const usuarios = await listarUsuariosAPI();

    escribirTabla(usuarios);
}


document.addEventListener('DOMContentLoaded', () => {
    refrescarTabla();
})

/*5150  https://www.youtube.com/watch?v=PKCvzROkRGo&t=1539s */



