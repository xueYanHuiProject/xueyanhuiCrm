<template>
    <section class="admin-main">
        <h1 class="admin-title" v-text="editName"></h1>
        <section class="admin-main-inner">
            <article id="editor"></article>
            <el-form   class="demo-form-inline" label-width="80px" label-position="left">
                <div class="admin-handleBar demo-form-inline">
                    <el-form-item class="form-button">
                        <el-button type="primary" :inline="true" @click.native="submitInfo">提交</el-button>
                    </el-form-item>
                    <el-form-item class="form-button" @click.native="closePanel">
                        <el-button type="default">返回</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </section>
    </section>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'editProduce',
  props: {
    editName: {
      default () {
        return ''
      },
      type: String
    },
    editHtmlContent: {
      default () {
        return ''
      },
      type: String
    }
  },
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
    },
    editHtmlContent () {
      const _this = this
      const element = $('.html-mask')
      console.log(_this.editHtmlContent)
      _this.editor.txt.html(_this.editHtmlContent)
      element.text(_this.editHtmlContent)
    }
  },
  mounted () {
    const _this = this
    _this.initEdit()
    const element = $('.html-mask')
    console.log(_this.editHtmlContent)
    _this.editor.txt.html(_this.editHtmlContent)
    element.text(_this.editHtmlContent)
  },
  methods: {
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
    closePanel () {
      const _this = this
      _this.$emit('closePanel')
    },
    submitInfo () {
      const _this = this
      _this.$emit('submitInfo', _this.editor.txt.html())
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
