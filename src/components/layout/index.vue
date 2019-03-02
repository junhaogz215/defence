<template>
  <div class="wrapper">
    <header class="header">
      <span class="header_logo">defence</span>
      <span class="header_userinfo">
        <span v-if="userInfo.islogin">
          <router-link to="/login">登录</router-link>
        </span>
        <span v-else>
          <span>
            用户名：junhao
          </span>
          <span class="header_exit">退出</span>
        </span>
      </span>
    </header>
    <section class="container">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/minix.scss';
  .wrapper {
    padding-top: 60px;
    width: 100%;
    background: #fff;    
    .header {
      @include clearf;
      padding: 0 20px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      min-height: 60px;
      background: rgba(255, 255, 255, 0.795);
      line-height: 60px;
      white-space: nowrap;
      .header_logo {
        font-size: 20px;
        font-weight: 700;
      }
      .header_userinfo {
        float: right;
      }
      box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.5);
      .header_exit {
        margin-left: 20px;
        text-decoration: underline;
        &:hover {
          color: rgb(176, 220, 231);
          cursor: pointer;
        }
      }
    }
    .container {
      min-height: 500px;
    }
  }


</style>
