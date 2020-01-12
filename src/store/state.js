const state = {
  toggleOnOff: true,
  nowTabData: {},
  columnList: [],
  Context: false,
  recommendDialog: false,
  outLoginDialogOnOff: false,
  loginOnOff: localStorage.getItem('adminId') ? localStorage.getItem('adminId') : '111111'
}
export default state
