import uniqueArray from './utils/uniqueArray.js';

class KeywordHistory {
  data = null;

  constructor({ $target, onSearch, setSearchInputValue }) {
    const $keywordHistory = document.createElement('ul');
    $keywordHistory.className = 'KeywordHistory';
    $target.appendChild($keywordHistory);

    this.$keywordHistory = $keywordHistory;
    this.onSearch = onSearch;
    this.setSearchInputValue = setSearchInputValue;

    this.init();
    this.render();
  }

  setHistory(keyword) {
    // 최근 키워드 저장
    let keywordHistory = this.getHistory();
    keywordHistory.unshift(keyword);

    // 중복 제거
    keywordHistory = keywordHistory.slice(0, 5);
    keywordHistory = uniqueArray(keywordHistory);
    localStorage.setItem('keywordHistory', keywordHistory.join(','));

    this.init();
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

  bindEvent() {
    this.$keywordHistory
      .querySelectorAll('li button')
      .forEach(($item, index) => {
        $item.addEventListener('click', () => {
          this.onSearch(this.data[index]);
          this.setSearchInputValue(this.data[index]);
        });
      });
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

    this.bindEvent();
  }
}

export default KeywordHistory;
