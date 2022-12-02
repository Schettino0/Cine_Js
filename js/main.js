let post = []

const peliculasContainer = document.querySelector(".peliculas")

const input = document.querySelector("#buscador")
const buscador = () => {
    input.addEventListener("keyup", (e) => {
        let datos = document.querySelector("#buscador").value
        console.log(datos)
        const Titulospelis = document.querySelectorAll("#titulo")
        Titulospelis.forEach((e)=>{
            const div= e.parentElement.parentElement
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
        peliculasContainer.innerHTML += `<div class="post">
        <img src="${e.image}">
        <div class="info">
            <h3 id="titulo">${e.title}</h3>
            <h5>${e.year}</h5>
            <button id="btnHorarios">
                <span class="button_top"> Ver Horarios
                </span>
            </button>
            <div class="infoExtra">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta perspiciatis atque repudiandae
                deleniti minus voluptas quo suscipit debitis ipsum molestias facilis aperiam delectus, quia lore</p>
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


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '72949765c0msh3b252535d3e8281p14341bjsn3c3c6380cff5',
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
    }
};

fetch('https://imdb-top-100-movies.p.rapidapi.com/premiummovies', options)
    .then(response => response.json())
    .then(data => {
        post = data
        renderizarPeliculas()
    })
    .catch(err => console.error(err));


buscador()