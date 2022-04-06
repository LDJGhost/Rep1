<template>
  <div>
    <el-container :style="containerHeight">

      <el-aside width="200px" style="background-color: rgb(84, 92, 100);position: relative; ">

        <div class="block" style="margin-top: 30px;">
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
          <div class="userName">管理员</div>
        </div>

<!--        <el-menu-->
<!--          :default-active="'/teacher/timetable'"-->
<!--          router-->
<!--          style="border:none"-->
<!--          class="el-menu-vertical-demo">-->
<!--&lt;!&ndash;          background-color="white"&ndash;&gt;-->
<!--&lt;!&ndash;          text-color="black"&ndash;&gt;-->
<!--&lt;!&ndash;          active-text-color="#409EFF"&ndash;&gt;-->
<!--&lt;!&ndash;          style="border-bottom: lightgray 1px solid; border-top: lightgray 1px solid" >&ndash;&gt;-->
        <el-menu
          :default-active="'/focus/TotalFocus'"
          router
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          style="border: 1px rgb(84, 92, 100)">

<!--          <el-menu-item index="/teacher/timetable">-->
<!--            <i class="el-icon-s-order"></i>-->
<!--            <span>我的课程</span>-->
<!--          </el-menu-item>-->

<!--          <el-menu-item index="/teacher/AdjustCourse">-->
<!--            <i class="el-icon-s-tools"></i>-->
<!--            <span slot="title">我的调课</span>-->
<!--          </el-menu-item>-->
          <el-submenu index="/teacher/timetable">
            <template slot="title">我的课程</template>
            <el-submenu index="1">
              <template slot="title">点名系统</template>
              <el-menu-item index="/teacher/AbsenceStudentList">课堂点名系统</el-menu-item>
            </el-submenu>
            <el-submenu index="/teacher/timetable">
              <template slot="title">专注度系统</template>
              <el-menu-item index="/focus/TotalFocus">课堂专注系统</el-menu-item>
              <el-menu-item index="/focus/PersonalFocus">学生专注系统</el-menu-item>
            </el-submenu>
          </el-submenu>

        </el-menu>
        <div class="logoutBtn">
          <el-button type="text" icon="el-icon-back" @click="logout()">退出</el-button>
        </div>
      </el-aside>

      <el-main class="mainBox">

        <div class="topBox">
          <el-breadcrumb separator-class="el-icon-arrow-right" >
            <el-breadcrumb-item :to="{ path: '/teacher/timetable' }"><b>我的课程</b></el-breadcrumb-item>
            <el-breadcrumb-item>课堂专注度反馈</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="height: 90%; width: 400px; margin-left: 15px">
          <el-container class="smallbox">
            <el-header class="boxHeader">课堂行为频率分析</el-header>
            <el-main class="boxMain">
              <div id="chart1"></div>
            </el-main>
          </el-container>

          <el-container class="smallbox">
            <el-header class="boxHeader">考勤分析</el-header>
            <el-main class="boxMain">
              <div id="chart2"></div>
            </el-main>
          </el-container>
        </div>
        <div style="height: 90%; width: 850px;">
          <el-container style="width: 100%; height: 600px; margin-bottom: 15px">
            <el-header class="title">
              <div class="textBox">
                <p style="font-size: 40px; text-align: center">移动游戏开发</p>
                <p style="text-align: center">2021-03-27</p>
              </div>
              <div class="scoreBall" title="课堂专注度评分">95</div>
              <div class="textBox">
                <p style="font-size: 40px; text-align: center">8</p>
                <p style="text-align: center">课堂总人数</p>
              </div>
            </el-header>
            <el-main class="boxMain">
              <video :src="videosSrc" controls="controls" height="100%"></video>
            </el-main>
          </el-container>

          <el-container style="width: 100%; height: 260px">
            <el-header class="boxHeader">课件展示</el-header>
            <el-main class="boxMain">
