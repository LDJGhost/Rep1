<template>
  <div>
    <el-container :style="containerHeight">
      <el-aside width="190px" style="background-color: rgb(84, 92, 100);">
        <div style="margin: 10px 0px 8px 25px;text-align: left">
          <el-avatar :size="40" :src="circleUrl"></el-avatar>
          <span style="color: snow;margin-left: 10px;">{{userName}}</span>
        </div>
        <el-menu
          :default-active="'/admin/adjustCourse'"
          class="el-menu-vertical-demo"
          router
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
          <el-breadcrumb-item><b>教师调课审核</b></el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider class="el-divider1"></el-divider>
        <el-button type="primary" style="float: left" @click="beforeApproval(1)">审核通过</el-button>
        <el-button type="danger" style="float: left" @click="beforeApproval(2)">审核不通过</el-button>
<!--        ...-->
        <el-dialog
          title="提示"
          :visible.sync="sureApprovalDialog"
          width="30%"
          center>
          <span>是否将所选的调课申请审核为{{approval?'通过':'不通过'}}？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="sureApprovalDialog = false">取 消</el-button>
            <el-button type="primary" @click="approval?approvalRegistration(1):approvalRegistration(2)">确 定</el-button>
          </span>
        </el-dialog>
        <el-table
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          :data="courseChangeApplies"
          :row-key="handleReserve"
          style="width: 100%">
          <el-table-column type="selection" reserve-selection width="50"></el-table-column>
          <el-table-column prop="courseName" label="课程名"></el-table-column>
          <el-table-column prop="courseLocation" label="地点"></el-table-column>
          <el-table-column prop="courseWeek" label="周"></el-table-column>
          <el-table-column prop="courseTime" label="时段"></el-table-column>
          <el-table-column prop="courseLen" label="课长"></el-table-column>
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
        containerHeight: {
          height: ''
        },
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        userName: '',
        courseChangeApplies: [],
        multipleSelection: [],
        queryInfo: {
          page: 1, // 当前页数
          itemSize: 14 // 当前每页显示奖状数
        },
        total: 0,
        sureApprovalDialog: false,
        approval: true
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
      getApplies () {
        var that = this
        this.$axios.get('/administrator/getAllCourseChangeApplies?page=' + this.queryInfo.page + '&itemSize=' + this.queryInfo.itemSize)
          .then(function (response) {
            if (response.status === 200) {
              console.log(response)
              that.courseChangeApplies = response.data.data.content
              that.total = response.data.data.totalElements
            }
          }).catch(function (error) {
            console.log(error)
            that.$message.error('获取数据失败')
        })
      },
      // 监听页码值改变事件
      handleCurrentChange (newPage) {
        console.log(newPage)
        this.queryInfo.page = newPage
        this.getApplies()
      },
      beforeApproval (approval) {
        if (this.multipleSelection.length === 0) {
          this.$message({
            showClose: true,
            message: '请选择批量审核的学生选课申请',
            type: 'warning'
          })
        } else {
          this.sureApprovalDialog = true
          if (approval === 1) {
            this.approval = true
          } else {
            this.approval = false
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
        await this.$axios.post(`/administrator/approveCourseChangeApplies?ids=${ids}&state=${state}`)
          .then(function (response) {
            if (response.status === 200) {
              console.log(response)
              that.sureApprovalDialog = false
              that.getApplies()
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
      this.getApplies()
      console.log(this.courseChangeApplies)
    }
  }
</script>

<style scoped>
  /deep/ .el-menu-item {
    text-align: left !important;
  }
</style>
