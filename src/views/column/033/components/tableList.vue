<template>
    <div class="block">
        <el-table
            :data="tableList"
            border
            highlight-current-row
            :default-sort = "{prop: 'createTime', order: 'descending'}"
            @current-change="selectionChange"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="栏目ID">
            </el-table-column>
            <el-table-column
                prop="link"
                label="栏目链接">
            </el-table-column>
            <el-table-column
                prop="names"
                label="栏目名称">
            </el-table-column>
            <el-table-column
                prop="describes"
                label="栏目描述">
            </el-table-column>
            <el-table-column
                prop="status"
                :formatter="formatStatus"
                label="栏目状态">
            </el-table-column>
            <el-table-column
                prop="createTime"
                sortable
                :formatter="formatterTime"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="createTime"
                sortable
                :formatter="formatterTime"
                label="更新时间">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { formatDate } from '../../../../utils/common'
export default {
  props: {
    tableList: {
      default () {
        return []
      },
      type: Array
    }
  },
  methods: {
    selectionChange (data) {
      const _this = this
      _this.$emit('setSelect', !!data)
      _this.$emit('setSelectData', data)
    },
    formatStatus (row, column) {
      const status = row.status
      return parseInt(status, 10) === 0 ? '下架' : '上架'
    },
    formatterTime (row, column) {
      const time = row.createTime
      return formatDate(time)
    }
  }
}
</script>

<style scoped>

</style>
