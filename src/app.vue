<template>
    <el-container class="adminContainer" @click.native.stop="closeMask($event)">
        <SideBar></SideBar>
        <ContentBar></ContentBar>
        <LoginBar v-show="!(loginOnOff.length>0)"></LoginBar>
    </el-container>
</template>
<script>
import LoginBar from './views/components/login/Login.vue'
import SideBar from './views/components/sideBar/sideBar'
import ContentBar from './views/components/main/MainContent'
import { mapGetters, mapActions } from 'vuex'
import { isEmptyObject } from './utils/common'
export default {
  data () {
    return {
      mag: '',
      Context: false
    }
  },
  components: {
    SideBar,
    ContentBar,
    LoginBar
  },
  mounted () {
    const t = this
    if (isEmptyObject(t.nowTabData)) {
      t.$router.push({ path: '/' })
    }
    setTimeout(() => {
      console.log(t.loginOnOff)
    }, 2000)
  },
  computed: {
    ...mapGetters(['nowTabData', 'loginOnOff'])
  },
  methods: {
    ...mapActions(['ContextOff']),
    closeMask (e) {
      const t = this
      t.ContextOff()
    }
  }
}
</script>
<style lang="scss" scoped >
    .adminContainer{
        position: relative;
        top: 0;
        /* bottom: 0; */
        left: 0;
        right: 0;
        height: 100vh; // 或 100%
        /*height: auto;*/
        overflow: auto;
        background: #fdfdfd;
    }
</style>
