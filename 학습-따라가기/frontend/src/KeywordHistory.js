class KeywordHistory {
  $keywordHistory = null;
  data = null;

  constructor({ $target }) {
    const $keywordHistory = document.createElement('ul');
    this.$keywordHistory = $keywordHistory;
    this.$keywordHistory.className = 'KeywordHistory';
    $target.appendChild(this.$keywordHistory);

    this.data = ['아', '고양이', 'cat'];

    this.render();
  }

  render() {
    this.$keywordHistory.innerHtml = '믄데';
  }
}
