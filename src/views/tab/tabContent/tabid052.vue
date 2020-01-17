<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="操作ID">
                    <el-input v-model="formInline.user" placeholder="操作ID"></el-input>
                </el-form-item>
                <el-form-item label="操作">
                    <el-input v-model="formInline.user" placeholder="请输入操作"></el-input>
                </el-form-item>
                <el-form-item label="用户身份">
                    <el-select v-model="formInline.region" placeholder="用户身份">
                        <el-option label="游客" value="0"></el-option>
                        <el-option label="普通用户" value="1"></el-option>
                        <el-option label="审核用户" value="2"></el-option>
                        <el-option label="更改信息用户" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="block">
                <el-table
                    :data="jurisdiction"
                    border
                    highlight-current-row
                    @current-change="handleCurrentChange"
                    style="width: 100%">
                    <el-table-column
                        prop="operation"
                        label="操作ID">
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        label="操作">
                    </el-table-column>
                    <el-table-column
                        prop="level0.onOff"
                        label="游客">
                    </el-table-column>
                    <el-table-column
                        prop="level1.onOff"
                        label="普通用户">
                    </el-table-column>
                    <el-table-column
                        prop="level2.onOff"
                        label="审核用户">
                    </el-table-column>
                    <el-table-column
                        prop="level3.onOff"
                        label="更改审核信息">
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
            </div>
            <div class="block adminAuditControl">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-button>修改历史</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">编辑</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>

    </section>

</template>
<style lang="scss" scoped>

    @import "../../../static/scss/common";
    .adminContentInner{
        @include ContentInner();
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
import axios from 'axios'
import userData from '../../../virtualData/UserStatistics'
export default {
  data () {
    return {
      currentPage4: 4,
      formInline: {
        user: ''
      },
      jurisdiction: [],
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
      tableData: userData.data.dataList
    }
  },
  mounted () {
    const t = this
    t.jurisdiction = [
      {
        title: '浏览一级页面',
        operation: '001',
        level0: {
          onOff: 1
        },
        level1: {
          onOff: 1
        },
        level2: {
          onOff: 1
        },
        level3: {
          onOff: 1
        }
      }, {
        title: '浏览终端页',
        operation: '002',
        level0: {
          onOff: 1
        },
        level1: {
          onOff: 1
        },
        level2: {
          onOff: 1
        },
        level3: {
          onOff: 1
        }
      }, {
        title: '浏览他的个人中心',
        operation: '003',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 1
        },
        level2: {
          onOff: 1
        },
        level3: {
          onOff: 1
        }
      }, {
        title: '获取对方联系方式',
        operation: '004',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 0
        },
        level2: {
          onOff: 1,
          val: -3
        },
        level3: {
          onOff: 1,
          val: -3
        }
      }, {
        title: '留言',
        operation: '005',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 1,
          val: 1
        },
        level2: {
          onOff: 1,
          val: -1
        },
        level3: {
          onOff: 1,
          val: -1
        }
      }, {
        title: '点赞',
        operation: '006',
        level0: {
          onOff: 1
        },
        level1: {
          onOff: 1
        },
        level2: {
          onOff: 1
        },
        level3: {
          onOff: 1
        }
      }, {
        title: '被赞',
        operation: '007',
        level0: {
          onOff: 1
        },
        level1: {
          onOff: 1
        },
        level2: {
          onOff: 1,
          val: 1
        },
        level3: {
          onOff: 1,
          val: 1
        }
      }, {
        title: '评论动态',
        operation: '008',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 1,
          val: 2
        },
        level2: {
          onOff: 1
        },
        level3: {
          onOff: 1
        }
      },
      {
        title: '欢迎',
        operation: '009',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 1,
          val: 2
        },
        level2: {
          onOff: 1
        },
        level3: {
          onOff: 1
        }
      },
      {
        title: '被欢迎',
        operation: '010',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 1,
          val: 2
        },
        level2: {
          onOff: 1
        },
        level3: {
          onOff: 1
        }
      },
      {
        title: '被评论',
        operation: '011',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 1,
          val: 1
        },
        level2: {
          onOff: 1,
          val: 1
        },
        level3: {
          onOff: 1,
          val: 1
        }
      }, {
        title: '收藏话题',
        operation: '012',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 1
        },
        level2: {
          onOff: 1
        },
        level3: {
          onOff: 1
        }
      }, {
        title: '收藏文章',
        operation: '013',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 1
        },
        level2: {
          onOff: 1
        },
        level3: {
          onOff: 1
        }
      }, {
        title: '自定义封面',
        operation: '014',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 0
        },
        level2: {
          onOff: 1
        },
        level3: {
          onOff: 1
        }
      }, {
        title: '发表普通动态',
        operation: '015',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 1,
          val: 1
        },
        level2: {
          onOff: 1
        },
        level3: {
          onOff: 1
        }
      }, {
        title: '发表脱单动态',
        operation: '016',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 1,
          val: 1
        },
        level2: {
          onOff: 1,
          val: 2
        },
        level3: {
          onOff: 1
        }
      }, {
        title: '发表文章',
        operation: '017',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 0
        },
        level2: {
          onOff: 1,
          val: 2
        },
        level3: {
          onOff: 1,
          val: 2
        }
      }, {
        title: '发表话题',
        operation: '018',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 0
        },
        level2: {
          onOff: 1,
          val: 2
        },
        level3: {
          onOff: 1,
          val: 2
        }
      }, {
        title: '分享',
        operation: '019',
        level0: {
          onOff: 1
        },
        level1: {
          onOff: 1
        },
        level2: {
          onOff: 1,
          val: 1
        },
        level3: {
          onOff: 1,
          val: 1
        }
      }, {
        title: '自动生成脱单动态',
        operation: '020',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 0
        },
        level2: {
          onOff: 1,
          val: 1
        },
        level3: {
          onOff: 1,
          val: 1
        }
      }, {
        title: '修改个人资料',
        operation: '021',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 1,
          val: 1
        },
        level2: {
          onOff: 1,
          val: 1
        },
        level3: {
          onOff: 1,
          val: 1
        }
      }, {
        title: '修改认证资料',
        operation: '022',
        level0: {
          onOff: 0
        },
        level1: {
          onOff: 0
        },
        level2: {
          onOff: 1
        },
        level3: {
          onOff: 0
        }
      }
    ]
    /* axios({
                url: '/src/tabData/jurisdiction.json',
                method: "GET",
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                timeout: 30000
            }).then(function (res) {
                t.jurisdiction = res.data.dataList;
                console.log(t.jurisdiction);
            }).catch(function (err) {
            }); */
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    onSubmit () {
      console.log('submit!')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
