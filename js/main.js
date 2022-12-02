let post = []

const peliculasContainer = document.querySelector(".peliculas")


const renderizarPeliculas = () => {
    post.forEach((e) => {
        console.log(e)
        peliculasContainer.innerHTML += `<div class="post">
                                            <img src="${e.image}">
                                            <div class="info">
                                                <h3>${e.title}</h3>
                                                <h5>${e.year}</h5>
                                                <button>
                                                    <span class="button_top"> Ver Horarios
                                                    </span>
                                                </button>
                                            </div>
                                        </div>`
    })
}


let containerPost = document.querySelector(".post")
let containerHorarios = document.querySelector(".horarios")

containerPost.max = containerPost.offsetHeight + "px"
containerHorarios.style.display = "none"
containerPost.min = containerPost.offsetHeight + "px"
containerPost.style.height = containerPost.min;
containerPost.style.transition = "height";

const toggle = () => {
    if (containerPost.style.height != containerPost.min && containerPost.style.height != '') {
        containerPost.style.height = containerPost.min;
    } else {
        containerPost.style.height = containerPost.max;
        containerHorarios.style.display = "inline";
    }
}





















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
//         renderizarPeliculas()
//     })
//     .catch(err => console.error(err));

