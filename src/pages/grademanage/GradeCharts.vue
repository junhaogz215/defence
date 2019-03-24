<template>
  <el-card>
    <header slot="header">
      答辩数据展示
    </header>
    <section class="echarts-layout" v-if="passingRateData.length > 0 || scoreSectionData.length > 0">
      <div ref="passrate" v-if="passingRateData.length > 0">
      </div>
      <div ref="scoresection" v-if="scoreSectionData.length > 0">
      </div>
    </section>
    <section v-else>
      无图表信息
    </section>
  </el-card>
</template>

<script>
import api from '@/api'
export default {
  watch: {

  },
  computed: {

  },
  data () {
    return {
      passingRateData: [],
      scoreSectionData: []
    }
  },
  methods: {
    async initChartInfo () {
      let res = await api.getScoreChartInfo()
      if (!res || !(res.data && res.data.status)) {
        this.$message({
          type: 'error',
          message: '查询失败'
        })
      } else {
        let {data} = res.data
        this.passingRateData = data.pass
        this.scoreSectionData = data.array
      }
      return {
        passingRateData: this.passingRateData,
        scoreSectionData: this.scoreSectionData
      }
    },
    initPassRateChart (data) {
      if (!Array.isArray(data)) return
      let option = this.getPassRateOpt(data)
      let myChart = this.$echarts.init(this.$refs.passrate, null, {
        height: '400px',
        width: '400px'
      })
      myChart.setOption(option)
    },
    initScoreChartChart (data) {
      if (!Array.isArray(data)) return
      let option = this.getScoreChartOpt(data)
      let myChart = this.$echarts.init(this.$refs.scoresection, null, {
        height: '400px',
        width: '400px'
      })
      myChart.setOption(option)
    },
    getPassRateOpt (data) {
      if (!Array.isArray(data)) return {}
      let keys = []
      data.map(val => {
        keys.push(val.name)
      })
      return {
        title: {
          text: '学生答辩通过率',
          x:'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: keys
        },
        series: [
          {
            name: '答辩通过率',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    getScoreChartOpt (data) {
      if (!Array.isArray(data)) return {}
      let keys = []
      data.map((val, index) => {
        let start = index * 10
        let computedEnd = ((index + 1) * 10 - 1)
        let end = computedEnd === 99 ? '100' : computedEnd 
        keys.push(`${start}-${end}分`)
      })
      return {
        color: ['#3398DB'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow' 
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        title: {
          text: '学生答辩成绩分布',
          x:'center'
        },
        xAxis: [{
          type: 'category',
          data: keys,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '人数',
          data,
          type: 'bar',
          barWidth: '60%'
        }]
      }
    }
  },
  created () {
  },
  mounted () {
    this.initChartInfo().then((data) => {
      this.initPassRateChart(data.passingRateData)
      this.initScoreChartChart(data.scoreSectionData)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.echarts-layout {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  width: 100%;
  div {
    min-width: 400px;
    flex-grow: 1;
    flex-shrink: 0;
  } 
}
</style>

