<template>
<!--  <div class="layout">-->
<!--&lt;!&ndash;    <Header style="background: #2e6da4">&ndash;&gt;-->
<!--&lt;!&ndash;      <span style="float: right;color: snow;font-size: 20px;font-family: 微软雅黑">点名管理系统</span>&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      <Menu mode="horizontal" theme="dark" active-name="1">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        <div class="layout-logo"></div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        <div class="layout-nav">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          <MenuItem name="1">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;            <Icon type="ios-navigate"></Icon>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;            Item 1&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          </MenuItem>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          <MenuItem name="2">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;            <Icon type="ios-keypad"></Icon>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;            Item 2&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          </MenuItem>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        </div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      </Menu>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    </Header>&ndash;&gt;-->
<!--    <Layout :style="{minHeight: '100vh'}">-->
<!--      <Sider collapsible :collapsed-width="70" v-model="isCollapsed">-->
<!--        <Avatar size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />-->
<!--        <span style="color: snow;font-size: 16px">管理员</span>-->
<!--        <Menu active-name="1-2" theme="dark" width="100" :class="menuitemClasses">-->
<!--          <MenuItem name="1-1" style="height: 70px">-->
<!--&lt;!&ndash;            <Icon type="ios-navigate"></Icon>&ndash;&gt;-->
<!--          </MenuItem>-->
<!--          <MenuItem name="1-2">-->
<!--            <Icon type="search"></Icon>-->
<!--            <span>课程管理</span>-->
<!--          </MenuItem>-->
<!--          <MenuItem name="1-3">-->
<!--            <Icon type="settings"></Icon>-->
<!--            <span>学生管理</span>-->
<!--          </MenuItem>-->
<!--        </Menu>-->
<!--      </Sider>-->
<!--      <Layout>-->
<!--        &lt;!&ndash;        <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>&ndash;&gt;-->
<!--        <Content :style="{padding: '0 16px 16px'}">-->
<!--          &lt;!&ndash;          <Breadcrumb :style="{margin: '16px 0'}">&ndash;&gt;-->
<!--          &lt;!&ndash;            <BreadcrumbItem>Home</BreadcrumbItem>&ndash;&gt;-->
<!--          &lt;!&ndash;            <BreadcrumbItem>Components</BreadcrumbItem>&ndash;&gt;-->
<!--          &lt;!&ndash;            <BreadcrumbItem>Layout</BreadcrumbItem>&ndash;&gt;-->
<!--          &lt;!&ndash;          </Breadcrumb>&ndash;&gt;-->
<!--          &lt;!&ndash;          <Card>&ndash;&gt;-->
<!--          &lt;!&ndash;            <div style="height: 600px" class="input_video">&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;              <transition name="fade"> &lt;!&ndash; v-if="seeMedia"&ndash;&gt;&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                <div class="media-wrapper">&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                  <Button type="text" class="media-close" shape="circle" icon="close" @click="close"></Button>&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                  <div class="media-controller">&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                    <Button-group shape='circle'>&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                      <Button size="large" type="default" icon="ios-skipbackward" @click.prevent="prev"></Button>&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                      <Button size="large" type="default" icon="ios-skipforward" @click.prevent="next"></Button>&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                    </Button-group>&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                  </div>&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                  <div class="media-content"> &lt;!&ndash; &ndash;&gt;&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                    <div v-for="(item,index) in data" :key="index" :class="type(index)">&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                      <img :src='item' v-if="isImg(item)" @click="toggle(index)">&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                      <video :src="item" v-else controls="controls" @click="toggle(index)">&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                      </video>&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                    </div>&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                  </div>&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;                </div>&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;&lt;!&ndash;              </transition>&ndash;&gt;&ndash;&gt;-->
<!--          &lt;!&ndash;              <video-player  class="video-player vjs-custom-skin"&ndash;&gt;-->
<!--          &lt;!&ndash;                             ref="videoPlayer"&ndash;&gt;-->
<!--          &lt;!&ndash;                             :playsinline="true"&ndash;&gt;-->
<!--          &lt;!&ndash;                             :options="playerOptions"&ndash;&gt;-->
<!--          &lt;!&ndash;              ></video-player>&ndash;&gt;-->
<!--          &lt;!&ndash;            </div>&ndash;&gt;-->
<!--          &lt;!&ndash;          </Card>&ndash;&gt;-->
<!--          <div id="canvasSetting">-->
<!--&lt;!&ndash;            <div>&ndash;&gt;-->
<!--&lt;!&ndash;              <card style="width: 340px">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-image&ndash;&gt;-->
<!--&lt;!&ndash;                  style="width: 300px; height: 200px; border: 1px solid blue"&ndash;&gt;-->
<!--&lt;!&ndash;                  :src="url"&ndash;&gt;-->
<!--&lt;!&ndash;                  :preview-src-list="srcList">&ndash;&gt;-->
<!--&lt;!&ndash;                </el-image>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-image&ndash;&gt;-->
<!--&lt;!&ndash;                  style="width: 300px; height: 200px;margin-top: 10px"&ndash;&gt;-->
<!--&lt;!&ndash;                  :src="url"&ndash;&gt;-->
<!--&lt;!&ndash;                  :preview-src-list="srcList">&ndash;&gt;-->
<!--&lt;!&ndash;                </el-image>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-image&ndash;&gt;-->
<!--&lt;!&ndash;                  style="width: 300px; height: 200px;margin-top: 10px"&ndash;&gt;-->
<!--&lt;!&ndash;                  :src="url"&ndash;&gt;-->
<!--&lt;!&ndash;                  :preview-src-list="srcList">&ndash;&gt;-->
<!--&lt;!&ndash;                </el-image>&ndash;&gt;-->
<!--&lt;!&ndash;              </card>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->

