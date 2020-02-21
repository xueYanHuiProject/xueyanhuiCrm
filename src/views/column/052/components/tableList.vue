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
                label="管理员ID">
            </el-table-column>
            <el-table-column
                prop="deleteFlag"
                label="管理员姓名">
            </el-table-column>
            <el-table-column
                prop="gender"
                :formatter="formatterGender"
                label="性别">
            </el-table-column>
            <el-table-column
                prop="identityNum"
                label="身份证号">
            </el-table-column>
            <el-table-column
                prop="phoneNum"
                label="联系方式">
            </el-table-column>
            <el-table-column
                prop="deleteFlag"
                :formatter="formatStatus"
                label="管理员状态">
            </el-table-column>
            <el-table-column
                prop="email"
                label="电子信箱">
            </el-table-column>
            <el-table-column
                prop="grade"
                sortable
                :formatter="formatterGrade"
                label="级别">
            </el-table-column>
            <el-table-column
                prop="createTime"
                sortable
                :formatter="formatterTime"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                sortable
                :formatter="formatterTime"
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
    formatStatus (row, column) {
      const status = row.status
      return parseInt(status, 10) === 0 ? '无效' : '激活'
    },
    formatterTime (row, column) {
      const time = row.createTime
      return formatDate(time)
    },
    formatterGrade (row, column) {
      const grade = parseInt(row.grade, 10)
      let gradeName = ''
      switch (grade) {
        case 0:
          gradeName = '超级管理员'
          break
        case 1:
          gradeName = '管理员'
          break
        case 2:
          gradeName = '运营人员'
          break
      }
      return gradeName
    },
    formatterGender (row, column) {
      const gender = parseInt(row.gender, 10)
      let genderName = ''
      switch (gender) {
        case 0:
          genderName = '女'
          break
        case 1:
          genderName = '男'
          break
      }
      return genderName
    }
  }
}
</script>

<style scoped>

</style>