<!--              <el-carousel :interval="4000" type="card" height="150px" trigger="click" :autoplay="false" >-->
<!--                <el-carousel-item v-for="item in pptList" :key="item" style="width: 400px;">-->
<!--                 <el-image :src= item fit="contain" ></el-image>-->
<!--                </el-carousel-item>-->
<!--              </el-carousel>-->
              <div class="pptBox">
                <div class="leftBtn" @click="back"></div>
                 <img v-for="(i,index) in pptList" :key="i" :src="i" :class="{'IMG5': index < left, 'IMG2': index === left, 'IMG3': index === centre, 'IMG4': index === right, 'IMG1': index > right}">
                <div class="rightBtn" @click="forward"></div>
              </div>

            </el-main>
          </el-container>
        </div>
        <div style="height: 90%; width: 400px; margin-right: 15px">
          <el-container class="smallbox">
            <el-header class="boxHeader">总专注度变化图</el-header>
            <el-main class="boxMain">
              <div id="chart3"></div>
            </el-main>
          </el-container>

          <el-container class="smallbox">
            <el-header class="boxHeader">课堂行为列表</el-header>
            <el-main class="boxMain" style="padding: 0; overflow: auto" >
              <div class="ListHeader">
                <div class="name" style="color: gray; font-size: 17px; line-height: 50px;font-weight: 900;border-bottom: lightgray 1px solid;">行为</div>
                <div class="sum" style="color: gray; font-size: 17px; line-height: 50px;font-weight: 900;border-bottom: lightgray 1px solid;">次数</div>
              </div>

              <div class="abnormalList" v-for="i in abnormalList" :key="i.id">
                <div class="abnormalContainer">
                  <div class="name">{{ i.name }}</div>
                  <div class="sum">{{ i.sum }}</div>
                  <img class="open" src="@/assets/img/open.png" title="展开学生列表" @click="openList(i.id)">
                  <div class="studentList" v-show="showList === i.id">
                    <img src="@/assets/img/cloud.png" style="position: relative; margin-left:275px;margin-top: -25px">
                    <div @click="seeShare" class="student"  v-for="j in i.students" :key="j.id">{{ j.name }}</div>
                  </div>
                </div>

