import Mock from 'mockjs';
const data = Mock.mock({
    'dataList|10':[
        {
            'dynamicId':'@datetime(T)',
            'authorId':'@datetime(T)',
            'dynamicContent':"@ctitle(288)",
            'articleTitle':"@ctitle(12)",
            'templateId':'@datetime(T)',
            'updateTime':'@datetime()',
            'dynamicType|1':['普通动态','脱单动态','话题动态'],
            'author': '@cname',
            'imgList|2':["@image('383x265', '#894FC4')"],
            'registerTime':'@datetime()',
            'praiseNum|18-562':22,
            'collectNum|18-562':22,
            'shareNum|18-562':22,
            'linkUrl':'@url()',
            'browseNum|18-562':22,
            'commentNum|18-562':22,
            'imgHave|1':['有图','无图'],
            'valid|1':['有效','无效']
        }
    ]
});
export default {
    data
}
