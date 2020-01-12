const actions = {
  changeFormInline: ({ commit, state }, data) => {
    commit('changeFormInline', data)
  },
  saveTableList: ({ commit, state }, data) => {
    commit('saveTableList', data)
  },
  handleCurrentChange: ({ commit, state }, num) => {
    commit('handleCurrentChange', num)
  },
  triggerTable: ({ commit, state }) => {
    commit('triggerTable')
  },
  handleSizeChange: ({ commit, state }, num) => {
    commit('handleSizeChange', num)
  },
  tableCurrentChange: ({ commit, state }, data) => {
    commit('tableCurrentChange', data)
  },
  hideLayer: ({ commit, state }) => {
    commit('hideLayer')
  },
  showLayer: ({ commit, state }) => {
    commit('showLayer')
  },
  saveIconList: ({ commit, state }, list) => {
    commit('saveIconList', list)
  },

  createColumn: ({ commit, state }, data) => {
    commit('createColumn', data)
  },
  hideMsg: ({ commit, state }) => {
    commit('hideMsg')
  },
  changeEditType: ({ commit, state }, type) => {
    commit('changeEditType', type)
  },
  showSort: ({ commit, state }) => {
    commit('showSort')
  },
  hideSort: ({ commit, state }) => {
    commit('hideSort')
  }
}
export default actions
