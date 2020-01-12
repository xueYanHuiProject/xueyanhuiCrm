const mutations = {
  toggleSide (state, data) {
    state.toggleOnOff = !state.toggleOnOff
  },
  login (state, str) {
    state.loginOnOff = str
  },
  outLogin (state) {
    state.outLoginDialogOnOff = false
    localStorage.removeItem('userName')
    state.loginOnOff = ''
  },
  cancelOutLogin (state) {
    state.outLoginDialogOnOff = false
  },
  outLoginOne (state) {
    state.outLoginDialogOnOff = true
  },
  addTab (state, data) {
    const nowData = JSON.parse(JSON.stringify(state.nowTabData))
    if (!nowData[data.routerName]) {
      nowData[data.routerName] = data
    }
    state.nowTabData = nowData
  },
  deleteTab (state, data) {
    const nowData = JSON.parse(JSON.stringify(state.nowTabData))
    delete nowData[data.routerLink]
    state.nowTabData = nowData
  },
  ContextOn (state) {
    state.Context = true
  },
  ContextOff (state) {
    state.Context = false
  },
  saveColumnList (state, list) {
    console.log(list, '列表列表列表列表')
    state.columnList = list
  },
  showRecommend (state) {
    state.recommendDialog = true
    console.log(state.recommendDialog)
  },
  hideRecommend (state) {
    state.recommendDialog = false
  },
  test (state, str) {
    console.log(state, str)
  }
}
export default mutations