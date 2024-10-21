// TODO: isDarkMode를 App state로 올릴수 없을까..
class DarkModeToggle {
  isDarkMode = null;

  constructor({ $target }) {
    const $wrapper = document.createElement('section');
    const $darkModeToggle = document.createElement('input');
    this.$darkModeToggle = $darkModeToggle;
    this.$darkModeToggle.type = 'checkbox';

    $darkModeToggle.className = 'DarkModeToggle';
    $wrapper.appendChild($darkModeToggle);
    $target.appendChild($wrapper);

    $darkModeToggle.addEventListener('change', (e) => {
      // console.dir(e.target)
      this.setColorMode(e.target.checked);
    });

    this.initColorMode();
  }

  initColorMode() {
    // 초기화
    // isDarkMode state, checkbox 상태, html attr
    this.isDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches; // boolean
    this.$darkModeToggle.checked = this.isDarkMode;
    this.setColorMode(this.isDarkMode);
  }

  setColorMode(isDarkMode) {
    document.documentElement.setAttribute(
      'color-mode',
      isDarkMode ? 'dark' : 'light'
    );
  }
}

export default DarkModeToggle;
