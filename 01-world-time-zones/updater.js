/**
 * Auto-update notifier for World Time Zones App
 * Checks for updates and notifies user when new version is available
 */

class AppUpdater {
  constructor() {
    this.cacheVersion = '2.1';
    this.updateCheckInterval = 60000; // Check every 60 seconds
    this.init();
  }

  init() {
    // Check for updates periodically
    this.startUpdateCheck();

    // Handle visibility change - check for updates when user returns to tab
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.checkForUpdates();
      }
    });
  }

  startUpdateCheck() {
    setInterval(() => this.checkForUpdates(), this.updateCheckInterval);
  }

  async checkForUpdates() {
    try {
      const response = await fetch('index.html?v=' + Date.now(), { method: 'HEAD' });
      const serverVersion = response.headers.get('X-App-Version') || '2.1';
      
      if (serverVersion !== this.cacheVersion) {
        this.showUpdateNotification();
      }
    } catch (err) {
      console.log('Update check failed:', err);
    }
  }

  showUpdateNotification() {
    // Only show notification once per session
    if (!sessionStorage.getItem('updateNotificationShown')) {
      sessionStorage.setItem('updateNotificationShown', 'true');

      // Create notification element
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 350px;
        animation: slideIn 0.3s ease;
      `;

      notification.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>🎉 New Version Available!</strong>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 0.9em;">
              A new version of World Time Zones is ready. Refresh to get the latest features.
            </p>
          </div>
        </div>
        <div style="margin-top: 15px; display: flex; gap: 10px;">
          <button onclick="window.location.reload();" style="
            background: white;
            color: #667eea;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
          " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            Refresh Now
          </button>
          <button onclick="this.parentElement.parentElement.parentElement.remove();" style="
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
          " onmouseover="this.style.background='rgba(255, 255, 255, 0.3)'" onmouseout="this.style.background='rgba(255, 255, 255, 0.2)'">
            Later
          </button>
        </div>
      `;

      document.body.appendChild(notification);

      // Auto-remove after 10 seconds
      setTimeout(() => {
        if (notification.parentElement) {
          notification.style.animation = 'slideOut 0.3s ease';
          setTimeout(() => notification.remove(), 300);
        }
      }, 10000);
    }
  }
}

// Initialize updater when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new AppUpdater();
  });
} else {
  new AppUpdater();
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
