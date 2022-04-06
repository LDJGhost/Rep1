<template>
  <div>
    <el-container :style="containerHeight">
      <el-aside width="190px" style="background-color: rgb(84, 92, 100);">
        <div style="margin: 10px 0px 8px 25px;text-align: left">
          <el-avatar :size="40" :src="circleUrl"></el-avatar>
          <span style="color: snow;margin-left: 10px;">{{userName}}</span>
        </div>
        <el-menu
          :default-active="'/admin/studentChooseCourses'"
          router
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          style="border: 1px rgb(84, 92, 100)">
          <el-menu-item index="/admin/studentRegistration">
            <i class="el-icon-s-order"></i>
            <span slot="title">学生账号管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/studentChooseCourses">
            <i class="el-icon-reading"></i>
            <span slot="title">学生选课审核</span>
          </el-menu-item>
          <el-menu-item index="/admin/adjustCourse">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">教师调课审核</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>学生选课审核</b></el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider class="el-divider1"></el-divider>
        <el-button type="primary" style="float: left" @click="beforeApproval(1)">审核通过</el-button>
        <el-button type="danger" style="float: left" @click="beforeApproval(2)">审核不通过</el-button>
        <el-dialog
          title="提示"
          :visible.sync="sureApprovalDialog"
          width="30%"
          center>
          <span>是否将所选学生的选课申请为审核{{approve?'':'不'}}通过？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="sureApprovalDialog = false">取 消</el-button>
            <el-button type="primary" @click="approve?approvalRegistration(1):approvalRegistration(2)">确 定</el-button>
          </span>
        </el-dialog>
        <el-divider class="el-divider2"></el-divider>
        <el-table
          ref="multipleTable"
          :row-key="handleReserve"
          @selection-change="handleSelectionChange"
          :data="chooseCourseList"
          style="width: 100%">
          <el-table-column type="selection" reserve-selection width="50"></el-table-column>
          <el-table-column prop="studentNum" label="学号"></el-table-column>
          <el-table-column prop="studentName" label="姓名"></el-table-column>
          <el-table-column prop="courseId" label="课程号"></el-table-column>
          <el-table-column prop="courseName" label="所选课程"></el-table-column>
<!--          <el-table-column prop="certState" label="审核状态" :formatter=certificatesStatus show-overflow-tooltip></el-table-column>-->
<!--                    <el-table-column label="操作" width="150">-->
<!--                      <template slot-scope="scope">-->
<!--                        <el-button @click="handleClickPdf(scope.row)" type="text" size="small">PDF格式</el-button>-->
<!--                        <el-button @click="handleClickJpg(scope.row)" type="text" size="small">JPG格式</el-button>-->
<!--                      </template>-->
<!--                    </el-table-column>-->
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="queryInfo.page"
          :page-size="queryInfo.itemSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        chooseCourseList: [],
        multipleSelection: [],
        containerHeight: {
          height: ''
        },
        sureApprovalDialog: false,
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        userName: '',
        queryInfo: {
          page: 1, // 当前页数
          itemSize: 14 // 当前每页显示奖状数
        },
        total: 0,
        approve: true
      }
    },
    methods: {
      // 表格数据处理,保存上一页选中的数据
      handleReserve (row) {
        return row.id
      },
      // 获取到用户勾选的行
      handleSelectionChange (items) {
        // this.downloadList = []
        // for (var index in items) {
        //   this.downloadList.push(items[index].id)
        // }
        this.multipleSelection = items
      },
      getStudentChoose () {
        var that = this
        this.$axios.get('/administrator/getAllCourseApplication?page=' + this.queryInfo.page + '&itemSize=' + this.queryInfo.itemSize)
          .then(function (response) {
            if (response.status === 200) {
              console.log(response)
              that.chooseCourseList = response.data.data.content
              that.total = response.data.data.totalElements
            }
          }).catch(function (error) {
          console.log(error)
          that.$message.error('获取用户数据失败')
        })
      },
      // 监听页码值改变事件
      handleCurrentChange (newPage) {
        console.log(newPage)
        this.queryInfo.page = newPage
        this.getStudentChoose()
      },
      beforeApproval (approve) {
        if (this.multipleSelection.length === 0) {
          this.$message({
            showClose: true,
            message: '请选择批量审核的学生选课申请',
            type: 'warning'
          })
        } else {
          this.sureApprovalDialog = true
          if (approve === 1) {
            this.approve = true
          } else {
            this.approve = false
          }
        }
      },
      async approvalRegistration (state) {
        console.log(this.multipleSelection)
        let ids = []
        this.multipleSelection.forEach(selectedItem => {
          ids.push(selectedItem.id)
        })
        console.log(ids)
        var that = this
        await this.$axios.post('/administrator/approveStudentCourse?ids=' + ids + '&state=' + state)
          .then(function (response) {
            if (response.status === 200) {
              console.log(response)
              that.sureApprovalDialog = false
              that.getStudentChoose()
              that.ids = []
              that.multipleSelection = []
              that.$refs.multipleTable.clearSelection()
              that.$message.success('审核成功')
            }
          }).catch(function (error) {
          console.log(error)
          return that.$message.error('审核失败！')
        })
      }
    },
    created () {
      // 动态调整左侧菜单栏高度
      var docHeight = document.documentElement.clientHeight
      this.containerHeight.height = docHeight + 'px'
      this.userName = sessionStorage.getItem('userName')
      this.getStudentChoose()
    }
  }
</script>

<style scoped>
  /deep/ .el-menu-item {
    text-align: left !important;
  }
  /deep/ .el-divider2 {
    margin: 63px 0px 0px 0px;
  }
  /deep/ .el-divider1 {
    margin: 24px 0px 10px 0px;
  }
</style>
