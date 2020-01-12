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
import HandleForm from './components/handleForm'
import TableList from './components/tableList'
import Pagination from './components/pagination'
import ControlModule from './components/controlModule'
import AddLayer from './components/layer'
import SortDialog from './components/sortDialog'
export default {
  data () {
    return {
      name: 'demo模块'
    }
  },
  methods: {

  },
  components: {
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
