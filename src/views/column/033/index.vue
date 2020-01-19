<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <article class="admin-factory-produce" v-html="context"></article>
            <div class="block adminAuditControl">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-button type="default" @click.native="editProduce">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
    </section>
</template>
<script>
import axios from 'axios'
const xhrUrl = {
  getHtml: '/api/sysEnterprise/select'
}
export default {
  name: 'factoryProduce',
  data () {
    const adminId = localStorage.getItem('adminId')
    return {
      updateUser: adminId,
      context: ''
    }
  },
  mounted () {
    const _this = this
    _this.getInfo()
  },
  methods: {
    editProduce () {
      const _this = this
      _this.$router.push({
        path: '/editProduce'
      })
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
            _this.context = response.data.result.context
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
    @import "../../../static/scss/column/column.scss";
    .admin-factory-produce{
        width: 1100px;
        background: #fff;
        height: 600px;
        margin: 30px auto;
        padding: 20px;
    }
</style>
