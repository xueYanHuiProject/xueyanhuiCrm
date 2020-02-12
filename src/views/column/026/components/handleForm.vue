<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
        <el-form-item label="优惠券ID">
            <el-input v-model="formInline.id" placeholder="请输入优惠券ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="优惠券名称">
            <el-input v-model="formInline.couTitle" placeholder="请输入优惠券名称" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="优惠券价格">
            <el-input v-model="formInline.couPrice" placeholder="请输入优惠券价格" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="优惠券积分">
            <el-input v-model="formInline.couIntegral" placeholder="请输入优惠券积分" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="优惠券描述">
            <el-input v-model="formInline.couContext" placeholder="请输入优惠券描述" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="优惠券状态">
            <el-select v-model="formInline.status" placeholder="优惠券状态" class="adminInputEl">
                <el-option label="下架" value="0"></el-option>
                <el-option label="上架" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="提交时间">
            <el-date-picker
                v-model="formInline.createDuringTime"
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
                v-model="formInline.updateDuringTime"
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
export default {
  data () {
    const adminId = localStorage.getItem('adminId')
    return {
      formInline: {
        couTitle: '',
        couContext: '',
        updateUser: adminId,
        couPrice: '',
        couIntegral: '',
        status: '0',
        createDuringTime: [],
        updateDuringTime: []
      },
      originalForm: {
        couTitle: '',
        couContext: '',
        updateUser: adminId,
        couPrice: '',
        couIntegral: '',
        status: '0',
        createDuringTime: [],
        updateDuringTime: []
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
      _this.$emit('getTableList', _this.formInline)
    },
    resetList () {
      const t = this
      t.formInline = JSON.parse(JSON.stringify(t.originalForm))
    }
  }
}
</script>
