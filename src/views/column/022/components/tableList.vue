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
                label="模板ID">
            </el-table-column>
            <el-table-column
                prop="names"
                label="模板名称">
            </el-table-column>、
            <el-table-column
                prop="remark"
                label="模板备注">
            </el-table-column>
            <el-table-column
                label="模板文件">
                <template slot-scope="scope">
                    <a :href="scope.row.temUrl" v-if="scope.row.temUrl"><el-button>下载查看</el-button></a>
                    <el-button type="info" plain v-else @click="upLoadZip(scope.row.id)">上传模板</el-button>
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
    upLoadZip (id) {
      const _this = this
      _this.$router.push({
        path: '/addProTemplate',
        query: {
          type: 1,
          id: id,
          updateUser: _this.updateUser
        }
      })
    },
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
