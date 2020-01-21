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
                label="仪器ID">
            </el-table-column>
            <el-table-column
                prop="names"
                label="仪器名称">
            </el-table-column>、
            <el-table-column
                prop="remark"
                label="仪器备注">
            </el-table-column>
            <el-table-column
                label="仪器文件">
                <template>
                    <el-button>下载查看</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                :formatter="formatStatus"
                label="状态">
            </el-table-column>
            <el-table-column
                prop="createTime"
                sortable
                :formatter="formatterCreateTime"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                sortable
                :formatter="formatterUpdateTime"
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
    formatterCreateTime (row, column) {
      const time = row.createTime
      return formatDate(time)
    },
    formatterUpdateTime (row, column) {
      const time = row.updateTime || row.createTime
      return formatDate(time)
    }
  }
}
</script>

<style scoped>

</style>
