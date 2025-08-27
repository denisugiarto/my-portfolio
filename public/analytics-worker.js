// Google Analytics Web Worker
self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'INIT_GA':
      initGoogleAnalytics(data.measurementId);
      break;
    case 'TRACK_PAGE':
      trackPageView(data);
      break;
    case 'TRACK_EVENT':
      trackEvent(data);
      break;
  }
});

function initGoogleAnalytics(measurementId) {
  // Load Google Analytics script
  importScripts(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
  
  // Initialize dataLayer and gtag
  self.dataLayer = self.dataLayer || [];
  function gtag() { 
    self.dataLayer.push(arguments); 
  }
  self.gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', measurementId, {
    send_page_view: false // We'll handle page views manually
  });
  
  self.postMessage({ type: 'GA_INITIALIZED' });
}

function trackPageView(data) {
  if (self.gtag) {
    self.gtag('config', data.measurementId, {
      page_title: data.title,
      page_location: data.url
    });
  }
}

function trackEvent(data) {
  if (self.gtag) {
    self.gtag('event', data.action, {
      event_category: data.category,
      event_label: data.label,
      value: data.value
    });
  }
}