<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
                <el-form-item label="会员ID">
                    <el-input v-model="formInline.customerId" placeholder="会员ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formInline.customerName" placeholder="请输入姓名" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="formInline.customerSex" placeholder="性别" class="adminInputEl">
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="年龄">
                    <el-input v-model="formInline.customerName" placeholder="请输入年龄" class="adminInputEl"></el-input>
                </el-form-item>-->
                <!--<el-form-item label="用户状态">
                    <el-select v-model="formInline.region" placeholder="用户状态" class="adminInputEl">
                        <el-option label="游客" value="0"></el-option>
                        <el-option label="已注册" value="1"></el-option>
                        <el-option label="已完善信息" value="2"></el-option>
                        <el-option label="已审核" value="2"></el-option>
                        <el-option label="正在审核" value="2"></el-option>
                        <el-option label="更改信息" value="2"></el-option>
                        <el-option label="拉黑" value="2"></el-option>
                    </el-select>
                </el-form-item>-->
                <!--<el-form-item label="邮件">
                    <el-input v-model="formInline.user" placeholder="邮件" class="adminInputEl"></el-input>
                </el-form-item>-->
                <!--<el-form-item label="手机号">
                    <el-input v-model="formInline.user" placeholder="手机号" class="adminInputEl"></el-input>
                </el-form-item>-->
                <!--<el-form-item label="审核时间">
                    <el-date-picker
                        class="adminInputEl"
                        v-model="value2"
                        align="right"
                        type="date"
                        placeholder="审核时间"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>-->
                <el-form-item label="审核状态">
                    <el-select v-model="formInline.auditType" placeholder="审核状态" class="adminInputEl">
                        <el-option label="新建" value="0"></el-option>
                        <el-option label="结束" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核结果">
                    <el-select v-model="formInline.auditResult" placeholder="审核结果" class="adminInputEl">
                        <el-option label="驳回" value="0"></el-option>
                        <el-option label="通过" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <div class="block">
                    <el-form-item>
                        <el-button type="primary" @click="checkList">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="default" @click="reset">重置</el-button>
                    </el-form-item>
                </div>

            </el-form>
            <div class="block">
                <el-table
                    :data="tableData"
                    border
                    highlight-current-row
                    :default-sort = "{prop: 'updateTime', order: 'descending'}"
                    @current-change="tableCurrentChange"
                    style="width: 100%">
                    <el-table-column
                        prop="customerId"
                        label="会员ID">
                    </el-table-column>
                    <el-table-column
                        prop="customerName"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="customerSex"
                        :formatter="sexFormat"
                        label="性别">
                    </el-table-column>
                    <el-table-column
                        prop="customerBirthday"
                        :formatter="jsGetAge"
                        sortable
                        label="年龄">
                    </el-table-column>
                    <el-table-column
                        prop="customerProfession"
                        label="职业">
                    </el-table-column>
                    <el-table-column
                        prop="customerDegree"
                        :formatter="customerDegree"
                        label="学历或学位">
                    </el-table-column>
                    <el-table-column
                        prop="auditType"
                        :formatter="auditType"
                        label="身份审核">
                    </el-table-column>
                    <el-table-column
                        prop="customerLocation"
                        label="所在地">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        sortable
                        label="更新时间">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        sortable
                        label="审核时间">
                    </el-table-column>
                    <el-table-column
                        prop="auditResult"
                        :formatter="auditResult"
                        label="审核结果">
                    </el-table-column>
                </el-table>
                <div class="block adminPage">
                    <!--<span class="demonstration">完整功能</span>-->
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="formInline.pageIndex"
                        :page-sizes="[10, 20, 30]"
                        :page-size="formInline.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="count">
                    </el-pagination>
                </div>
            </div>
            <div class="block adminAuditControl">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-button @click.native="awakenUserInfo">详情</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.native="passAudit(0)">审核</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click.native="rejectAudit(0)">驳回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
        <el-dialog
            :title="selectedData.customerName+'的审核资料'"
            :visible.sync="attachmentDialog"
            width="80%"
            center>
            <el-main>
                <!--0头像，1背景图，2学位证，3学历证，4身份证，5个人写真，6工作相关证件7其他认证资料8举报附件-->
                <div class="block" v-if="attachmentDialogData!={}">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="attachmentHeader">
                        <h1 class="auditTitle">身份证:</h1>
                        <span class="auditTitle" >证件号</span>
                        <el-input v-if="attachmentDialogData['4'][0]&&attachmentDialogData['4'][0]['attachmentNumber']" v-model="attachmentDialogData['4'][0]['attachmentNumber']"   class="attachNum" :disabled="true"></el-input>
                    </el-col>
                    <el-main>
                        <el-row>
                            <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" class="attachmentItem" v-if="attachmentDialogData['4']" v-for="(item,index) in attachmentDialogData['4']" :key="index">
                                <div class="grid-content">
                                    <img :src="item.attachmentLink" alt="">
                                </div>
                                <div class="block desContent">
                                    <h1 class="time" v-text="item.createTime"></h1>
                                    <h1 class="des" v-text="item.attachmentRemark"></h1>
                                </div>
                            </el-col>
                        </el-row>

                    </el-main>
                </div>
                <div class="block" v-if="attachmentDialogData!={}">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="attachmentHeader">
                        <h1 class="auditTitle">学位证:</h1>
                        <span class="auditTitle" >证件号</span>
                        <el-input v-if="attachmentDialogData['2'][0]&&attachmentDialogData['2'][0]['attachmentNumber']" v-model="attachmentDialogData['2'][0]['attachmentNumber']"   class="attachNum" :disabled="true"></el-input>
                    </el-col>
                    <el-main>
                        <el-row>
                            <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" class="attachmentItem" v-if="attachmentDialogData['2']" v-for="(item,index) in attachmentDialogData['2']" :key="index">
                                <div class="grid-content">
                                    <img :src="item.attachmentLink" alt="">
                                </div>
                                <div class="block desContent">
                                    <h1 class="time" v-text="item.createTime"></h1>
                                    <h1 class="des" v-text="item.attachmentRemark"></h1>
                                </div>
                            </el-col>
                        </el-row>

                    </el-main>
                </div>
                <div class="block">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="attachmentHeader">
                        <h1 class="auditTitle">学历证:</h1>
                        <span class="auditTitle" >证件号</span>
                        <el-input  v-if="attachmentDialogData['3'][0]&&attachmentDialogData['3'][0]['attachmentNumber']" v-model="attachmentDialogData['3'][0]['attachmentNumber']"      class="attachNum" :disabled="true"></el-input>
                    </el-col>
                    <el-main>
                        <el-row>
                            <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" class="attachmentItem" v-if="attachmentDialogData['3']" v-for="(item,index) in attachmentDialogData['3']" :key="index">
                                <div class="grid-content">
                                    <img :src="item.attachmentLink" alt="">
                                </div>
                                <div class="block desContent">
                                    <h1 class="time" v-text="item.createTime"></h1>
                                    <h1 class="des" v-text="item.attachmentRemark"></h1>
                                </div>
                            </el-col>
                        </el-row>

                    </el-main>
                </div>
                <div class="block">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="attachmentHeader">
                        <h1 class="auditTitle">职业相关:</h1>
                        <span class="auditTitle" >证件号</span>
                        <el-input  v-if="attachmentDialogData['6'][0]&&attachmentDialogData['2'][0]['attachmentNumber']" v-model="attachmentDialogData['6'][0]['attachmentNumber']"     class="attachNum" :disabled="true"></el-input>
                    </el-col>
                    <el-main>
                        <el-row>
                            <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" class="attachmentItem" v-if="attachmentDialogData['6']" v-for="(item,index) in attachmentDialogData['6']" :key="index">
                                <div class="grid-content">
                                    <img :src="item.attachmentLink" alt="">
                                </div>
                                <div class="block desContent">
                                    <h1 class="time" v-text="item.createTime"></h1>
                                    <h1 class="des" v-text="item.attachmentRemark"></h1>
                                </div>
                            </el-col>
                        </el-row>

                    </el-main>
                </div>
                <div class="block">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="attachmentHeader">
                        <h1 class="auditTitle">其他相关:</h1>
                        <span class="auditTitle" >证件号</span>
                        <el-input  v-if="attachmentDialogData['7'][0]&&attachmentDialogData['2'][0]['attachmentNumber']" v-model="attachmentDialogData['7'][0]['attachmentNumber']"     class="attachNum" :disabled="true"></el-input>
                    </el-col>
                    <el-main>
                        <el-row>
                            <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" class="attachmentItem" v-if="attachmentDialogData['7']" v-for="(item,index) in attachmentDialogData['7']" :key="index">
                                <div class="grid-content">
                                    <img :src="item.attachmentLink" alt="">
                                </div>
                                <div class="block desContent">
                                    <h1 class="time" v-text="item.createTime"></h1>
                                    <h1 class="des" v-text="item.attachmentRemark"></h1>
                                </div>
                            </el-col>
                        </el-row>

                    </el-main>
                </div>
            </el-main>
        </el-dialog>
        <el-dialog
            :title="'通过'+selectedData.customerName+'的审核'"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <span>是否确认通过{{selectedData.customerName}}的审核信息</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="passAudit(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :title="'驳回'+selectedData.customerName+'的审核'"
            :visible.sync="rejectDialogVisible"
            width="30%"
            center>
            <span class="rejectAuditTitle">是否确认驳回{{selectedData.customerName}}的审核信息</span>
            <section class="rejectAuditInline">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="选择驳回理由" :inline="true" class="rejectAuditInline">
                        <el-select v-model="region" placeholder="驳回审核的理由">
                            <el-option label="虚假资料" value="0"></el-option>
                            <el-option label="证件不清晰" value="1"></el-option>
                            <el-option label="证件号码不一致" value="2"></el-option>
                            <el-option label="资料不齐全" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="输入驳回理由" :inline="true" class="rejectAuditInline">
                        <el-input type="textarea" v-model="rejectAuditReason" placeholder="驳回审核的理由"></el-input>
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
<script>
import Common from '../../../utils/common.js'
import AuditDialog from '../../components/Dialog/auditDialog'
import userData from '../../../virtualData/auditInformation'
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      region: '0',
      attachmentDialog: false,
      formInline: {
        customerId: '',
        customerName: '',
        customerSex: '',
        auditResult: '',
        auditType: '',
        getType: 1,
        pageSize: 10,
        pageIndex: 1
      },
      attachmentDialogData: {
        2: [],
        3: [],
        4: [],
        6: [],
        7: []
      },
      formDes: {
        num: 12545789878
      },
      pageSize: 10,
      pageIndex: 1,
      count: 0,
      selectedOne: false,
      selectedData: {},
      dialogInfo: {
        title: '审核信息',
        degreeImg: '',
        degreeNum: '',
        professionImg: '',
        professionNum: '',
        otherImg: '',
        otherNum: ''
      },
      rejectAuditReason: '',
      rejectDialogVisible: false,
      centerDialogVisible: false,
      tableData: []
    }
  },
  watch: {
    pageIndex (newVal) {
      const t = this
      t.formInline.pageIndex = newVal
      t.getAuditList()
    },
    pageSize (newVal) {
      const t = this
      t.formInline.pageSize = newVal
      t.getAuditList()
    }
  },
  methods: {
    ...mapActions(['tab2ShowDialog']),
    checkList () {
      const t = this
      t.pageIndex === 1 ? t.getAuditList() : t.pageIndex = 1
    },
    tableCurrentChange (val) {
      const t = this
      if (val) {
        console.log(val)
        t.selectedOne = true
        t.selectedData = val
      }
    },
    auditResult (row, column) {
      const t = this
      const type = row.auditResult
      return Common.auditResult(type)
    },
    auditType (row, column) {
      const t = this
      const type = row.auditType
      return Common.auditType(type)
    },
    customerDegree (row, column) {
      const t = this
      const type = row.customerDegree
      return Common.customerDegree(type)
    },
    jsGetAge (row, column) {
      const t = this
      const birthDay = row.customerBirthday
      return Common.jsGetAge(birthDay)
    },
    sexFormat (row, column) {
      const t = this
      const type = row.customerSex
      return Common.sexFormat(type)
    },
    passAudit (step) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要审核的用户!')
      } else {
        if (step === 0) {
          t.centerDialogVisible = true
        } else if (step === 1) {
          t.$message({
            message: t.selectedData.name + '审核已通过',
            type: 'success'
          })
          t.centerDialogVisible = false
        }
      }
    },
    reset () {
      const t = this
      t.pageSize = 10
      t.pageIndex = 1
      t.formInline = {
        customerId: '',
        customerName: '',
        customerSex: '',
        auditResult: '',
        auditType: '',
        getType: 1,
        pageSize: 10,
        pageIndex: 1
      }
      t.getAuditList()
    },
    rejectAudit (step) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要审核的用户!')
      } else {
        if (step === 0) {
          t.rejectDialogVisible = true
        } else {
          axios({
            url: '/call/customer/rejectAudit',
            method: 'POST',
            data: {
              auditId: t.selectedData.auditId,
              customerId: t.selectedData.customerId,
              adminId: localStorage.getItem('adminId'),
              updateState: 3,
              adminName: localStorage.getItem('userName')
            },
            transformRequest: [function (data) {
              return 'paramJson=' + JSON.stringify(data)
            }],
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: 30000
          }).then(function (req) {
            t.rejectDialogVisible = false
            if (req.data.responseObject.responseCode === 4) {
              t.$message({
                message: t.selectedData.customerName + '审核已驳回',
                type: 'success'
              })
              t.getAuditList()
            } else {
              t.$message({
                message: '激活失败',
                type: 'warning'
              })
            }
          })
        }
      }
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    tryClick (a, b) {
      console.log(a, b)
    },
    onSubmit () {
      const t = this
      t.getAuditList()
      console.log('submit!')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      const t = this
      t.pageSize = val
    },
    handleCurrentChange (val) {
      const t = this
      t.pageIndex = parseInt(val, 10)
    },
    getAuditList () {
      const t = this
      t.selectedOne = false
      t.selectedData = {}
      axios.get('/call/customer/getAuditList', {
        params: t.formInline
      })
        .then(function (response) {
          const reqData = response.data
          console.log(reqData)
          if (reqData.responseObject.responseData.data_list) {
            t.tableData = reqData.responseObject.responseData.data_list
          }
          if (reqData.responseObject.responseData.totalCount) {
            t.count = reqData.responseObject.responseData.totalCount
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    formatAttachmentList (data) {
      const t = this
      const jsonData = {}
      const originalData = JSON.parse(JSON.stringify(data))
      for (let num = 0; num < originalData.length; num++) {
        if (jsonData[originalData[num].attachmentType]) {
          jsonData[originalData[num].attachmentType].push(originalData[num])
        } else {
          jsonData[originalData[num].attachmentType] = []
          jsonData[originalData[num].attachmentType].push(originalData[num])
        }
      }
      return jsonData
    },
    awakenUserInfo () {
      const t = this
      if (t.selectedOne) {
        const arr =
                        [
                          'degreeAttachment',
                          'identityAttachment',
                          'otherAttachment',
                          'professionAttachment',
                          'schoolAttachment'
                        ]
        const attachmentIdList = []
        for (let num = 0; num < arr.length; num++) {
          console.log(t.selectedData[arr[num]])
          if (t.selectedData[arr[num]] && t.selectedData[arr[num]].length) {
            const arrInner = t.selectedData[arr[num]].split(',')
            for (let innerNum = 0; innerNum < arrInner.length; innerNum++) {
              attachmentIdList.push(arrInner[innerNum])
            }
          }
        }
        console.log(attachmentIdList)
        axios({
          url: '/call/customer/getAuditAttachmentList',
          method: 'POST',
          data: {
            attachmentList: JSON.stringify(attachmentIdList),
            customerId: t.selectedData.customerId,
            isValid: 1
          },
          transformRequest: [function (data) {
            return 'paramJson=' + JSON.stringify(data)
          }],
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          timeout: 30000
        }).then(function (req) {
          console.log(req.data)
          if (req.data && req.data.responseObject && req.data.responseObject.responseData && req.data.responseObject.responseData.data_list && req.data.responseObject.responseData.data_list.length) {
            t.attachmentDialogData = t.formatAttachmentList(req.data.responseObject.responseData.data_list)
            console.log(t.attachmentDialogData)
          }
        })
        t.attachmentDialog = true
      } else {
        t.$message.error('请选择您要审核的用户!')
      }
    }
  },
  computed: {
    ...mapGetters(['tab2Data'])
  },
  components: {
    AuditDialog
  },
  mounted () {
    const t = this
    t.getAuditList()
  }
}
</script>
<style lang="scss" scoped>

    @import "../../../static/scss/common";
    .attachmentHeader{
        height: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }
    .attachmentItem{
        .grid-content{
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

        }
        .desContent{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            height:50px;
            margin-top: 10px;
            .time{
                margin: 0 10px;
                height: 30px;
                display: inline-block;
            }
            .des{
                width: 200px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                height: 30px;
                display: inline-block;

            }
        }
        margin: 10px;
    }
    .attachNum{
        height:60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        width:270px;
        float: left;

    }
    .auditTitle{
        margin-right: 20px;
        display: inline-block;
        float: left;
        font-size: 20px;
        line-height: 20px;
        i{
            margin: 0 10px;
        }
    }
    .rejectAuditInline{
        padding: 20px 0;
    }
    .rejectAuditTitle{
        font-size: 22px;
    }
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
    .grid-content{
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>
