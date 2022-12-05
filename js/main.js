let post = []
let pagina = 1
let carrito = []

class funcionesCine {
    constructor(hora, entradas) {
        this.hora = hora
        this.entradas = entradas
    }
}
class addCarrito {
    constructor(titulo, entradas, funcion, precio) {
        this.titulo = titulo
        this.entradas = entradas
        this.funcion = funcion
        this.precio = precio * entradas
    }
}

//FUNCIONES AM 
const funcionAM1 = new funcionesCine("8:30", 30)
const funcionAM2 = new funcionesCine("10:30", 30)
const funcionAM3 = new funcionesCine("11:00", 30)
//FUNCIONES PM
const funcionPM1 = new funcionesCine("12:30", 30)
const funcionPM2 = new funcionesCine("13:30", 30)
const funcionPM3 = new funcionesCine("17:30", 30)
//FUNCIONES NOCHE
const funcionNoche1 = new funcionesCine("20:30", 30)
const funcionNoche2 = new funcionesCine("21:00", 30)
const funcionNoche3 = new funcionesCine("23:20", 30)

const funcionesAM = [funcionAM1, funcionAM2, funcionAM3]
const funcionesPM = [funcionPM1, funcionPM2, funcionPM3]
const funcionesNoche = [funcionNoche1, funcionNoche2, funcionNoche3]

const peliculasContainer = document.querySelector(".peliculas")

const input = document.querySelector("#buscador")
const buscador = () => {
    input.addEventListener("keyup", (e) => {
        let datos = document.querySelector("#buscador").value
        const Titulospelis = document.querySelectorAll("#titulo")
        Titulospelis.forEach((e) => {
            const div = e.parentElement.parentElement
            if (e.textContent.toLowerCase().includes(datos.toLowerCase())) {
                div.classList.remove("hidden")
            } else {
                div.classList.add("hidden")
            }
        })
    })



}




const renderizarPeliculas = () => {
    post.forEach((e) => {
        peliculasContainer.innerHTML += `<div data-id="${e.id}" class="post">
        <img src="https://image.tmdb.org/t/p/w500/${e.poster_path}">
        <div class="info">
            <h3 id="titulo">${e.title}</h3>
            <h5>${e.release_date}</h5>
            <h6>⭐${e.vote_average}⭐</h6>
            <button id="btnHorarios">
                <span class="button_top"> Ver Horarios
                </span>
            </button>
            <div class="infoExtra">
                <h4>Funciones: </h4>
        <div class="opciones">
        <form class="formulario" id="${e.title}" data-id=${e.id}>
        <input type="radio" name="horario" id="${e.id}-${e.horario[0].hora}" value=${e.horario[0].hora}>
        <label for="${e.id}-${e.horario[0].hora}">${e.horario[0].hora}</label>
        <input type="radio" name="horario" id="${e.id}-${e.horario[1].hora}" value=${e.horario[1].hora}>
        <label for="${e.id}-${e.horario[1].hora}">${e.horario[1].hora}</label>
        <input type="radio" name="horario" id="${e.id}-${e.horario[2].hora}" value=${e.horario[2].hora} >
        <label for="${e.id}-${e.horario[2].hora}">${e.horario[2].hora}</label><br>
        <div class="entradasDisp">

        </div>
        <h4>Cantidad:</h4>
        <select name="cantidad">
            <option value=1>1</option>
            <option value=2>2</option>
            <option value=3>3</option>
            <option value=4>4</option>
            <option value=5>5</option>
        </select> <br>

        <button type="submit" class="button_top">Agregar al Carrito</button>
        <button type="reset" class="button_top">Limpiar</button>
    </form>
</div>
</div>
</div>

</div>`

    })
    mostrarHorarios()
}


const mostrarHorarios = () => {
    const btnHorarios = document.querySelectorAll("#btnHorarios")
    btnHorarios.forEach((boton) => {
        boton.addEventListener('click', () => {
            const containerInfoExtra = boton.parentElement
            const infoExtra = containerInfoExtra.querySelector(".infoExtra")
            if (containerInfoExtra.classList.contains("ver")) {
                containerInfoExtra.classList.remove("ver")
                infoExtra.classList.remove("verExtra")
            }
            else {
                containerInfoExtra.classList.add("ver")
                infoExtra.classList.add("verExtra")
            }
        })
    })
    formulario()
}


