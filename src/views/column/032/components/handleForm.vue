<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
        <el-form-item label="栏目ID">
            <el-input v-model="formInline.id" placeholder="请输入栏目ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="栏目名称">
            <el-input v-model="formInline.names" placeholder="请输入栏目名称" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="栏目状态">
            <el-select v-model="formInline.status" placeholder="栏目状态" class="adminInputEl">
                <el-option label="下架" value="0"></el-option>
                <el-option label="上架" value="1"></el-option>
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
      formInline: {
        updateUser: adminId,
        status: '',
        id: '',
        names: ''
      },
      duringTime: [],
      updateDuringTime: [],
      originalForm: {
        updateUser: adminId,
        status: '',
        id: '',
        names: ''
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
