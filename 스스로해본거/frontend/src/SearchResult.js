import Empty from './Empty.js';

class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    const $wrapper = document.createElement('section');
    this.$searchResult = document.createElement('ul');
    this.$searchResult.className = 'SearchResult';
    $wrapper.appendChild(this.$searchResult);
    $target.appendChild($wrapper);

    this.onNextPage = onNextPage;
    this.data = initialData;
    this.onClick = onClick;

    this.empty = new Empty({ $target: $wrapper });

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    this.empty.show(nextData);
  }

  listObserver = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        item.target.querySelector('img').src =
          item.target.querySelector('img').dataset.src;

        // 마지막 요소를 찾아낸다.
        let dataIndex = Number(item.target.dataset.index);
        if (dataIndex + 1 === this.data.length) {
          // 마지막 요소라면? nextPage 호출
          this.onNextPage();
        }
      }
    });
  });

  render() {
    if (this.data === null || this.data?.length === 0) {
      this.$searchResult.style.display = 'none';
    } else {
      this.$searchResult.style.display = 'grid';
      this.$searchResult.innerHTML = this.data
        .map(
          (cat, index) => `
          <li class="item" data-index=${index}>
            <img src="https://placehold.co/200x300" data-src=${cat.url} alt=${cat.name} />
          </li>
          `
        )
        .join('');

      this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
        $item.addEventListener('click', () => {
          this.onClick(this.data[index]);
        });

        this.listObserver.observe($item);
      });
    }
  }
}

export default SearchResult;
