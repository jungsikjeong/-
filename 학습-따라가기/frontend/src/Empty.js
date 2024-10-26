class Empty {
  $empty = null;
  data = null;

  constructor({ $target }) {
    const $empty = document.createElement('div');
    this.$empty = $empty;
    this.$empty.className = 'Empty';
    $target.appendChild(this.$empty);

    this.data = {
      show: false,
      isNull: false,
    };

    this.render();
  }

  show(data) {
    this.setState({
      show: data === null || data.length === 0,
      isNull: data === null,
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.show) {
      this.$empty.style.display = 'block';
      // api요청 실패하면 null, 결과가없으면 length 가 0이됌

      //TODO: if문이 중복되는데 템플릿화해서 변수에따라 텍스트변경
      if (this.data.isNull) {
        this.$empty.innerHTML = `
        <p>😂요청 실패😂</p>
        `;
      } else {
        this.$empty.innerHTML = `
          <p>😂결과가 없습니다😂</p>
          `;
      }
    } else {
      this.$empty.style.display = 'none';
      this.$empty.innerHTML = '';
    }
  }
}

export default Empty;
