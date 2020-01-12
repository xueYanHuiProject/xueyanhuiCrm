import Mock from 'mockjs';
const data = Mock.mock({
    'dataList|10':[
        {
            'id':'@datetime(T)',
            'changeId':'@datetime(T)',
            'job':"@ctitle(8)",
            'jobPhoto':"@image('383x265', '#894FC4', '#FFF', 'png','demo')",
            'jobNum':"@datetime(T)",
            'idNum':/^\d{17}(\d|x)$/,
            'idState|1':['新建','通过','驳回'],
            'studyNum':"@datetime(T)",
            'otherNum':"@datetime(T)",
            'studyPhoto':"@image('383x265', '#894FC4', '#FFF', 'png','demo')",
            'otherPhoto':"@image('383x265', '#894FC4', '#FFF', 'png','demo')",
            'sexType|1':['男','女'],
            'age|18-42':13,
            'auditState|1':['通过','驳回'],
            'educationLevel|1':['学士','硕士','博士'],
            'name': '@cname',
            'phone':/^1[3578]\d{9}$/,
            'email':"@email()",
            'auditTime':'@date("yyyy-MM-dd")',
            'registerTime':'@datetime()',
            'auditer':"@cname",
            'address': '@province' + '@city'
        }
    ]
});
export default {
    data
}