<!--                <div class="abnormalContainer">-->
<!--                  <div class="name">睡觉</div>-->
<!--                  <div class="sum">5</div>-->
<!--                  <img class="open" src="@/assets/img/open.png" title="展开学生列表">-->
<!--                </div>-->
              </div>

            </el-main>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      containerHeight: {
        height: ''
      },
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      userAccount: 'LDJ',
      videosSrc: require('@/assets/videos/sample2.mp4'),

      showList: '',

      abnormalList: [
        {id: '0', name: '使用手机', sum: '20', students: [{id: '001', name: '刘心怡'}, {id: '002', name: '黄浩恩'}, {id: '003', name: '李文希'}, {id: '004', name: '孙嘉鸿'}, {id: '005', name: '张泽诚'}, {id: '006', name: '梁德健'}]},
        {id: '1', name: '喝水', sum: '33', students: [{id: '001', name: '刘心怡'}, {id: '002', name: '黄浩恩'}, {id: '003', name: '李文希'}, {id: '004', name: '孙嘉鸿'}, {id: '005', name: '张泽诚'}, {id: '006', name: '梁德健'}]},
        {id: '2', name: '睡觉', sum: '25', students: [{id: '001', name: '刘心怡'}, {id: '002', name: '黄浩恩'}, {id: '003', name: '李文希'}, {id: '004', name: '孙嘉鸿'}, {id: '005', name: '张泽诚'}, {id: '006', name: '梁德健'}]},
        {id: '3', name: '交谈', sum: '35', students: [{id: '001', name: '刘心怡'}, {id: '002', name: '黄浩恩'}, {id: '003', name: '李文希'}, {id: '004', name: '孙嘉鸿'}, {id: '005', name: '张泽诚'}, {id: '006', name: '梁德健'}]},
        {id: '4', name: '回答问题', sum: '10', students: [{id: '001', name: '刘心怡'}, {id: '002', name: '黄浩恩'}, {id: '003', name: '李文希'}, {id: '004', name: '孙嘉鸿'}, {id: '005', name: '张泽诚'}, {id: '006', name: '梁德健'}]},
        {id: '5', name: '书写', sum: '25', students: [{id: '001', name: '刘心怡'}, {id: '002', name: '黄浩恩'}, {id: '003', name: '李文希'}, {id: '004', name: '孙嘉鸿'}, {id: '005', name: '张泽诚'}, {id: '006', name: '梁德健'}]},
        {id: '6', name: '阅读', sum: '32', students: [{id: '001', name: '刘心怡'}, {id: '002', name: '黄浩恩'}, {id: '003', name: '李文希'}, {id: '004', name: '孙嘉鸿'}, {id: '005', name: '张泽诚'}, {id: '006', name: '梁德健'}]}
      ],
      pptList: [
        require('@/assets/img/ppt/1.png'),
        require('@/assets/img/ppt/2.png'),
        require('@/assets/img/ppt/3.png'),
        require('@/assets/img/ppt/4.png'),
        require('@/assets/img/ppt/5.png'),
        require('@/assets/img/ppt/6.png'),
        require('@/assets/img/ppt/7.png'),
        require('@/assets/img/ppt/8.png'),
        require('@/assets/img/ppt/9.png'),
        require('@/assets/img/ppt/10.png')
      ],
      left: -1,
      centre: 0,
      right: 1,
      classScore: {
        time: ['0:00', '5:00', '10:00', '15:00', '20:00', '25:00', '30:00', '35:00', '40:00', '45:00'],
        score: [90, 91, 90, 83, 80, 84, 90, 93, 83, 75]
      }
    }
  },
  methods: {
    seeShare () {
      let routeUrl = this.$router.resolve({
        path: '/focus/PersonalFocus'
      })
      window.open(routeUrl.href, '_blank')
    },
    back () {
      if (this.left === -1) {
        console.log('最前一页')
      } else {
        this.centre--
        this.right--
        this.left--
      }
    },
    forward () {
      let listL = this.pptList.length
      if (this.right === listL) {
        console.log('最后一页')
      } else {
        this.centre++
        this.right++
        this.left++
      }
    },
    openList (id) {
      if (id !== this.showList) {
        this.showList = id
      } else {
        this.showList = -1
      }
    },

    drawCharts () {
      let chart1 = this.$echarts.init(document.getElementById('chart1'))
      let chart2 = this.$echarts.init(document.getElementById('chart2'))
      let chart3 = this.$echarts.init(document.getElementById('chart3'))

      chart1.clear()
      chart2.clear()
      chart3.clear()

      let option1 = {
        radar: {
          // shape: 'circle',
          indicator: [
            {name: '使用手机', max: 50},
            {name: '喝水', max: 50},
            {name: '睡觉', max: 50},
            {name: '交谈', max: 50},
            {name: '回答问题', max: 50},
            {name: '书写', max: 50},
            {name: '阅读', max: 50}
          ]
        },
        series: [
          {
            name: 'bad behavior vs good behavior',
            type: 'radar',
            // color: ['#ee6666', '#91cc75'],
            // areaStyle: {
            //   color: ['#ee6666', '#91cc75']
            // },
            data: [
              {
                value: [20, 33, 25, 35, 10, 25, 32],
                name: 'bad behavior',
                label: {
                  show: true,
                  formatter: function (params) {
                    return params.value
                  }
                }
              }
              // {
              //   value: [0, 0, 0, 0, 10, 25, 32],
              //
              //   name: 'good behavior',
              //   label: {
              //     show: true,
              //     formatter: function (params) {
              //       return params.value
              //     }
              //   }
              // }
            ]
          }
        ]
      }

      let option2 = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '0%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['30%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#ffff',
              borderWidth: 2
            },
            color: ['#ee6666', '#ffdc60', '#91cc75'],
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '25',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 2, name: '缺勤' },
              { value: 1, name: '请假' },
              { value: 8, name: '出勤' }
            ]
          }
        ]
      }

      let option3 = {
        color: ['#80FFA5'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [
              '0:00',
              '5:00',
              '10:00',
              '15:00',
              '20:00',
              '25:00',
              '30:00',
              '35:00',
              '40:00',
              '45:00'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(0, 221, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(77, 119, 255)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [90, 91, 90, 83, 80, 84, 90, 93, 83, 75]
          }
        ]
      }

      chart1.setOption(option1)
      chart2.setOption(option2)
      chart3.setOption(option3)
    }
  },
  created () {
    // 动态调整左侧菜单栏高度
    var docHeight = document.documentElement.clientHeight
    this.containerHeight.height = docHeight + 'px'
    // this.getParams()
    this.userAccount = sessionStorage.getItem('userAccount')
    this.userName = sessionStorage.getItem('userName')
    console.log(this.userAccount)
  },
  mounted () {
    this.drawCharts()
  }
}
</script>

<style scoped>
/deep/ .el-submenu__title {
  text-align: left !important;
}
/deep/ .el-menu-item {
  text-align: left !important;
}

/*/deep/ .el-aside {*/
/*  display: block !important;*/
/*  position: relative !important;*/
/*}*/

/deep/ .grid-active {
  z-index: 9999 !important;
}

