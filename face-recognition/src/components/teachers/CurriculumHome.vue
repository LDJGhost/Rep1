<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="1-1" style="height: 70px">
<!--            <Icon type="ios-navigate"></Icon>-->
            <Avatar size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
            <span>陈海</span>
          </MenuItem>
          <MenuItem name="1-2">
            <Icon type="search"></Icon>
            <span>我的课程</span>
          </MenuItem>
          <MenuItem name="1-3">
            <Icon type="settings"></Icon>
            <span>课程点名</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
<!--        <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>-->
        <Content :style="{padding: '0 16px 16px'}">
<!--          <Breadcrumb :style="{margin: '16px 0'}">-->
<!--            <BreadcrumbItem>Home</BreadcrumbItem>-->
<!--            <BreadcrumbItem>Components</BreadcrumbItem>-->
<!--            <BreadcrumbItem>Layout</BreadcrumbItem>-->
<!--          </Breadcrumb>-->
<!--          <Card>-->
<!--            <div style="height: 600px" class="input_video">-->
<!--&lt;!&ndash;              <transition name="fade"> &lt;!&ndash; v-if="seeMedia"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="media-wrapper">&ndash;&gt;-->
<!--&lt;!&ndash;                  <Button type="text" class="media-close" shape="circle" icon="close" @click="close"></Button>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div class="media-controller">&ndash;&gt;-->
<!--&lt;!&ndash;                    <Button-group shape='circle'>&ndash;&gt;-->
<!--&lt;!&ndash;                      <Button size="large" type="default" icon="ios-skipbackward" @click.prevent="prev"></Button>&ndash;&gt;-->
<!--&lt;!&ndash;                      <Button size="large" type="default" icon="ios-skipforward" @click.prevent="next"></Button>&ndash;&gt;-->
<!--&lt;!&ndash;                    </Button-group>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div class="media-content"> &lt;!&ndash; &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                    <div v-for="(item,index) in data" :key="index" :class="type(index)">&ndash;&gt;-->
<!--&lt;!&ndash;                      <img :src='item' v-if="isImg(item)" @click="toggle(index)">&ndash;&gt;-->
<!--&lt;!&ndash;                      <video :src="item" v-else controls="controls" @click="toggle(index)">&ndash;&gt;-->
<!--&lt;!&ndash;                      </video>&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;              </transition>&ndash;&gt;-->
<!--              <video-player  class="video-player vjs-custom-skin"-->
<!--                             ref="videoPlayer"-->
<!--                             :playsinline="true"-->
<!--                             :options="playerOptions"-->
<!--              ></video-player>-->
<!--            </div>-->
<!--          </Card>-->
          <div id="canvasSetting">
            <div>
              <card style="width: 340px">
                <el-image
                  style="width: 300px; height: 200px; border: 1px solid blue"
                  :src="url"
                  :preview-src-list="srcList">
                </el-image>
                <el-image
                  style="width: 300px; height: 200px;margin-top: 10px"
                  :src="url"
                  :preview-src-list="srcList">
                </el-image>
                <el-image
                  style="width: 300px; height: 200px;margin-top: 10px"
                  :src="url"
                  :preview-src-list="srcList">
                </el-image>
              </card>
            </div>

            <div>
<!--              <card style="width: 750px; margin-left: 30px">-->
<!--              </card>-->
              <el-card style="width: 800px; margin-left: 30px" class="box-card">
                <div slot="header" class="clearfix">
                  <span style="float: left;color: #2e6da4;font-weight:900;font-size: 20px">点名系统</span>
                </div>
                <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column prop="date" label="学号" width="180"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                  <el-table-column prop="address" label="班级"></el-table-column>
                </el-table>
              </el-card>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        url: require('../../assets/class1.jpg'),
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
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
