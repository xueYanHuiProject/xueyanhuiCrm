<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
                <el-form-item label="拉黑ID">
                    <el-input v-model="formInline.blackId" placeholder="拉黑ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="会员ID">
                    <el-input v-model="formInline.customerId" placeholder="会员ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formInline.customerName" placeholder="请输入姓名" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="拉黑状态">
                    <el-select v-model="formInline.blackState" placeholder="状态" class="adminInputEl">
                        <el-option label="拉黑" value="0"></el-option>
                        <el-option label="激活" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="拉黑原因"><!--0营销诈骗、1淫秽色情、2不友善行为、3诱导欺骗、4虚假资料-->
                    <el-select v-model="formInline.blackReason" placeholder="拉黑原因" class="adminInputEl">
                        <el-option :label="item.reasonName" :value="item.reasonType" v-for="(item,index) in blackReason" :key="item.reasonType"></el-option>
                    </el-select>
                </el-form-item>
                <div class="block">
                    <el-form-item>
                        <el-button type="primary" @click="checkList">查询</el-button>
                        <el-button type="default" @click="resetList">重置</el-button>
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
                        prop="blackId"
                        label="拉黑ID">
                    </el-table-column>
                    <el-table-column
                        prop="customerId"
                        label="会员ID">
                    </el-table-column>
                    <el-table-column
                        prop="customerName"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="blackReason"
                        :formatter="blackReasonFormat"
                        label="拉黑原因">
                    </el-table-column>
                    <el-table-column
                        prop="blackState"
                        :formatter="blackStateFormat"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        sortable
                        label="更新时间">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        sortable
                        label="拉黑时间">
                    </el-table-column>
                    <el-table-column
                        prop="adminName"
                        label="拉黑管理员">
                    </el-table-column>
                    <el-table-column
                        prop="unlockAdminName"
                        label="解锁管理员">
                    </el-table-column>
                </el-table>
                <div class="block adminPage">
                    <!--<span class="demonstration">完整功能</span>-->
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[10, 20, 30]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="count">
                    </el-pagination>
                </div>
                <div class="block adminAuditControl">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item>
                            <el-button @click.native="detailInfo" type="primary">回复</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click.native="activate(0)" type="success">激活</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </section>
        <el-dialog
            width="30%"
            title="提示"
            :visible.sync="activateOnOff"
            append-to-body>
            <span>确定要激活该用户？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="activateOnOff = false">取 消</el-button>
                <el-button type="primary" @click="activate(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :title="selectedData.customerName+'的拉黑信息'"
            :visible.sync="centerDialogVisible"
            width="65%"
            center>
            <div class="block">
                <p v-text="dialogReason">
                </p>
            </div>
            <!--<div class="block feedBackImgContainer">
                <ul class="feedBackImgList">
                    <li class="feedBackAreaImgItem" v-for="(item,index) in selectedData.imgList">
                        <img :src="item" alt="" v-bind:key="index">
                    </li>
                </ul>
            </div>-->
            <div class="block">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="输入拉黑回复" :inline="true" class="rejectAuditInline">
                        <textarea class="feedBackArea" style="resize: none;" name="" id="" cols="30" rows="10"></textarea>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="feedBackContent()">回复</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
import Common from '../../../utils/common.js'
import axios from 'axios'
export default {
  data () {
    return {
      formInline: {
        blackId: '', // 该拉黑的唯一标识
        customerId: '', // 拉黑用户的id
        customerName: '', // 拉黑用户的名字
        blackReason: '', // 拉黑的原因0营销诈骗、1淫秽色情、2不友善行为、3诱导欺骗、4虚假资料
        blackState: '', // 拉黑的状态，0新建，1已激活
        getType: 4,
        pageSize: 10,
        pageIndex: 1
      },
      pageSize: 10,
      pageIndex: 1,
      count: 0,
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
      activateOnOff: false,
      rejectAuditReason: '',
      selectedData: {},
      centerDialogVisible: false,
      selectedOne: false,
      msg: '',
      currentPage4: 4,
      tableData: []
    }
  },
  mounted () {
    const t = this
    t.getBlackUserList()
  },
  computed: {
    dialogReason () {
      const t = this
      return (!isNaN(parseInt(t.selectedData.blackReason, 10))) && t.blackReason[parseInt(t.selectedData.blackReason, 10)].reasonName ? t.blackReason[parseInt(t.selectedData.blackReason, 10)].reasonName : ''
    },
    blackReason () {
      return Common.blackReason()
    }
  },
  watch: {
    pageIndex (newVal) {
      const t = this
      t.formInline.pageIndex = newVal
      t.getBlackUserList()
    },
    pageSize (newVal) {
      const t = this
      t.formInline.pageSize = newVal
      console.log('执行')
      t.getBlackUserList()
    }
  },
  methods: {
    checkList () {
      const t = this
      t.pageIndex === 1 ? t.getBlackUserList() : t.pageIndex = 1
    },
    tableCurrentChange (val) {
      const t = this
      if (val) {
        console.log(val)
        t.selectedOne = true
        t.selectedData = val
      }
    },
    blackReasonFormat (row, column) {
      const t = this
      const type = row.blackReason
      return Common.blackReasonFormat(type)
    },
    blackStateFormat (row, column) {
      const t = this
      const type = row.blackState
      return Common.blackState(type)
    },
    resetList () {
      const t = this
      t.pageSize = 10
      t.pageIndex = 1
      t.formInline = {
        blackId: '', // 该拉黑的唯一标识
        customerId: '', // 拉黑用户的id
        customerName: '', // 拉黑用户的名字
        blackReason: '', // 拉黑的原因0营销诈骗、1淫秽色情、2不友善行为、3诱导欺骗、4虚假资料
        blackState: '', // 拉黑的状态，0新建，1已激活
        getType: 4,
        pageSize: 10,
        pageIndex: 1
      }
      t.getBlackUserList()
    },
    feedBackContent () {
      const t = this
      t.centerDialogVisible = false
      t.$message({
        message: t.selectedData.customerName + '拉黑信息已回复',
        type: 'success'
      })
    },
    getBlackUserList () {
      const t = this
      t.selectedData = {}
      axios.get('/call/customer/getBlacklist', {
        params: t.formInline
      })
        .then(function (response) {
          const reqData = response.data
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
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    activate (type) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要激活的用户!')
      } else {
        if (type === 0) {
          t.activateOnOff = true
        } else if (type === 1) {
          axios({
            url: '/call/customer/activate',
            method: 'POST',
            data: {
              blackId: t.selectedData.blackId,
              customerId: t.selectedData.customerId,
              adminId: localStorage.getItem('adminId'),
              updateState: 0,
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
            t.activateOnOff = false
            if (req.data.responseObject.responseCode === 4) {
              t.$message({
                message: '用户已被激活',
                type: 'success'
              })
              t.getBlackUserList()
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
    detailInfo () {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要变更的用户!')
      } else {
        t.centerDialogVisible = true
      }
    },
    onSubmit () {
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
    }
  }
}
</script>
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
    .block{
        padding: 20px 0;
    }
    .feedBackImgContainer{
        height: 399px;
        width: 100%;
    }
    .feedBackImgList{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 399px;
        flex-wrap: wrap;
        .feedBackAreaImgItem{
            width: 191.85px;
            height: 132.9px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }

    .rejectAuditInline,.feedBackArea{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        textarea{
            width: 583.7px;
            height: 265.8px;
        }
    }
</style>
