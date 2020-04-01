<template>
    <section class="admin-main">
        <h1 class="admin-title">编辑企业简介</h1>
        <section class="admin-main-inner">
            <article id="editor"></article>
            <el-form   class="demo-form-inline" label-width="80px" label-position="left">
                <div class="admin-handleBar demo-form-inline">
                    <el-form-item class="form-button">
                        <el-button type="primary" :inline="true" @click.native="submitInfo">提交</el-button>
                    </el-form-item>
                    <el-form-item class="form-button">
                        <el-button type="default" @click.native="returnBack">返回</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </section>
    </section>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'
const xhrUrl = {
  update: '/api/sysEnterprise/update',
  getHtml: '/api/sysEnterprise/select'
}
export default {
  name: 'editProduce',
  data () {
    const _this = this
    const adminId = localStorage.getItem('adminId')
    const id = _this.$route.query.id
    return {
      editor: null,
      id: id,
      editOnOff: false,
      updateUser: adminId
    }
  },
  watch: {
    editOnOff (n) {
      const element = $('.html-mask')
      const editElement = $('.w-e-text')
      if (n) {
        element.show()
        editElement.hide()
      } else {
        element.hide()
        editElement.show()
      }
    }
  },

  mounted () {
    const _this = this
    _this.initEdit()
  },
  methods: {
    returnBack () {
      const _this = this
      _this.$router.push({ path: '/033' })
    },
    initEdit () {
      const _this = this
      const E = require('wangeditor')
      _this.editor = new E('#editor')
      _this.editor.customConfig.onchange = (html) => {
        // html 即变化之后的内容
        console.log(html)
        const element = $('.html-mask')
        element.text(html)
      }
      _this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
      _this.editor.create()
      $('.w-e-menu').eq(1).before('<div class="w-e-menu" style="z-index:10001;"><i class="w-e-icon-html"></i></div>')
      $('.w-e-text-container').append("<div class='html-mask' contenteditable=\"true\" style='z-index: 10001;display: none;'></div>")
      $('.w-e-icon-html').click(function () {
        const isThis = $(this)
        console.log(isThis)
        isThis.toggleClass('active')
        _this.editOnOff = !_this.editOnOff
      })
      $('.html-mask').on('input', function () {
        const isThis = $(this)
        console.log('触发触发触发')
        _this.editor.txt.html(isThis.text())
        console.log('写入')
      })
    },
    getInfo () {
      const _this = this
      axios.get(xhrUrl.getHtml, {
        params: {
          types: 1,
          updateUser: _this.updateUser,
          id: _this.id
        }
      })
        .then(function (response) {
          console.log(response)
          if (response.data.code === 200) {
            _this.editor.txt.html(response.data.result.context)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    submitInfo () {
      const _this = this
      console.log(_this.editor.txt.html())
      axios({
        method: 'post',
        url: xhrUrl.update,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        data: {
          id: _this.id,
          types: 1,
          context: _this.editor.txt.html(),
          updateUser: _this.updateUser
        }
      }).then(function (response) {
        console.log('进入成功')
        const reqData = response.data
        if (parseInt(reqData.code, 10) === 200) {
          console.log('添加成功')
          _this.$message({
            type: 'success',
            message: '修改成功'
          })
          setTimeout(() => {
            _this.$router.push({
              path: '/034'
            })
          }, 1000)
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
<style lang="scss">
    .w-e-icon-html{
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url("../../../../static/images/active-html.png") no-repeat center center/cover;
        &:hover{
            background: url("../../../../static/images/HTML.png") no-repeat center center/cover;
        }
        &.active{
            background: url("../../../../static/images/HTML.png") no-repeat center center/cover;
        }
    }
    .html-mask{
        position: absolute;
        top:0;
        left: 0;
        right:0;
        height: 100%;
        z-index: 10001;
        padding: 0 10px;
        overflow-y: scroll;
    }
</style>
