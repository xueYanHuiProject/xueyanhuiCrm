<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
        <el-form-item label="栏目ID">
            <el-input v-model="formInline.columnId" placeholder="栏目ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="栏目层级">
            <el-select v-model="formInline.grade" placeholder="栏目层级" class="adminInputEl">
                <el-option label="一级栏目" value="0"></el-option>
                <el-option label="二级栏目" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="栏目状态">
            <el-select v-model="formInline.isValid" placeholder="栏目状态" class="adminInputEl">
                <el-option label="无效" value="0"></el-option>
                <el-option label="有效" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="栏目名称">
            <el-input v-model="formInline.columnTitle" placeholder="栏目名称" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="ICON类名">
            <el-input v-model="formInline.columnIcon" placeholder="ICON类名" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
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
                <el-button type="primary" @click.native="triggerTable">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="resetList">重置</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('module001')
export default {
  data () {
    return {
      formInline: {
        columnIndex: '',
        isValid: '',
        columnId: '',
        columnTitle: '',
        columnIcon: '',
        createDuringTime: [],
        updateDuringTime: []
      },
      originalForm: {
        columnIndex: '',
        isValid: '',
        columnId: '',
        columnTitle: '',
        columnIcon: '',
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
  watch: {
    formInline: {
      handler (n) {
        const t = this
        console.log(n)
        t.changeFormInline(n)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['changeFormInline', 'triggerTable']),
    onSubmit () {
      console.log('初始化')
    },
    resetList () {
      const t = this
      t.formInline = JSON.parse(JSON.stringify(t.originalForm))
      t.changeFormInline({})
    }
  },
  mounted () {
    const t = this
    // t.getList();
    console.log(t.formInline)
  }
}
</script>
