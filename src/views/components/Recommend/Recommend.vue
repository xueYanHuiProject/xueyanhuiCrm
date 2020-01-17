<template>
    <el-dialog
        :visible.sync="recommendDialog"
        width="900px"
        :before-close="handleClose"
        center>
        <div class="block">
            <div class="jurisdiction-info">
                推荐
            </div>
            <div class="block">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
                <el-form-item label="推送类型">
                    <el-select v-model="formInline.columnTitle" placeholder="栏目层级" class="adminInputEl">
                        <el-option label="一级栏目" value="0"></el-option>
                        <el-option label="二级栏目" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推送位置">
                    <el-select v-model="formInline.columnTitle" placeholder="栏目层级" class="adminInputEl">
                        <el-option label="一级栏目" value="0"></el-option>
                        <el-option label="二级栏目" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级">
                    <el-select v-model="formInline.columnTitle" placeholder="栏目状态" class="adminInputEl">
                        <el-option label="无效" value="0"></el-option>
                        <el-option label="有效" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="目标ID">
                    <el-input v-model="formInline.columnTitle" placeholder="栏目ID" class="adminInputEl"></el-input>
                </el-form-item>
                </el-form>
            </div>
            <div class="admin-recommend admin-audit-panel block">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button @click="handleClose">确定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import Common from '../../../utils/common'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    const adminId = Common.checkInvalid(localStorage.getItem('adminId')) ? '' : localStorage.getItem('adminId')
    return {
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: ['上网', '90后', '男生', '女生', '聊天', '老师', '程序员', '计算机'],
      isIndeterminate: true,
      formInline: {
        columnTitle: '',
        columnIndex: '',
        columnIcon: '',
        columnRouterName: '',
        parentColumnId: '',
        adminId: adminId
      }
    }
  },
  computed: {
    ...mapGetters(['recommendDialog'])
  },
  watch: {
    addForm: {
      handler (n) {
        console.log(n)
      },
      deep: true
    },
    addMessage (n) {
      const t = this
      if (n) {
        t.$message({
          showClose: true,
          message: '创建栏目成功',
          type: 'success'
        })
        t.hideMsg()
      }
    },
    dialogVisible (n) {
      console.log(n)
    }
  },
  methods: {
    ...mapActions(['showLayer', 'hideRecommend', 'createColumn', 'hideMsg']),
    handleClose () {
      const t = this
      t.hideRecommend()
      t.addForm = {
        columnTitle: '',
        columnIndex: '',
        columnIcon: '',
        columnRouterName: '',
        parentColumnId: '',
        adminId: t.adminId
      }
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    addColumn () {
      const t = this
      console.log(t.addForm)
      const normalOnOff = t.addForm.adminId.length > 0 && t.addForm.columnTitle.length > 0 && t.addForm.columnIndex.length > 0 && t.addForm.columnIcon.length > 0 && t.addForm.columnRouterName.length > 0
      const addOnOff = parseInt(t.columnIndex, 10) === 0 ? normalOnOff : normalOnOff && t.addForm.parentColumnId.length > 0
      if (addOnOff) {
        t.createColumn(JSON.parse(JSON.stringify(t.addForm)))
      } else {
        t.$message({
          message: '创建字段不足',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    .el-icon-item{
        width: 150px;
        height: 80px;
        display: inline-block;
        text-align: center;
        .el-item-center{
            display: block;
            margin: 0 auto;
            height: 30px;
            width: 30px;
            padding: 10px 0;
            font-size: 30px;
            line-height: 30px;
        }
        .el-item-des{
            font-size: 16px;
            width: 100%;
            margin: 0 auto;
            display: block;
            height: 40px;
            word-wrap: break-word;
            word-break: normal;
        }
    }
    .el-icon-list{
        height: 320px;
        overflow-y: auto;
        .el-icon-inner{
            border-left: 1px solid #dcdfe6;
        }
    }
    .admin-recommend{
        padding: 20px;
        width: 800px;
        height: 400px;
    }
</style>
