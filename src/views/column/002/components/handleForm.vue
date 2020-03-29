<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
        <el-form-item label="反馈ID">
            <el-input v-model="formInline.id" placeholder="请输入反馈ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="会员ID">
            <el-input v-model="formInline.usrId" placeholder="请输入会员ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="会员名称">
            <el-input v-model="formInline.usrName" placeholder="请输入反馈ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="回复状态">
            <el-select v-model="formInline.feedStatus" placeholder="反馈回复状态" class="adminInputEl">
                <el-option label="未回复" value="1"></el-option>
                <el-option label="已回复" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="提交时间">
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
        <el-form-item label="更新时间">
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
        usrName: '',
        usrId: '',
        feedStatus: '',
        updateUser: adminId,
        id: ''
      },
      originalForm: {
        usrName: '',
        usrId: '',
        feedStatus: '',
        updateUser: adminId,
        id: ''
      },
      duringTime: [],
      updateDuringTime: [],
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
      const feedBeginTime = _this.duringTime.length ? createTime(_this.duringTime[0]) : ''
      const feedEndTime = _this.duringTime.length ? createTime(_this.duringTime[1]) : ''
      const replyBeginTime = _this.updateDuringTime.length ? createTime(_this.updateDuringTime[0]) : ''
      const replyEndTime = _this.updateDuringTime.length ? createTime(_this.updateDuringTime[1]) : ''
      _this.$emit('getTableList', { ..._this.formInline, feedBeginTime, feedEndTime, replyBeginTime, replyEndTime })
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
