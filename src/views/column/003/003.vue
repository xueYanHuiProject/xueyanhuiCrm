<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <HandleForm></HandleForm>
            <TableList></TableList>
            <Pagination></Pagination>
            <ControlModule></ControlModule>
        </section>
        <JurisdictionLayer></JurisdictionLayer>
        <BlackWarn></BlackWarn>
    </section>
</template>
<!--栏目:demo-->
<script>
    import HandleForm from './components/handleForm';
    import TableList from './components/tableList';
    import Pagination from './components/pagination';
    import ControlModule from './components/controlModule';
    import JurisdictionLayer from './components/JurisdictionLayer';
    import BlackWarn from './components/BlackWarn';
    import axios from 'axios';
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module003');
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
            JurisdictionLayer,
            BlackWarn
        }
    }
</script>
<style lang="scss">
    @import "../../../static/scss/column/003.scss";
</style>
