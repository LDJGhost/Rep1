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
<!--        <div class="honor_wall">-->
<!--          <el-card style="margin-bottom: 5px">-->
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/teacher/timetable' }">我的课程</el-breadcrumb-item>
              <el-breadcrumb-item><b>点名拍照记录</b></el-breadcrumb-item>
            </el-breadcrumb>

            <el-divider></el-divider>
<!--            <div>-->
<!--              &lt;!&ndash;        <el-button-group>&ndash;&gt;-->
<!--              &lt;!&ndash;          <el-button type="primary" icon="el-icon-s-order" @click="list">荣誉统计</el-button>&ndash;&gt;-->
<!--              &lt;!&ndash;        </el-button-group>&ndash;&gt;-->
<!--              <el-row>-->
<!--                <el-input placeholder="请输入内容" v-model="searchInfo.search" style="float: left;width: 30%" @change="getSearchList(0)">-->
<!--                  <el-button slot="append" icon="el-icon-search" @click="getSearchList(0)"></el-button>-->
<!--                </el-input>-->
<!--              </el-row>-->
<!--            </div>-->
<!--            <el-divider></el-divider>-->
            <div v-if="empty" align="center" style="color:#909399;margin: 100px 0px">暂无点名拍照记录</div>

            <el-row :gutter="15">
              <el-col :span="6"  v-for="record in imgList" :key="record.id" class="card_col">
                <el-card shadow="hover" :body-style="{ padding: '10px'}" class="card">
<!--                  <a :href="'http://192.168.1.140:9091/' + record.originalUrl" target="_blank"><img :src="'http://192.168.1.140:9091/' + record.originalUrl" class="image" style="width: 300px; height: 180px"></a>-->
<!--                  <img :src="global + record.imgUrl" class="image" style="width: 260px; height: 180px" @click="jump(record.id)">-->
                  <img :src="global + record.imgUrl" class="image" @click="jump(record.id)">
                  <div style="padding: 0px;text-align: left" class="record_info">
                    <div style="margin-top: 5px">
                      <span>{{record.uploadTime}}</span>
                      <el-button type="text" @click="sureDelete(record.id)" style="float: right;margin-bottom: 5px">删除</el-button>
                      <el-button type="text" @click="jump(record.id)" style="float: right;margin-right: 8px;margin-bottom: 5px">查看</el-button>
                      <!--                <el-popover-->
                      <!--                  trigger="hover">-->
                      <!--                  <p>选择查看的格式：</p>-->
                      <!--                  <div style="margin: 0">-->
                      <!--                    <el-button size="mini" type="text" @click="downloadPDF(record.pdfUrl)">查看PDF格式</el-button>-->
                      <!--                    <el-button type="mini" size="text" @click="downloadJPG(record.jpgUrl)">查看JPG格式</el-button>-->
                      <!--                  </div>-->
                      <!--                  <el-button slot="reference" type="text" class="more_btn" icon="el-icon-more"></el-button>-->
                      <!--                </el-popover>-->
<!--                      <el-dialog-->
<!--                        title="提示"-->
<!--                        :visible.sync="sureDeleteDialog"-->
<!--                        width="400px"-->
<!--                        center>-->
<!--                        <span>是否将该拍照记录删除？</span>-->
<!--                        <span slot="footer" class="dialog-footer">-->
<!--                      <el-button @click="sureDeleteDialog = false">取 消</el-button>-->
<!--                      <el-button type="primary" @click="sureDelete(record.id)">确 定</el-button>-->
<!--                    </span>-->
<!--                      </el-dialog>-->
                    </div>
<!--                    <time class="time">{{ record.awardTime }}</time>-->
                  </div>

                </el-card>
              </el-col>
            </el-row>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="queryInfo.page"
              :page-size="queryInfo.itemSize"
              layout="total, prev, pager, next, jumper"
              :total="total"
              v-if="active">
            </el-pagination>
            <el-pagination
              @current-change="handleSearchCurrentChange"
              :current-page="searchInfo.page"
              :page-size="searchInfo.itemSize"
              layout="total, prev, pager, next, jumper"
              :total="total"
              v-else>
            </el-pagination>
