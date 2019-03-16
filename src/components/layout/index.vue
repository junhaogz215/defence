<template>
  <div class="wrapper">
    <Header class="layout_header" 
      :logo="'defence'" 
      :username="userInfo.data.userName"
      @exit="onExit"
      @menu="onMenu"
    ></Header>
    <Menu 
      class="layout_menu"
      :class="[{hidden: hideMenu}]"></Menu>
    <section 
      class="layout_main"
      @click="onMenu(true)"
    >
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from './Header'
import Menu from './Menu'
import api from '@/api'
import commonTemplate from '@/commonTemplate'
export default {
  mixins: [commonTemplate],
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      hideMenu: state => state.hideMenu
    })
  },
  components: {
    Header,
    Menu
  },
  data () {
    return {
    }
  },
  methods: {
    onExit () {
      this.$confirm('确认注销账户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async () => {
        let res = await api.logout()
        this.resMsg(res, '注销成功', '注销失败')
        if (res && res.data && res.data.status) {
          localStorage.setItem('userInfo', '{}')
          this.$router.push('/login')
          this.$store.commit('logout')
        }
      })
    },
    onMenu (hide) {
      this.$store.commit('hideMenu', hide)
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/minix.scss';
.wrapper {
  padding-top: 60px;
  width: 100%;
  background: #fff;   
  .layout_header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0; 
    z-index: 1;
  }
  .layout_menu {
    overflow: auto;
    position: fixed;
    z-index: 2;
    top: 62px;
    left: 0;
    bottom: 0;
    width: 200px;
    transition: all .3s ease-in-out 0s;
  }
  .layout_main {
    background: #fff;
    position: relative;
    min-height: 500px;
    margin-left: 200px;
    transition: all .3s ease-in-out 0s;
  }
}
@media screen and (max-width: 900px) {
  .wrapper {
    padding-top: 40px;
    .layout_menu {
      top: 42px;
      &.hidden {
        width: 0px;
      }
    }
    .layout_main {
      min-height: 500px;
      margin-left: 0px;
      &.hidden-menu {
        margin-left: 0;
      }
      .header_menu-btn {
        display: none;
      }
    }
  }
}
</style>
