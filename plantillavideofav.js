  // Objeto para almacenar las películas favoritas
  let favorites = {};

  // Función para mostrar notificación
  function showNotification(message, type) {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.textContent = message;
      
      document.body.appendChild(notification);
      
      // Remover la notificación después de 3 segundos
      setTimeout(() => {
          notification.remove();
      }, 3000);
  }
  
  // Función para alternar favoritos
  function toggleFavorite(button, movieId) {
      button.classList.toggle('active');
      
      // Obtener datos de la película
      const movieCard = button.closest('.movie-card');
      const title = movieCard.querySelector('.movie-title').textContent;
      const year = movieCard.querySelector('.movie-year').textContent;
      const genres = Array.from(movieCard.querySelectorAll('.movie-genre')).map(g => g.textContent);
      const duration = movieCard.querySelector('.movie-duration').textContent;
      const rating = movieCard.querySelector('.movie-rating').textContent;
      const poster = movieCard.querySelector('.movie-poster iframe').src;
      
      // Actualizar la lista de favoritos
      if (button.classList.contains('active')) {
          // Agregar a favoritos
          favorites[movieId] = { title, genres, duration, rating, poster, year };
          
          // Actualizar el ícono del botón
          button.innerHTML = '❤️'; // Corazón lleno
          
          // Mostrar notificación de guardado
          showNotification(`¡${title} se ha añadido a favoritos!`, 'success');
          
          // Crear elemento favorito
          createFavoriteItem(movieId, favorites[movieId]);
          document.getElementById('favorites-section').style.display = 'block';
      } else {
          // Remover de favoritos
          const removedTitle = favorites[movieId].title;
          delete favorites[movieId];
          
          // Actualizar el ícono del botón
          button.innerHTML = '🤍'; // Corazón vacío
          
          // Mostrar notificación de eliminación
          showNotification(`${removedTitle} se ha eliminado de favoritos`, 'error');
          
          const favItem = document.getElementById(`fav-${movieId}`);
          if (favItem) {
              favItem.remove();
          }
          
          // Ocultar sección si no hay favoritos
          if (Object.keys(favorites).length === 0) {
              document.getElementById('favorites-section').style.display = 'none';
          }
      }
      
      // Guardar favoritos en localStorage
      localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }
  
  // Función para crear un elemento favorito en la UI
  function createFavoriteItem(movieId, movie) {
      const favoriteItem = document.createElement('div');
      favoriteItem.className = 'favorite-item';
      favoriteItem.id = `fav-${movieId}`;
      favoriteItem.innerHTML = `
          <div class="favorite-poster">
              <iframe src="${movie.poster}" frameborder="0" width="100%" height="150" allowfullscreen></iframe>
          </div>
          <div class="favorite-info">
              <div class="favorite-title">${movie.title} ${movie.year}</div>
              <div class="favorite-metadata">
                  ${movie.genres.join(' • ')} • ${movie.duration}
              </div>
              <div class="favorite-rating">${movie.rating}</div>
          </div>
      `;
      
      document.getElementById('favorites-container').appendChild(favoriteItem);
  }
  
  // Inicializar todos los botones de favoritos con corazón vacío
  function initializeFavoriteButtons() {
      const favButtons = document.querySelectorAll('.fav-button');
      favButtons.forEach(button => {
          const movieId = button.closest('.movie-card').dataset.id;
          if (favorites[movieId]) {
              // Si está en favoritos, mostrar corazón lleno
              button.classList.add('active');
              button.innerHTML = '❤️';
          } else {
              // Si no está en favoritos, mostrar corazón vacío
              button.classList.remove('active');
              button.innerHTML = '🤍';
          }
      });
  }
  
  // Cargar favoritos almacenados al iniciar
  window.addEventListener('DOMContentLoaded', () => {
      // Cargar favoritos del localStorage
      const storedFavorites = localStorage.getItem('movieFavorites');
      if (storedFavorites) {
          favorites = JSON.parse(storedFavorites);
      }
      
      // Inicializar todos los botones
      initializeFavoriteButtons();
      
      // Si hay favoritos, mostrar la sección y recrear los elementos
      if (Object.keys(favorites).length > 0) {
          document.getElementById('favorites-section').style.display = 'block';
          for (const [movieId, movie] of Object.entries(favorites)) {
              createFavoriteItem(movieId, movie);
          }
      } else {
          document.getElementById('favorites-section').style.display = 'none';
      }
  });