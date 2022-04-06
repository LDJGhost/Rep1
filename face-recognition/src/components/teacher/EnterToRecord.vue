<template>
  <div>
    <el-container :style="containerHeight">
      <el-aside width="170px" style="background-color: rgb(84, 92, 100);position: relative;">
        <div style="margin: 10px 0px 8px 25px;text-align: left">
          <el-avatar :size="40" :src="circleUrl"></el-avatar>
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
          <el-breadcrumb-item :to="{ path: '/teacher/timetable' }">我的课程</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/teacher/enterToClass',query: { courseId: courseId }}">点名拍照记录一览</el-breadcrumb-item>
          <el-breadcrumb-item><b>点名拍照记录</b></el-breadcrumb-item>
          <el-button type="text" size="" icon="el-icon-refresh" @click="refresh()" style="float: right;margin-right: 20px;margin-top: -10px"></el-button>
        </el-breadcrumb>

        <el-divider></el-divider>
        <div>
          <!--        <el-button-group>-->
          <!--          <el-button type="primary" icon="el-icon-s-order" @click="list">荣誉统计</el-button>-->
          <!--        </el-button-group>-->
        </div>
        <div id="canvasSetting">
          <card style="width: 50%">
<!--            <el-image-->
<!--              style="width: 90%; border: 1px solid blue"-->
<!--              :src="url"-->
<!--              :preview-src-list="srcList">-->
<!--            </el-image>-->
<!--            <el-image-->
<!--              style="width: 90%; margin-top: 10px"-->
<!--              :src="resultUrl"-->
<!--              :preview-src-list="srcList">-->
<!--            </el-image>-->
            <div v-for="img in imgList" :key="img.id" class="card_col">
<!--              <el-image :src="'http://192.168.1.140:9091/' + img.originalUrl" :preview-src-list="srcList"></el-image>-->
              <el-image :src="global + img.imgUrl" class="image" :preview-src-list="srcList"></el-image>
            </div>
          </card>

            <!--              <card style="width: 750px; margin-left: 30px">-->
            <!--              </card>-->
            <el-card style="width: 50%; margin-left: 30px" class="box-card">
<!--              <div slot="header" class="clearfix">-->
<!--                <span style="float: left;color: #2e6da4;font-weight:900;font-size: 20px">点名系统</span>-->
<!--              </div>-->
              <el-tabs v-model="activeName">
                <el-tab-pane label="全部名单" name="first">
                  <el-table
                    :data="allStudentList"
                    style="width: 100%">
                    <el-table-column type="index" label="序号" ></el-table-column>
                    <el-table-column prop="studentNum" label="学号"></el-table-column>
                    <el-table-column prop="studentName" label="姓名"></el-table-column>
                    <el-table-column prop="studentMajor" label="专业"></el-table-column>
                  </el-table>
                </el-tab-pane>

                <el-tab-pane label="图片识别名单" name="second"> <!--ref="multipleTable"  :row-key="handleReserve"  @selection-change="handleSelectionChange"-->
                  <el-table
                    :data="imgStudentList"
                    style="width: 100%">
                    <!--      <el-table-column type="selection" reserve-selection width="50"></el-table-column>-->
                    <el-table-column type="index" label="序号" ></el-table-column>
                    <el-table-column prop="studentNum" label="学号"></el-table-column>
                    <el-table-column prop="studentName" label="姓名"></el-table-column>
                    <el-table-column prop="studentMajor" label="专业"></el-table-column>
                    <!--      <el-table-column prop="certState" label="审核状态" :formatter=certificatesStatus show-overflow-tooltip></el-table-column>-->
                    <!--      <el-table-column label="操作" width="150">-->
                    <!--        <template slot-scope="scope">-->
                    <!--          <el-button @click="handleClickPdf(scope.row)" type="text" size="small">PDF格式</el-button>-->
                    <!--          <el-button @click="handleClickJpg(scope.row)" type="text" size="small">JPG格式</el-button>-->
                    <!--        </template>-->
                    <!--      </el-table-column>-->
                  </el-table>
