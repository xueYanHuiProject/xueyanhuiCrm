import Mock from 'mockjs';
const data = Mock.mock({
   'dataList|10':[
       {
           'id':'@datetime(T)',
           'job':"@ctitle(8)",
           'state|1':['游客', '已注册','已完善信息','已审核','正在审核','更改信息','拉黑'],
           'sexType|1':['男','女'],
           'age|18-42':13,
           'educationLevel|1':['学士','硕士','博士'],
           'phone':/^1[3578]\d{9}$/,
           'email':"@email()",
           'activeVal|100-999':1,
           'auditTime':'@date("yyyy-MM-dd")',
           'registerTime':'@date("yyyy-MM-dd")',
           'date': '@date("yyyy-MM-dd")',
           'name': '@cname',
           'auditer':"@cname",
           'address': '@province' + '@city'
       }
   ]
});
export default {
    data
}
