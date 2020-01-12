const state = {
    toggleOnOff:true,
    nowTabData: {},
    Context:false,
    recommendDialog:false,
    outLoginDialogOnOff:false,
    loginOnOff:localStorage.getItem('adminId')?localStorage.getItem('adminId'):"",
};
export default  state;
