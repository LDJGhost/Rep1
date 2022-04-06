<template>
  <div>
    <el-container :style="containerHeight">
      <el-aside width="170px" style="background-color: rgb(84, 92, 100);position: relative">
        <div class="block" style="margin: 10px 0px 8px 25px;text-align: left">
<!--          <el-tooltip class="item" effect="dark" content="提示文字" placement="right-start">-->
            <el-avatar :size="40" :src="circleUrl"></el-avatar>
<!--          </el-tooltip>-->
          <span style="color: snow;margin-left: 10px;">{{userName}}</span>
        </div>
        <el-menu
          :default-active="'/teacher/timetable'"
          router
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          style="border: 1px rgb(84, 92, 100)">
          <el-menu-item index="/teacher/timetable">
            <i class="el-icon-s-order"></i>
            <span>我的课程</span>
          </el-menu-item>
          <el-menu-item index="/teacher/AdjustCourse">
            <i class="el-icon-s-tools"></i>
            <span slot="title">我的调课</span>
          </el-menu-item>
        </el-menu>
        <div style="position: absolute;bottom: 0;">
          <el-button type="text" icon="el-icon-back" @click="logout()">退出</el-button>
        </div>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/teacher/timetable' }"><b>我的课程</b></el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <div id="coursesTable" style="margin-top: -25px">
        </div>
        <!--      <button onclick="onChange()" style="background-color: #00a2ae; color: #fff; padding: 5px 10px; border-radius: 4px;border: none">-->
        <!--        切换课表-->
        <!--      </button>-->
      </el-main>
    </el-container>
  </div>

<!--  <div>-->
<!--    <el-container>-->
<!--      <el-header>Header</el-header>-->
<!--      <el-main></el-main>-->
<!--    </el-container>-->
<!--  </div>-->
</template>

