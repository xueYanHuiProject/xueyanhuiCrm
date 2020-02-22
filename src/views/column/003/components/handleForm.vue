<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
        <el-form-item label="加盟ID">
            <el-input v-model="formInline.id" placeholder="请输入加盟ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="会员ID">
            <el-input v-model="formInline.usrId" placeholder="请输入会员ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
            <el-input v-model="formInline.names" placeholder="请输入加盟ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
            <el-input v-model="formInline.phone" placeholder="请输入联系电话" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件">
            <el-input v-model="formInline.email" placeholder="请输入电子邮件" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="加盟状态">
            <el-select v-model="formInline.status" placeholder="加盟状态" class="adminInputEl">
                <el-option label="下架" value="0"></el-option>
                <el-option label="上架" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="回复状态">
            <el-select v-model="formInline.isReturn" placeholder="加盟回复状态" class="adminInputEl">
                <el-option label="未回复" value="0"></el-option>
                <el-option label="已回复" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="业务方向">
            <el-select v-model="formInline.business" placeholder="加盟业务方向" class="adminInputEl">
                <el-option label="实验测试" value="0"></el-option>
                <el-option label="科研绘图" value="1"></el-option>
                <el-option label="数据分析" value="2"></el-option>
                <el-option label="实验耗材" value="3"></el-option>
                <el-option label="计算模拟" value="4"></el-option>
                <el-option label="其他" value="5"></el-option>
                <el-option label="
实验耗材" value="3"></el-option>
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
        names: '',
        usrId: '',
        phone: '',
        email: '',
        isReturn: '',
        business: '',
        updateUser: adminId,
        status: '',
        id: ''
      },
      originalForm: {
        names: '',
        usrId: '',
        phone: '',
        email: '',
        isReturn: '',
        business: '',
        updateUser: adminId,
        status: '',
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
      const beginTime = _this.duringTime.length ? createTime(_this.duringTime[0]) : ''
      const endTime = _this.duringTime.length ? createTime(_this.duringTime[1]) : ''
      const updateBeginTime = _this.updateDuringTime.length ? createTime(_this.updateDuringTime[0]) : ''
      const updateEndTime = _this.updateDuringTime.length ? createTime(_this.updateDuringTime[1]) : ''
      _this.$emit('getTableList', { ..._this.formInline, beginTime, endTime, updateBeginTime, updateEndTime })
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
