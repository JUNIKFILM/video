const apiKey = '076bf6e6268dec8dfe3ecd688be1dff1';
    function toggleDarkMode(none) {
    const body = document.body;
    const movieContainer = document.querySelector('.movie-container');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
            movieContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        } else {
            body.classList.add('dark-mode');
            movieContainer.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.1)';
        }
    }

    // Obtener detalles de la película al cargar la página
    fetch(`https://api.themoviedb.org/3/movie/787699?api_key=${apiKey}&language=es`)
    .then(response => response.json())
    .then(data => {
    document.getElementById('titulo').textContent = data.title;
    document.getElementById('imagen').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    document.getElementById('duracion').textContent = `${data.runtime} minutos`;

    const genres = data.genres.map(genre => genre.name);
    document.getElementById('categorias').textContent = genres.join(', ');

    document.getElementById('puntuacion').textContent = data.vote_average;
    document.getElementById('sinopsis').textContent = data.overview;
        })
        .catch(error => console.error('Error al obtener detalles de la película:', error));