<template>
    <el-dialog
        :visible.sync="sortOnOff"
        width="64%"
        :before-close="handleClose"
        center>
        <div class="columnContainer block">
            <div
                class="column-item"
                :class="item.iconName"
                v-for="(item,index) in sortList" v-dragging="{ item: item, list: sortList, group: 'color' }"
                :key="index"
            >{{item.title}}</div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="sortColumn">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import axios from 'axios';
    import Common from '../../../../utils/common';
    import { createNamespacedHelpers } from 'vuex';
    const { mapGetters,mapActions } = createNamespacedHelpers('module001');
    export default {
        data(){
            let adminId = Common.checkInvalid(localStorage.getItem('adminId'))?'':localStorage.getItem('adminId');
            return {
                sortList: [],
                storeSortList:[]
            }
        },
        computed:{
            ...mapGetters(['sortOnOff','selectTableData','originalTable'])
        },
        methods:{
            ...mapActions(['hideSort','triggerTable','tableCurrentChange']),
            handleClose(){
                let _this = this;
                _this.hideSort();
            },
            sortColumn(){
                let _this = this;
                console.log('确定排序');
                let createOrderData = (data)=>{
                  let resultList = [];
                  let orginalData = JSON.parse(JSON.stringify(data));
                  for(let num = 0;num<orginalData.length;num++){
                      let item = {
                          id:orginalData[num].id,
                          orderBy:num+1
                      };
                      resultList.push(item);
                  }
                  return resultList;
                };
                axios({
                    method: 'post',
                    url: '/api/columns/updateOrder',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    data: createOrderData(_this.storeSortList)
                }).then(function(response) {
                    let reqData = response.data;
                    if(parseInt(reqData.code,10)===200){
                        _this.hideSort();
                        _this.sortList = [];
                        _this.storeSortList = [];
                        _this.$message({
                            showClose: true,
                            message: '更新成功',
                            type: 'success'
                        });
                        _this.triggerTable();
                    }
                    console.log(response.data);
                });

            },
            draggedInit(){
                let _this = this;
                _this.$dragging.$on('dragged', ({ value }) => {
                    console.log(value.item)
                    console.log(value.list)
                    _this.storeSortList = value.list;
                    console.log(value.otherData)
                })
            }
        },
        watch:{
            sortOnOff(newVal){
                let _this = this;
                if(newVal){
                    let selectGrade = _this.selectTableData.grade;
                    let changeDataList = (data)=>{
                        let originalList = JSON.parse(JSON.stringify(data));
                        for(let num = 0;num<originalList.length;num++){
                            let item = originalList[num];
                            if((_this.selectTableData.parentColumnId==item.id)&&item.OneColList.length){
                                return  item.OneColList;
                            }
                        }
                    };
                    if(parseInt(selectGrade,10)===0){
                        _this.sortList = JSON.parse(JSON.stringify(_this.originalTable));
                    }else{
                        _this.sortList = JSON.parse(JSON.stringify(changeDataList(_this.originalTable)));
                    }
                    console.log(_this.selectTableData);
                }
            }
        },
        mounted() {
            let _this = this;
            console.log('进入到这里');
            _this.draggedInit();
        }
    }
</script>
<style lang="scss" scoped>
    .columnContainer{
        &:before,&:after {
            content: "";
            display: block;
            clear: both;
        }
    }
    .column-item{
        width: 200px;
        height: 200px;
        border: 1px solid rgba(98,111,140,.15);
        box-shadow: 0 3px 8px 0 hsla(207,6%,72%,.35);
        border-radius: 4px;
        margin: 8px;
        float: left;
        text-align: center;
        font-size:20px;
        &::before{
            display: block;
            width: 150px;
            height: 160px;
            margin: 0 auto;
            text-align: center;
            line-height: 180px;
            font-size:60px;
        }
    }

</style>