<!--          </el-card>-->
<!--        </div>-->
      </el-main>
    </el-container>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        global: this.Global.IpAddress,
        containerHeight: {
          height: ''
        },
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        userName: '',
        recordList: [],
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
        active: true,
        courseId: '',
        imgList: [],
        sureDeleteDialog: false
      }
    },
    created () {
      // 动态调整左侧菜单栏高度
      var docHeight = document.documentElement.clientHeight
      this.containerHeight.height = docHeight + 'px'
      this.userName = sessionStorage.getItem('userName')
      this.getParams()
      this.getHonorList()
      //
      // this.$http.get('/listCertificate', { headers: { 'Owner-ID': this.ownerId },
      //   params: {
      //     certClass: ''
      //   }})
      //   .then(function (response) {
      //     if (response.status === 200) {
      //       var role = ''
      //       console.log(response)
      //       role = response.data.content[0].ownerClass
      //       if (role === '教师') {
      //         that.isTeacher = true
      //       }
      //       if (role === '学生') {
      //         that.isTeacher = false
      //       }
      //     }
      //   }).catch(function (error) {
      //   console.log(error)
      //   that.$message.error('获取用户数据失败')
      // })
      // this.getHonorList()
    },
    mounted () {
      window.addEventListener('resize', () => {
        var docHeight = document.documentElement.clientHeight
        this.containerHeight.height = docHeight + 'px'
      }, false)
    },
    methods: {
      logout () {
        window.sessionStorage.clear()
        this.$router.push('/Login')
      },
      jump (id) {
        var courseId = this.courseId
        console.log('id=' + id)
        this.$router.push({path: '/teacher/enterToRecord',
          query: {
            recordId: id,
            courseId: courseId
          }
        })
      },
      beforeDelete () {
        this.sureDeleteDialog = true
      },
      sureDelete (id) {
        var that = this
        var recordId = []
        recordId.push(id)
        console.log(recordId)
        this.$axios.post('/uploadRecord/deleteUploadRecordById?ids=' + recordId)
          .then(function (response) {
            console.log(response)
            if (response.status === 200 && response.data.state === 200) {
              console.log(response)
              // that.sureDeleteDialog = false
              that.getHonorList()
              that.$message.success('删除记录成功。')
            }
          }).catch(function (error) {
          console.log(error)
          that.$message.error('删除记录失败')
        })
      },
      // table () {
      //     console.log(this.isTeacher)
      //     this.$router.replace('/honor_table')
      // },
      // 点击 “荣誉统计” 的跳转
      // list () {
      //   console.log(this.isTeacher)
      //   this.$router.replace('/honor_list')
      // },
      // 获取 奖状/证明 的荣誉墙
      async getHonorList () {
        var that = this
        console.log(this.queryInfo.itemSize)
        this.$axios.get('/uploadRecord/getRecord?courseId=' + this.courseId + '&page=' + this.queryInfo.page + '&itemSize=' + this.queryInfo.itemSize)
          .then(function (response) {
            console.log(response)
            if (response.status === 200 && response.data.state === 200) {
              console.log(response)
              that.imgList = []
              that.total = response.data.data.totalElements
              that.empty = response.data.data.empty
              var list
              var s
              for (var i = 0; i < response.data.data.content.length; i++) {
                var element = {
                  imgUrl: '',
                  id: '',
                  uploadTime: ''
                }
                list = response.data.data.content[i].originalUrl
                s = list.split(',')
                element.imgUrl = s[0]
                element.id = response.data.data.content[i].id
                element.uploadTime = response.data.data.content[i].uploadTime
                that.imgList.push(element)
              }
            }
          }).catch(function (error) {
          console.log(error)
          that.$message.error('获取记录失败。')
        })
      },
      // 改变单选框（奖状/证明）的触发
      // changeType () {
      //   this.active = true
      //   this.queryInfo.page = 1
      //   this.searchInfo.search = ''
      //   this.getHonorList()
      // },
      // 输入关键字之后获取的荣誉墙
      async getSearchList (f) {
        console.log('f=' + f)
        this.active = false
        if (f === 0) {
          this.searchInfo.page = 1
        }
        var type
        if (this.form.certificateType === '奖状') {
          type = 1
        } else {
          type = 2
        }
        console.log('searchInfo.page:' + this.searchInfo.page)
        const res = await this.$http.get('/searchListCertificate', { headers: { 'Owner-ID': this.ownerId },
          params: {
            certClass: type,
            page: this.searchInfo.page,
            itemSize: this.searchInfo.itemSize,
            search: this.searchInfo.search
          }
        })
        if (res.status !== 200) return this.$message.error('获取用户数据失败')
        console.log('search：' + this.searchInfo.search)
        console.log(res)
        this.recordList = res.data.content
        this.total = res.data.totalElements
      },
      // 监听页码值改变事件
      handleCurrentChange (newPage) {
        console.log(newPage)
        this.queryInfo.page = newPage
        this.imgList = []
        this.getHonorList()
      },
      // 监听页码值(关键字搜索)改变事件
      handleSearchCurrentChange (newPage) {
        console.log('关键字搜索:' + newPage)
        this.searchInfo.page = newPage
        this.getSearchList(1)
      },
      getParams () {
        this.courseId = this.$route.query.courseId
      }
      // // 下载奖状JPG格式
      // downloadJPG (link) {
      //   window.open(link)
      // },
      // // 下载奖状PDF格式
      // downloadPDF (link) {
      //   window.open(link)
      // }
    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style scoped>
  /*/deep/ .el-submenu__title {*/
  /*  text-align: left !important;*/
  /*}*/
  /deep/ .el-menu-item {
    text-align: left !important;
  }
  .card_col{
    margin-bottom: 10px;
  }

  .honor_wall{
    padding: 15px;
  //  background: #eaedf1;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }

  .switch_group{
    width: 100%;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  /*.record_info{*/
  /*  line-height: 20px;*/
  /*.time{*/
  /*  font-size: 15px;*/
  /*  color: #999;*/
  /*}*/
  /*}*/

  .more_btn{
    padding: 0;
    float: right;
    color: black;
  }

  /deep/.el-button {
    padding: 0px 0px;
  }

  /deep/.card .el-card__body{
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    /*align-items: center;*/

    height: 230px !important;
  }
  .image{
    flex: 9;
    width: 100%;
    height: calc(100% - 50px);
  }
  .record_info{
    margin-top: 5px;
    flex: 1;
  }

</style>
