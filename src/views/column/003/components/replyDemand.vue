<template>
<section class="admin-main">
    <h1 class="admin-title">添加产品</h1>
    <section class="admin-main-inner">
        <el-form   :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
            <el-form-item label="会员名称">
                <el-input v-model="formInline.names" placeholder="请输入产品名称" class="adminInputEl" disabled></el-input>
            </el-form-item>
            <el-form-item label="加盟方向">
                <el-input v-model="formInline.business" placeholder="请输入产品名称" class="adminInputEl" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="formInline.remark" placeholder="请输入产品描述" class="adminInputEl" disabled></el-input>
            </el-form-item>
            <el-form-item label="回复内容">
                <el-input v-model="formInline.returnContext" placeholder="请输入产品描述" class="adminInputEl"></el-input>
            </el-form-item>
            <div class="admin-handleBar demo-form-inline">
                <el-form-item class="form-button">
                    <el-button type="primary" :inline="true" @click.native="addColumn">提交</el-button>
                </el-form-item>
                <el-form-item class="form-button">
                    <el-button type="default" @click.native="returnBack">返回</el-button>
                </el-form-item>
            </div>

        </el-form>
    </section>
    <el-dialog
        title="图片预览"
        width="60%"
        center
        :visible.sync="dialogVisible"
        :before-close="handleClose">
        <img :src="dialogImageUrl" alt="图片预览" style="width: 100%;height: 100%;border:1px solid #e9e9e9;box-shadow:0px 10px 18px 0px rgba(197,206,214,0.8);">
    </el-dialog>
</section>
</template>
<script>
import axios from 'axios'
const xhrUrl = {
  getTableList: '/api/usrJoin/query',
  updateProduct: '/api/usrJoin/reply'
}
export default {
  name: 'addProduct',
  data () {
    const _this = this
    const adminId = localStorage.getItem('adminId')
    const id = _this.$route.query.id
    return {
      dialogVisible: false,
      updateUser: adminId,
      dialogImageUrl: '',
      id: id,
      formInline: {
        names: '',
        remark: '',
        business: '',
        returnContext: ''
      },
      originalForm: {
        names: '',
        remark: '',
        business: '',
        returnContext: ''
      }
    }
  },
  mounted () {
    const _this = this
    _this.getData()
  },
  methods: {
    getColumnList () {
      const _this = this
      axios.get(xhrUrl.getColumnList, {
        params: {
          updateUser: _this.updateUser
        }
      })
        .then(function (response) {
          console.log(response)
          if (response.data.code === 200) {
            _this.selectOnOff = false
            console.log('设置完账号' + _this.selectOnOff)
            _this.columnList = response.data.result
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    resetList () {
      const t = this
      t.formInline = JSON.parse(JSON.stringify(t.originalForm))
    },
    handleAvatarSuccess (res, file) {
      const _this = this
      console.log('触发======')
      console.log(res)
      _this.formInline.imgUrl = res.result.url
    },
    returnBack () {
      const _this = this
      _this.$router.push({ path: '/003' })
    },
    handlePictureCardPreview () {
      const _this = this
      _this.dialogImageUrl = _this.formInline.imgUrl
      _this.dialogVisible = true
    },
    handlePictureCardDelete () {
      const _this = this
      _this.formInline.imgUrl = ''
    },
    handleClose () {
      const _this = this
      _this.dialogImageUrl = ''
      _this.dialogVisible = false
    },
    beforeAvatarUpload (file) {
      console.log(file)
    },
    getData () {
      const _this = this
      axios.get(xhrUrl.getTableList, {
        params: {
          id: _this.id,
          updateUser: _this.updateUser
        }
      })
        .then(function (response) {
          console.log(response)
          if (response.data.code === 200) {
            _this.selectOnOff = false
            const formInline = response.data.result[0]
            for (const key in _this.formInline) {
              _this.formInline[key] = formInline[key]
            }
            console.log(_this.tableList)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    addColumn () {
      const _this = this
      const path = xhrUrl.updateProduct
      const param = {
        ..._this.formInline,
        id: _this.id,
        updateUser: _this.updateUser,
        sysUserId: _this.updateUser
      }
      axios({
        method: 'post',
        url: path,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        data: param
      }).then(function (response) {
        console.log('进入成功')
        const reqData = response.data
        if (parseInt(reqData.code, 10) === 200) {
          console.log('添加成功')
          _this.resetList()
          _this.$message({
            type: 'success',
            message: '操作成功'
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
    }
  }
}
</script>
<style lang="scss" scoped>
    .adminInputEl{
        width: 300px;
    }
</style>
