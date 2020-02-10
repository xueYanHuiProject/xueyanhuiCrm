<template>
<section class="admin-main admin-editProlnstr">
    <h1 class="admin-title">添加仪器</h1>
    <section class="admin-main-inner">
        <el-form   :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
            <el-form-item label="仪器名称">
                <el-input v-model="formInline.names" placeholder="请输入仪器名称" class="adminInputEl"></el-input>
            </el-form-item>
            <el-form-item label="仪器封面">
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
            <el-form-item label="测试项目">
                <div class="proInstr-content">
                    <section class="inner-content" v-html="formInline.testItems"></section>
                    <section class="edit-mask">
                        <i class="el-icon-edit" @click="showEditPanel(0)"></i>
                    </section>
                </div>
            </el-form-item>
            <el-form-item label="样品要求">
                <div class="proInstr-content">
                    <section class="inner-content" v-html="formInline.sampleNeed"></section>
                    <section class="edit-mask">
                        <i class="el-icon-edit" @click="showEditPanel(1)"></i>
                    </section>
                </div>
            </el-form-item>
            <el-form-item label="常见问题">
                <div class="proInstr-content">
                    <section class="inner-content" v-html="formInline.question"></section>
                    <section class="edit-mask">
                        <i class="el-icon-edit" @click="showEditPanel(2)"></i>
                    </section>
                </div>
            </el-form-item>
            <div class="admin-handleBar demo-form-inline">
                <el-form-item class="form-button">
                    <el-button type="primary" :inline="true" @click.native="addColumn">提交</el-button>
                </el-form-item>
                <el-form-item class="form-button">
                    <el-button type="default" @click.native="editColumn">返回</el-button>
                </el-form-item>
            </div>

        </el-form>
    </section>
    <el-dialog
        title="图片预览"
        width="1200px"
        center
        :visible.sync="editVisible"
        :before-close="editClose">
        <EditProlnstr @closePanel="editClose" @submitInfo="submitInfo"></EditProlnstr>
    </el-dialog>
</section>
</template>
<script>
import axios from 'axios'
import EditProlnstr from './editProlnstr'
const xhrUrl = {
  addProInstr: '/api/proInstr/insert',
  getTableList: '/api/proInstr/query',
  updateProInstr: '/api/proInstr/update'
}
export default {
  name: 'addProInstr',
  data () {
    const _this = this
    const adminId = localStorage.getItem('adminId')
    const editType = parseInt(_this.$route.query.type, 10)
    const id = _this.$route.query.id
    return {
      dialogVisible: false,
      editVisible: false,
      updateUser: adminId,
      dialogImageUrl: '',
      id: id,
      editType: editType,
      editHtmlType: 0,
      formInline: {
        names: '',
        status: '0',
        imgUrl: '',
        testItems: '',
        sampleNeed: '',
        question: ''
      },
      originalForm: {
        names: '',
        status: '0',
        imgUrl: '',
        testItems: '',
        sampleNeed: '',
        question: ''
      }
    }
  },
  components: {
    EditProlnstr
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
    showEditPanel (type) {
      const _this = this
      _this.editHtmlType = type
      _this.editVisible = true
    },
    handleAvatarSuccess (res, file) {
      const _this = this
      console.log('触发======')
      console.log(res)
      _this.formInline.imgUrl = res.result.url
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
    editClose () {
      const _this = this
      _this.editVisible = false
    },
    submitInfo (info) {
      const _this = this
      let updateName = ''
      switch (parseInt(_this.editHtmlType, 10)) {
        case 0:
          updateName = 'testItems'
          break
        case 1:
          updateName = 'sampleNeed'
          break
        case 2:
          updateName = 'question'
          break
      }
      _this.formInline[updateName] = info
      console.log(_this.formInline)
      _this.editClose()
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
            _this.formInline = response.data.result[0]
            console.log(_this.tableList)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    addColumn () {
      const _this = this
      const path = parseInt(_this.editType, 10) === 0 ? xhrUrl.addProInstr : xhrUrl.updateProInstr
      const param = parseInt(_this.editType, 10) === 0 ? {
        ..._this.formInline,
        updateUser: _this.updateUser,
        createUser: _this.updateUser
      } : {
        ..._this.formInline,
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
<style lang="scss">
    .admin-editProlnstr{

    }
</style>