.grid-active span {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}
.ListHeader{
  height: 50px;
  display: flex;
}
.name{
  margin-left: 20px;
  background-color: white;
  width: 45%;
  text-align: center;
  line-height: 40px;
  float: left;
  background-color: transparent;
}
.sum{
  background-color: white;
  width: 45%;
  text-align: center;
  line-height: 40px;
  float: left;
  background-color: transparent;
}
.abnormalList{

}
.abnormalContainer{
  border-bottom: lightgray 1px solid;
  min-height: 40px;
  width: 90%;
  margin-left: 20px;
  clear: both;
}
.open{
  cursor: pointer;
  position: relative;
  margin-top: 13px;
  margin-left: -100px;
  width: 15px;
  height: 15px;
  opacity: 0.8;
}
.open:hover{
  opacity: 1;
}
.studentList{
  display: flex;
  flex-wrap: wrap;
  border: lightgray 1px solid;
  border-radius: 10px;
  min-height: 50px;
  width: 340px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  padding: 9px;
}
.student{
  /*background-color: #42b983;*/
  cursor: pointer;
  width: 80px;
  height: 30px;
  line-height: 30px;
}
.student:hover{
  color: #2b85e4;
}

.mainBox{
  background-color: rgb(240,242,245);
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.topBox{
  padding: 20px;
  height: 60px;
  width: 100%;
  background-color: white;
  border-bottom: lightgray 1px solid;
}

.smallbox{
  height: 430px;
  width: 100%;
  margin-bottom: 15px;
}

.boxHeader{
  padding: 15px;
  text-align: left;
  background-color: white;
  border-bottom: lightgray 1px solid;
  height: 50px!important;
}
.title{
  display: flex;
  justify-content: space-between;
  padding: 15px;
  text-align: left;
  background-color: white;
  border-bottom: lightgray 1px solid;
  height: 100px!important;
}
.textBox{
  margin-top: -10px;

  width: 325px;
}
.scoreBall{
  margin-top: -5px;
  height: 80px;
  width: 80px;
  border: #42b983 10px solid;
  color: #42b983;
  text-align: center;
  line-height: 60px;
  font-weight: 900;
  font-size: 20px;
  border-radius: 100px;
}
.pptBox{
  display: flex;
  justify-content: space-between;

  height: 100%;
}
.leftBtn{
  cursor: pointer;
  opacity: 0.8;
  background-position-x: 8px;
  background-position-y: 38px;
  background-image: url(~@/assets/img/back.png);
  background-repeat: no-repeat;
  margin-top: 35px;
  height: 100px;
  width: 35px;
  background-color: rgba(0,0,0,0.3);
  border-radius: 20px 0px 0px 20px;
  z-index: 30;
}
.leftBtn:hover{
  opacity: 1;
}
.rightBtn{
  cursor: pointer;
  opacity: 0.8;
  background-position-x: 8px;
  background-position-y: 38px;
  background-image: url(~@/assets/img/foward.png);
  background-repeat: no-repeat;
  margin-top: 35px;
  height: 100px;
  width: 35px;
  background-color: rgba(0,0,0,0.3);
  border-radius: 0px 20px 20px 0px;
  z-index: 30;
}
.rightBtn:hover{
  opacity: 1;
}
.boxMain{
  background-color: white;
  overflow: hidden;
}
#chart1{
  height: 100%;
  width: 100%;
}
#chart2{
  margin-top: -30px;
  height: 100%;
  width: 100%;
}
#chart3{
  margin-top: -30px;
  height: 100%;
  width: 100%;
}

.IMG1{
  margin-top: 40px;
  position: absolute;
  height: 100px;
  margin-left: 630px;
  z-index: 5;
  opacity: 0;
  transition: all 0.5s;
}
.IMG2{
  opacity: 0.5;
  position: absolute;
  border: gray 1px solid;
  height: 150px;
  margin-left:75px;
  margin-top: 10px;
  z-index: 10;
  transition: all 0.5s;
}
.IMG3{
  position: absolute;
  border: gray 1px solid;
  height: 175px;
  margin-left: 250px;
  z-index: 20;
  transition: all 0.5s;
}
.IMG4{
  opacity: 0.5;
  position: absolute;
  border: gray 1px solid;
  height: 150px;
  margin-left: 450px;
  margin-top: 10px;
  z-index: 10;
  transition: all 0.5s;
}
.IMG5{
  margin-top: 40px;
  position: absolute;
  height: 100px;
  z-index: 5;
  opacity: 0;
  transition: all 0.5s;
}
.userName{
  color: snow;
  height: 50px;
  width: 80%;
  font-weight: 900;
  line-height: 50px;
  font-size: 20px;
  background-color: rgba(242,240,245, 0.1);
  border-radius: 15px;
  margin: 10px auto;
}
.logoutBtn{
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  background-color: rgba(242,240,245, 0.1);
  width: 125px;
  border-radius: 20px;
  margin-left: 35px;
  transition: all 0.5s;
}
.logoutBtn:hover{
  background-color: rgba(255,255,255, 0.8);
  transition: all 0.5s;
}
</style>
