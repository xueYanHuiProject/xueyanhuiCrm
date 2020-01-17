<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
                <el-form-item label="会员ID">
                    <el-input v-model="formInline.user" placeholder="会员ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formInline.user" placeholder="请输入姓名" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="申请时间">
                    <el-date-picker
                        class="adminInputEl"
                        v-model="value2"
                        align="right"
                        type="date"
                        placeholder="审核时间"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="审核状态">
                    <el-select v-model="formInline.region" placeholder="审核状态" class="adminInputEl">
                        <el-option label="新建" value="0"></el-option>
                        <el-option label="通过" value="2"></el-option>
                        <el-option label="驳回" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="block">
                <el-table
                    :data="tableData"
                    border
                    highlight-current-row
                    @current-change="handleCurrentChange"
                    style="width: 100%">
                    <el-table-column
                        prop="changeId"
                        label="申请ID">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="会员ID">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="idState"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="registerTime"
                        label="申请时间">
                    </el-table-column>
                    <el-table-column
                        prop="registerTime"
                        label="审核时间">
                    </el-table-column>
                    <el-table-column
                        prop="auditer"
                        label="审核人">
                    </el-table-column>
                </el-table>
                <div class="block adminPage">
                    <!--<span class="demonstration">完整功能</span>-->
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </div>
                <div class="block adminAuditControl">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item>
                            <el-button @click.native="detailInfo">详情</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click.native="passAudit(0)">申请通过</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click.native="rejectAudit(0)">驳回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </section>
        <el-dialog
            :title="DialogInfo.title"
            :visible.sync="toggleSlide"
            center
            width="80%"
            :before-close="handleClose">
            <el-container class="adminAuditContainer">
                <el-main>
                    <h2 class="changeTypeTitle">变更前资料</h2>
                    <el-row class="audiContentItem">
                        <el-col><div class="grid-content adminAuditNumber">
                            <div class="block audiItem">
                                <span class="auditTitle"><i class="el-icon-star-on"></i>学位证或学历证</span>
                                <span class="auditNumber">{{DialogInfo.degreeNum}}</span>
                            </div>
                        </div></el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <div class="grid-content">
                                <img class="adminAuditImage" :src="DialogInfo.degreeImg"/>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="audiContentItem">
                        <el-col><div class="grid-content adminAuditNumber">
                            <div class="block audiItem">
                                <span class="auditTitle"><i class="el-icon-star-on"></i>职业信息</span>
                                <span class="auditNumber">{{DialogInfo.professionNum}}</span>
                            </div>
                        </div></el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <div class="grid-content">
                                <img class="adminAuditImage" :src="DialogInfo.professionImg"/>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="audiContentItem">
                        <el-col><div class="grid-content adminAuditNumber">
                            <div class="block audiItem">
                                <span class="auditTitle"><i class="el-icon-star-on"></i>学位证或学历证</span>
                                <span class="auditNumber">{{DialogInfo.otherNum}}</span>
                            </div>
                        </div></el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <div class="grid-content">
                                <img class="adminAuditImage" :src="DialogInfo.otherImg"/>
                            </div>
                        </el-col>
                    </el-row>
                </el-main>
                <el-main>
                    <h2 class="changeTypeTitle">变更后资料</h2>
                    <el-row class="audiContentItem">
                        <el-col><div class="grid-content adminAuditNumber">
                            <div class="block audiItem">
                                <span class="auditTitle"><i class="el-icon-star-on"></i>学位证或学历证</span>
                                <span class="auditNumber">{{DialogInfo.degreeNum}}</span>
                            </div>
                        </div></el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <div class="grid-content">
                                <img class="adminAuditImage" :src="DialogInfo.degreeImg"/>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="audiContentItem">
                        <el-col><div class="grid-content adminAuditNumber">
                            <div class="block audiItem">
                                <span class="auditTitle"><i class="el-icon-star-on"></i>职业信息</span>
                                <span class="auditNumber">{{DialogInfo.professionNum}}</span>
                            </div>
                        </div></el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <div class="grid-content">
                                <img class="adminAuditImage" :src="DialogInfo.professionImg"/>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="audiContentItem">
                        <el-col><div class="grid-content adminAuditNumber">
                            <div class="block audiItem">
                                <span class="auditTitle"><i class="el-icon-star-on"></i>学位证或学历证</span>
                                <span class="auditNumber">{{DialogInfo.otherNum}}</span>
                            </div>
                        </div></el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <div class="grid-content">
                                <img class="adminAuditImage" :src="DialogInfo.otherImg"/>
                            </div>
                        </el-col>
                    </el-row>
                </el-main>
            </el-container>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <span>是否确认通过{{selectedData.name}}的变更信息</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="passAudit(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="rejectDialogVisible"
            width="30%"
            center>
            <span class="rejectAuditTitle">是否确认驳回{{selectedData.name}}的变更信息</span>
            <section class="rejectAuditInline">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="选择驳回理由" :inline="true" class="rejectAuditInline">
                        <el-select v-model="formInline.region" placeholder="驳回变更的理由">
                            <el-option label="第一个驳回理由" value="0"></el-option>
                            <el-option label="第二个驳回理由" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="输入驳回理由" :inline="true" class="rejectAuditInline">
                        <el-input type="textarea" v-model="rejectAuditReason" placeholder="驳回变更的理由"></el-input>
                    </el-form-item>
                </el-form>
            </section>
            <span slot="footer" class="dialog-footer">
            <el-button @click="rejectDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="rejectAudit(1)">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<style lang="scss" scoped>
    @import "../../../static/scss/common";
    .adminContentInner{
        @include ContentInner();
        .adminInputEl{
            width:200px;
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
    .rejectAuditInline{
        padding: 20px 0;
    }
    .rejectAuditTitle{
        font-size: 22px;
    }
    .changeTypeTitle{
        font-size: 24px;
    }
    .adminAuditNumber{
        font-size: 18px;
        color: #333;
        line-height: 18px;
        display: inline-block;
    }
    .adminAuditImage{
        width: 383.7px;
        height: 265.8px;
        background: #ff0000;
        display: block;
        margin: 0 auto;
    }
    .adminAuditNumber{
        width: 100%;
    }
    .audiContentItem{
        margin:15px 0 ;
        &:nth-child(1){
            margin-top: 0;
        }
    }
    .audiItem{
        width: 100%;
        display:flex ;
        flex-direction: row;
        justify-content: space-between;
        .auditTitle{
            font-size: 20px;
            line-height: 20px;
            i{
                margin: 0 10px;
            }
        }
    }
</style>
<script>
import userData from '../../../virtualData/changeUserInfo'
export default {
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value2: '',
      selectedData: {},
      rejectAuditReason: '',
      rejectDialogVisible: false,
      centerDialogVisible: false,
      DialogInfo: {},
      toggleSlide: false,
      selectedOne: false,
      currentPage4: 4,
      tableData: userData.data.dataList
    }
  },
  methods: {
    handleClose () {
      const t = this
      t.toggleSlide = false
    },
    detailInfo () {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要变更的用户!')
      } else {
        t.toggleSlide = true
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    onSubmit () {
      console.log('submit!')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    passAudit (step) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要变更的用户!')
      } else {
        if (step === 0) {
          t.centerDialogVisible = true
        } else if (step === 1) {
          t.$message({
            message: t.selectedData.name + '变更已通过',
            type: 'success'
          })
          t.centerDialogVisible = false
        }
      }
    },
    rejectAudit (step) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要变更的用户!')
      } else {
        if (step === 0) {
          t.rejectDialogVisible = true
        } else {
          t.$message({
            message: t.selectedData.name + '变更已驳回',
            type: 'success'
          })
          t.rejectDialogVisible = false
        }
      }
    },
    handleCurrentChange (val) {
      const t = this
      t.selectedOne = true
      t.selectedData = val
      t.DialogInfo = {
        title: t.selectedData.name + '变更信息',
        degreeImg: t.selectedData.jobPhoto,
        degreeNum: t.selectedData.jobNum,
        professionImg: t.selectedData.studyPhoto,
        professionNum: t.selectedData.studyNum,
        otherImg: t.selectedData.otherPhoto,
        otherNum: t.selectedData.otherNum
      }
      console.log(t.DialogInfo)
    }
  }
}
</script>
