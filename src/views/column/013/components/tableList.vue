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
                label="需求ID">
            </el-table-column>
            <el-table-column
                prop="usrId"
                label="会员ID">
            </el-table-column>
            <el-table-column
                prop="names"
                label="联系人">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="联系电话">
            </el-table-column>
            <el-table-column
                prop="email"
                label="电子信箱">
            </el-table-column>
            <el-table-column
                prop="remark"
                label="需求备注">
            </el-table-column>
            <el-table-column
                prop="business"
                :formatter="formatBusiness"
                label="业务方向">
            </el-table-column>
            <el-table-column
                label="需求文件">
                <template slot-scope="scope">
                    <a :href="scope.row.fileUrl" v-if="scope.row.fileUrl"><el-button>下载查看</el-button></a>
                    <span v-else>无模板</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="isReturn"
                :formatter="formatIsReturn"
                label="回复状态">
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
    formatIsReturn (row, column) {
      const status = row.isReturn
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
      const time = row.updateTime || row.createTime
      return formatDate(time)
    }
  }
}
</script>

<style scoped>

</style>
