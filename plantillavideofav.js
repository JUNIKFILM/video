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
