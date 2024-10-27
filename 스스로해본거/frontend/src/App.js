import api from './api.js';
import ImageInfo from './ImageInfo.js';
import Loading from './Loading.js';
import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import ToggleDarkMode from './ToggleDarkMode.js';

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

    this.toggleDarkMode = new ToggleDarkMode({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.setState({
            items: data,
            page: this.DEFAULT_PAGE,
          });

          this.searchInput.value = JSON.stringify(data);
          this.loading.hide();

          this.saveResult(data);
        });
      },
      onRandomSearch: () => {
        this.loading.show();
        api.fetchCatsRandom().then(({ data }) => {
          this.setState({
            items: data,
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
        const page = this.data.page + 1;

        api.fetchCatsPage(lastKeyword, page).then(({ data }) => {
          if (!data || data.length === 0) {
            this.loading.hide();
            return;
          }
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
      loadingShow: () => this.loading.show(),
      loadingHide: () => this.loading.hide(),
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
