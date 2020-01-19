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
                        <el-button type="default">返回</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </section>
    </section>
</template>
<script>
import axios from 'axios'
const xhrUrl = {
  update: '/api/sysEnterprise/update',
  getHtml: '/api/sysEnterprise/select'
}
export default {
  name: 'editProduce',
  data () {
    const adminId = localStorage.getItem('adminId')

    return {
      editor: null,
      updateUser: adminId
    }
  },
  mounted () {
    const _this = this
    _this.initEdit()
  },
  methods: {
    initEdit () {
      const _this = this
      const E = require('wangeditor')
      _this.editor = new E('#editor')
      _this.editor.customConfig.onchange = (html) => {
        // html 即变化之后的内容
        console.log(html)
      }
      _this.editor.create()
      _this.getInfo()
    },
    getInfo () {
      const _this = this
      axios.get(xhrUrl.getHtml, {
        params: {
          updateUser: _this.updateUser
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
          _this.$router.push({
            path: '/033'
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

</style>
