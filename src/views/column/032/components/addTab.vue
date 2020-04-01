<template>
<section class="admin-main">
    <h1 class="admin-title">添加栏目</h1>
    <section class="admin-main-inner">
        <el-form   :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
            <el-form-item label="栏目名称" class="block">
                <el-input v-model="formInline.names" placeholder="请输入栏目名称" class="adminInputEl"></el-input>
            </el-form-item>
            <el-form-item label="栏目链接">
                <el-input v-model="formInline.link" placeholder="请输入栏目链接" class="adminInputEl"></el-input>
            </el-form-item>
            <el-form-item label="栏目排序">
                <el-input v-model="formInline.orderBy" placeholder="请输入栏目排序" class="adminInputEl"></el-input>
            </el-form-item>
            <el-form-item label="栏目描述">
                <el-input v-model="formInline.describes" placeholder="请输入栏目描述" class="adminInputEl"></el-input>
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
</section>
</template>
<script>
import axios from 'axios'
const xhrUrl = {
  addTab: '/api/sysColumn/insert',
  updateTab: '/api/sysColumn/update',
  getTableList: '/api/sysColumn/query'
}
export default {
  name: 'addTab',
  data () {
    const _this = this
    const adminId = localStorage.getItem('adminId')
    const editType = parseInt(_this.$route.query.type, 10)
    const id = _this.$route.query.id
    return {
      updateUser: adminId,
      id: id,
      editType: editType,
      formInline: {
        names: '',
        link: '',
        orderBy: '',
        status: '0',
        describes: ''
      },
      originalForm: {
        names: '',
        link: '',
        orderBy: '',
        status: '0',
        describes: ''
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
      _this.$router.push({ path: '/032' })
    },
    getData () {
      const _this = this
      axios.get(xhrUrl.getTableList, {
        params: {
          id: _this.id,
          updateUser: _this.updateUser,
          createUser: _this.updateUser
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
      const path = parseInt(_this.editType, 10) === 0 ? xhrUrl.addTab : xhrUrl.updateTab
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
          _this.$message({
            type: 'success',
            message: '操作成功'
          })
        } else {
          _this.$message({
            type: 'info',
            message: '操作失败'
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
