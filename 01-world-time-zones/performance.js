/**
 * Performance Optimization Module
 * Monitoring and optimization utilities for World Time Zones
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.thresholds = {
      initialLoad: 2000,     // ms
      renderCycle: 100,      // ms
      searchFilter: 300,     // ms
      updateTime: 1000       // ms
    };
    this.init();
  }

  init() {
    // Track initial load time
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        this.measureInitialLoad();
      });
    }

    // Monitor render performance
    this.setupRenderMonitoring();
  }

  measureInitialLoad() {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    this.metrics.initialLoad = pageLoadTime;
    
    if (pageLoadTime > this.thresholds.initialLoad) {
      console.warn(`⚠️ Initial load time: ${pageLoadTime}ms (threshold: ${this.thresholds.initialLoad}ms)`);
    } else {
      console.log(`✅ Initial load time: ${pageLoadTime}ms`);
    }

    // Log breakdown
    console.log(`
      Performance Breakdown:
      - DNS: ${perfData.domainLookupEnd - perfData.domainLookupStart}ms
      - TCP: ${perfData.connectEnd - perfData.connectStart}ms
      - Request: ${perfData.responseStart - perfData.requestStart}ms
      - Response: ${perfData.responseEnd - perfData.responseStart}ms
      - DOM Processing: ${perfData.domInteractive - perfData.responseEnd}ms
    `);
  }

  setupRenderMonitoring() {
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        const memory = performance.memory;
        if (memory) {
          const usedMB = (memory.usedJSHeapSize / 1048576).toFixed(2);
          const limitMB = (memory.jsHeapSizeLimit / 1048576).toFixed(2);
          console.log(`💾 Memory Usage: ${usedMB}MB / ${limitMB}MB`);
        }
      });
    }
  }

  startMeasure(name) {
    if (window.performance && window.performance.mark) {
      performance.mark(`${name}-start`);
    }
  }

  endMeasure(name) {
    if (window.performance && window.performance.measure) {
      try {
        performance.measure(name, `${name}-start`);
        const measure = performance.getEntriesByName(name)[0];
        
        if (measure.duration > this.thresholds[name]) {
          console.warn(`⚠️ ${name}: ${measure.duration.toFixed(2)}ms`);
        } else {
          console.log(`✅ ${name}: ${measure.duration.toFixed(2)}ms`);
        }
      } catch (e) {
        // Measurement not available
      }
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      timestamp: new Date().toISOString()
    };
  }
}

// Lazy Loading Manager
class LazyLoader {
  static loadWhenVisible(element, callback) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback();
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(element);
    } else {
      // Fallback for older browsers
      callback();
    }
  }

  static prefetchResource(url) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }
}

// Memory optimization
class MemoryOptimizer {
  static debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit = 1000) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static cleanupDOM() {
    // Remove unused elements from DOM
    const unused = document.querySelectorAll('[data-cleanup="true"]');
    unused.forEach(el => el.remove());
  }

  static optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// Network optimization
class NetworkOptimizer {
  static requestIdleCallback(callback) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback);
    } else {
      setTimeout(callback, 0);
    }
  }

  static checkConnectionSpeed() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
    }
    return null;
  }

  static adaptToConnection() {
    const connection = this.checkConnectionSpeed();
    if (connection) {
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        console.warn('⚠️ Slow connection detected - reducing animations');
        document.documentElement.style.setProperty('--transition', 'all 0.05s ease');
      } else if (connection.saveData) {
        console.log('📊 Data saver enabled');
      }
    }
  }
}

// Initialize monitoring
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const monitor = new PerformanceMonitor();
    NetworkOptimizer.adaptToConnection();
  });
} else {
  const monitor = new PerformanceMonitor();
  NetworkOptimizer.adaptToConnection();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PerformanceMonitor,
    LazyLoader,
    MemoryOptimizer,
    NetworkOptimizer
  };
}
