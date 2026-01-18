// Auto-update notifier
class UpdateNotifier {
  constructor() {
    this.updateCheckInterval = 60 * 1000; // Check every minute
    this.lastCheckTime = localStorage.getItem('lastUpdateCheck') || 0;
    this.hasUpdate = false;
    this.initialize();
  }

  initialize() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        this.checkForUpdates();
        setInterval(() => this.checkForUpdates(), this.updateCheckInterval);
      });
    }
  }

  async checkForUpdates() {
    try {
      const response = await fetch('/Portfolio/01-world-time-zones/manifest.json?t=' + Date.now());
      const manifest = await response.json();
      
      const currentVersion = localStorage.getItem('appVersion') || '1.0.0';
      
      if (manifest.version && manifest.version !== currentVersion) {
        this.hasUpdate = true;
        this.showUpdateNotification();
        localStorage.setItem('appVersion', manifest.version);
      }

      localStorage.setItem('lastUpdateCheck', Date.now());
    } catch (error) {
      console.log('Update check failed (offline):', error);
    }
  }

  showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
      <div class="update-content">
        <span class="update-icon">✨</span>
        <span class="update-text">Update available!</span>
        <button onclick="location.reload()" class="update-btn">Refresh</button>
        <button onclick="this.parentElement.parentElement.remove()" class="update-close">✕</button>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .update-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInUp 0.3s ease;
      }

      .update-content {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .update-icon {
        font-size: 1.5em;
      }

      .update-text {
        font-weight: 600;
      }

      .update-btn {
        background: white;
        color: #667eea;
        border: none;
        padding: 8px 15px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s;
      }

      .update-btn:hover {
        transform: scale(1.05);
      }

      .update-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.2em;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 600px) {
        .update-notification {
          left: 10px;
          right: 10px;
        }

        .update-content {
          flex-wrap: wrap;
          gap: 10px;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = 'slideOutDown 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
      }
    }, 10000);
  }

  async performUpdate() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        registration.unregister();
        location.reload();
      } catch (error) {
        console.error('Update failed:', error);
      }
    }
  }
}

// Initialize update notifier when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new UpdateNotifier();
  });
} else {
  new UpdateNotifier();
}