<script>
  import Timetables from 'timetables'
  export default {
    name: '',
    data () {
      return {
        containerHeight: {
          height: ''
        },
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        timetable: null,
        courseList: [
          // ['大学英语(Ⅳ)@10203', '大学英语(Ⅳ)@10203', '', '', '', '', '毛概@14208', '毛概@14208', '', '', '', '选修'],
          // ['', '', '信号与系统@11302', '信号与系统@11302', '模拟电子技术基础@16204', '模拟电子技术基础@16204', '', '', '', '', '', ''],
          // ['大学体育(Ⅳ)', '大学体育(Ⅳ)', '形势与政策(Ⅳ)@15208', '形势与政策(Ⅳ)@15208', '', '', '电路、信号与系统实验', '电路、信号与系统实验', '', '', '', ''],
          // ['', '', '', '', '电装实习@11301', '电装实习@11301', '', '', '', '大学体育', '大学体育', ''],
          // ['', '', '数据结构与算法分析', '数据结构与算法分析', '', '', '', '', '信号与系统', '信号与系统', '', '']
          ['', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', '', '', '', '']
        ],
        day: new Date().getDay(),
        week: window.innerWidth > 360 ? ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] : ['一', '二', '三', '四', '五'],
        courseType: [
          [{index: '1', name: '8:00-8:45'}, 1],
          [{index: '2', name: '8:50-9:35'}, 1],
          [{index: '3', name: '9:55-10:40'}, 1],
          [{index: '4', name: '10:45-11:30'}, 1],
          [{index: '5', name: '13:40-14:25'}, 1],
          [{index: '6', name: '14:30-15:15'}, 1],
          [{index: '7', name: '15:35-16:20'}, 1],
          [{index: '8', name: '16:25-17:10'}, 1],
          [{index: '9', name: '17:15-18:00'}, 1],
          [{index: '10', name: '19:00-19:45'}, 1],
          [{index: '11', name: '19:50-20:35'}, 1],
          [{index: '12', name: '20:45-21:30'}, 1],
          [{index: '13', name: '21:35-22:20'}, 1]
        ],
        userAccount: ''
      }
    },
    methods: {
      // getParams () {
      //   this.userAccount = this.$route.query.userAccount
      // }
      logout () {
        window.sessionStorage.clear()
        this.$router.push('/Login')
      },
      createTimetable () {
        var that = this
        this.timetable = new Timetables({
          el: '#coursesTable',
          timetables: this.courseList,
          week: this.week,
          timetableType: this.courseType,
          highlightWeek: this.day,
          styles: {
            Gheight: 50
          },
          gridOnClick: function (e) {
            // 跳到对应课程号的接口  （先打印看一下 e中有什么）
            // alert(e.name + '  ' + e.week + ', 第' + e.index + '节课, 课长' + e.length + '节')
            if (e.name !== '') {
              // 跳到对应课程号的接口
              var x = e.name.indexOf('(#')
              var id = e.name.substr(x + 2, 4)
              console.log(id)
              that.$router.push({path: '/teacher/enterToClass',
                query: {
                  courseId: id
                }})
            }
          }
        })
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
      var that = this
      this.$axios.get('/course/getTeacherCourse?teacherId=' + this.userAccount)
        .then(function (response) {
          if (response.status === 200) {
            console.log(response)
            for (var i = 0; i < response.data.data.length; i++) {
              console.log('Time:' + response.data.data[i].courseTime)
              console.log('week:' + response.data.data[i].courseWeek)
              console.log('len:' + response.data.data[i].courseLen)
              console.log('name:' + response.data.data[i].courseName)
              var time = response.data.data[i].courseTime
              var week = response.data.data[i].courseWeek
              var len = response.data.data[i].courseLen
              var courseInformation = '\n' + response.data.data[i].courseName + '\n(#' + response.data.data[i].courseId + ')\n' + response.data.data[0].courseLocation
              var realTime = time * 2 + 1
              console.log('realTime:' + realTime)
              // switch (time) {
              //   case '0':
              //     realTime = 1
              //     break
              //   case '1':
              //     realTime = 3
              // }
              var realLen = len + 2
              console.log('realLen:' + realLen)
              // if (len === 0) {
              //   realLen = 2
              // }
              // if (len === 1) {
              //   realLen = 3
              // }
              // if (len === 2) {
              //   realLen = 4
              // }
              for (var j = 0; j < realLen; j++) {
                console.log('j=' + j)
                that.courseList[week][realTime - 1 + j] = courseInformation
                console.log(that.courseList)
              }
            }
          console.log(that.courseList)
          that.createTimetable()
          }
        }).catch(function (error) {
        console.log(error)
        that.$message.error('获取课程信息失败')
      })
    },
    mounted () {
      window.addEventListener('resize', () => {
        var docHeight = document.documentElement.clientHeight
        this.containerHeight.height = docHeight + 'px'
      }, false)
    }
    // mounted () {
    //   this.timetable = new Timetables({
    //     el: '#coursesTable',
    //     timetables: this.courseList,
    //     week: this.week,
    //     timetableType: this.courseType,
    //     highlightWeek: this.day,
    //     styles: {
    //       Gheight: 50
    //     }
    //   })
    // }
    // watch: {
    //   '$route': 'getParams'
    // }
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

  #coursesTable {
    padding: 15px 10px;
  }

  /deep/ #courseWrapper {
    padding-left: 80px !important;
  }
  /deep/ .Courses-head { /*上标题*/
    /*background-color: #edffff !important;*/
    background-color:  #f2f6f7;
  }

  .Courses-head > div {
    text-align: center;
    font-size: 14px;
    line-height: 28px;
  }

  /deep/ .left-hand-TextDom, .Courses-head {
    background-color: #f2f6f7 !important;
  }

  /deep/ .Courses-leftHand { /*左标题*/
    background-color: #f2f6f7 !important;
    font-size: 12px !important;
    width: 80px !important;
  }

  /deep/ .Courses-leftHand .left-hand-index {
    color: #9c9c9c !important;
    margin-bottom: 4px !important;
  }

  .Courses-leftHand .left-hand-name {
    color: #666;
  }

  .Courses-leftHand p {
    text-align: center;
    font-weight: 900;
  }

  .Courses-head > div {
    border-left: none !important;
  }

  /deep/ .Courses-leftHand > div {
    padding-top: 5px;
    border-bottom: 1px dashed rgb(219, 219, 219) !important;
  }

  .Courses-leftHand > div:last-child {
    border-bottom: none !important;
  }

  /deep/ .left-hand-TextDom, .Courses-head {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
  }

  /deep/ .Courses-content > ul {
    border-bottom: 1px dashed rgb(219, 219, 219) !important;
    box-sizing: border-box !important;
  }

  .Courses-content > ul:last-child {
    border-bottom: none !important;
  }

  /* .highlight-week {*/
  /*  color: #02a9f5 ;*/
  /*}*/

  .Courses-content li {
    text-align: center;
    color: #666666;
    font-size: 14px;
    line-height: 50px;
  }

  /deep/ .Courses-content li span {
    padding: 6px 2px;
    box-sizing: border-box;
    line-height: 18px;
    border-radius: 4px !important;
    white-space: normal;
    word-break: break-all;
    cursor: pointer;
  }

  /deep/ .grid-active {
    z-index: 9999 !important;
  }

  .grid-active span {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>
