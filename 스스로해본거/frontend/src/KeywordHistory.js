class KeywordHistory {
  data = null;

  constructor({ $target, onSearch }) {
    const $keywordHistory = document.createElement('ul');
    $keywordHistory.classListName = 'KeywordHistory';
    $target.appendChild($keywordHistory);

    this.$keywordHistory = $keywordHistory;
    this.onSearch = onSearch;

    this.init();
    this.render();
  }

  setHistory(keyword) {
    let data = this.getHistory();
    data.unshift(keyword);
    data = data.slice(0, 5);
    localStorage.setItem('keywordHistory', data.join(','));

    this.setState(data);
  }

  getHistory() {
    const data =
      localStorage.getItem('keywordHistory') === null
        ? []
        : localStorage.getItem('keywordHistory').split(',');
    return data;
  }

  init() {
    this.data = this.getHistory();
    this.setState(this.data);
  }

  setState(newData) {
    this.data = newData;
    this.render();
  }

  render() {
    this.$keywordHistory.innerHTML = this.data
      ?.map(
        (keyword) =>
          `
        <li>
            <button>${keyword}</button>
        </li>`
      )
      .join('');

    this.$keywordHistory
      .querySelectorAll('li button')
      .forEach(($item, index) => {
        $item.addEventListener('click', () => {
          this.onSearch(this.data[index]);
        });
      });
  }
}