<!--                  <el-pagination-->
<!--                    @current-change="handleCurrentChange"-->
<!--                    :current-page="queryInfo.page"-->
<!--                    :page-size="queryInfo.itemSize"-->
<!--                    layout="total, prev, pager, next, jumper"-->
<!--                    :total="total"-->
<!--                    v-if="active">-->
<!--                  </el-pagination>-->
                </el-tab-pane>

                <el-tab-pane label="缺勤名单" name="third">
                  <el-table
                    :data="absenceStudentList"
                    style="width: 100%">
                    <el-table-column label="序号" type="index"></el-table-column>
                    <el-table-column prop="studentNum" label="学号"></el-table-column>
                    <el-table-column prop="studentName" label="姓名"></el-table-column>
                    <el-table-column prop="studentMajor" label="专业"></el-table-column>
                  </el-table>
<!--                  <el-pagination-->
<!--                    @current-change="handleCurrentChange"-->
<!--                    :current-page="queryInfo.page"-->
<!--                    :page-size="queryInfo.itemSize"-->
<!--                    layout="total, prev, pager, next, jumper"-->
<!--                    :total="total"-->
<!--                    v-if="active">-->
<!--                  </el-pagination>-->
                </el-tab-pane>
              </el-tabs>

<!--              <el-table-->
<!--                :data="tableData"-->
<!--                style="width: 100%">-->
<!--                <el-table-column prop="date" label="学号" width="180"></el-table-column>-->
<!--                <el-table-column prop="name" label="姓名" width="180"></el-table-column>-->
<!--                <el-table-column prop="address" label="班级"></el-table-column>-->
<!--              </el-table>-->
<!--              <el-pagination-->
<!--                @current-change="handleCurrentChange"-->
<!--                :current-page="queryInfo.page"-->
<!--                :page-size="queryInfo.itemSize"-->
<!--                layout="total, prev, pager, next, jumper"-->
<!--                :total="total"-->
<!--                v-if="active">-->
<!--              </el-pagination>-->
<!--              <el-pagination-->
<!--                @current-change="handleSearchCurrentChange"-->
<!--                :current-page="searchInfo.page"-->
<!--                :page-size="searchInfo.itemSize"-->
<!--                layout="total, prev, pager, next, jumper"-->
<!--                :total="total"-->
<!--                v-else>-->
<!--              </el-pagination>-->
            </el-card>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  // import AllStudentList from './AllStudentList'
  // import ImgStudentList from './ImgStudentList'
  // import AbsenceStudentList from './AbsenceStudentList'
  export default {
    // components: {AllStudentList},
    data () {
      return {
        global: this.Global.IpAddress,
        containerHeight: {
          height: ''
        },
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        recordId: '',
        courseId: '',
        userName: '',
        allStudentList: [],
        imgStudentList: [],
        absenceStudentList: [],
        recordList: [],
        activeName: 'second',
        active: true,
        empty: true,
        // 获取奖状列表的参数
        queryInfo: {
          page: 1, // 当前页数
          itemSize: 8 // 当前每页显示奖状数
        },
        searchInfo: {
          search: '',
          page: 1,
          itemSize: 8
        },
        total: 0,
        // url: require('../../assets/class1.jpg'),
        url: '',
        resultUrl: '',
        imgList: [],
        srcList: [],
        tableData: [{
          date: '1701040119',
          name: '叶诗韵',
          address: '电子信息科学与技术1班'
        }, {
          date: '1701040021',
          name: '杜志雄',
          address: '电子信息科学与技术1班'
        }, {
          date: '1701040018',
          name: '陈裕钦',
          address: '电子信息科学与技术2班'
        }, {
          date: '1701040020',
          name: '贺文禹',
          address: '电子信息科学与技术2班'
        }, {
          date: '1701010010',
          name: '张三',
          address: '计算机科学与技术1班'
        }, {
          date: '1701010011',
          name: '李四',
          address: '计算机科学与技术1班'
        }, {
          date: '1701010012',
          name: '王五',
          address: '计算机科学与技术2班'
        }, {
          date: '1701010013',
          name: '刘六',
          address: '计算机科学与技术2班'
        }]
      }
    },
    methods: {
      logout () {
        window.sessionStorage.clear()
        this.$router.push('/Login')
      },
      getParams () {
        this.recordId = this.$route.query.recordId
        this.courseId = this.$route.query.courseId
      },
      // 监听页码值改变事件
      handleCurrentChange (newPage) {
        console.log(newPage)
        this.queryInfo.page = newPage
      },
      // 监听页码值(关键字搜索)改变事件
      handleSearchCurrentChange (newPage) {
        console.log('关键字搜索:' + newPage)
        this.searchInfo.page = newPage
        this.getSearchList(1)
      },
      // 获取对应事项审核已通过的证书
      async getAllStudentList () {
        var that = this
        this.$axios.get('/studentCourse/getStudentByCourseId?courseId=' + this.courseId)
          .then(function (response) {
            if (response.status === 200) {
              console.log(response)
              that.allStudentList = response.data.data
            }
          }).catch(function (error) {
          console.log(error)
          that.$message.error('获取证书数据失败')
        })
      },
      getImgAndStudentList () {
        var that = this
        this.$axios.get('/uploadRecord/getDetectStudent?id=' + this.recordId)
          .then(function (response) {
            if (response.status === 200 && response.data.state === 200) {
              console.log(response)
              that.imgList = []
              that.srcList = []
              // that.imgList = response.data.data.record
              // console.log(that.imgList)
              // console.log(that.imgList.originalUrl)
              that.imgStudentList = response.data.data.detectStudentList
              that.absenceStudentList = response.data.data.absentStudentList
              // that.srcList.push('http://192.168.1.140:9091/' + response.data.data.record[0].originalUrl)
              // that.srcList.push('http://192.168.1.140:9091/' + response.data.data.record[0].resultUrl)
              var list = response.data.data.record[0].resultUrl
              // console.log('执行')
              // console.log(response.data.data.record.resultUrl)
              var s = list.split(',')
              for (var i = 0; i < s.length; i++) {
                var element = {
                  imgUrl: ''
                }
                element.imgUrl = s[i]
                console.log(s[i])
                that.imgList.push(element)
                that.srcList.push(that.global + s[i])
              }
            }
          }).catch(function (error) {
          console.log(error)
          that.$message.error('获取用户数据失败')
        })
      },
      refresh () {
        this.getImgAndStudentList()
        this.getAllStudentList()
      }
    },
    created () {
      // 动态调整左侧菜单栏高度
      var docHeight = document.documentElement.clientHeight
      this.containerHeight.height = docHeight + 'px'
      this.userName = sessionStorage.getItem('userName')

      this.getParams()
      this.getImgAndStudentList()
      this.getAllStudentList()
    },
    mounted () {
      window.addEventListener('resize', () => {
        var docHeight = document.documentElement.clientHeight
        this.containerHeight.height = docHeight + 'px'
      }, false)
    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style scoped>
  /deep/ .el-menu-item {
    text-align: left !important;
  }
  #canvasSetting{
    width: 100%;
    display: -webkit-flex; /* Safari */
    -webkit-justify-content: space-around; /* Safari 6.1+ */
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  p{
    font-size: 14px;
    text-align: left;
    margin-left: 10px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  /*.box-card {*/
  /*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*  -webkit-font-smoothing: antialiased;*/
  /*  -moz-osx-font-smoothing: grayscale;*/
  /*  text-align: center;*/
  /*}*/
  /deep/.el-divider--horizontal {
    margin: 0 0 24px 0 !important;
  }
</style>
