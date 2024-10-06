console.log('app is running!');

class App {
  $target = null; // dom을 가르키는 표시를 $로함
  data = [];

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
          this.setState(data);

          this.loading.hide();
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
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
