<template>
    <div class="block adminAuditControl">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="default" @click.native="addColumn">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="editColumn">编辑</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="showSortDialog">排序</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="showPassDialog">激活</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="rejectDialog">无效</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { isEmptyObject } from '../../../../utils/common'
import { createNamespacedHelpers } from 'vuex'
import axios from 'axios'
const { mapGetters, mapActions } = createNamespacedHelpers('module001')
export default {
  methods: {
    ...mapActions(['showLayer', 'changeEditType', 'showSort', 'triggerTable', 'tableCurrentChange']),
    addColumn () {
      const _this = this
      _this.changeEditType(0)
      _this.showLayer()
      console.log('选择')
      _this.tableCurrentChange({})
    },
    editColumn () {
      const _this = this
      if (!isEmptyObject(_this.selectTableData)) {
        _this.changeEditType(1)
        _this.showLayer()
      } else {
        _this.$message.error('请选择一条数据')
      }
    },
    showSortDialog () {
      const _this = this
      if (isEmptyObject(_this.selectTableData)) {
        _this.$message.error('请选择一条数据')
      } else {
        _this.showSort()
      }
    },
    showPassDialog () {
      const _this = this
      if (isEmptyObject(_this.selectTableData)) {
        _this.$message.error('请选择一条数据')
      } else {
        _this.$confirm('您确定要激活该栏目', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          _this.valid(1, () => {
            _this.$message({
              type: 'success',
              message: '已激活!'
            })
          })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    },
    valid (isValid, callback) {
      const _this = this
      console.log('操作')
      axios({
        method: 'post',
        url: '/api/columns/update',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        data: {
          id: _this.selectTableData.id,
          isValid: isValid
        }
      }).then(function (response) {
        console.log('进入成功')
        const reqData = response.data
        if (parseInt(reqData.code, 10) === 200) {
          _this.triggerTable()
          callback && callback()
        }
        console.log(response.data)
      }).catch((res) => {
        console.log(res)
        _this.$message({
          type: 'info',
          message: '操作失败'
        })
      })
    },
    rejectDialog () {
      const _this = this
      if (isEmptyObject(_this.selectTableData)) {
        _this.$message.error('请选择一条数据')
      } else {
        _this.$confirm('您确定要无效会员管理栏目', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.valid(0, () => {
            _this.$message({
              type: 'success',
              message: '已无效!'
            })
          })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    }
  },
  computed: {
    ...mapGetters(['selectTableData'])
  }
}
</script>
