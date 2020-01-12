<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <HandleForm></HandleForm>
            <TableList></TableList>
            <Pagination></Pagination>
            <ControlModule></ControlModule>
        </section>
        <AddLayer></AddLayer>
        <SortDialog></SortDialog>
    </section>
</template>
<!--栏目:demo-->
<script>
    import HandleForm from './components/handleForm';
    import TableList from './components/tableList';
    import Pagination from './components/pagination';
    import ControlModule from './components/controlModule';
    import AddLayer from './components/layer';
    import SortDialog from './components/sortDialog';
    import axios from 'axios';
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters,mapActions } = createNamespacedHelpers('module001');
    export default {
        data(){
            return {
                name:'demo模块'
            }
        },
        mounted(){
          let t = this;
          t.getIconList();
          t.getColumnList();
        },
        methods:{
            ...mapActions(['saveIconList','saveColumnList']),
            getIconList(){
                let t = this;
                axios.get('/api/icon/query', {
                    params: {}
                })
                    .then(function (response) {
                        let reqData = response.data;
                        if(reqData.result){
                            t.saveIconList(reqData.result);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getColumnList(){
                let t = this;
                axios.get('/api/columns/query', {
                    params: {
                        grade:0,
                    }
                })
                    .then(function (response) {
                        let reqData = response.data;
                        console.log(reqData.result);
                        if(reqData.result){
                            console.log('获取导数据');
                            console.log(reqData.result);
                            console.log('获取导数据');
                            t.saveColumnList(reqData.result);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        components:{
            HandleForm,
            TableList,
            Pagination,
            ControlModule,
            AddLayer,
            SortDialog
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../../static/scss/column/column.scss";
</style>
