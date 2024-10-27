class Empty {
  data = {
    show: false,
    isNull: false,
  };

  constructor({ $target }) {
    const $empty = document.createElement('div');
    this.$empty = $empty;
    this.$empty.className = 'Empty';

    $target.appendChild(this.$empty);

    this.data.show = false;

    this.render();
  }

  show(data) {
    this.setState({
      show: data === null || data.length === 0,
      isNull: data === null,
    });

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.show) {
      this.$empty.style.display = 'block';
      this.data.isNull &&
        (this.$empty.innerHTML = `
        <p>😓요청 실패😓</p>
        `);
    } else {
      this.$empty.style.display = 'none';
      this.$empty.innerHTML = `
        <p>😅검색 결과가 없습니다.😅</p>
      `;
    }
  }
}

export default Empty;