<!--            <div>-->
<!--&lt;!&ndash;              <el-card style="width: 800px; margin-left: 30px" class="box-card">&ndash;&gt;-->
<!--&lt;!&ndash;                <div slot="header" class="clearfix">&ndash;&gt;-->
<!--&lt;!&ndash;                  <span style="float: left;color: #2e6da4;font-weight:900;font-size: 20px">点名系统</span>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-table&ndash;&gt;-->
<!--&lt;!&ndash;                  :data="tableData"&ndash;&gt;-->
<!--&lt;!&ndash;                  style="width: 100%">&ndash;&gt;-->
<!--&lt;!&ndash;                  <el-table-column prop="date" label="学号" width="180"></el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                  <el-table-column prop="name" label="姓名" width="180"></el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                  <el-table-column prop="address" label="班级"></el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                </el-table>&ndash;&gt;-->
<!--&lt;!&ndash;              </el-card>&ndash;&gt;-->
<!--                <el-card style="width: 1250px; margin-left: 10px" class="box-card">-->
<!--                  <div slot="header" class="clearfix">-->
<!--                    <span style="float: left;color: #2e6da4;font-weight:900;font-size: 20px">调课记录</span>-->
<!--                  </div>-->

<!--                  <el-col style="margin-bottom: 8px">-->
<!--                    <el-button type="primary" style="float: left" @click="exportExcel1">审核通过</el-button>-->
<!--                    <el-button type="primary" style="float: left" @click="xiazai">审核不通过</el-button>-->
<!--&lt;!&ndash;                    <el-button type="danger" style="float: left" @click="failedSuggestionDialogVisible = true">撤销通过</el-button>&ndash;&gt;-->
<!--                    <el-input placeholder="快速搜索..." v-model="keywords" style="float: right; width: 35%">-->
<!--                      <el-button slot="append" icon="el-icon-search" @click="searchItemCertificates()"></el-button>-->
<!--                    </el-input>-->
<!--                  </el-col>-->
<!--&lt;!&ndash;                  <el-row style="margin-top: 5px">&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-col :span="8">&ndash;&gt;-->
<!--&lt;!&ndash;                      <el-input placeholder="快速搜索..." v-model="keywords" @change="searchUntreatItem()">&ndash;&gt;-->
<!--&lt;!&ndash;                        <el-button slot="append" icon="el-icon-search" @click="searchUntreatItem()"></el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                      </el-input>&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;                  </el-row>&ndash;&gt;-->

<!--                  <el-table-->
<!--                    :data="tableData"-->
<!--                    style="width: 100%;margin-top: 8px">-->
<!--                    <el-table-column prop="person" label="申请人"></el-table-column>-->
<!--                    <el-table-column prop="time" label="调课时间"></el-table-column>-->
<!--                    <el-table-column prop="place" label="调课地点"></el-table-column>-->
<!--                    <el-table-column prop="afterTime" label="调课后时间"></el-table-column>-->
<!--                    <el-table-column prop="afterPlace" label="调课后地点"></el-table-column>-->
<!--                  </el-table>-->
<!--                </el-card>-->
<!--            </div>-->

