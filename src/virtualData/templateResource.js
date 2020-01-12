import Mock from 'mockjs';
const data = Mock.mock({
    'dataList|10':[
        {
            'templateId':'@datetime(T)',
            'useTime|18-562':22,
            'browseTime|18-562':22,
            'author': '@cname',
            'valid|1':['有效','无效'],
            'structure|1':[],
            'registerTime':'@datetime()',
            'updateTime':'@datetime()'
        }
    ]
});
export default {
    data
}
