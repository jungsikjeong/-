class ModeToggleBtn {
  constructor({ $target, initMode, setModeChange }) {
    const $toggleBtnWrap = document.createElement('div')
    this.$toggleBtnWrap = $toggleBtnWrap
    this.$toggleBtnWrap.className = 'ToggleBtnWrap'

    const $toggleBtn = document.createElement('button')
    this.$toggleBtn = $toggleBtn
    this.$toggleBtn.className = 'ToggleBtn'

    this.$toggleBtnWrap.appendChild($toggleBtn)
    $target.appendChild($toggleBtnWrap)

    this.isDarkMode = initMode // 초기 상태 (라이트 모드,false)
    this.setModeChange = setModeChange

    this.$toggleBtn.addEventListener('click', () => this.toggleMode())

    this.render()
  }
  toggleMode() {
    this.isDarkMode = !this.isDarkMode

    document.body.classList.toggle('dark-mode', this.isDarkMode)

    if (this.setModeChange) {
      this.setModeChange(this.isDarkMode)
    }

    this.render()
  }

  render() {
    this.$toggleBtn.innerHTML = this.isDarkMode
      ? '라이트모드로 전환'
      : '다크모드로 전환'
  }
}