<!--          </div>-->
<!--        </Content>-->
<!--      </Layout>-->
<!--    </Layout>-->
<!--  </div>-->

  <el-container :style="containerHeight">
    <el-aside width="180px" style="background-color: rgb(84, 92, 100);">
      <div class="block" style="margin: 10px 0px 8px 25px;text-align: left"><el-avatar :size="40" :src="circleUrl"></el-avatar>
        <span style="color: snow;margin-left: 10px;">{{userName}}</span>
      </div>
      <el-menu
        :default-active="'/teacher/AdjustCourse'"
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
    </el-aside>
    <el-main>

    </el-main>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        containerHeight: {
          height: ''
        },
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        url: require('../../assets/class1.jpg'),
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
        tableData: [{
          person: '陈海',
          time: '2020年10月11号  3、4节课',
          place: '丽泽楼C404',
          afterTime: '2020年10月15号  5、6节课',
          afterPlace: '弘文楼A105'
        }, {
          person: '杨永平',
          time: '2020年10月16号  1、2节课',
          place: '木铎楼C404',
          afterTime: '2020年10月17号  3、4节课',
          afterPlace: '木铎楼C304'
        }, {
          person: '贺辉',
          time: '2020年10月17号  5、6节课',
          place: '木铎楼C404',
          afterTime: '2020年10月19号  5、6节课',
          afterPlace: '弘文楼A106'
        }],
        isCollapsed: false,
        // nowIndex: 0,
        // data: [
        //   '/src/assets/Sundau.mp4', '/src/assets/1.jpg', '/src/assets/2.jpg'
        // ]
        // 视频播放
        playerOptions: {
          playbackRates: [ 0.5, 1.0, 1.5, 2.0 ], // 可选择的播放速度
          autoplay: false, // 如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [ {
            type: '',
            src: require('../../assets/Sunday.mp4') // url地址
          } ],
          poster: '', // 你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true, // 当前时间和持续时间的分隔符
            durationDisplay: true, // 显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间功能
            fullscreenToggle: true // 全屏按钮
          }
        }
      }
    },
    created () {
      // 动态调整左侧菜单栏高度
      var docHeight = document.documentElement.clientHeight
      this.containerHeight.height = docHeight + 'px'
      // this.getParams()
      this.userAccount = sessionStorage.getItem('userAccount')
      this.userName = sessionStorage.getItem('userName')
    },
    methods: {
      next () {
        if (this.nowIndex === this.data.length - 1) {
          this.$Message.warning('已到达最后一张')
        } else {
          this.nowIndex++
        }
      },
      prev () {
        if (this.nowIndex === 0) {
          this.$Message.warning('已到达第一张')
        } else {
          this.nowIndex--
        }
      },
      type (index) {
        if (index === this.nowIndex) {
          return 'media-center'
        } else if (index - this.nowIndex === 1) {
          return 'media-right'
        } else if (index - this.nowIndex === -1) {
          return 'media-left'
        } else {
          return 'media-hide'
        }
      },
      isImg (item) {
        var ext = item.substr(item.length - 3, 3)
        var flag = (ext === ('jpg' || 'png' || 'gif'))
        console.log('flag:' + flag)
        return flag
      },
      toggle (index) {
        if (index - this.nowIndex === 1) {
          this.nowIndex++
        } else if (index - this.nowIndex === -1) {
          this.nowIndex--
        }
      },
      close () {
        this.$store.commit('SET_MEDIA', false)
        this.nowIndex = 0
      }
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
      seeMedia () {
        return this.$store.state.seeMedia
      }
    }
  }
</script>

<style scoped>
  /deep/ .el-menu-item {
    text-align: left !important;
  }
  .layout-con{
    height: 100%;
    width: 100%;
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }

  /*.media-wrapper {*/
  /*  position: absolute;*/
  /*  top: 0;*/
  /*  left: 0;*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*  background: rgba(0, 0, 0, 0.52);*/
  /*  z-index: 1010;*/
  /*  i {*/
  /*    color: #fff*/
  /*  }*/
  /*  .media-controller {*/
  /*    position: absolute;*/
  /*    left: 50%;*/
  /*    bottom: 30px;*/
  /*    transform: translateX(-50%)*/
  /*  }*/
  /*  .media-close {*/
  /*    position: absolute;*/
  /*    right: 5px;*/
  /*    top: 5px;*/
  /*    i {*/
  /*      font-size: 30px;*/
  /*    }*/
  /*  }*/
  /*  .media-content {*/
  /*    div {*/
  /*      position: absolute;*/
  /*      top: 50%; // background: green;*/
  /*      color: #fff;*/
  /*      text-align: center;*/
  /*      font-size: 30px;*/
  /*      transition: all .56s ease;*/
  /*      img {*/
  /*        max-width: 100%;*/
  /*        max-height: 100%*/
  /*      }*/
  /*      video {*/
  /*        width: 100%;*/
  /*      }*/
  /*    }*/
  /*    .media-center {*/
  /*      height: 50%;*/
  /*      width: 40%;*/
  /*      left: 50%;*/
  /*      transform: translate(-50%, -50%);*/
  /*      z-index: 1011;*/
  /*    }*/
  /*    .media-left,*/
  /*    .media-right {*/
  /*      width: 25%;*/
  /*      height: 35%;*/
  /*      filter: grayscale(90%);*/
  /*    }*/
  /*    .media-right {*/
  /*      left: 100%;*/
  /*      transform: translate(-105%, -50%);*/
  /*    }*/
  /*    .media-left {*/
  /*      left: 0;*/
  /*      transform: translate(5%, -50%);*/
  /*    }*/
  /*    .media-hide {*/
  /*      height: 0;*/
  /*      width: 0;*/
  /*      left: 50%;*/
  /*      z-index: 1010;*/
  /*      opacity: 0;*/
  /*    }*/
  /*  }*/
  /*}*/
  .input_video{
    width: 400px;
    height: 400px;
    margin: 0 auto;

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
  .box-card {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
