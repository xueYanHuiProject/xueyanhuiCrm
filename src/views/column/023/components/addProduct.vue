<template>
<section class="admin-main">
    <h1 class="admin-title">添加产品</h1>
    <section class="admin-main-inner">
        <el-form   :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
            <el-form-item label="产品名称">
                <el-input v-model="formInline.names" placeholder="请输入产品名称" class="adminInputEl"></el-input>
            </el-form-item>
            <el-form-item label="产品描述">
                <el-input v-model="formInline.describes" placeholder="请输入产品描述" class="adminInputEl"></el-input>
            </el-form-item>
            <el-form-item label="所属栏目">
                <el-select v-model="formInline.columnId" placeholder="请选择所属栏目">
                    <el-option
                        v-for="(item) in columnList"
                        :key="item.id"
                        :label="item.names"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上传图片">
                <div class="upload-wrapper">
                    <div class="upload-mask" v-if="formInline.imgUrl">
                        <i class="handleItem previewImage el-icon-search" @click="handlePictureCardPreview"></i>
                        <i class="handleItem deleteImage el-icon-delete" @click="handlePictureCardDelete"></i>
                    </div>
                    <el-upload
                        class="avatar-uploader"
                        action="/api/upload/uploadImg"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="formInline.imgUrl" :src="formInline.imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
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
  addProduct: '/api/proProduct/insert',
  getTableList: '/api/proProduct/query',
  updateProduct: '/api/proProduct/update',
  getColumnList: '/api/sysColumn/query'
}
export default {
  name: 'addProduct',
  data () {
    const _this = this
    const adminId = localStorage.getItem('adminId')
    const editType = parseInt(_this.$route.query.type, 10)
    const id = _this.$route.query.id
    return {
      dialogVisible: false,
      updateUser: adminId,
      dialogImageUrl: '',
      id: id,
      columnList: [],
      editType: editType,
      formInline: {
        names: '',
        describes: '',
        status: '0',
        columnId: '',
        imgUrl: ''
      },
      originalForm: {
        names: '',
        describes: '',
        status: '0',
        columnId: '',
        imgUrl: ''
      }
    }
  },
  mounted () {
    const _this = this
    console.log(_this.editType)
    _this.getColumnList()
    _this.editType && _this.getData()
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
      _this.$router.push({ path: '/023' })
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
      const path = parseInt(_this.editType, 10) === 0 ? xhrUrl.addProduct : xhrUrl.updateProduct
      const param = parseInt(_this.editType, 10) === 0 ? {
        ..._this.formInline,
        updateUser: _this.updateUser,
        createUser: _this.updateUser
      } : {
        ..._this.formInline,
        id: _this.id,
        updateUser: _this.updateUser
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
