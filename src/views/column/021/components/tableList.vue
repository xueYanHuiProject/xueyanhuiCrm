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
            </el-table-column>
            <el-table-column
                prop="price"
                label="样品单价">
            </el-table-column>
            <el-table-column
                label="仪器封面">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <img :src="scope.row.imgUrl" alt="" style="max-width: 500px;max-height:500px;border:1px solid #e9e9e9;box-shadow:0px 10px 18px 0px rgba(197,206,214,0.8);">
                        <div slot="reference" class="name-wrapper">
                            <img :src="scope.row.imgUrl" alt="" style="width: 50px;height:50px;"/>
                        </div>
                    </el-popover>
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
