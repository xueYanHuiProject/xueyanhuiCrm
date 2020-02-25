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
                label="反馈ID">
            </el-table-column>
            <el-table-column
                prop="usrId"
                label="会员ID">
            </el-table-column>
            <el-table-column
                prop="usrName"
                label="会员名称">
            </el-table-column>
            <el-table-column
                prop="feedContext"
                label="反馈内容">
            </el-table-column>
            <el-table-column
                prop="replyContext"
                label="回复内容">
            </el-table-column>
            <el-table-column
                prop="feedStatus"
                :formatter="formatIsReturn"
                label="回复专状态">
            </el-table-column>
            <el-table-column
                prop="status"
                :formatter="formatStatus"
                label="回复专状态">
            </el-table-column>
            <el-table-column
                prop="createTime"
                sortable
                :formatter="formatterCreateTime"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="replyTime"
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
    formatIsReturn (row, column) {
      const status = row.feedStatus
      return parseInt(status, 10) === 1 ? '未回复' : '已回复'
    },
    formatBusiness (row, column) {
      const type = parseInt(row.business, 10)
      let business = ''
      switch (type) {
        case 0:
          business = '实验测试'
          break
        case 1:
          business = '科研绘图'
          break
        case 2:
          business = '数据分析'
          break
        case 3:
          business = '实验耗材'
          break
        case 4:
          business = '计算模拟'
          break
        case 5:
          business = '其他'
          break
      }
      return business
    },
    formatStatus (row, column) {
      const status = row.status
      return parseInt(status, 10) === 0 ? '无效' : '激活'
    },
    formatterCreateTime (row, column) {
      const time = row.createTime
      return formatDate(time)
    },
    formatterUpdateTime (row, column) {
      const time = row.replyTime || row.createTime
      return formatDate(time)
    }
  }
}
</script>

<style scoped>

</style>
