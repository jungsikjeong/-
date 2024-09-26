console.log('app is running!')

class App {
  $target = null // dom을 가르키는 표시를 $로함
  data = []

  constructor($target) {
    this.$target = $target
    this.initMode = localStorage.getItem('mode') === 'dark' || 'light'

    this.modeToggleBtn = new ModeToggleBtn({
      $target,
      initMode: this.initMode === 'dark' ? true : false,
      setModeChange: this.setModeChange(this.initMode),
    })

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        api.fetchCats(keyword).then(({ data }) => this.setState(data))
      },
    })

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
        })
      },
    })

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    })
  }

  setModeChange(isMode) {
    if (isMode) {
      localStorage.setItem('mode', 'dark')
    } else {
      localStorage.setItem('mode', 'light')
    }
  }

  setState(nextData) {
    console.log(this)
    this.data = nextData
    this.searchResult.setState(nextData)
  }
}
