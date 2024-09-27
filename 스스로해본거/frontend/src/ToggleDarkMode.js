class ToggleDarkMode {
  isDarkMode = null;

  constructor({ $target, onSearch }) {
    const $wrapper = document.createElement('section');
    const $toggleDarkMode = document.createElement('input');
    this.$toggleDarkMode = $toggleDarkMode;
    this.$toggleDarkMode.type = 'checkbox';

    $toggleDarkMode.className = 'ToggleDarkMode';
    $wrapper.appendChild($toggleDarkMode);
    $target.appendChild($wrapper);

    $toggleDarkMode.addEventListener('change', (e) => {
      this.setColorMode(e.target.checked);
    });

    this.initColorMode();
  }

  initColorMode(isDarkMode) {
    this.isDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
    this.$toggleDarkMode.checked = this.isDarkMode;

    this.setColorMode(this.isDarkMode);
  }

  setColorMode(isDarkMode) {
    document.documentElement.setAttribute(
      'color-mode',
      isDarkMode ? 'dark' : 'light'
    );
  }
}
