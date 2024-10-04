class RandomButton {
  isDarkMode = null;

  constructor({ $target, onClick }) {
    const $wrapper = document.createElement('section');
    const $randomButton = document.createElement('button');
    this.$randomButton = $randomButton;
    this.$randomButton.type = 'button';
    this.$randomButton.innerHTML = `랜덤 버튼`;

    $randomButton.className = 'RandomButton';
    $wrapper.appendChild($randomButton);
    $target.appendChild($wrapper);

    $randomButton.addEventListener('click', (e) => {
      onClick();
    });
  }
}
