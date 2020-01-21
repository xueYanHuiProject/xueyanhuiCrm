<template>
    <div class="block">
        <el-table
            :data="tableList"
            border
            highlight-current-row
            :default-sort = "{prop: 'createTime', order: 'descending'}"
            @current-change="selectionChange"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="高校ID">
            </el-table-column>
            <el-table-column
                prop="names"
                label="高校名称">
            </el-table-column>
            <el-table-column
                prop="cooDirection"
                :formatter="formatterCooDirection"
                label="合作方向">
            </el-table-column>
            <el-table-column
                label="高校图片">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <img :src="scope.row.schoolPicture" alt="" style="max-width: 500px;max-height:500px;border:1px solid #e9e9e9;box-shadow:0px 10px 18px 0px rgba(197,206,214,0.8);">
                        <div slot="reference" class="name-wrapper">
                            <img :src="scope.row.schoolPicture" alt="" style="width: 50px;height:50px;"/>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="contactName"
                label="联系人">
            </el-table-column>
            <el-table-column
                prop="contactPhone"
                :formatter="formatStatus"
                label="联系人电话">
            </el-table-column>
            <el-table-column
                prop="createTime"
                sortable
                :formatter="formatterCreateTime"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                sortable
                :formatter="formatterUpdateTime"
                label="更新时间">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { formatDate } from '../../../../utils/common'
export default {
  props: {
    tableList: {
      default () {
        return []
      },
      type: Array
    }
  },
  methods: {
    selectionChange (data) {
      const _this = this
      _this.$emit('setSelect', !!data)
      _this.$emit('setSelectData', data)
    },
    formatterCooDirection (row) {
      const type = row.cooDirection
      let des = ''
      switch (parseInt(type, 10)) {
        case 1:
          des = '实验测试'
          break
        case 2:
          des = '科研绘图'
          break
        case 3:
          des = '数据分析'
          break
        case 4:
          des = '实验耗材'
          break
      }
      return des
    },
    formatStatus (row, column) {
      const status = row.status
      return parseInt(status, 10) === 0 ? '下架' : '上架'
    },
    formatterCreateTime (row, column) {
      const time = row.createTime
      return formatDate(time)
    },
    formatterUpdateTime (row, column) {
      const time = row.updateTime || row.createTime
      return formatDate(time)
    }
  }
}
</script>

<style scoped>

</style>
