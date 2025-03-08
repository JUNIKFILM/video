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

    // Create the offline notification element
function createOfflineNotification() {
  const notification = document.createElement('div');
  notification.id = 'offline-notification';
  notification.className = 'notification offline-notification hidden';
  
  notification.innerHTML = `
    <div class="notification-icon offline-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
        <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>
    </div>
    <div class="notification-content">
      <h3>Sin conexión a Internet</h3>
      <p>No tienes conexión a Internet. Algunas funciones de la aplicación pueden no estar disponibles.</p>
    </div>
  `;
  
  document.body.appendChild(notification);
  return notification;
}

// Create the online notification element
function createOnlineNotification() {
  const notification = document.createElement('div');
  notification.id = 'online-notification';
  notification.className = 'notification online-notification hidden';
  
  notification.innerHTML = `
    <div class="notification-icon online-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
        <line x1="12" y1="20" x2="12.01" y2="20"></line>
      </svg>
    </div>
    <div class="notification-content">
      <h3>Conexión restablecida</h3>
      <p>Tu conexión a Internet ha sido restablecida. Todas las funciones están disponibles nuevamente.</p>
    </div>
  `;
  
  document.body.appendChild(notification);
  return notification;
}

// Add CSS styles
function addStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      max-width: 400px;
      width: calc(100% - 40px);
      padding: 16px;
      border-radius: 4px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: flex-start;
      z-index: 9999;
      animation: slide-in 0.3s ease-out;
    }
    
    .offline-notification {
      background-color: #333333cb;
      color: white;
    }
    
    .online-notification {
      background-color: #4CAF50;
      color: white;
    }
    
    .notification-icon {
      margin-right: 12px;
      flex-shrink: 0;
    }
    
    .notification-content h3 {
      margin: 0 0 8px 0;
      font-size: 18px;
    }
    
    .notification-content p {
      margin: 0;
      font-size: 14px;
    }
    
    .hidden {
      display: none;
    }
    
    @keyframes slide-in {
      from {
        transform: translate(-50%, 100px);
        opacity: 0;
      }
      to {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }
    
    @keyframes slide-out {
      from {
        transform: translate(-50%, 0);
        opacity: 1;
      }
      to {
        transform: translate(-50%, 100px);
        opacity: 0;
      }
    }
    
    .slide-out {
      animation: slide-out 0.3s ease-in forwards;
    }
  `;
  document.head.appendChild(style);
}

// Initialize the connection notification functionality
function initConnectionNotifications() {
  addStyles();
  const offlineNotification = createOfflineNotification();
  const onlineNotification = createOnlineNotification();
  let onlineNotificationTimeout;
  
  // Check initial connection status
  if (!navigator.onLine) {
    offlineNotification.classList.remove('hidden');
  }
  
  // Add event listeners for online/offline events
  window.addEventListener('online', () => {
    // Hide offline notification
    offlineNotification.classList.add('hidden');
    
    // Show online notification
    onlineNotification.classList.remove('hidden');
    onlineNotification.classList.remove('slide-out');
    
    // Hide online notification after 5 seconds
    clearTimeout(onlineNotificationTimeout);
    onlineNotificationTimeout = setTimeout(() => {
      onlineNotification.classList.add('slide-out');
      setTimeout(() => {
        onlineNotification.classList.add('hidden');
      }, 300); // Match the duration of the slide-out animation
    }, 5000);
  });
  
  window.addEventListener('offline', () => {
    // Show offline notification
    offlineNotification.classList.remove('hidden');
    
    // Hide online notification if it's visible
    onlineNotification.classList.add('hidden');
    clearTimeout(onlineNotificationTimeout);
  });
}

// Run the initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initConnectionNotifications);
