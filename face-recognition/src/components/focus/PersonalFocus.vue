<template>
  <div>
    <div class="IMGcover" v-show="showLargeIMG" @click="closeIMG">
      <img :src=IMGURL>
    </div>
    <div class="PPTcover" v-show="showLargePPT" @click="closePPT">
      <img :src=PPTURL style="max-height: 80%">
    </div>
    <el-container :style="containerHeight">

      <el-aside width="200px" style="background-color: rgb(84, 92, 100);position: relative;">

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
          :default-active="'/focus/PersonalFocus'"
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
            <el-breadcrumb-item>学生专注度反馈</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="height: 90%; width: 1250px; margin-left: 15px; margin-top: 15px">
          <el-container style="width: 100%; height: 350px; margin-bottom: 15px">
            <el-header class="boxHeader">学生专注度分析图</el-header>
            <el-main class="boxMain">
              <div id="chart1"></div>
            </el-main>
          </el-container>
          <el-container style="width: 100%; height: 505px">
            <el-header class="boxHeader">学生行为列表</el-header>
            <el-main class="boxMain" style="padding-left: 50px; padding-right: 50px">
             <div class="habitList">
               <div class="habitContainer">
                 <div class="item">行为</div>
                 <div class="item">分数</div>
                 <div class="item">时间</div>
                 <div class="item">操作</div>
               </div>
                 <div class="habitContainer" v-for="(i, index) in habitList[activeStudent]" :key="index" >
                   <div class="item">{{i}}</div>
                   <div class="item">{{scoreList[activeStudent][index]}}</div>
                   <div class="item">{{studentList[activeStudent].time[index]}}</div>
                   <div class="item">
                     <img src="@/assets/img/imgicon.png" class="icon" title="查看照片" @click="openIMG(index)">
                     <img src="@/assets/img/ppticon.png" class="icon" title="查看错过的知识点" @click="openPPT(index)">
                   </div>
               </div>
             </div>
<!--              <el-table-->
<!--                :data="tableData"-->
<!--                style="width: 100%">-->
<!--                <el-table-column-->
<!--                  label="行为"-->
<!--                  width="180">-->
<!--                  <template slot-scope="scope">-->
<!--                    <span style="margin-left: 10px">{{ scope.row.habit }}</span>-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                  label="分数"-->
<!--                  width="180">-->
<!--                  <template slot-scope="scope">-->
<!--                    <span style="margin-left: 10px">{{ scope.row.score }}</span>-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column label="操作">-->
<!--                  <template slot-scope="scope">-->

