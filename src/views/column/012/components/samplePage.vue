<template>
    <section class="admin-main">
        <h1 class="admin-title">查看样品资料</h1>
        <section class="admin-main-inner">
            <SampleItem v-for="(item,index) in tableList" :config="item" :key="item.id" :keyWord="index
+1"></SampleItem>
        </section>
    </section>
</template>
<script>
import axios from 'axios'
import SampleItem from './SampleItem'
const xhrUrl = {
  list: '/api/proSpecimen/getSpecimenInfo'
}
export default {
  name: 'reviewSample',
  components: {
    SampleItem
  },
  mounted () {
    const _this = this
    _this.getTableList()
  },
  data () {
    const _this = this
    const specimenId = _this.$route.query.specimenId
    const adminId = localStorage.getItem('adminId')
    return {
      tableList: [],
      specimenId: specimenId,
      updateUser: adminId
    }
  },
  methods: {
    getTableList () {
      const _this = this
      console.log('--------------------')
      console.log(_this.formInline)
      axios.get(xhrUrl.list, {
        params: {
          updateUser: _this.updateUser,
          id: _this.specimenId
        }
      })
        .then(function (response) {
          console.log(response)
          if (response.data.code === 200) {
            _this.tableList = response.data.result.sampleMap
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
