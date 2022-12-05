let post = []
//Cambio de paginas
let pagina = 1
const btnAnterior = document.getElementById("#btnAnterior")
const btnSiguiente = document.getElementById("btnSiguiente")


class funcionesCine {
    constructor(hora, entradas) {
        this.hora = hora
        this.entradas = entradas
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
        console.log(datos)
        const Titulospelis = document.querySelectorAll("#titulo")
        Titulospelis.forEach((e) => {
            const div = e.parentElement.parentElement
            if (e.textContent.toLowerCase().includes(datos.toLowerCase())) {
                div.classList.remove("hidden")
            } else {
                div.classList.add("hidden")
            }
        })
        // let busqueda = post.filter(titulo => datos = titulo.title)
        // console.log(busqueda)
    })

}


const renderizarPeliculas = () => {
    post.forEach((e) => {
        peliculasContainer.innerHTML += `<div data-id="${e.id}" class="post">
        <img src="https://image.tmdb.org/t/p/w500/${e.poster_path}">
        <div class="info">
            <h3 id="titulo">${e.title}</h3>
            <h5>${e.release_date}</h5>
            <button id="btnHorarios">
                <span class="button_top"> Ver Horarios
                </span>
            </button>
            <div class="infoExtra">
                <h4>Funciones: </h4>
        <div class="opciones">
        <form class="formulario">
        <input type="radio" name="horario" id="${e.id}-${e.horario[0].hora}">
        <label for="${e.id}-${e.horario[0].hora}">${e.horario[0].hora}</label>
        <input type="radio" name="horario" id="${e.id}-${e.horario[1].hora}">
        <label for="${e.id}-${e.horario[1].hora}">${e.horario[1].hora}</label>
        <input type="radio" name="horario" id="${e.id}-${e.horario[2].hora}">
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
            console.log(containerInfoExtra)
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

//API CON TOP 100 MOVIES
// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '72949765c0msh3b252535d3e8281p14341bjsn3c3c6380cff5',
//         'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
//     }
// };

// fetch('https://imdb-top-100-movies.p.rapidapi.com/premiummovies', options)
//     .then(response => response.json())
//     .then(data => {
//         post = data
//         agregarHorario()
//         renderizarPeliculas()
//     })
//     .catch(err => console.error(err));



//API CON ANIME 

// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '72949765c0msh3b252535d3e8281p14341bjsn3c3c6380cff5',
//         'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
//     }
// };

// fetch('https://anime-db.p.rapidapi.com/anime?page=1&size=50', options)
//     .then(response => response.json())
//     .then(data => {
//         post = Array.from(Object.values(data))
//         post = post[0]
//         agregarHorario()
//         renderizarPeliculas()
//     })
//     .catch(err => console.error(err));

//OTRA API






const cargarPeliculasDesdeApi = () => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=5200c04c925bb6f8991389511d06f494&language=es-MX&page=${pagina}`)
        .then(response => response.json())
        .then(data => {
            post = Array.from(Object.values(data))
            post = post[1]
            console.log(post)
            agregarHorario()
            renderizarPeliculas()
        })
        .catch(err => console.error(err));
}

cargarPeliculasDesdeApi()
buscador()

btnSiguiente.addEventListener('click',()=>{
    if(pagina<1000){
        pagina +=1
        peliculasContainer.innerHTML= ""
        cargarPeliculasDesdeApi()
    }
})
btnAnterior.addEventListener('click',()=>{
    if(pagina>1){
        pagina -=1
        cargarPeliculasDesdeApi()
    }
})