<!--                  </template>-->
<!--                </el-table-column>-->
<!--              </el-table>-->
            </el-main>
          </el-container>
        </div>
        <div style="height: 90%; width: 420px; margin-right: 15px; margin-top: 15px">
          <el-container style="width: 100%; height: 870px">
            <el-header class="boxHeader">学生列表</el-header>
            <el-main class="boxMain">
              <div class="studentContainer" v-for="(i, index) in studentList" :key="index" @click="SelectStudent(index); drawCharts()" :class="{'studentContainer_active' : index === activeStudent}">{{ i.name }}</div>
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
      userAccount: '',
      studentList: [{name: '刘心怡', time: ['0:00', '3:04', '5:30', '6:20', '8:00', '30:01', '35:08', '40:37', '45:00'], score: ['90', '95', '85', '80', '70', '90', '80', '90', '85', '85']},
                    {name: '黄浩恩', time: ['0:00', '3:04', '5:30', '6:20', '8:00', '30:01', '35:08', '40:37', '45:00'], score: ['90', '87', '67', '50', '70', '73', '87', '80', '70', '35']},
                    {name: '李文希', time: ['0:00', '3:04', '5:30', '6:20', '8:00', '30:01', '35:08', '40:37', '45:00'], score: ['90', '97', '85', '80', '70', '73', '88', '90', '90', '85']},
                    {name: '孙嘉鸿', time: ['0:00', '5:30', '6:10', '8:00', '30:01', '35:08', '40:37', '45:00'], score: ['90', '97', '85', '80', '70', '73', '88', '90', '90', '85']},
                    {name: '张泽诚', time: ['0:00', '3:04', '5:30', '6:20', '8:00', '30:01', '35:08', '40:37', '45:00'], score: ['90', '97', '85', '80', '70', '73', '88', '90', '90', '85']},
                    {name: '梁德健', time: ['0:00', '3:04', '5:30', '6:20', '8:00', '30:01', '35:08', '40:37', '45:00'], score: ['90', '97', '85', '80', '70', '73', '88', '90', '90', '85']},
                    {name: '李文浩', time: ['0:00', '3:04', '5:30', '6:20', '8:00', '30:01', '35:08', '40:37', '45:00'], score: ['90', '97', '85', '80', '70', '73', '88', '90', '90', '85']},
                    {name: '唐斌', time: ['0:00', '3:04', '5:30', '6:20', '8:00', '30:01', '35:08', '40:37', '45:00'], score: ['90', '97', '85', '80', '70', '73', '88', '90', '90', '85']}],

    habitList: [
        ['听课', '回答问题', '交谈', '使用手机', '听课', '喝水', '听课', '交谈', '睡觉'],
        ['听课', '回答问题', '交谈', '使用手机', '听课', '喝水', '听课', '交谈', '睡觉'],
        ['听课', '回答问题', '交谈', '使用手机', '听课', '喝水', '听课', '交谈', '睡觉'],
        ['听课', '回答问题', '使用手机', '听课', '睡觉', '听课', '交谈', '喝水']
      ],
      scoreList: [
        ['0', '+5', '-5', '-20', '0', '-10', '0', '-5', '-5'],
        ['0', '+5', '-5', '-10', '0', '-10', '0', '-5', '-5'],
        ['0', '+5', '-5', '-10', '0', '-10', '0', '-5', '-5'],
        ['0', '+10', '-20', '0', '-10', '0', '-5', '-5']
      ],
      IMGList: [
        [require('@/assets/img/sampleIMG1.png'), require('@/assets/img/sampleIMG2.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png')],
        [require('@/assets/img/sampleIMG1.png'), require('@/assets/img/sampleIMG2.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png')],
        [require('@/assets/img/sampleIMG1.png'), require('@/assets/img/sampleIMG2.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png')],
        [require('@/assets/img/sampleIMG2.png'), require('@/assets/img/answer.png'), require('@/assets/img/play_phone.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png'), require('@/assets/img/sampleIMG3.png')]
      ],
      PPTList: [
        [require('@/assets/img/ppt/1.png'), require('@/assets/img/ppt/2.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png')],
        [require('@/assets/img/ppt/1.png'), require('@/assets/img/ppt/2.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png')],
        [require('@/assets/img/ppt/1.png'), require('@/assets/img/ppt/2.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png')],
        [require('@/assets/img/ppt/1.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png'), require('@/assets/img/ppt/3.png')]
      ],
      tableData: [ [ {habit: '听课', score: '0'}, {habit: '回答问题', score: '+5'}, {habit: '交谈', score: '-5'}, {habit: '大声交谈', score: '-10'}, {habit: '使用手机', score: '-20'}, {habit: '听课', score: '0'}, {habit: '喝水', score: '-10'}, {habit: '听课', score: '0'}, {habit: '交谈', score: '-5'}, {habit: '东张西望', score: '-5'} ],
                   [ {habit: '听课', score: '0'}, {habit: '回答问题', score: '+5'}, {habit: '交谈', score: '-5'}, {habit: '大声交谈', score: '-10'}, {habit: '使用手机', score: '-20'}, {habit: '听课', score: '0'}, {habit: '喝水', score: '-10'}, {habit: '听课', score: '0'}, {habit: '交谈', score: '-5'}, {habit: '东张西望', score: '-5'} ]
      ],
      activeStudent: 0,
      showLargeIMG: false,
      showLargePPT: false,
      IMGURL: '',
      PPTURL: ''
    }
  },
  methods: {
    openIMG (index) {
      this.IMGURL = this.IMGList[this.activeStudent][index]
      this.showLargeIMG = true
    },
    closeIMG () {
      this.showLargeIMG = false
    },
    openPPT (index) {
      this.PPTURL = this.PPTList[this.activeStudent][index]
      this.showLargePPT = true
    },
    closePPT () {
      this.showLargePPT = false
    },
    SelectStudent (index) {
      this.activeStudent = index
      console.log(this.activeStudent)
    },
    drawCharts () {
      // const data = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]];
      // const dateList = data.map(function (item) {
      //   return item[0]
      // })
      let Xdata = []
      let dataList = []
      let item = []
      let str = ''

      for (let i = 0; i <= 44; i++) {
        for (let j = 0; j < 60; j++) {
          if (j < 10) {
            str = i + ':0' + j
          } else {
            str = i + ':' + j
          }
          Xdata.push(str)
        }
      }
      Xdata.push('45:00')
      for (let i = 0; i < this.studentList[this.activeStudent].time.length; i++) {
        item = [this.studentList[this.activeStudent].time[i], this.studentList[this.activeStudent].score[i]]
        dataList.push(item)
      }
      let chart1 = this.$echarts.init(document.getElementById('chart1'))

      chart1.clear()

      let option1 = {
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
            // data: this.studentList[this.activeStudent].time
            // data: [
            //   0, 5, 10, 15, 20, 25, 30, 35, 40, 45
            // ]
            data: Xdata,
            axisLabel: {
              interval: 299
            }
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
            // data: this.studentList[this.activeStudent].score
            // data: [['0:00', 90], ['2:30', 83], ['5:05', 70], ['6:08', 80], ['23:35', 90], ['30:03', 100], ['45:00', 90]]
            data: dataList
          }
        ]
      }

      chart1.setOption(option1)
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
.boxHeader{
  padding: 15px;
  text-align: left;
  background-color: white;
  border-bottom: lightgray 1px solid;
  height: 50px!important;
}
.boxMain{
  background-color: white;
  overflow: auto;
}
.studentContainer{
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
  height: 50px;
  border-radius: 20px;
  border: lightgray 1px solid;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  background-color: white;
}
.studentContainer_active{
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
  height: 50px;
  border-radius: 20px;
  border: #6bb4ff 1px solid;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  background-color: #e9f4ff;
  color: #6bb4ff;
}
.studentContainer:hover{
  box-shadow: 5px 10px 15px rgba(0,0,0,0.1);
}

#chart1{
  height: 100%;
  width: 100%;
}

.habitList{
  width: 100%;

}
.habitContainer{
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 100%;
  border-bottom: lightgray 1px solid;
}
.item{
  height: 100%;
  width: 290px;
  line-height: 50px;
  font-size: 15px;
}
.icon{
  cursor: pointer;
  opacity: 0.8;
  width: 30px;
  height: 30px;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
}
.icon:hover{
  opacity: 1;
}
.IMGcover{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 100;
}
.PPTcover{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 100;
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
