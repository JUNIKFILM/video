// Manejar la funcionalidad de favoritos
document.addEventListener('DOMContentLoaded', function() {
  // Cargar favoritos guardados
  let favorites = JSON.parse(localStorage.getItem('movieFavorites')) || [];
  updateFavoritesList();
  
  // Agregar listeners a los botones de favoritos
  const favoriteButtons = document.querySelectorAll('.favorite-btn');
  
  favoriteButtons.forEach(button => {
      button.addEventListener('click', function() {
          const movieCard = this.closest('.movie-card');
          const movieId = movieCard.getAttribute('data-id');
          const movieTitle = movieCard.querySelector('.movie-title').textContent;
          const movieYear = movieCard.querySelector('.movie-year').textContent;
          const movieRating = movieCard.querySelector('.movie-rating').textContent;
          const movieGenres = Array.from(movieCard.querySelectorAll('.movie-genre')).map(genre => genre.textContent);
          const movieDuration = movieCard.querySelector('.movie-duration').textContent;
          
          // Verificar si la película ya está en favoritos
          const index = favorites.findIndex(movie => movie.id === movieId);
          
          if (index === -1) {
              // Agregar a favoritos
              favorites.push({
                  id: movieId,
                  title: movieTitle,
                  year: movieYear,
                  rating: movieRating,
                  genres: movieGenres,
                  duration: movieDuration
              });
              this.classList.add('active');
          } else {
              // Quitar de favoritos
              favorites.splice(index, 1);
              this.classList.remove('active');
          }
          
          // Guardar en localStorage
          localStorage.setItem('movieFavorites', JSON.stringify(favorites));
          
          // Actualizar la lista de favoritos
          updateFavoritesList();
      });
      
      // Marcar botones de películas que ya están en favoritos
      const movieId = button.closest('.movie-card').getAttribute('data-id');
      if (favorites.some(movie => movie.id === movieId)) {
          button.classList.add('active');
      }
  });
  
  // Función para actualizar la lista de favoritos
  function updateFavoritesList() {
      const favoritesList = document.querySelector('.favorites-list');
      
      if (favorites.length === 0) {
          favoritesList.innerHTML = '<div class="empty-favorites">No hay películas en favoritos. ¡Agrega algunas haciendo clic en el icono!</div>';
          return;
      }
      
      let favoritesHTML = '';
      
      favorites.forEach(movie => {
          favoritesHTML += `
              <div class="favorite-movie" data-id="${movie.id}">
                  <div class="fav-movie-poster">
                      <img src="/api/placeholder/80/120" alt="${movie.title}" class="fav-movie-poster">
                  </div>
                  <div class="fav-movie-info">
                      <div class="movie-header">
                          <span class="movie-title">${movie.title}</span>
                          <span class="movie-year">${movie.year}</span>
                      </div>
                      <div class="movie-metadata">
                          ${movie.genres.map(genre => `<span class="movie-genre">${genre}</span>`).join('')}
                          <span class="movie-duration">${movie.duration}</span>
                      </div>
                      <button class="remove-favorite" data-id="${movie.id}">Quitar de favoritos</button>
                  </div>
              </div>
          `;
      });
      
      favoritesList.innerHTML = favoritesHTML;
      
      // Agregar listeners a los botones de quitar favoritos
      const removeButtons = document.querySelectorAll('.remove-favorite');
      removeButtons.forEach(button => {
          button.addEventListener('click', function() {
              const movieId = this.getAttribute('data-id');
              const index = favorites.findIndex(movie => movie.id === movieId);
              
              if (index !== -1) {
                  favorites.splice(index, 1);
                  
                  // Guardar en localStorage
                  localStorage.setItem('movieFavorites', JSON.stringify(favorites));
                  
                  // Actualizar la lista de favoritos
                  updateFavoritesList();
                  
                  // Actualizar el estado del botón en la tarjeta principal
                  const mainCardButton = document.querySelector(`.movie-card[data-id="${movieId}"] .favorite-btn`);
                  if (mainCardButton) {
                      mainCardButton.classList.remove('active');
                  }
              }
          });
      });
  }
});
