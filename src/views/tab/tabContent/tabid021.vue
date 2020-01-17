<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
                <el-form-item label="消息ID">
                    <el-input v-model="formInline.articleId" placeholder="消息ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="会员ID">
                    <el-input v-model="formInline.customerId" placeholder="会员ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="消息标题">
                    <el-input v-model="formInline.articleTitle" placeholder="消息标题" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="消息类型">
                    <el-select v-model="formInline.isValid" placeholder="消息类型" class="adminInputEl">
                        <el-option label="站内" value="0"></el-option>
                        <el-option label="短信" value="1"></el-option>
                        <el-option label="邮件" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="消息场景">
                    <el-select v-model="formInline.isValid" placeholder="消息场景" class="adminInputEl">
                        <el-option label="场景一" value="0"></el-option>
                        <el-option label="场景二" value="1"></el-option>
                        <el-option label="场景三" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="消息状态">
                    <el-select v-model="formInline.isValid" placeholder="消息状态" class="adminInputEl">
                        <el-option label="无效" value="0"></el-option>
                        <el-option label="有效" value="1"></el-option>
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
                        prop="articleId"
                        label="消息ID">
                    </el-table-column>
                    <el-table-column
                        prop="customerId"
                        label="会员ID">
                    </el-table-column>
                    <el-table-column
                        prop="articleTitle"
                        label="消息标题">
                    </el-table-column>
                    <el-table-column
                        prop="templateId"
                        label="消息类型">
                    </el-table-column>
                    <el-table-column
                        prop="forwardNum"
                        label="消息场景">
                    </el-table-column>
                    <el-table-column
                        prop="collectNum"
                        sortable
                        label="发送时间">
                    </el-table-column>
                    <el-table-column
                        prop="isValid"
                        :formatter="formatterValid"
                        label="状态">
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
                            <el-button  type="default" @click.native="editArticle(0)">详情</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click.native="activate(0)" type="success">激活</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click.native="detailInfo(0)" type="danger">无效</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </section>
        <el-dialog
            width="30%"
            title="提示"
            :visible.sync="innerVisible"
            append-to-body>
            <span>确定要无效这条消息？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="detailInfo(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="消息的标题"
            :visible.sync="centerDialogVisible"
            width="50%"
            center>
            <div class="block">
                <el-main>
                    消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容
                </el-main>
            </div>
            <span slot="footer" class="dialog-footer">
            <p>2013年12月23日通过短信发送给张三</p>
  </span>
        </el-dialog>
        <el-dialog
            width="30%"
            title="提示"
            :visible.sync="activateOnOff"
            append-to-body>
            <span>确定要激活这条消息？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="activateOnOff = false">取 消</el-button>
                <el-button type="primary" @click="activate(1)">确 定</el-button>
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
        pageIndex: 1,
        pageSize: 10,
        articleId: '', // 该消息的唯一标识
        articleTitle: '', // 消息的标题
        templateId: '', // 消息使用的模板id
        customerId: '', // 该消息的作者id,
        customerName: '', // 该消息的作者Name,
        isValid: ''// ，0无效,1有效
      },
      count: 0,
      pageIndex: 1,
      pageSize: 10,
      swiperOption: {
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      labelPosition: 'left',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
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
      activateOnOff: false,
      pushOnOff: false,
      articleDialog: false,
      innerVisible: false,
      centerDialogVisible: true,
      selectedOne: false,
      selectedData: {},
      currentPage4: 4,
      tableData: []
    }
  },
  mounted () {
    const t = this
    t.getArticleList()
  },
  watch: {
    pageIndex (newVal) {
      const t = this
      t.formInline.pageIndex = newVal
      t.getArticleList()
    },
    pageSize (newVal) {
      const t = this
      t.formInline.pageSize = newVal
      t.getArticleList()
    }
  },
  methods: {
    checkList () {
      const t = this
      t.pageIndex === 1 ? t.getArticleList() : t.pageIndex = 1
    },
    resetList () {
      const t = this
      t.pageSize = 10
      t.pageIndex = 1
      t.formInline = {
        pageIndex: 1,
        pageSize: 10,
        articleId: '', // 该消息的唯一标识
        articleTitle: '', // 消息的标题
        templateId: '', // 消息使用的模板id
        customerId: '', // 该消息的作者id,
        customerName: '', // 该消息的作者Name,
        isValid: ''// ，0无效,1有效
      }
      t.getArticleList()
    },
    commentIdListNum (row, column) {
      const t = this
      const type = row.articleIdList
      // console.log(type);
      return parseInt(Common.listNum(type), 10)
    },
    formatterValid (row, column) {
      const t = this
      const type = row.isValid
      return Common.formatterValid(type)
    },
    tableCurrentChange (val) {
      const t = this
      if (val) {
        console.log(val)
        t.selectedOne = true
        t.selectedData = val
      }
    },
    getArticleList () {
      const t = this
      axios.get('/call/article/getArticleList', {
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
    callback () {
      console.log('执行')
    },
    imgInit (e) {
      console.log(e)
    },
    activate (type) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要激活的消息!')
      } else {
        if (type === 0) {
          t.activateOnOff = true
        } else if (type === 1) {
          axios({
            url: '/call/article/active',
            method: 'POST',
            data: {
              articleId: t.selectedData.articleId,
              updateState: '1'
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
            t.$message({
              message: t.selectedData.articleTitle + '消息已被激活',
              type: 'success'
            })
            t.getArticleList()
          })
        }
      }
    },
    detailInfo (type) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要无效的消息!')
      } else {
        if (type === 0) {
          t.innerVisible = true
        } else if (type === 1) {
          axios({
            url: '/call/article/invalid',
            method: 'POST',
            data: {
              articleId: t.selectedData.articleId,
              updateState: '0'
            },
            transformRequest: [function (data) {
              return 'paramJson=' + JSON.stringify(data)
            }],
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: 30000
          }).then(function (req) {
            t.innerVisible = false
            t.$message({
              message: t.selectedData.articleTitle + '消息已被无效',
              type: 'success'
            })
            t.getArticleList()
          })
        }
      }
    },
    editArticle (type) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要无效的消息!')
      } else {
        if (type === 0) {
          t.articleDialog = true
        } else if (type === 1) {
          t.articleDialog = false
          t.$message({
            message: t.selectedData.articleTitle + '消息已生成',
            type: 'success'
          })
        }
      }
    },
    pushContent (type) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要推送的消息!')
      } else {
        if (type === 0) {
          t.pushOnOff = true
        } else if (type === 1) {
          t.pushOnOff = false
          t.$message({
            message: t.selectedData.articleTitle + '消息已推送',
            type: 'success'
          })
        }
      }
      console.log('推送')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
      /* t.selectedOne = true;
                t.selectedData = val; */
      t.pageIndex = val
      console.log(`当前页: ${val}`)
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
    .tag{
        margin: 10px;
    }
    .block{
        padding: 20px 0;
    }
    .feedBackImgContainer{
        height: 399px;
        width: 100%;
    }
    .articleTemplateContent{
        width: 100%;
    }
    .articleTitle{
        font-size: 26px !important;
        font-weight: bold;
        text-align: center;
        color: #333 !important;
    }
    .paragraphItem{
        width: 100%;
        height: auto;
        .paragraphItemTitle{
            width: 100%;
            font-size: 22px;
            padding: 20px 0 ;
            display: block;
        }
        .paragraphItemArticle{
            width: 100%;
            height: 400px;
            display: block;
            .paragraphArticleInput{
                width: 90%;
                height: 100%;
                margin: 0 auto;
                resize: none;
                display: block;
                font-size: 22px;
                overflow: auto;
            }
        }
        .paragraphItemInput{
            width: 100%;
            height: 32px;
            .paragraphTitleInput{
                width: 90%;
                margin: 0 auto;
                font-size: 22px;
                line-height: 32px;
                -webkit-appearance: none;
                background-color: #fff;
                background-image: none;
                border-radius: 4px;
                border: 1px solid #dcdfe6;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                color: #606266;
                outline: 0;
                padding: 0 15px;
                display: block;
                -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            }
        }
        .paragraphItemImage{
            width: 90%;
            display: block;
            margin: 0 auto;
            height:300px;
            position: relative;
            &.paragraphItemNothing{
                z-index: 1;
            }
            .paragraphItemEdit{
                width: 100%;
                height: 100%;
                position: absolute;
                top:0;
                left: 0;
                bottom:0;
                right: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border: 1px dashed #333;
                .upload{
                    width: 160px;
                    height: 160px;
                    font-size: 82px;
                    line-height: 160px;
                    text-align: center;
                    color: #3598DB;
                }
                .uploadDes{
                    font-size: 22px;
                    font-weight: normal;
                }
            }
            &.paragraphItemHave{
                .paragraphItemContent{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top:0;
                    left: 0;
                    bottom:0;
                    right: 0;
                    z-index: 2;
                    border: 1px solid #ffffff;
                    .close{
                        opacity: 0;
                    }
                    &:hover{
                        .close{
                            position: absolute;
                            top:0;
                            opacity: 1;
                            right: 0;
                            width: 30px;
                            height: 30px;
                            line-height: 30px;
                            text-align: center;
                            font-size: 22px;
                            color:#fff;
                            background: rgba(0,0,0,.5);
                            transition: opacity .3s ease;
                        }
                    }
                }

            }
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .templatePreview{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: auto;
        .templateItem{
            width: 49%;
            .sectionContent{
                height:100%;
                width: 100%;
                padding: 0;
                &::after {
                    content: ".";
                    clear: both;
                    display: block;
                    overflow: hidden;
                    font-size: 0;
                    height: 0;
                }
                .sectionSwiperContent{
                    height:100%;
                    width: 100%;
                }
            }

        }
    }
</style>
