// Performance monitoring utilities
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoadTime: 0,
      firstPaint: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      timeToInteractive: 0,
      memoryUsage: 0,
      fps: 0
    };
    this.initialize();
  }

  initialize() {
    if ('PerformanceObserver' in window) {
      this.observePerformance();
    }
    
    if ('memory' in performance) {
      this.monitorMemory();
    }

    this.measurePageLoad();
    this.monitorFPS();
  }

  observePerformance() {
    // Observe paint entries
    try {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-paint') {
            this.metrics.firstPaint = entry.startTime;
          } else if (entry.name === 'first-contentful-paint') {
            this.metrics.firstContentfulPaint = entry.startTime;
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.log('Paint observer not available');
    }

    // Observe largest contentful paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.largestContentfulPaint = lastEntry.renderTime || lastEntry.loadTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('LCP observer not available');
    }

    // Observe long tasks
    try {
      const taskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('Long task detected:', entry.duration, 'ms');
        }
      });
      taskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.log('Long task observer not available');
    }
  }

  measurePageLoad() {
    window.addEventListener('load', () => {
      const perfData = performance.timing;
      this.metrics.pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      this.metrics.timeToInteractive = perfData.domInteractive - perfData.navigationStart;
      this.logMetrics();
    });
  }

  monitorMemory() {
    setInterval(() => {
      if ('memory' in performance) {
        this.metrics.memoryUsage = (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit * 100).toFixed(2);
        if (this.metrics.memoryUsage > 90) {
          console.warn('High memory usage detected:', this.metrics.memoryUsage + '%');
        }
      }
    }, 5000);
  }

  monitorFPS() {
    let lastTime = performance.now();
    let frames = 0;
    let fps = 60;

    const measureFps = () => {
      frames++;
      const currentTime = performance.now();
      const elapsed = currentTime - lastTime;

      if (elapsed >= 1000) {
        fps = frames;
        this.metrics.fps = fps;
        frames = 0;
        lastTime = currentTime;

        if (fps < 30) {
          console.warn('Low FPS detected:', fps);
        }
      }

      requestAnimationFrame(measureFps);
    };

    requestAnimationFrame(measureFps);
  }

  logMetrics() {
    console.group('📊 Performance Metrics');
    console.table({
      'Page Load Time': this.metrics.pageLoadTime + 'ms',
      'First Paint': this.metrics.firstPaint + 'ms',
      'First Contentful Paint': this.metrics.firstContentfulPaint + 'ms',
      'Largest Contentful Paint': this.metrics.largestContentfulPaint + 'ms',
      'Time to Interactive': this.metrics.timeToInteractive + 'ms',
      'Memory Usage': this.metrics.memoryUsage + '%',
      'FPS': this.metrics.fps
    });
    console.groupEnd();
  }

  getMetrics() {
    return this.metrics;
  }

  reportToAnalytics() {
    // Could be used to send metrics to analytics service
    const metricsPayload = {
      timestamp: new Date().toISOString(),
      ...this.metrics
    };
    
    // Only send if online
    if (navigator.onLine) {
      console.log('Metrics ready for analytics:', metricsPayload);
    }
  }
}

// Initialize performance monitor
const performanceMonitor = new PerformanceMonitor();

// Expose for debugging
window.performanceMonitor = performanceMonitor;