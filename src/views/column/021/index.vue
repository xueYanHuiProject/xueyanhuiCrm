<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <HandleForm @getTableList="getTableList"></HandleForm>
            <TableList :tableList="tableList" @setSelect="setSelect" @setSelectData="setSelectData"></TableList>
            <Pagination :pageNum="pageNum" :pageSize="pageSize" :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></Pagination>
            <ControlModule :selectOnOff="selectOnOff" :selectData="selectData"  @getTableList="getTableList"></ControlModule>
        </section>
    </section>
</template>
<script>
import axios from 'axios'
import { isEmptyObject } from '../../../utils/common'
import HandleForm from './components/handleForm'
import TableList from './components/tableList'
import Pagination from './components/pagination'
import ControlModule from './components/controlModule'
const xhrUrl = {
  getTableList: '/api/proInstr/query'
}
export default {
  name: 'manageBanner',
  data () {
    const adminId = localStorage.getItem('adminId')
    return {
      updateUser: adminId,
      pageNum: 1,
      pageSize: 20,
      tableList: [],
      selectData: {},
      total: 0,
      selectOnOff: false
    }
  },
  watch: {
    selectOnOff (n) {
      const _this = this
      if (!n) {
        _this.selectData = {}
      }
    }
  },
  methods: {
    handleSizeChange (num) {
      const _this = this
      _this.pageSize = num
    },
    handleCurrentChange (num) {
      const _this = this
      _this.pageNum = num
    },
    getTableList (data) {
      const _this = this
      console.log('--------------------')
      console.log(_this.formInline)
      axios.get(xhrUrl.getTableList, {
        params: isEmptyObject(data) ? {
          updateUser: _this.updateUser
        } : data
      })
        .then(function (response) {
          console.log(response)
          if (response.data.code === 200) {
            _this.selectOnOff = false
            _this.tableList = response.data.result
            console.log(_this.tableList)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    setSelect (onOff) {
      const _this = this
      _this.selectOnOff = onOff
    },
    setSelectData (data) {
      const _this = this
      _this.selectData = data
      console.log('设置数据', _this.selectData)
    }
  },
  mounted () {
    const _this = this
    _this.getTableList()
  },
  components: {
    HandleForm,
    TableList,
    Pagination,
    ControlModule
  }
}
</script>
<style lang="scss" scoped>
    @import "../../../static/scss/column/column.scss";
</style>
