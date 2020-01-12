class Common {
    constructor(){
        this.sexFormat = this.sexFormat.bind(this);
        this.accountState = this.accountState.bind(this);
        this.jsGetAge = this.jsGetAge.bind(this);
        this.customerDegree = this.customerDegree.bind(this);
        this.blackReason = this.blackReason.bind(this);
        this.dynamicType = this.dynamicType.bind(this);
        this.listNum = this.listNum.bind(this);
        this.auditType = this.auditType.bind(this);
        this.auditResult = this.auditResult.bind(this);
        this.isEmptyObject = this.isEmptyObject.bind(this);
        this.checkInvalid = this.checkInvalid.bind(this);
        this.rejectWarn = this.rejectWarn.bind(this);
        this.createTime = this.createTime.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }
    checkInvalid(val){
        if(((typeof val =='string')&&(val.length==0))||(val==undefined)||(val=='undefined')||(val=='null')||(typeof val=='undefined')||(typeof val=='null')||(val==null)){
            return true;
        }else{
            return false;
        }
    }
    formatDate(t){
        let now=new Date(t);
        let year=now.getFullYear();
        let month=now.getMonth()+1;
        let date=now.getDate();
        let hour=now.getHours();
        let minute=now.getMinutes();
        let second=now.getSeconds();
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
    }
    createTime(dateObj, type){
        let timeStr = '';
        let addZero = (str) => {
            if (parseInt(str, 10) < 10) {
                return '0' + parseInt(str, 10);
            }
            else {
                return parseInt(str, 10);
            }
        };
        type === 0 ? timeStr = dateObj.getFullYear() + '-' + addZero(dateObj.getMonth() + 1) + '-' + addZero(dateObj.getDate()) + ' ' + addZero(dateObj.getHours()) + ':' + addZero(dateObj.getMinutes()) + ':' + addZero(dateObj.getSeconds()) : timeStr = dateObj.getFullYear() + '-' + addZero(dateObj.getMonth() + 1) + '-' + addZero(dateObj.getDate()) + ' ' + 23 + ':' + 59 + ':' + 59;
        return timeStr;
    }
    isEmptyObject(obj){
        for(let n in obj){return false}
        return true;
    }
    TopicStatus(type){
        let str = '';
        switch (parseInt(type)){
            //用户学位0脱单动态，1话题动态，2普通动态
            case 0:
                str='待审核';
                break;
            case 1:
                str='驳回';
                break;
            case 2:
                str='通过';
                break;
        }
        return str;
    }
    recommendResourceType(type){
        let str = '';
        switch (parseInt(type)){
            //推荐的资源类型0文章，1话题
            case 0:
                str='文章';
                break;
            case 1:
                str='话题';
                break;
        }
        return str;
    }
    recommendPosition(type){
        let str = '';
        switch (parseInt(type)){
            //推荐的位置0遇见栏目，1首页栏目，2消息栏目
            case 0:
                str='遇见栏目';
                break;
            case 1:
                str='首页栏目';
                break;
            case 2:
                str='消息栏目';
                break;
        }
        return str;
    }
    recommendGrade(type){
        let str = '';
        switch (parseInt(type)){
            //推荐的位置0遇见栏目，1首页栏目，2消息栏目
            case 0:
                str='按序推荐';
                break;
            case 1:
                str='优先推荐';
                break;
        }
        return str;
    }
    recommendType(type){
        let str = '';
        switch (parseInt(type)){
            //推荐的位置0遇见栏目，1首页栏目，2消息栏目
            case 0:
                str='全站推送';
                break;
            case 1:
                str='单独推送';
                break;
        }
        return str;
    }
    sexFormat(type){
        return parseInt(type,10)===0?'女':'男';
    }
    dynamicType(type){
        let str = '';
        switch (parseInt(type)){
            //用户学位0脱单动态，1话题动态，2普通动态
            case 0:
                str='脱单动态';
                break;
            case 1:
                str='话题动态';
                break;
            case 2:
                str='普通动态';
                break;
        }
        return str;
    }
    listNum(str){
        if(str&&str.indexOf(',')>-1){
            return str.split(',').length;
        }else{
            return 0;
        }
    }
    formatterValid(type){
        return parseInt(type,10)===0?'无效':'有效';
    }
    auditType(type){
        return parseInt(type,10)===0?'新建':'结束';
    }
    auditResult(type){
        return parseInt(type,10)===0?'驳回':'通过';
    }
    jsGetAge(strBirthday){
        var returnAge;
        var strBirthdayArr=strBirthday.split("-");
        var birthYear = strBirthdayArr[0];
        var birthMonth = strBirthdayArr[1];
        var birthDay = strBirthdayArr[2];

        var d = new Date();
        var nowYear = d.getFullYear();
        var nowMonth = d.getMonth() + 1;
        var nowDay = d.getDate();

        if(nowYear == birthYear){
            returnAge = 0;//同年 则为0岁
        }
        else{
            var ageDiff = nowYear - birthYear ; //年之差
            if(ageDiff > 0){
                if(nowMonth == birthMonth) {
                    var dayDiff = nowDay - birthDay;//日之差
                    if(dayDiff < 0)
                    {
                        returnAge = ageDiff - 1;
                    }
                    else
                    {
                        returnAge = ageDiff ;
                    }
                }
                else
                {
                    var monthDiff = nowMonth - birthMonth;//月之差
                    if(monthDiff < 0)
                    {
                        returnAge = ageDiff - 1;
                    }
                    else
                    {
                        returnAge = ageDiff ;
                    }
                }
            }
            else
            {
                returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
            }
        }

        return returnAge;//返回周岁年龄

    }
    customerDegree(type){
        let str = '';
        switch (parseInt(type)){
            //用户学位0大学专科，1大学本科，2研究生，3博士，4博士后
            case 0:
            str='大学专科';
            break;
            case 1:
            str='大学本科';
            break;
            case 2:
            str='研究生';
            break;
            case 3:
            str='博士';
            break;
            case 4:
            str='博士后';
            break;
        }
        return str;
    }
    blackReasonFormat(type){
        let str = '';
        switch (parseInt(type)){
            case 0:
                str='营销诈骗';
                break;
            case 1:
                str='淫秽色情';
                break;
            case 2:
                str='不友善行为';
                break;
            case 3:
                str='诱导欺骗';
                break;
            case 4:
                str='虚假资料';
                break;
        }
        return str;
    }
    blackState(type){
        let str = '';
        switch (parseInt(type)){
            case 0:
                str='拉黑';
                break;
            case 1:
                str='激活';
                break;
        }
        return str;
    }
    blackReason(){
        return [
            {
                reasonName:'营销诈骗',
                reasonType:0
            },
            {
                reasonName:'淫秽色情',
                reasonType:1
            },
            {
                reasonName:'不友善行为',
                reasonType:2
            },
            {
                reasonName:'诱导欺骗',
                reasonType:3
            },
            {
                reasonName:'虚假资料',
                reasonType:4
            }
        ]
    }
    rejectWarn(){
        return [
            {
                reasonName:'虚假资料',
                reasonType:0
            },
            {
                reasonName:'证件不清晰',
                reasonType:1
            },
            {
                reasonName:'证件号码不一致',
                reasonType:2
            },
            {
                reasonName:'资料不齐全',
                reasonType:3
            }
        ]
    }
    accountState(type){
        let str = '';
        switch (parseInt(type)){
            //用户账户状态，0注册，1提交认证，等待审核，2,认证通过,3驳回认证,4拉黑
            case 0:
            str='注册';
            break;
            case 1:
            str='提交认证';
            break;
            case 2:
            str='认证通过';
            break;
            case 3:
            str='驳回认证';
            break;
            case 4:
            str='拉黑';
            break;
        }
        return str;
    }
}
export default  new Common();
