<template>
    <section class="adminContentContainer adminContentContainer005">
        <section class="adminContentInner">
            <HandleForm></HandleForm>
            <TableList></TableList>
            <Pagination></Pagination>
            <ControlModule></ControlModule>
        </section>
        <DetailLayer></DetailLayer>
        <RejectWarn></RejectWarn>
        <PassDialog></PassDialog>
        <Recommend></Recommend>
        <EditPanel></EditPanel>
    </section>
</template>
<!--栏目:demo-->
<script>
    import HandleForm from './components/handleForm';
    import TableList from './components/tableList';
    import Pagination from './components/pagination';
    import ControlModule from './components/controlModule';
    import DetailLayer from './components/DetailLayer';
    import EditPanel from './components/EditPanel';
    import RejectWarn from './components/RejectWarn';
    import PassDialog from './components/PassDialog';
    import Recommend from '../../components/Recommend/Recommend';
    import axios from 'axios';
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module011');
    export default {
        data(){
            return {
                name:'demo模块'
            }
        },
        components:{
            HandleForm,
            Pagination,
            TableList,
            ControlModule,
            DetailLayer,
            RejectWarn,
            PassDialog,
            Recommend,
            EditPanel
        }
    }
</script>
<style lang="scss">
    @import "../../../static/scss/column/005.scss";
</style>
