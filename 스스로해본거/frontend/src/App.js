console.log('app is running!');

class App {
  $target = null; // dom을 가르키는 표시를 $로함
  data = [];
  page = 1;

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
          this.setState(data ? data : []);

          this.searchInput.value = JSON.stringify(data);
          this.loading.hide();

          this.saveResult(data);
        });
      },
      onRandomSearch: () => {
        this.loading.show();
        api.fetchCatsRandom().then(({ data }) => {
          this.setState(data);

          this.loading.hide();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,

      onClick: (cat) => {
        this.imageInfo.showDetail({
          visible: true,
          cat,
        });
      },

      onNextPage: () => {
        console.log('다음 페이지 로딩');
        this.loading.show();

        const keywordHistory =
          localStorage.getItem('keywordHistory') === null
            ? []
            : localStorage.getItem('keywordHistory').split(',');
        const lastKeyword = keywordHistory[0];
        const page = this.page + 1;

        api.fetchCatsPage(lastKeyword, page).then(({ data }) => {
          // TODO: 데이터 요청 실패하거나 데이터 없을시 로딩창 사라지게하고, data is not어쩌구 안뜨게하기
          let newData = [...this.data, ...data];
          this.setState(newData);
          this.page = page;
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
    this.searchResult.setState(nextData);
  }

  saveResult(result) {
    localStorage.setItem('lastResult', JSON.stringify(result));
  }

  init() {
    const lastResult =
      localStorage.getItem('lastResult') === null
        ? []
        : JSON.parse(localStorage.getItem('lastResult'));

    this.setState(lastResult);
  }
}
