import DarkModeToggle from './DarkModeToggle.js';
import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import ImageInfo from './ImageInfo.js';
import Loading from './Loading.js';
import api from './api.js';

console.log('app is running!');

class App {
  $target = null; // dom을 가르키는 표시를 $로함
  DEFAULT_PAGE = 1;
  data = {
    items: [],
    page: this.DEFAULT_PAGE,
  };

  constructor($target) {
    this.$target = $target;

    this.loading = new Loading({
      $target,
    });

    this.darkModeToggle = new DarkModeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        // 로딩 show
        this.loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.setState({
            items: data ? data : [],
            page: this.DEFAULT_PAGE,
          });
          // 로딩 hide
          this.loading.hide();
          // 로컬에 저장
          this.saveResult(data);
        });
      },
      onRandomSearch: () => {
        this.loading.show();
        api.fetchRandomCats().then(({ data }) => {
          this.setState({
            items: data ? data : [],
            page: this.DEFAULT_PAGE,
          });
          this.loading.hide();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data.items,
      onClick: (cat) => {
        this.imageInfo.showDetail({
          visible: true,
          cat,
        });
      },

      onNextPage: () => {
        this.loading.show();

        const keywordHistory =
          localStorage.getItem('keywordHistory') === null
            ? []
            : localStorage.getItem('keywordHistory').split(',');
        const lastKeyword = keywordHistory[0];
        const page = this.page + 1;

        api.fetchCatsPage(lastKeyword, page).then(({ data }) => {
          let newData = this.data.items.concat(data);

          this.setState({
            items: newData,
            page,
          });

          this.loading.hide();
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    this.init();
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData.items);
  }

  saveResult(result) {
    localStorage.setItem('lastResult', JSON.stringify(result));
  }

  init() {
    const lastResult =
      localStorage.getItem('lastResult') === null
        ? []
        : JSON.parse(localStorage.getItem('lastResult'));

    this.setState({
      items: lastResult,
      page: this.DEFAULT_PAGE,
    });
  }
}

export default App;
