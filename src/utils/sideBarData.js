const param = {
  result: {
    des: '整个后台管理系统侧边栏结构原型',
    tabList: [
      {
        index: '0',
        title: '会员管理',
        icon: 'el-icon-ump-VIP',
        tabList: [
          {
            index: '0-1',
            title: '会员统计',
            icon: 'el-icon-ump-VIP',
            routerName: '001'
          },
          {
            index: '0-2',
            title: '会员反馈',
            icon: 'el-icon-ump-ico_feedback',
            routerName: '002'
          },
          {
            index: '0-3',
            title: '会员加盟',
            icon: 'el-icon-ump-Audit',
            routerName: '003'
          },
          {
            index: '0-4',
            title: '发票管理',
            icon: 'el-icon-s-ticket',
            routerName: '004'
          }
        ]
      },
      {
        index: '1',
        title: '订单管理',
        icon: 'el-icon-sell',
        tabList: [
          {
            index: '1-1',
            title: '订单统计',
            icon: 'el-icon-shopping-cart-full',
            routerName: '011'
          },
          {
            index: '1-2',
            title: '仪器预约',
            icon: 'el-icon-present',
            routerName: '012'
          },
          {
            index: '1-3',
            title: '需求统计',
            icon: 'el-icon-pie-chart',
            routerName: '013'
          }
        ]
      },
      {
        index: '2',
        title: 'CMS管理',
        icon: 'el-icon-ump-heads',
        tabList: [
          {
            index: '2-1',
            title: '仪器管理',
            icon: 'el-icon-video-camera-solid',
            routerName: '021'
          },
          {
            index: '2-2',
            title: '需求模板',
            icon: 'el-icon-notebook-2',
            routerName: '022'
          },
          {
            index: '2-3',
            title: '产品统计',
            icon: 'el-icon-notebook-1',
            routerName: '023'
          },
          {
            index: '2-5',
            title: '积分规则',
            icon: 'el-icon-document-copy',
            routerName: '025'
          },
          {
            index: '2-6',
            title: '优惠券',
            icon: 'el-icon-s-ticket',
            routerName: '026'
          },
          {
            index: '2-4',
            title: '合作高校',
            icon: 'el-icon-school',
            routerName: '024'
          }
        ]
      },
      {
        index: '3',
        title: '建站管理',
        icon: 'el-icon-ump-web2',
        tabList: [
          {
            index: '3-1',
            title: '首页轮播',
            icon: 'el-icon-picture',
            routerName: '031'
          },
          {
            index: '3-2',
            title: '栏目管理',
            icon: 'el-icon-s-promotion',
            routerName: '032'
          },
          {
            index: '3-3',
            title: '企业简介',
            icon: 'el-icon-reading',
            routerName: '033'
          },
          {
            index: '3-4',
            title: '联系我们',
            icon: 'el-icon-phone',
            routerName: '034'
          }
        ]
      },
      {
        index: '5',
        title: '系统管理',
        icon: 'el-icon-setting',
        tabList: [
          {
            index: '5-1',
            title: '管理员统计',
            auth: 0,
            icon: 'el-icon-ump-password',
            routerName: '052'
          },
          {
            index: '5-2',
            title: '修改密码',
            icon: 'el-icon-ump-password',
            routerName: '053'
          },
          {
            index: '5-3',
            title: '退出登录',
            icon: 'el-icon-ump-exittoapp',
            routerName: '054',
            eventFn: 'outLoginOne'
          }
        ]
      }
    ]
  }
}
export default param
