<template>
  
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      backgroundColor: (state) => state.backgroundColor,
    })
  },
  watch: {
    bgColor (newVal) {
      this.commitBg(newVal)
    },
    backgroundColor (newVal) {
      this.bgColor = newVal
    }
  },
  data () {
    return {
      bgColor: '#fff'
    }
  },
  methods: {
    commitBg (val) {
      this.$store.commit('changeBgColor', val)
    }
  }
}
</script>

<style>

</style>
