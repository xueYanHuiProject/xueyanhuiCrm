<template>
    <div class="block adminAuditControl">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="default" @click.native="changeStatus(1)">修改订单价格</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="changeStatus(0)">下架</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    const adminId = localStorage.getItem('adminId')
    return {
      updateUser: adminId
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
    addColumn () {
      const _this = this
      _this.$router.push({
        path: '/addProTemplate',
        query: {
          type: 0
        }
      })
    },
    editColumn () {
      const _this = this
      console.log(_this.selectOnOff + '开关状态')
      if (!_this.selectOnOff) {
        _this.$message.error('请选择一条数据')
      } else {
        _this.$router.push({
          path: '/addProTemplate',
          query: {
            type: 1,
            id: _this.selectData.id,
            updateUser: _this.updateUser
          }
        })
      }
    },
    changeStatus (status) {
      const _this = this
      console.log(_this.selectOnOff)
      if (!_this.selectOnOff) {
        _this.$message.error('请选择一条数据')
      } else {
        _this.$prompt('请输入价格', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /(^[1-9]\d*$)/,
          inputErrorMessage: '价格格式不正确'
        }).then(({ value }) => {
          _this.$confirm('您确定提交该报价,用户支付后报价将不可修改?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios({
              method: 'post',
              url: '/api/ordOrder/update',
              headers: {
                'X-Requested-With': 'XMLHttpRequest'
              },
              data: {
                id: _this.selectData.id,
                isOffer: 1,
                updateUser: _this.updateUser,
                acceptId: _this.updateUser,
                payMoney: value
              }
            }).then(function (response) {
              console.log('进入成功')
              const reqData = response.data
              if (parseInt(reqData.code, 10) === 200) {
                _this.$message({
                  type: 'success',
                  message: '报价成功!'
                })
                _this.$emit('getTableList')
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
        })
      }
    },
    valid (status, callback) {
      const _this = this
      console.log('操作')
      axios({
        method: 'post',
        url: '/api/proTemplate/update',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        data: {
          id: _this.selectData.id,
          updateUser: _this.updateUser,
          status: status
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
