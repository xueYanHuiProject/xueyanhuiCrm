<template>
    <div class="block adminAuditControl">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="default" @click.native="addColumn">添加</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="editColumn">编辑</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="editSample">样品模板</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="bindCoupon">绑定优惠券</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="unBindCoupon">解绑优惠券</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="changePrice()">修改单价</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="changeStatus(1)">上架</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native="changeStatus(0)">下架</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            title="绑定优惠券"
            width="60%"
            center
            :visible.sync="dialogVisible"
            :before-close="handleClose">
            <div class="block">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
                    <el-form-item label="优惠券">
                        <el-select v-model="formInline.conId" placeholder="优惠券" class="adminInputEl">
                            <el-option :label="item.couTitle" :value="item.id" v-for="(item) in tableList" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="block">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">确定</el-button>
                            <el-button @click="dialogVisible=false">取消</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog
            title="解绑优惠券"
            width="60%"
            center
            :visible.sync="unBind"
            :before-close="handleClose">
            <div class="block">
                <el-form :inline="true" :model="proCon" class="demo-form-inline" label-width="80px" label-position="left">
                    <el-form-item label="优惠券">
                        <el-select v-model="proCon.conId" placeholder="优惠券" class="adminInputEl">
                            <el-option :label="item.conTitle"  :value="item.id" v-for="(item) in proConRelaList" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="block">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmitUnBind">确定</el-button>
                            <el-button @click="unBind=false">取消</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
import { isEmptyObject } from '../../../../utils/common'
const xhrUrl = {
  getTableList: '/api/proCoupon/query',
  unBindCoupon: '/api/proProduct/unBindCoupon',
  bindCoupon: '/api/proProduct/bindCoupon'
}
export default {
  data () {
    const adminId = localStorage.getItem('adminId')
    return {
      dialogVisible: false,
      proConRelaList: [],
      tableList: [],
      unBind: false,
      formInline: {
        conId: ''
      },
      proCon: {
        conId: ''
      },
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
  mounted () {
    const _this = this
    _this.getList({ status: 1 })
  },
  methods: {
    handleClose () {
      const _this = this
      _this.dialogVisible = false
      _this.unBind = false
      _this.temDialogVisible = false
    },
    onSubmit () {
      const _this = this
      axios({
        method: 'post',
        url: xhrUrl.bindCoupon,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        data: {
          proId: _this.selectData.id,
          updateUser: _this.updateUser,
          conId: _this.formInline.conId
        }
      }).then(function (response) {
        console.log('进入成功')
        const reqData = response.data
        if (parseInt(reqData.code, 10) === 200) {
          _this.dialogVisible = false
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
    },
    addColumn () {
      const _this = this
      _this.$router.push({
        path: '/addProInstr',
        query: {
          type: 0
        }
      })
    },
    onSubmitUnBind () {
      const _this = this
      axios({
        method: 'post',
        url: xhrUrl.unBindCoupon,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        data: {
          updateUser: _this.updateUser,
          id: _this.proCon.conId
        }
      }).then(function (response) {
        console.log('进入成功')
        const reqData = response.data
        if (parseInt(reqData.code, 10) === 200) {
          _this.unBind = false
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
    },
    getList (data) {
      const _this = this
      console.log('--------------------')
      console.log(_this.formInline)
      axios.get(xhrUrl.getTableList, {
        params: isEmptyObject(data) ? {
          updateUser: _this.updateUser
        } : {
          ...data,
          updateUser: _this.updateUser
        }
      })
        .then(function (response) {
          console.log(response)
          if (response.data.code === 200) {
            _this.selectOnOff = false
            _this.tableList = response.data.result
            console.log(_this.tableList)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    unBindCoupon () {
      const _this = this
      console.log(_this.selectOnOff + '开关状态')
      if (!_this.selectOnOff) {
        _this.$message.error('请选择一条数据')
      } else {
        if (_this.selectData.proConRelaList.length) {
          _this.unBind = true
        } else {
          _this.$message.error('该产品暂未绑定优惠券')
        }
      }
    },
    bindCoupon () {
      const _this = this
      console.log(_this.selectOnOff + '开关状态')
      if (!_this.selectOnOff) {
        _this.$message.error('请选择一条数据')
      } else {
        _this.dialogVisible = true
      }
    },
    changePrice () {
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
              url: '/api/proInstr/update',
              headers: {
                'X-Requested-With': 'XMLHttpRequest'
              },
              data: {
                id: _this.selectData.id,
                updateUser: _this.updateUser,
                price: value
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
    editSample () {
      const _this = this
      if (!_this.selectOnOff) {
        _this.$message.error('请选择一条数据')
      } else {
        _this.$router.push({
          path: '/editSample',
          query: {
            id: _this.selectData.id,
            updateUser: _this.updateUser
          }
        })
      }
    },
    editColumn () {
      const _this = this
      console.log(_this.selectOnOff + '开关状态')
      if (!_this.selectOnOff) {
        _this.$message.error('请选择一条数据')
      } else {
        _this.$router.push({
          path: '/addProInstr',
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
        console.log('逻辑')
        let des = ''
        if (parseInt(status, 10) === 0) {
          des = '确定要下架该仪器？'
        } else {
          des = '确定要上架该仪器？'
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
      axios({
        method: 'post',
        url: '/api/proInstr/update',
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
