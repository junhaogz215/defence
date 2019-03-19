<template>
  <el-menu
    :background-color="'#fff'"
    default-active="2"
    class="defence-menu"
  >
    <router-link 
      v-for="(val, i) in menus"
      :to="val.path" 
      :key="i">
      <el-menu-item :index="val.path" v-show="!val.hidden">
          {{val.name}}
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import ChangeBgColorTemplate from './ChangeBgColorTemplate'
export default {
  extends: ChangeBgColorTemplate,
  computed: {
    ...mapState(['menus'])
  }
}
</script>

<style lang="scss" scoped>
  .defence-menu {
    box-shadow: 1px 0 1px 0px rgba(209, 209, 209, 0.788);
  }
</style>