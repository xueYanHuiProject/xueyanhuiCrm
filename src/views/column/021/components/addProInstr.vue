<template>
<section class="admin-main admin-editProlnstr">
    <h1 class="admin-title">添加仪器</h1>
    <section class="admin-main-inner">
        <el-form   :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
            <el-form-item label="仪器名称">
                <el-input v-model="formInline.names" placeholder="请输入仪器名称" class="adminInputEl"></el-input>
            </el-form-item>
            <el-form-item label="仪器型号">
                <el-input v-model="formInline.models" placeholder="请输入仪器名称" class="adminInputEl"></el-input>
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
                    <div style="margin-bottom: 10px;width: 300px;color:#333;">建议尺寸：305*280或更高倍数的</div>
                </div>
            </el-form-item>
            <el-form-item label="预约须知" style="margin-top: 60px;">
                <div class="proInstr-content">
                    <section class="inner-content" v-html="formInline.knows"></section>
                    <section class="edit-mask">
                        <i class="el-icon-edit" @click="showEditPanel(3)"></i>
                    </section>
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
                    <el-button type="default" @click.native="returnBack">返回</el-button>
                </el-form-item>
            </div>

        </el-form>
    </section>
    <el-dialog
        :title="editName"
        width="1200px"
        center
        :visible.sync="editVisible"
        :before-close="editClose">
        <EditProlnstr @closePanel="editClose" @submitInfo="submitInfo" :editName="editName" :editHtmlContent="editHtmlContent"></EditProlnstr>
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
      editName: '',
      editVisible: false,
      updateUser: adminId,
      dialogImageUrl: '',
      editHtmlContent: '',
      id: id,
      editType: editType,
      editHtmlType: 0,
      formInline: {
        names: '',
        knows: '',
        models: '',
        status: '0',
        imgUrl: '',
        testItems: '',
        sampleNeed: '',
        question: ''
      },
      originalForm: {
        names: '',
        knows: '',
        models: '',
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
      _this.editHtmlContent = ''
      _this.editVisible = true
      let updateName = ''
      switch (parseInt(_this.editHtmlType, 10)) {
        case 0:
          updateName = '测试项目'
          _this.editHtmlContent = _this.formInline.testItems

          break
        case 1:
          updateName = '样品要求'
          _this.editHtmlContent = _this.formInline.sampleNeed

          break
        case 2:
          updateName = '常见问题'
          _this.editHtmlContent = _this.formInline.question

          break
        case 3:
          updateName = '预约须知'
          _this.editHtmlContent = _this.formInline.knows

          break
      }
      _this.editName = updateName
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
        case 3:
          updateName = 'knows'
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
    returnBack () {
      const _this = this
      _this.$router.push({ path: '/021' })
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
<style lang="scss">
    .instrument-sign-content{
        width:303px;
        height:120px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(77,77,77,1);
        line-height:20px;
    }
    .instrument-des{
        width:303px;
        height:40px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(179,179,179,1);
        line-height:20px;
    }
    .instrument-question{
        .question-title{
            margin-bottom: 19px;
            margin-top: 24px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            i{
                width:20px;
                height:20px;
                background:url("data:image/png;base64,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") no-repeat center center/cover;
                margin-right: 11px;
            }
            span{
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(77,77,77,1);
                line-height:20px;
            }
        }
        .question-answer{
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            i{
                width:28px;
                height:20px;
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(170,170,170,1);
                line-height:20px;
                margin-right: 3px;
                margin-top: 11px;
            }
            span{
                width:271px;
                height:81px;
                background:rgba(248,248,250,1);
                padding: 10px;
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(170,170,170,1);
                line-height:20px;
            }
        }
    }
</style>
