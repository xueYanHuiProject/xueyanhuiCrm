<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
                <el-form-item label="动态ID">
                    <el-input v-model="formInline.dynamicId" placeholder="动态ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="作者ID">
                    <el-input v-model="formInline.customerId" placeholder="作者ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formInline.customerName" placeholder="请输入姓名" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="动态类型">
                    <el-select v-model="formInline.dynamicType" placeholder="动态类型" class="adminInputEl">
                        <el-option label="脱单" value="0"></el-option>
                        <el-option label="话题" value="1"></el-option>
                        <el-option label="普通" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="动态状态">
                    <el-select v-model="formInline.isValid" placeholder="动态状态" class="adminInputEl">
                        <el-option label="有效" value="1"></el-option>
                        <el-option label="无效" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="时间">
                <el-date-picker
                    class="adminInputEl"
                    v-model="value2"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                </el-date-picker>
                </el-form-item>-->
                <div class="block">
                    <el-form-item>
                        <el-button type="primary" @click="checkList">查询</el-button>
                    </el-form-item>
                    <el-form-item>
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
                        prop="dynamicId"
                        label="动态ID">
                    </el-table-column>
                    <el-table-column
                        prop="customerId"
                        label="作者ID">
                    </el-table-column>
                    <el-table-column
                        prop="customerName"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="dynamicAttachmentIdList"
                        :formatter="attachmentIdListNum"
                        label="图片上传">
                    </el-table-column>
                    <el-table-column
                        prop="dynamicType"
                        :formatter="formatterDynamicType"
                        label="动态类型">
                    </el-table-column>
                    <el-table-column
                        prop="browseNum"
                        sortable
                        label="浏览">
                    </el-table-column>
                    <el-table-column
                        prop="likeNum"
                        sortable
                        label="点赞">
                    </el-table-column>
                    <el-table-column
                        prop="commentIdList"
                        sortable
                        :formatter="commentIdListNum"
                        label="评论">
                    </el-table-column>
                    <el-table-column
                        prop="isValid"
                        :formatter="formatterValid"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        sortable
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        sortable
                        label="更新时间">
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
                            <el-button @click.native="detailInfo">详情</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="isValidDynamic(0)">激活</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click.native="isNotValidDynamic(0)">无效</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </section>
        <el-dialog
            width="30%"
            title="提示"
            :visible.sync="handleIsValid"
            append-to-body>
            <el-main>确定要激活这条动态？</el-main>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleIsValid = false">取消</el-button>
                <el-button type="primary" @click="isValidDynamic(1,1)">有效</el-button>
                </span>
        </el-dialog>
        <el-dialog
            width="50%"
            :title="selectedData.articleTitle"
            :visible.sync="pushOnOff"
            center
            append-to-body>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="推送类型" :inline="true">
                    <el-select v-model="formInline.region" placeholder="推送类型">
                        <el-option label="个性化推送" value="0"></el-option>
                        <el-option label="全站推送" value="1"></el-option>
                        <el-option label="单独推送" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推送位置" :inline="true">
                    <el-select v-model="formInline.region" placeholder="推送位置">
                        <el-option label="遇见栏目" value="0"></el-option>
                        <el-option label="消息栏目" value="1"></el-option>
                        <el-option label="首页全部" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推送优先级" :inline="true">
                    <el-select v-model="formInline.region" placeholder="推送位置">
                        <el-option label="按序推送" value="0"></el-option>
                        <el-option label="优先推送" value="1"></el-option>
                        <el-option label="延后推送" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="推送ID" :inline="true">
                    <el-input v-model="formInline.user" placeholder="请输入推送ID"></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="个性化推送条件" :inline="true">
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                    <el-button class="tag">个性化标签</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="pushOnOff = false">取 消</el-button>
                <el-button type="primary" @click="pushContent(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            width="30%"
            title="提示"
            :visible.sync="isNotValid"
            append-to-body>
            <el-main>确定要无效这条动态？</el-main>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isNotValid = false">取消</el-button>
                <el-button type="primary" @click="isValidDynamic(1,0)">无效</el-button>
                </span>
        </el-dialog>
        <el-dialog
            :title="selectedData.customerName+'的'+selectedData.dynamicType"
            :visible.sync="centerDialogVisible"
            width="35%"
            center>
            <div class="block">
                <p>
                    {{selectedData.dynamicContent}}
                </p>
            </div>
            <div class="block">
                <h1 class="dynamicTitle">动态内容</h1>
                <el-main class="feedBackArea">{{selectedData.dynamicContent}}</el-main>
            </div>
            <div class="block feedBackImgContainer">
                <ul class="feedBackImgList">
                    <li class="feedBackAreaImgItem" v-for="(item,index) in selectedData.imgList">
                        <img :src="item" alt="" v-bind:key="index">
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">关闭</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
import userData from '../../../virtualData/dynamicData'
import Common from '../../../utils/common.js'
import axios from 'axios'
export default {
  data () {
    return {
      formInline: {
        dynamicId: '', // 该动态的唯一标识
        dynamicType: '', // 0脱单动态，1话题动态，2普通动态
        customerId: '', // 该动态的作者id,
        customerName: '', // 该动态的作者name,
        isValid: '', // ，0无效,1有效
        pageIndex: 1,
        pageSize: 10
      },
      count: 0,
      pageIndex: 1,
      pageSize: 10,
      pushOnOff: false,
      handleIsValid: false,
      isNotValid: false,
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
      innerVisible: false,
      centerDialogVisible: false,
      selectedOne: false,
      selectedData: {},
      currentPage4: 4,
      tableData: []
    }
  },
  mounted () {
    const t = this
    t.getDynamicList()
  },
  watch: {
    pageIndex (newVal) {
      const t = this
      t.formInline.pageIndex = newVal
      t.getDynamicList()
    },
    pageSize (newVal) {
      const t = this
      t.formInline.pageSize = newVal
      t.getDynamicList()
    }
  },
  methods: {
    checkList () {
      const t = this
      t.pageIndex === 1 ? t.getDynamicList() : t.pageIndex = 1
    },
    resetList () {
      const t = this
      t.pageSize = 10
      t.pageIndex = 1
      t.formInline = {
        dynamicId: '', // 该动态的唯一标识
        dynamicType: '', // 0脱单动态，1话题动态，2普通动态
        customerId: '', // 该动态的作者id,
        customerName: '', // 该动态的作者name,
        isValid: '', // ，0无效,1有效
        pageIndex: 1,
        pageSize: 10
      }
      t.getDynamicList()
    },
    tableCurrentChange (val) {
      const t = this
      if (val) {
        console.log(val)
        t.selectedOne = true
        t.selectedData = val
      }
    },
    formatterValid (row, column) {
      const t = this
      const type = row.isValid
      return Common.formatterValid(type)
    },
    formatterDynamicType (row, column) {
      const t = this
      const type = row.dynamicType
      return Common.dynamicType(type)
    },
    attachmentIdListNum (row, column) {
      const t = this
      const type = row.dynamicAttachmentIdList
      // console.log(type);
      return parseInt(Common.listNum(type), 10) === 0 ? '无图' : '有图'
    },
    getDynamicList () {
      const t = this
      axios.get('/call/dynamic/getDynamicList', {
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
    commentIdListNum (row, column) {
      const t = this
      const type = row.commentIdList
      // console.log(type);
      return parseInt(Common.listNum(type), 10)
    },
    detailInfo () {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要变更的用户!')
      } else {
        t.centerDialogVisible = true
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    onSubmit () {
      const t = this
      t.getDynamicList()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      const t = this
      t.pageSize = val
    },
    handleCurrentChange (val) {
      const t = this
      t.pageIndex = val
    },
    isValidDynamic (type, update) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要更新状态的动态!')
      } else {
        if (type === 0) {
          t.handleIsValid = true
        } else if (type === 1) {
          let port = ''
          if (update === 0) {
            port = '/call/dynamic/invalid'
          } else {
            port = '/call/dynamic/active'
          }
          axios({
            url: port,
            method: 'POST',
            data: {
              dynamicId: t.selectedData.dynamicId,
              updateState: update
            },
            transformRequest: [function (data) {
              return 'paramJson=' + JSON.stringify(data)
            }],
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: 30000
          }).then(function (req) {
            t.handleIsValid = false
            t.isNotValid = false
            if (req.data.responseObject.responseCode === 3) {
              if (parseInt(update, 10) == 0) {
                t.$message({
                  message: '动态已被无效',
                  type: 'success'
                })
              } else {
                t.$message({
                  message: '动态已被激活',
                  type: 'success'
                })
              }
              t.getDynamicList()
            } else {
              t.$message({
                message: '更新状态失败',
                type: 'warning'
              })
            }
          })
        }
      }
    },
    isNotValidDynamic (type) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要无效的动态!')
      } else {
        if (type === 0) {
          t.isNotValid = true
        }/* else if(type===1) {
                        t.isNotValid = false;
                        t.$message({
                            message: '动态已被无效',
                            type: 'success'
                        });
                    } */
      }
    },
    validDynamic (type) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要无效的动态!')
      } else {
        if (type === 0) {
          t.innerVisible = true
        } else if (type === 1) {
          t.innerVisible = false
          t.$message({
            message: '动态已被无效',
            type: 'success'
          })
        }
      }
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
    }
    .dynamicTitle{
        font-size: 24px;
    }
</style>
