<template>
    <el-container class="adminContainer" @click.native.stop="closeMask($event)">
        <SideBar></SideBar>
        <ContentBar></ContentBar>
        <LoginBar v-show="!(loginOnOff.length>0)"></LoginBar>
        <OutLoginDialog></OutLoginDialog>
    </el-container>
</template>
<style lang="scss" scoped >
    .adminContainer{
        position: relative;
        top: 0;
        /* bottom: 0; */
        left: 0;
        right: 0;
        height: 100vh; // 或 100%
        /*height: auto;*/
        overflow: auto;
        background: #fdfdfd;
    }
</style>
<script>
    import OutLoginDialog from './views/components/Dialog/OutLogin.vue';
    import common from './utils/common';
    import LoginBar from './views/components/login/Login.vue'
    import SideBar from './views/components/sideBar/sideBar';
    import ContentBar from './views/components/main/MainContent';
    import {mapGetters,mapActions} from 'vuex';
    export default {
        data(){
            return {
                mag:"",
                Context:false
            }
        },
        components:{
            SideBar,
            ContentBar,
            LoginBar,
            OutLoginDialog
        },
        mounted(){
            let t = this;
            /*if(common.isEmptyObject(t.nowTabData)){
                t.$router.push({ path: '/' });
            }*/
            setTimeout(()=>{
                console.log(t.loginOnOff);
            },2000);
        },
        computed:{
            ...mapGetters(['nowTabData','loginOnOff'])
        },
        methods:{
            ...mapActions(['ContextOff']),
            closeMask(e){
                let t = this;
                t.ContextOff();
            }
        }
    }
</script>
