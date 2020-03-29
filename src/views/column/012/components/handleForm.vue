<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
        <el-form-item label="订单ID">
            <el-input v-model="formInline.id" placeholder="请输入订单ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="会员ID">
            <el-input v-model="formInline.usrId
" placeholder="请输入会员ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="产品ID">
            <el-input v-model="formInline.prodId" placeholder="请输入产品ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="优惠券ID">
            <el-input v-model="formInline.couponId" placeholder="请输入优惠券ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="管理员ID">
            <el-input v-model="formInline.acceptId" placeholder="请输入优惠券ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
            <el-select v-model="formInline.orderState" placeholder="订单状态" class="adminInputEl">
                <el-option label="未支付" value="1"></el-option>
                <el-option label="待实验" value="2"></el-option>
                <el-option label="实验中" value="3"></el-option>
                <el-option label="已完成" value="4"></el-option>
                <el-option label="已退款" value="5"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="报价状态">
            <el-select v-model="formInline.isOffer" placeholder="报价状态" class="adminInputEl">
                <el-option label="已报价" value="1"></el-option>
                <el-option label="未报价" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="下单时间">
            <el-date-picker
                v-model="duringTime"
                type="datetimerange"
                :picker-options="createPickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
            </el-date-picker>
         </el-form-item>
        <el-form-item label="支付时间">
            <el-date-picker
                v-model="updateDuringTime"
                type="datetimerange"
                :picker-options="updatePickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
            </el-date-picker>
        </el-form-item>
        <div class="block">
            <el-form-item>
                <el-button type="primary" @click.native="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="resetList">重置</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>
<script>
import { createTime } from '../../../../utils/common'
export default {
  data () {
    const adminId = localStorage.getItem('adminId')
    return {
      updateUser: adminId,
      formInline: {
        usrId: '',
        orderState: '',
        isOffer: '',
        prodId: '',
        couponId: '',
        acceptId: '',
        columnId: '624182a8-1384-449b-bad1-41b0c43b71cc',
        updateUser: adminId,
        id: ''
      },
      duringTime: [],
      updateDuringTime: [],
      originalForm: {
        usrId: '',
        orderState: '',
        isOffer: '',
        prodId: '',
        couponId: '',
        acceptId: '',
        columnId: '624182a8-1384-449b-bad1-41b0c43b71cc',
        updateUser: adminId,
        id: ''
      },
      createPickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      updatePickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    onSubmit () {
      const _this = this
      console.log(_this.duringTime)
      const beginTime = _this.duringTime.length ? createTime(_this.duringTime[0]) : ''
      const endTime = _this.duringTime.length ? createTime(_this.duringTime[1]) : ''
      _this.$emit('getTableList', { ..._this.formInline, beginTime, endTime })
    },
    resetList () {
      const t = this
      t.formInline = JSON.parse(JSON.stringify(t.originalForm))
      t.duringTime = []
      t.updateDuringTime = []
    }
  }
}
</script>
