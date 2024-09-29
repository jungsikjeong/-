class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        this.$imageInfo.style.display = 'none';
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.className === 'ImageInfo') {
        this.$imageInfo.style.display = 'none';
      }
    });

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <header class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </header>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;

      this.$imageInfo.style.display = 'block';

      const $closeBtn = document.querySelector('.close');
      $closeBtn.addEventListener('click', () => {
        this.$imageInfo.style.display = 'none';
      });
    } else {
      this.$imageInfo.style.display = 'none';
    }
  }
}
