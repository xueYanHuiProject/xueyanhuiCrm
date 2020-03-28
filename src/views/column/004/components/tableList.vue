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
                label="发票ID">
            </el-table-column>
            <el-table-column
                prop="usrId"
                label="用户ID">
            </el-table-column>
            <el-table-column
                prop="acceptName"
                label="管理员名称">
            </el-table-column>
            <el-table-column
                prop="orderIds"
                label="订单ID">
            </el-table-column>
            <el-table-column
                prop="invoiceMoney"
                label="发票金额">
            </el-table-column>
            <el-table-column
                prop="bankName"
                label="开户行">
            </el-table-column>
            <el-table-column
                prop="bankNumber"
                label="账号">
            </el-table-column>
            <el-table-column
                prop="taxNumber"
                label="纳税人识别号">
            </el-table-column>
            <el-table-column
                prop="registerAdress"
                label="地址">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号">
            </el-table-column>
            <el-table-column
                prop="names"
                label="发票抬头">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱">
            </el-table-column>
            <el-table-column
                width="150"
                label="发票文件">
                <template slot-scope="scope">
                    <a :href="scope.row.invoiceFile" v-if="scope.row.invoiceFile"><el-button>下载查看</el-button></a>
                    <span v-else>未上传</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="createTime"
                sortable
                :formatter="formatterCreateTime"
                label="申请时间">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { formatDate, checkInvalid } from '../../../../utils/common'
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
    formatterOrderState (row, column) {
      const grade = parseInt(row.orderState, 10)
      let userWork = ''
      switch (grade) {
        case 1:
          userWork = '未支付'
          break
        case 2:
          userWork = '待实验'
          break
        case 3:
          userWork = '实验中'
          break
        case 4:
          userWork = '已完成'
          break
        case 5:
          userWork = '已退款'
          break
      }
      return userWork
    },
    formatPayType (row, column) {
      const status = row.status
      return parseInt(status, 10) === 1 ? '小程序' : '网站'
    },
    formatInvoice (row, column) {
      const status = row.isInvoice
      return parseInt(status, 10) === 1 ? '未开' : '已开'
    },
    formatIsOffer (row, column) {
      const status = row.isOffer
      return parseInt(status, 10) === 1 ? '是' : '否'
    },
    formatterCreateTime (row, column) {
      const time = row.createTime
      return checkInvalid(time) ? '' : formatDate(time)
    },
    formatterPayTime (row, column) {
      const time = row.payTime
      return checkInvalid(time) ? '' : formatDate(time)
    },
    formatterRefundTime (row, column) {
      const time = row.refundTime
      return checkInvalid(time) ? '' : formatDate(time)
    }
  }
}
</script>

<style scoped>

</style>
