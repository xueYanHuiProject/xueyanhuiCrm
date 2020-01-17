import Mock from 'mockjs'
const data = Mock.mock({
  'dataList|10': [
    {
      recommendId: '@datetime(T)',
      resourceId: '@datetime(T)',
      articleTitle: '@ctitle(12)',
      'resourceType|1': ['文章', '话题'],
      'recommendType|1': ['个性化推送', '全站推送', '单独推送'],
      'recommendPosition|1': ['遇见栏目', '消息栏目', '首页全部'],
      'recommendOrder|1': ['按序推送', '优先推送', '延后推送'],
      'valid|1': ['有效', '无效'],
      registerTime: '@datetime()',
      updateTime: '@datetime()'
    }
  ]
})
export default {
  data
}