const formulario = () => {
    const formulario = document.querySelectorAll(".formulario")
    formulario.forEach((e) => {
        e.addEventListener('submit', (x) => {
            x.preventDefault()
            const transactionFormData = new FormData(e)
            const cantidad = transactionFormData.get("cantidad")
            const funcion = transactionFormData.get("horario")
            const titulo = e.getAttribute("id")
            const id = e.getAttribute("data-id")
            console.log(cantidad, funcion, titulo, id)
            if (funcion == null) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Debes seleccionar una funcion!'
                })
            }
            else {
                console.log("Enviando informacion...")
                agregarCarrito(cantidad, funcion, titulo, id)
            }
        })
    })
}

const agregarCarrito = (cantidad, funcion, titulo, id) => {
    const eleccion = post.find((i) => i.title == titulo)
    const add = new addCarrito(eleccion.title, cantidad, funcion, 3250)
    carrito.push(add)
    console.log(carrito)
    const carroJSON = JSON.stringify(carrito)
    localStorage.setItem("carrito", carroJSON)
    Swal.fire({
        icon: 'success',
        title: 'Excelente!',
        html: `<h4>A sido agregado a tu carrito: <br> 
        -${cantidad} Entradas para la pelicula ${titulo}, funcion: ${funcion}</h4>`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ver Carrito',
        cancelButtonColor: '#d33',
        cancelButtonText: "Cerrar"
    }).then((result) => {
        if (result.isConfirmed) {
            mostrarcarrito()
        }
    })
}
const cargarCarrito = () => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
}



let i = 0
const agregarHorario = () => {
    post.forEach((e) => {
        if (i == 0) {
            e.horario = funcionesPM

        }
        else if (i == 1) {
            e.horario = funcionesAM
        }
        else if (i == 2) {
            e.horario = funcionesNoche
        }
        else if (i = 3) {
            e.horario = funcionesPM
            i = 0
        }
        i++

    })
}





///////// LISTA DE PELICULAS POPULARES /////////////////////

const cargarPeliculasDesdeApi = () => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=5200c04c925bb6f8991389511d06f494&language=es-MX&page=${pagina}`)
        .then(response => response.json())
        .then(data => {
            post = Array.from(Object.values(data))
            post = post[1]
            agregarHorario()
            renderizarPeliculas()
        })
        .catch(err => console.error(err));
}

//BUSCADOR DE PELICULAS /////////////////////////////////
const inputBuscador = document.getElementById("buscador")
const divCambiarPagina = document.getElementsByClassName("cambiarPagina")
inputBuscador.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        buscarPeliculaEnApi()
    }
})

const buscarPeliculaEnApi = () => {
    const valorBuscado = inputBuscador.value
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=5200c04c925bb6f8991389511d06f494&language=es-MX&query=${valorBuscado}&page=1&include_adult=false`)
        .then(responde => responde.json())
        .then(data => {
            peliculasContainer.innerHTML = ""
            post = Array.from(Object.values(data))
            post = post[1]
            agregarHorario()
            renderizarPeliculas()
        })
}
/////////////////////////////////////////////////////////

const peliculasRecientes = () => {
    pagina = 1
    console.log("Hola" , pagina)
    peliculasContainer.innerHTML = ""
    cargarPeliculasDesdeApi()
}
const peliculasAntiguas = () => {
    pagina = 3
    console.log("Hola")
    peliculasContainer.innerHTML = ""
    cargarPeliculasDesdeApi()
}


//PAGINAS/////////////////////////////////////////////////
const btnAnterior = document.getElementById("btnAnterior")
const btnSiguiente = document.getElementById("btnSiguiente")
const spanPagina = document.getElementById("pagina")

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1
        spanPagina.innerText = pagina
        peliculasContainer.innerHTML = ""

        cargarPeliculasDesdeApi()
    }
})
btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1
        spanPagina.innerText = pagina
        peliculasContainer.innerHTML = ""
        cargarPeliculasDesdeApi()
    }
})
///////////////////////////////////////////////////////////
cargarCarrito()
cargarPeliculasDesdeApi()
mostrarHorarios()
buscador()