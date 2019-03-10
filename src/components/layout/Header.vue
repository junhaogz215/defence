<template>
  <header 
    class="header"
    :style="{
      backgroundColor
    }"
  >
    <span class="header_logo" v-if="logo" v-text="logo"></span>
    <i class="header_menu-btn" @click="emitMenu"></i>
    <span class="header_userinfo">
      <span v-if="!username">
        <router-link to="/login">登录</router-link>
      </span>
      <span v-else>
        <span>
          用户名：{{ username }}
        </span>
        <span class="header_exit" @click="emitExit">退出</span>
      </span>
      <el-color-picker
        v-model="bgColor"
        @active-change="commitBg"
        show-alpha
        size="mini"
      ></el-color-picker>
    </span>
  </header>
</template>

<script>
import ChangeBgColorTemplate from './ChangeBgColorTemplate'
export default {
  extends: ChangeBgColorTemplate,
  props: {
    logo: String,
    username: {
      type: String,
      default: ''
    }
  },
  watch: {
  },

  data () {
    return {}
  },
  methods: {
    emitExit () {
      this.$emit('exit')
    },
    emitMenu () {
      this.$emit('menu')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/minix.scss';
.header {
  @include clearf;
  position: relative;
  padding: 0 20px;
  min-height: 60px;
  color: #666;
  background: rgba(255, 255, 255, 0.795);
  line-height: 60px;
  white-space: nowrap;
  .header_logo {
    font-size: 20px;
    font-weight: 700;
  }
  .header_userinfo {
    font-size: 16px;
    display: flex;
    align-items: center;
    float: right;
  }
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.5);
  .header_exit {
    margin: 0 12px;
    text-decoration: underline;
    &:hover {
      color: rgb(176, 220, 231);
      cursor: pointer;
    }
  }
  .header_menu-btn {
    position: absolute;
    display: none;
    top: 50%;
    left: 12px;
    margin-top: -12px;
    width: 24px;
    height: 24px;
    background-image: url('../../assets/images/menu.png');
    background-size: 24px;
    background-repeat: no-repeat;
  }
}
@media screen and (max-width: 900px) {
  .header {
    padding: 0 12px;
    min-height: 40px;
    line-height: 40px;
    font-size: 12px;
    .header_menu-btn {
      display: inline-block;
    }
    .header_logo {
      display: none;
    }
  }
}
</style>
