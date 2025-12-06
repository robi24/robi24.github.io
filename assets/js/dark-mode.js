// Dark mode toggle functionality

(function () {
  'use strict';

  // Check for saved theme preference or default to 'auto'
  function getThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return 'auto';
  }

  // Detect system preference
  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  // Apply theme to document
  function applyTheme(theme) {
    const systemTheme = getSystemTheme();
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
      updateToggleIcon('auto', systemTheme);
    } else {
      document.documentElement.setAttribute('data-theme', theme);
      updateToggleIcon(theme, theme);
    }
  }

  // Update toggle button icon
  function updateToggleIcon(currentTheme, effectiveTheme) {
    const toggleButton = document.querySelector('.dark-mode-toggle-nav');
    if (toggleButton) {
      if (currentTheme === 'auto') {
        toggleButton.innerHTML = '🌓';
        toggleButton.setAttribute(
          'aria-label',
          'Using system theme (currently ' + effectiveTheme + ')'
        );
        toggleButton.setAttribute('title', 'Auto (System): ' + effectiveTheme);
      } else if (currentTheme === 'dark') {
        toggleButton.innerHTML = '🌙';
        toggleButton.setAttribute('aria-label', 'Dark mode');
        toggleButton.setAttribute('title', 'Dark mode');
      } else {
        toggleButton.innerHTML = '☀️';
        toggleButton.setAttribute('aria-label', 'Light mode');
        toggleButton.setAttribute('title', 'Light mode');
      }
    }
  }

  // Toggle between light, dark, and auto mode
  function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'auto';
    let newTheme;

    if (currentTheme === 'light') {
      newTheme = 'dark';
    } else if (currentTheme === 'dark') {
      newTheme = 'auto';
    } else {
      newTheme = 'light';
    }

    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    updateUtterancesTheme(newTheme);
  }

  // Update utterances theme
  function updateUtterancesTheme(theme) {
    const utterancesFrame = document.querySelector('.utterances-frame');
    if (utterancesFrame) {
      let utterancesTheme;

      if (theme === 'dark') {
        utterancesTheme = 'github-dark';
      } else if (theme === 'light') {
        utterancesTheme = 'github-light';
      } else {
        // Auto mode
        const systemTheme = getSystemTheme();
        utterancesTheme = systemTheme === 'dark' ? 'github-dark' : 'github-light';
      }

      const message = {
        type: 'set-theme',
        theme: utterancesTheme,
      };
      utterancesFrame.contentWindow.postMessage(message, 'https://utteranc.es');
    }
  }

  // Initialize theme on page load
  function initTheme() {
    const theme = getThemePreference();
    applyTheme(theme);

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        const currentTheme = localStorage.getItem('theme') || 'auto';
        if (currentTheme === 'auto') {
          applyTheme('auto');
        }
      });
    }
  }

  // Set up toggle button click handler
  function setupToggleButton() {
    const toggleButton = document.querySelector('.dark-mode-toggle-nav');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initTheme();
      setupToggleButton();
    });
  } else {
    initTheme();
    setupToggleButton();
  }

  // Apply theme immediately to prevent flash
  initTheme();
})();
