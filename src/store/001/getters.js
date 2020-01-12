const  getters = {
    formInline(state){
        return state.formInline;
    },
    tableData(state){
        let changeDataList = (data)=>{
            let resultList = [];
            let originalList = JSON.parse(JSON.stringify(data));
            for(let num = 0;num<originalList.length;num++){
                let item = originalList[num];
                resultList.push(item);
                if(item.OneColList.length){
                    for(let innerNum = 0;innerNum<item.OneColList.length;innerNum++){
                        resultList.push(item.OneColList[innerNum]);
                    }
                }
            }
            return resultList;
        };
        return changeDataList(state.tableData);
    },
    originalTable(state){
      return state.tableData;
    },
    pageIndex(state){
        return state.pageIndex;
    },
    pageSize(state){
        return state.pageSize;
    },
    count(state){
        return state.count;
    },
    triggerTableNum(state){
      return state.triggerTableNum;
    },
    dialogVisible(state){
        return state.dialogVisible;
    },
    columnList(state){
      return state.columnList;
    },
    addMessage(state){
        return state.addMessage;
    },
    iconList(state){
        return state.iconList;
    },
    editType(state){
        return state.editType;
    },
    selectTableData(state){
        return state.selectTableData;
    },
    sortOnOff(state){
        return state.sortOnOff;
    }
};
export default  getters;
