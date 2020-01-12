import index from './views/components/Calendar/index.vue'
import manage from './views/column/001/001.vue';//管理全站栏目
import icon from './views/column/002/002.vue';//管理全站icon
import customer01 from './views/column/003/003.vue';//会员管理列表页
import customer02 from './views/column/004/004.vue';//会员审核列表页
import customer03 from './views/column/005/005.vue';//会员反馈列表页
import customer04 from './views/column/006/006.vue';//会员举报列表页
import customer05 from './views/column/007/007.vue';//会员黑名单列表页
import resource01 from './views/column/008/008.vue';//资源动态列表页
import resource02 from './views/column/009/009.vue';//资源文章列表页
import resource03 from './views/column/010/010.vue';//推荐列表页
import resource04 from './views/column/011/011.vue';//话题列表页
import message01 from './views/column/012/012.vue';//消息列表页
import admin from './views/column/013/013.vue';//管理员列表页
import Tabid1 from './views/tab/tabContent/tabid1.vue';
import Tabid2 from './views/tab/tabContent/tabid2.vue';
import Tabid3 from './views/tab/tabContent/tabid3.vue';
import Tabid4 from './views/tab/tabContent/tabid4.vue';
import Tabid5 from './views/tab/tabContent/tabid5.vue';
import Tabid6 from './views/tab/tabContent/tabid6.vue';
import Tabid22 from './views/tab/tabContent/tabid022.vue';
import Tabid21 from './views/tab/tabContent/tabid021.vue';
import Tabid26 from './views/tab/tabContent/tabid026.vue';
import Tabid23 from './views/tab/tabContent/tabid023.vue';
import Tabid24 from './views/tab/tabContent/tabid024.vue';
import Tabid25 from './views/tab/tabContent/tabid025.vue';
import Tabid32 from './views/tab/tabContent/tabid032.vue';
import Tabid52 from './views/tab/tabContent/tabid052.vue';
import Tabid53 from './views/tab/tabContent/tabid053.vue';
import aside from './views/tab/tabContent/aside.vue';
export default {
    linkActiveClass: 'active',
    routes: [
        {
        path: '/',
        component: index
        },
        {
            path: '*',
            component: index
        },
        /*{
            path:"/011",
            component: Tabid1
        },*/
        {
            path:"/001",
            component: manage
        },
        {
            path:"/002",
            component: icon
        },
        {
            path:"/003",
            component: customer01
        },
        {
            path:"/004",
            component: customer02
        },
        {
            path:"/005",
            component: customer03
        },
        {
            path:"/006",
            component: customer04
        },
        {
            path:"/007",
            component: customer05
        },
        {
            path:"/008",
            component: resource01
        },
        {
            path:"/009",
            component: resource02
        },
        {
            path:"/010",
            component: resource03
        },
        {
            path:"/011",
            component: resource04
        },
        {
            path:"/012",
            component: message01
        },
        /*{
            path:"/012",
            component: Tabid2
        },*/
        {
            path:"/013",
            component: admin
        },
        {
            path:"/014",
            component: Tabid4
        },
        {
            path:"/015",
            component: Tabid5
        },
        {
            path:"/016",
            component: Tabid6
        },
        {
            path:"/022",
            component: Tabid22
        },
        {
            path:"/021",
            component: Tabid21
        },
        {
            path:"/026",
            component: Tabid26
        },
        {
            path:"/023",
            component: Tabid23
        },
        {
            path:"/032",
            component: Tabid32
        },
        {
            path:"/024",
            component: Tabid24
        },
        {
            path:"/025",
            component: Tabid25
        },
        {
            path:"/052",
            component: Tabid52
        },
        {
            path:"/053",
            component: Tabid53
        },
        {
            path:"/054",
            component: aside
        },
    ]
}
