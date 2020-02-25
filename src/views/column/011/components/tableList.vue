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
                fixed
                label="订单ID">
            </el-table-column>
            <el-table-column
                prop="usrId"
                fixed
                label="用户ID">
            </el-table-column>
            <el-table-column
                prop="userName"
                fixed
                label="会员名称">
            </el-table-column>
            <el-table-column
                prop="payType"
                fixed
                :formatter="formatPayType"
                label="订单来源">
            </el-table-column>
            <el-table-column
                prop="columnName"
                fixed
                label="所属栏目">
            </el-table-column>
            <el-table-column
                prop="columnId"
                fixed
                label="所属栏目ID">
            </el-table-column>
            <el-table-column
                prop="acceptId"
                label="管理员ID">
            </el-table-column>
            <el-table-column
                prop="acceptName"
                label="管理员名称">
            </el-table-column>
            <el-table-column
                prop="prodName"
                label="产品名称">
            </el-table-column>
            <el-table-column
                prop="prodId"
                label="产品ID">
            </el-table-column>
            <el-table-column
                prop="orderFromId"
                label="微信订单ID">
            </el-table-column>
            <el-table-column
                prop="isInvoice"
                fixed
                :formatter="formatInvoice"
                label="发票状态">
            </el-table-column>
            <el-table-column
                prop="isOffer"
                fixed
                :formatter="formatIsOffer"
                label="用户已获取报价">
            </el-table-column>
            <el-table-column
                label="订单文件">
                <template slot-scope="scope">
                    <a :href="scope.row.fileUrl" v-if="scope.row.fileUrl"><el-button>下载查看</el-button></a>
                    <span v-else>未上传</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="couponId"
                label="优惠券ID">
            </el-table-column>
            <el-table-column
                prop="payMoney"
                label="订单报价">
            </el-table-column>
            <el-table-column
                prop="actualMoney"
                label="实际支付">
            </el-table-column>
            <el-table-column
                prop="orderState"
                :formatter="formatterOrderState"
                label="状态">
            </el-table-column>
            <el-table-column
                prop="createTime"
                sortable
                fixed
                :formatter="formatterCreateTime"
                label="下单时间">
            </el-table-column>
            <el-table-column
                prop="payTime"
                sortable
                :formatter="formatterPayTime"
                label="支付时间">
            </el-table-column>
            <el-table-column
                prop="refundTime"
                sortable
                fixed
                :formatter="formatterRefundTime"
                label="退款时间">
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
      const time = row.placeTime
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
