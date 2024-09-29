class Loading {
  data = {
    show: false,
  };

  constructor({ $target }) {
    const $loading = document.createElement("div");
    this.$loading = $loading;

    $target.appendChild(this.$loading);

    this.data.show = false;

    this.render();
  }

  show() {
    this.data.show = true;
    this.render();
  }

  hide() {
    this.data.show = false;
    this.render();
  }

  render() {
    if (this.data.show) {
      this.$loading.innerHTML = `
      <div class="Loading">
        <div class='Loading-wrap'>
          <img src='/public/loading.gif' alt='로딩' /> 
          <p>로딩중..</p>
        </div>
      </div>
      `;
    } else {
      this.$loading.innerHTML = "";
    }
  }
}
