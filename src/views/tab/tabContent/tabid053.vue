<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :label-position="labelPosition"  :model="formLabelAlign" label-width="80px" label-position="left" class="adminChangePassword">
                <el-form-item label="旧密码">
                    <el-input v-model="formLabelAlign.oldpassword" class="adminInputEl" placeholeder="请输入原来密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="formLabelAlign.newpassword" class="adminInputEl" placeholeder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="formLabelAlign.renewpassword" class="adminInputEl" placeholeder="请确认密码"></el-input>
                </el-form-item>
            </el-form>
            <el-row>
                <el-button>重置</el-button>
                <el-button type="primary">确认</el-button>
            </el-row>
        </section>

    </section>

</template>
<style lang="scss" scoped>
    .adminInputElDialog{
        width:300px;
    }
    @import "../../../static/scss/common";
    .adminContentInner{
        @include ContentInner();
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .adminInputEl{
            width:400px;
        }
        .adminChangePassword{
            margin-top: 30px;
        }
        .adminUserControl{
            padding: 0 0 10px 0;
        }
        .adminPage{
            padding: 20px 0;
        }
        .adminAuditControl{
            padding: 20px 0;
        }
    }
</style>
<script>
import userData from '../../../virtualData/UserStatistics'
export default {
  data () {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        oldpassword: '',
        newpassword: '',
        renewpassword: ''
      }
    }
  },
  methods: {

  }
}
</script>
