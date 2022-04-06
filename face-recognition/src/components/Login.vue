<template>
  <body id="poster">
  <img src="../assets/img/logo.png" id="logo">
  <el-form class="login-container" label-position="left" label-width="0px" :model="loginForm" :rules="loginFormRules" ref="loginForm">
    <el-tabs v-model="activeName" >
      <el-tab-pane label="账号登陆" name="first">
        <div class="box">
<!--          <h3 class="login_title">系统登录</h3>-->
          <el-form-item style="margin-top: 10px">
            <el-input prefix-icon="el-icon-user" type="text" v-model="loginForm.userAccount" auto-complete="off" placeholder="工号" @keyup.enter.native="login"></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 10px">
            <el-input prefix-icon="el-icon-lock" type="text" v-model="loginForm.userName" auto-complete="off" placeholder="姓名" @keyup.enter.native="login"></el-input>
          </el-form-item>
<!--          <el-form-item>-->
            <el-radio-group type="Role" v-model="loginForm.userRole" style="margin:0px -8px 15px 0px">
              <el-radio :label="0" :value="0">管理员</el-radio>
              <el-radio :label="1" :value="1">教师</el-radio>
<!--              <el-radio :label="2" :value="2">学生</el-radio>-->
            </el-radio-group>
<!--          </el-form-item>-->
          <el-form-item style="width: 100%; margin-top: 10px">
            <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="login">登录</el-button>
          </el-form-item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="二维码登陆" name="second">
        <div v-for="img in imgList" :key="img.QRUrl">
          <el-image :src="global + img.QRUrl"></el-image>
        </div>
        二维码登陆</el-tab-pane>
    </el-tabs>
  </el-form>
  </body>
</template>

<script>
export default {
    name: 'Login',
    data () {
      return {
        global: this.Global.IpAddress,
        bgPX: 0,
        loginForm: {
          userAccount: '',
          userName: '',
          userRole: 1
        },
        loginFormRules: {
          userAccount: [
            { required: true, message: '请输入对应信息', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入对应信息', trigger: 'blur' }
          ]
        },
        activeName: 'first',
        qrCodeUrl: '',
        imgList: '',
        qrCodeId: '',
        timer: ''
      }
    },
    methods: {
      login () {
        var that = this
        console.log(this.loginForm.userRole)
        this.$axios.post('/login?account=' + this.loginForm.userAccount + '&name=' + this.loginForm.userName + '&identity=' + this.loginForm.userRole)
          .then(function (response) {
            console.log(response)
            if (response.status === 200 && response.data.state === 200) {
              console.log(response)
              // this.$router.replace({path: '/Timetable'})
              window.sessionStorage.setItem('userAccount', that.loginForm.userAccount)
              window.sessionStorage.setItem('userName', that.loginForm.userName)
              that.time = window.clearInterval(that.timer) // 清除定时器
              if (that.loginForm.userRole === 0) {
                that.$router.push('/admin/StudentRegistration')
              }
              if (that.loginForm.userRole === 1) {
                that.$router.push('/teacher/timetable')
              }
            }
            // if (response.status === 200 && response.data.state === 1) {
            //   alert('登陆失败：用户信息不匹配。')
            // }
            if (response.status === 200 && response.data.state === 400) {
              // alert('登陆失败：没有当前用户.')
              alert('登陆失败：' + response.data.msg)
            }
          }).catch(function (error) {
          console.log(error)
          that.$message.error('登陆失败')
        })
      },
      getQRCode () {
        var that = this
        this.$axios.get('/CreateQRcode')
          .then(function (response) {
          if (response.status === 200) {
            console.log(response)
            that.imgList = response.data.data
            that.qrCodeId = response.data.data[0].ID
            console.log(that.imgList)
          }
        }).catch(function (error) {
          console.log(error)
          this.$message.error('获取二维码失败')
        })
      },
      getCheck () {
        var that = this
        this.$axios.post('/QRlogin?ID=' + this.qrCodeId)
          .then(function (response) {
            console.log(response)
            if (response.status === 200 && response.data.state === 200) {
              window.sessionStorage.setItem('userAccount', response.data.data.teacherNum)
              window.sessionStorage.setItem('userName', response.data.data.teacherName)
              that.time = window.clearInterval(that.timer)
              that.$router.push('/teacher/timetable')
              console.log(response)
            }
          }).catch(function (error) {
          console.log(error)
          // this.$message.error('获取二维码失败')
        })
      },
      changeBG () {
        let index = 0
        let _this = this
        setInterval(function () {
          if (index < 4) {
            index++
            _this.bgPX = _this.bgPX - 1920
            _this.$('#poster').css('background-position-x', _this.bgPX + 'px')
          } else {
            index = 0
            _this.bgPX = 0
            _this.$('#poster').css('background-position-x', _this.bgPX + 'px')
          }
        }, 10000)
      }
    },
  created () {
    this.getQRCode()
    this.changeBG()
    // 实现轮询
    this.timer = window.setInterval(() => {
      setTimeout(this.getCheck(), 0)
    }, 3000)
  }
}
</script>

<style scoped>

  #poster {
    background:url("../assets/img/bg3.png") no-repeat;
    background-position-x: 0px;
    height: 100%;
    width: 100%;
    background-size: 9600px 1080px;
    position: fixed;
    transition: all 2s;
  }
  body{
    margin: 0px;
  }
  .login-container {
    border-radius: 8px;
    background-clip: padding-box;
    margin: 200px auto;
    height: 400px;
    width: 420px;
    padding: 8px 20px 10px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px rgba(0,0,0,0.2);
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .box{
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  #logo{
    height: 75px;
    position: absolute;
    margin: 700px -190px;
  }
</style>
