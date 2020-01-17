<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
                <el-form-item label="话题ID">
                    <el-input v-model="formInline.topicId" placeholder="话题ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="作者ID">
                    <el-input v-model="formInline.customerId" placeholder="作者ID" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formInline.customerName" placeholder="请输入姓名" class="adminInputEl"></el-input>
                </el-form-item>
                <el-form-item label="话题标题">
                    <el-input v-model="formInline.topicTitle" placeholder="话题标题" class="adminInputEl"></el-input>
                </el-form-item>
                <!--<el-form-item label="话题类型">
                    <el-select v-model="formInline.region" placeholder="话题类型" class="adminInputEl">
                        <el-option label="脱单" value="0"></el-option>
                        <el-option label="话题" value="1"></el-option>
                        <el-option label="普通" value="2"></el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="审核状态">
                    <el-select v-model="formInline.topicStatus" placeholder="话题状态" class="adminInputEl">
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="驳回" value="1"></el-option>
                        <el-option label="通过" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="话题状态">
                    <el-select v-model="formInline.isValid" placeholder="话题状态" class="adminInputEl">
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
                    @current-change="tableCurrentChange"
                    :default-sort = "{prop: 'updateTime', order: 'descending'}"
                    style="width: 100%">
                    <el-table-column
                        prop="topicId"
                        label="话题ID">
                    </el-table-column>
                    <el-table-column
                        prop="customerId"
                        label="作者ID">
                    </el-table-column>
                    <el-table-column
                        prop="customerName"
                        label="作者">
                    </el-table-column>
                    <el-table-column
                        prop="topicTitle"
                        label="话题标题">
                    </el-table-column>
                    <el-table-column
                        prop="forwardNum"
                        sortable
                        label="转发">
                    </el-table-column>
                    <el-table-column
                        prop="collectNum"
                        sortable
                        label="收藏">
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
                        prop="dynamicIdList"
                        sortable
                        :formatter="dynamicIdListNum"
                        label="评论">
                    </el-table-column>
                    <el-table-column
                        prop="topicStatus"
                        :formatter="formatterTopicStatus"
                        label="审核状态">
                    </el-table-column>
                    <el-table-column
                        prop="isValid"
                        :formatter="formatterValid"
                        label="话题状态">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="updateTime"
                        label="更新时间">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="createTime"
                        label="创建时间">
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
                            <el-button  type="default" @click.native="editArticle(0)">编辑</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click.native="pushContent(0)" type="default">推送</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click.native="activate(0)" type="default">激活</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click.native="detailInfo(0)" type="default">无效</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click.native="verifyActivate(0)" type="default">审核</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click.native="verifyDetailInfo(0)" type="default">驳回</el-button>
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
            <span>确定要无效这条话题？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="detailInfo(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            width="30%"
            title="提示"
            :visible.sync="activateOnOff"
            append-to-body>
            <span>确定要激活这条话题？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="activateOnOff = false">取 消</el-button>
                <el-button type="primary" @click="activate(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            width="30%"
            title="提示"
            :visible.sync="verifyInnerVisible"
            append-to-body>
            <span>确定要驳回这条话题？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="verifyInnerVisible = false">取 消</el-button>
                <el-button type="primary" @click="verifyDetailInfo(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            width="30%"
            title="提示"
            :visible.sync="verifyActivateOnOff"
            append-to-body>
            <span>确定要审核通过这条话题？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="verifyActivateOnOff = false">取 消</el-button>
                <el-button type="primary" @click="verifyActivate(1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            width="50%"
            :title="selectedData.articleTitle"
            :visible.sync="pushOnOff"
            center
            append-to-body>
            <el-form :inline="true" class="demo-form-inline" label-width="80px" label-position="left">
                <el-form-item label="推送类型" :inline="true">
                    <el-select v-model="formInline.region" placeholder="推送类型" class="adminInputEl">
                        <el-option label="个性化推送" value="0"></el-option>
                        <el-option label="全站推送" value="1"></el-option>
                        <el-option label="单独推送" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推送位置" :inline="true">
                    <el-select v-model="formInline.region" placeholder="推送位置" class="adminInputEl">
                        <el-option label="遇见栏目" value="0"></el-option>
                        <el-option label="消息栏目" value="1"></el-option>
                        <el-option label="首页全部" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级" :inline="true">
                    <el-select v-model="formInline.region" placeholder="推送位置" class="adminInputEl">
                        <el-option label="按序推送" value="0"></el-option>
                        <el-option label="优先推送" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推送ID" :inline="true">
                    <el-input v-model="formInline.user" placeholder="请输入推送ID" class="adminInputEl"></el-input>
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
            width="50%"
            :title="selectedData.articleTitle"
            :visible.sync="articleDialog"
            center
            append-to-body
            class="articleTitle">
            <div class="block articleTemplateContent">
                <div class="block templatePreview">
                    <el-aside class="templateItem" width="100%">
                        <div class="paragraphItem">
                            <span class="paragraphItemTitle">话题标题</span>
                            <article class="paragraphItemInput">
                                <input type="text" class="paragraphTitleInput" placeholder="话题标题"/>
                            </article>
                        </div>
                        <div class="paragraphItem">
                            <span class="paragraphItemTitle">话题封面</span>
                            <!--paragraphItemNothing paragraphItemHave无图片-->
                            <article class="paragraphItemImage paragraphItemHave">
                                <section class="paragraphItemContent">
                                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524054334359&di=8222adebfed9c9f02b8b9ae3c8e9245d&imgtype=0&src=http%3A%2F%2Fpic40.nipic.com%2F20140417%2F18460687_100054352164_2.jpg" alt="">
                                    <i class="close el-icon-close"></i>
                                </section>

                                <section class="paragraphItemEdit">
                                    <i class="el-icon-upload upload">
                                    </i>
                                    <i class="uploadDes">上传图片</i>
                                </section>
                            </article>
                        </div>
                        <div class="paragraphItem">
                            <span class="paragraphItemTitle">话题缩略内容</span>
                            <article class="paragraphItemArticle">
                                <textarea name=""  cols="30" rows="10" class="paragraphArticleInput"></textarea>
                            </article>
                        </div>
                    </el-aside>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="articleDialog = false">取 消</el-button>
                <el-button type="primary" @click="editArticle(1)">确 定</el-button>
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
        pageIndex: 1,
        pageSize: 10,
        topicId: '', // 该话题的唯一标识
        topicTitle: '', // 该话题的唯一标识
        customerId: '', // 该话题的作者id,
        customerName: '', // 该话题的作者id,
        topicStatus: '', // 0创建待审核，1审核驳回，2审核通过
        isValid: ''// 0无效，1有效
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
      count: 0,
      pageIndex: 1,
      pageSize: 10,
      value2: '',
      pushOnOff: false,
      activateOnOff: false,
      verifyActivateOnOff: false,
      articleDialog: false,
      innerVisible: false,
      verifyInnerVisible: false,
      centerDialogVisible: false,
      selectedOne: false,
      selectedData: {},
      currentPage4: 4,
      tableData: []
    }
  },
  mounted () {
    const t = this
    t.getTopicList()
  },
  watch: {
    pageIndex (newVal) {
      const t = this
      t.formInline.pageIndex = newVal
      t.getTopicList()
    },
    pageSize (newVal) {
      const t = this
      t.formInline.pageSize = newVal
      t.getTopicList()
    }
  },
  methods: {
    checkList () {
      const t = this
      t.pageIndex === 1 ? t.getTopicList() : t.pageIndex = 1
    },
    callback () {
      console.log('执行')
    },
    formatterValid (row, column) {
      const t = this
      const type = row.isValid
      return Common.formatterValid(type)
    },
    dynamicIdListNum (row, column) {
      const t = this
      const type = row.dynamicIdList
      // console.log(type);
      return parseInt(Common.listNum(type), 10)
    },
    formatterTopicStatus (row, column) {
      const t = this
      const type = row.topicStatus
      // console.log(type);
      return Common.TopicStatus(type)
    },
    imgInit (e) {
      console.log(e)
    },
    getTopicList () {
      const t = this
      axios.get('/call/topic/getTopicList', {
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
    resetList () {
      const t = this
      t.pageSize = 10
      t.pageIndex = 1
      t.formInline = {
        pageIndex: 1,
        pageSize: 10,
        topicId: '', // 该话题的唯一标识
        topicTitle: '', // 该话题的唯一标识
        customerId: '', // 该话题的作者id,
        customerName: '', // 该话题的作者id,
        topicStatus: '', // 0创建待审核，1审核驳回，2审核通过
        isValid: ''// 0无效，1有效
      }
      t.getTopicList()
    },
    tableCurrentChange (val) {
      const t = this
      if (val) {
        console.log(val)
        t.selectedOne = true
        t.selectedData = val
      }
    },
    detailInfo (type) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要无效的话题!')
      } else {
        if (type === 0) {
          t.innerVisible = true
        } else if (type === 1) {
          axios({
            url: '/call/topic/invalid',
            method: 'POST',
            data: {
              topicId: t.selectedData.topicId,
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
              message: t.selectedData.topicTitle + '话题已被无效',
              type: 'success'
            })
            t.getTopicList()
          })
        }
      }
    },
    verifyDetailInfo (type) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要驳回的话题!')
      } else {
        if (type === 0) {
          t.verifyInnerVisible = true
        } else if (type === 1) {
          axios({
            url: '/call/topic/verifyInvalid',
            method: 'POST',
            data: {
              topicId: t.selectedData.topicId,
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
            t.verifyInnerVisible = false
            t.$message({
              message: t.selectedData.topicTitle + '话题已被驳回',
              type: 'success'
            })
            t.getTopicList()
          })
        }
      }
    },
    pushContent (type) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要推送的文章!')
      } else {
        if (type === 0) {
          t.pushOnOff = true
        } else if (type === 1) {
          t.pushOnOff = false
          t.$message({
            message: t.selectedData.articleTitle + '文章已推送',
            type: 'success'
          })
        }
      }
      console.log('推送')
    },
    activate (type) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要激活的话题!')
      } else {
        if (type === 0) {
          t.activateOnOff = true
        } else if (type === 1) {
          axios({
            url: '/call/topic/active',
            method: 'POST',
            data: {
              topicId: t.selectedData.topicId,
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
              message: t.selectedData.topicTitle + '话题已被激活',
              type: 'success'
            })
            t.getTopicList()
          })
        }
      }
    },
    verifyActivate (type) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要审核的话题!')
      } else {
        if (type === 0) {
          t.verifyActivateOnOff = true
        } else if (type === 1) {
          axios({
            url: '/call/topic/verifyActive',
            method: 'POST',
            data: {
              topicId: t.selectedData.topicId,
              updateState: '2'
            },
            transformRequest: [function (data) {
              return 'paramJson=' + JSON.stringify(data)
            }],
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: 30000
          }).then(function (req) {
            t.verifyActivateOnOff = false
            t.$message({
              message: t.selectedData.topicTitle + '话题已审核通过',
              type: 'success'
            })
            t.getTopicList()
          })
        }
      }
    },
    editArticle (type) {
      const t = this
      if (!t.selectedOne) {
        t.$message.error('请选择您要无效的话题!')
      } else {
        if (type === 0) {
          t.articleDialog = true
        } else if (type === 1) {
          t.articleDialog = false
          t.$message({
            message: t.selectedData.articleTitle + '话题已生成',
            type: 'success'
          })
        }
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    onSubmit () {
      console.log('submit!')
    },
    handleSizeChange (val) {
      const t = this
      console.log(`每页 ${val} 条`)
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
    .adminInputEl{
        width:200px;
    }
    .tag{
        margin: 10px;
    }
    .adminContentInner{
        @include ContentInner();
    }
    .block{
        padding: 20px 0 ;
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
            padding: 10px 0 ;
            display: block;
        }
        .paragraphItemArticle{
            width: 100%;
            height: 300px;
            display: block;
            .paragraphArticleInput{
                width: 90%;
                margin: 0 auto;
                resize: none;
                display: block;
                font-size: 22px;
                /*overflow: auto;*/
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
