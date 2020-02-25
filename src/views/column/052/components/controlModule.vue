<template>
    <div class="block adminAuditControl">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="default" @click.native="resetPassword" v-if="grade===0">重置密码</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="changeStatus(1)">激活</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="changeStatus(0)">无效</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
import md5 from 'blueimp-md5'
export default {
  data () {
    const adminId = localStorage.getItem('adminId')
    const grade = parseInt(localStorage.getItem('grade'), 10)
    return {
      updateUser: adminId,
      grade: grade
    }
  },
  props: {
    selectOnOff: {
      default () {
        return false
      },
      type: Boolean
    },
    selectData: {
      default () {
        return {}
      },
      type: Object
    }
  },
  methods: {
    resetPassword () {
      const _this = this
      if (!_this.selectOnOff) {
        _this.$message.error('请选择一条数据')
      } else {
        if ((_this.selectData.id === _this.updateUser) && (_this.grade === 0)) {
          // 如果是超级管理员且是自己是不能操作数据得
          _this.$message.error('您可以修改自己的密码')
          return false
        }
        _this.$confirm('您确定要重置改用户密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            method: 'post',
            url: '/api/sysUser/update',
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            data: {
              id: _this.selectData.id,
              updateUser: _this.updateUser,
              password: md5('xueyanhui123456')
            }
          }).then(function (response) {
            console.log('进入成功')
            const reqData = response.data
            if (parseInt(reqData.code, 10) === 200) {
              _this.$message({
                type: 'success',
                message: '修改成功'
              })
            }
            console.log(response.data)
          }).catch((res) => {
            console.log(res)
            _this.$message({
              type: 'info',
              message: '操作失败'
            })
          })
        })
      }
    },
    changeStatus (status) {
      const _this = this
      console.log(_this.selectOnOff)
      if (!_this.selectOnOff) {
        _this.$message.error('请选择一条数据')
      } else {
        console.log('逻辑')
        let des = ''
        if (parseInt(status, 10) === 0) {
          des = '确定要拉黑该管理员？'
        } else {
          des = '确定要激活该管理员？'
        }
        _this.$alert(des, '！提示信息', {
          confirmButtonText: '确定',
          callback: action => {
            _this.valid(status + '', () => {
              _this.$emit('getTableList')
            })
          }
        })
      }
    },
    valid (status, callback) {
      const _this = this
      console.log('操作')
      const grade = parseInt(localStorage.getItem('grade'), 10)
      if ((_this.selectData.id === _this.updateUser) && (grade === 0)) {
        // 如果是超级管理员且是自己是不能操作数据得
        _this.$message.error('超级管理员自己不能操作自己')
        return false
      }
      axios({
        method: 'post',
        url: '/api/sysUser/update',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        data: {
          id: _this.selectData.id,
          updateUser: _this.updateUser,
          deleteFlag: status
        }
      }).then(function (response) {
        console.log('进入成功')
        const reqData = response.data
        if (parseInt(reqData.code, 10) === 200) {
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
    }
  }
}
</script>
