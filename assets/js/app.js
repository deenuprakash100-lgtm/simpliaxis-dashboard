/**
 * Simpliaxis Executive BI Dashboard - Core JavaScript Architecture Engine
 */

// Global Application State Router
const AppState = {
  theme: 'dark',
  activeModule: 'dashboard',
  refreshInterval: 30000,
  lastRefreshed: new Date(),
  filters: {
    region: 'ALL',
    course: 'ALL',
    dateRange: '30'
  },
  csvUrls: {
    dashboardCSV: '',
    paymentCSV: '',
    metaCSV: '',
    marketingCSV: ''
  },
  charts: {}
};

// Enterprise Mock Engine (Fallback when dynamic CSVs are unlinked)
const MockData = {
  getExecutiveKPIs() {
    return {
      leads: 12480,
      payments: 3820,
      revenue: 2845000,
      conversion: 30.6,
      topCountry: 'United States',
      topCourse: 'PMP Certification'
    };
  },
  getRevenueTrend() {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      actual: [180, 210, 240, 220, 290, 310, 340, 380, 410, 430, 470, 520],
      forecast: [null, null, null, null, null, null, null, 380, 420, 450, 490, 550]
    };
  },
  getRegionalDistribution() {
    return {
      labels: ['USA', 'India', 'APAC', 'MENA', 'Europe'],
      data: [42, 28, 15, 10, 5]
    };
  }
};

// Application Bootstrapper
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initTheme();
  initNavigation();
  initCharts();
  startAutoRefresh();
});

// Real-Time Header Clock
function initClock() {
  const clockElem = document.getElementById('liveClock');
  const updateClock = () => {
    if (clockElem) {
      clockElem.textContent = new Date().toLocaleTimeString();
    }
  };
  updateClock();
  setInterval(updateClock, 1000);
}

// Light / Dark Theme Switcher
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  toggleBtn.addEventListener('click', () => {
    AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', AppState.theme);
    const icon = toggleBtn.querySelector('i');
    icon.className = AppState.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  });
}

// Navigation & Navigation Handlers
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      AppState.activeModule = item.dataset.module;
      renderModule(AppState.activeModule);
    });
  });
}

// Render Module Dynamic Logic
function renderModule(moduleKey) {
  const titleElem = document.getElementById('currentModuleTitle');
  if (titleElem) {
    titleElem.textContent = moduleKey.toUpperCase().replace('-', ' ') + ' OVERVIEW';
  }
  refreshCharts();
}

// Chart.js Orchestrator & Multi-Axis Engine
function initCharts() {
  const revCtx = document.getElementById('revenueTrendChart')?.getContext('2d');
  if (revCtx) {
    const revData = MockData.getRevenueTrend();
    AppState.charts.revenueTrend = new Chart(revCtx, {
      type: 'line',
      data: {
        labels: revData.labels,
        datasets: [
          {
            label: 'Actual Revenue ($k)',
            data: revData.actual,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'AI Forecast ($k)',
            data: revData.forecast,
            borderColor: '#8b5cf6',
            borderDash: [5, 5],
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#94a3b8' } }
        },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
        }
      }
    });
  }

  const regionCtx = document.getElementById('regionDistChart')?.getContext('2d');
  if (regionCtx) {
    const regData = MockData.getRegionalDistribution();
    AppState.charts.regionDist = new Chart(regionCtx, {
      type: 'doughnut',
      data: {
        labels: regData.labels,
        datasets: [{
          data: regData.data,
          backgroundColor: ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { color: '#94a3b8' } }
        }
      }
    });
  }
}

function refreshCharts() {
  Object.values(AppState.charts).forEach(chart => chart?.update());
}

// Real-Time 30-Second Polling Trigger
function startAutoRefresh() {
  setInterval(() => {
    AppState.lastRefreshed = new Date();
    const refreshTimeElem = document.getElementById('lastRefreshTime');
    if (refreshTimeElem) {
      refreshTimeElem.textContent = AppState.lastRefreshed.toLocaleTimeString();
    }
  }, AppState.refreshInterval);
}

// Data Exporter
function exportDashboardData(format) {
  alert('Exporting Simpliaxis Executive Report in ' + format.toUpperCase() + ' format.');
}
