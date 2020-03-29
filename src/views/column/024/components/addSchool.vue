<template>
<section class="admin-main">
    <h1 class="admin-title">添加高校</h1>
    <section class="admin-main-inner">
        <el-form   :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
            <el-form-item label="高校名称">
                <el-input v-model="formInline.names" placeholder="请输入高校名称" class="adminInputEl"></el-input>
            </el-form-item>
            <el-form-item label="合作方向">
                <el-radio-group v-model="formInline.cooDirection">
                    <el-radio label="1">实验测试</el-radio>
                    <el-radio label="2">科研绘图</el-radio>
                    <el-radio label="3">数据分析</el-radio>
                    <el-radio label="4">实验耗材</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="高校排序">
                <el-input v-model="formInline.orderBy" placeholder="请输入高校排序" class="adminInputEl"></el-input>
            </el-form-item>
            <el-form-item label="高校联系人">
                <el-input v-model="formInline.contactName" placeholder="请输入联系人姓名" class="adminInputEl"></el-input>
            </el-form-item>
            <el-form-item label="高校联系电话">
                <el-input v-model="formInline.contactPhone" placeholder="请输入联系人电话" class="adminInputEl"></el-input>
            </el-form-item>
            <el-form-item label="上传图片">
                <div class="upload-wrapper">
                    <div class="upload-mask" v-if="formInline.schoolPicture">
                        <i class="handleItem previewImage el-icon-search" @click="handlePictureCardPreview"></i>
                        <i class="handleItem deleteImage el-icon-delete" @click="handlePictureCardDelete"></i>
                    </div>
                    <el-upload
                        class="avatar-uploader"
                        action="/api/upload/uploadImg"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="formInline.schoolPicture" :src="formInline.schoolPicture" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div style="margin-bottom: 10px;width: 300px;color:#333;">建议尺寸：229*108或更高倍数的</div>
            </el-form-item>
            <div class="admin-handleBar demo-form-inline" style="margin-top: 40px;">
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
  addSchool: '/api/sysSchool/insert',
  getTableList: '/api/sysSchool/query',
  updateSchool: '/api/sysSchool/update'
}
export default {
  name: 'addSchool',
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
      editType: editType,
      formInline: {
        names: '',
        contactName: '',
        contactPhone: '',
        status: '0',
        cooDirection: '',
        orderBy: '',
        schoolPicture: ''
      },
      originalForm: {
        names: '',
        contactName: '',
        contactPhone: '',
        status: '0',
        cooDirection: '',
        orderBy: '',
        schoolPicture: ''
      }
    }
  },
  mounted () {
    const _this = this
    console.log(_this.editType)
    _this.editType && _this.getData()
  },
  methods: {
    resetList () {
      const t = this
      t.formInline = JSON.parse(JSON.stringify(t.originalForm))
    },
    returnBack () {
      const _this = this
      _this.$router.push({ path: '/024' })
    },
    handleAvatarSuccess (res, file) {
      const _this = this
      console.log('触发======')
      console.log(res)
      _this.formInline.schoolPicture = res.result.url
    },
    handlePictureCardPreview () {
      const _this = this
      _this.dialogImageUrl = _this.formInline.schoolPicture
      _this.dialogVisible = true
    },
    handlePictureCardDelete () {
      const _this = this
      _this.formInline.schoolPicture = ''
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
      const path = parseInt(_this.editType, 10) === 0 ? xhrUrl.addSchool : xhrUrl.updateSchool
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
