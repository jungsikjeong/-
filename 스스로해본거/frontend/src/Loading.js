class Loading {
  data = {
    show: false,
  };

  constructor({ $target }) {
    const $loading = document.createElement('div');
    this.$loading = $loading;

    $target.appendChild(this.$loading);

    this.data.show = false;

    this.render();
  }

  show() {
    this.setState(true);
    this.render();
  }

  hide() {
    this.setState(false);
    this.render();
  }

  setState(nextData) {
    this.data.show = nextData;
    this.render();
  }

  render() {
    if (this.data.show) {
      this.$loading.innerHTML = `
      <div class="Loading">
        <div class='Loading-wrap'>
          <img src='/public/loading.gif' alt='로딩' /> 
          <p>불러오는중..</p>
        </div>
      </div>
      `;
    } else {
      this.$loading.innerHTML = '';
    }
  }
}

export default Loading;
