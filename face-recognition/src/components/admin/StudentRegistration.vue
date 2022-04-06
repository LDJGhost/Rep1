<template>
  <div>
    <el-container :style="containerHeight">
      <el-aside width="190px" style="background-color: rgb(84, 92, 100);">
        <div style="margin: 10px 0px 8px 25px;text-align: left">
          <el-avatar :size="40" :src="circleUrl"></el-avatar>
          <span style="color: snow;margin-left: 10px;">{{userName}}</span>
        </div>
        <el-menu
          :default-active="'/admin/studentRegistration'"
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
          <el-breadcrumb-item><b>学生账号管理</b></el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider class="el-divider1"></el-divider>
<!--        <el-col>-->
<!--          <el-button type="primary" style="float: left" @click="exportExcel1">导出Excel</el-button>-->
<!--          <el-button type="primary" style="float: left" @click="xiazai">下载pdf</el-button>-->
        <el-button type="primary" style="float: left" @click="beforeApproval()">审核通过</el-button>
<!--          <el-button type="danger" style="float: left" @click="cancel()">撤销通过</el-button>-->
<!--          <el-input placeholder="快速搜索..." v-model="keywords" style="float: right; width: 35%">-->
<!--            <el-button slot="append" icon="el-icon-search" @click="searchItemCertificates()"></el-button>-->
<!--          </el-input>-->
<!--        </el-col>-->
        <el-dialog
          title="提示"
          :visible.sync="sureApprovalDialog"
          width="30%"
          center>
          <span>是否将所选学生的注册审核通过？</span>
          <span slot="footer" class="dialog-footer">
        <el-button @click="sureApprovalDialog = false">取 消</el-button>
        <el-button type="primary" @click="approvalRegistration()">确 定</el-button>
      </span>
        </el-dialog>
        <el-divider class="el-divider2"></el-divider>

        <el-table
          ref="multipleTable"
          :row-key="handleReserve"
          @selection-change="handleSelectionChange"
          :data="registrationList"
          style="width: 100%">
          <el-table-column type="selection" reserve-selection width="50"></el-table-column>
          <el-table-column prop="studentNum" label="学号"></el-table-column>
          <el-table-column prop="studentName" label="姓名"></el-table-column>
          <el-table-column prop="studentMajor" label="专业"></el-table-column>
<!--          <el-table-column prop="certState" label="审核状态" :formatter=certificatesStatus show-overflow-tooltip></el-table-column>-->
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
<!--              <el-button @click="handleClickPdf(scope.row)" type="text" size="small">查看图片</el-button>-->
<!--              <el-button @click="handleClickJpg(scope.row)" type="text" size="small">JPG格式</el-button>-->
              <el-image
                v-if="scope.row.imgUrl !== null"
                style="width: 75px; height: 100px"
                :src="global + scope.row.imgUrl"
                :preview-src-list="[global + scope.row.imgUrl]">
              </el-image>

              <span v-else>
              暂无图片
              </span>
            </template>
          </el-table-column>
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
        global: this.Global.IpAddress,
        registrationList: [],
        multipleSelection: [],
        sureApprovalDialog: false,
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        userName: '',
        ids: [],
        queryInfo: {
          page: 1, // 当前页数
          itemSize: 10 // 当前每页显示奖状数
        },
        total: 0
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
      getRegistration () {
        var that = this
        this.$axios.get('/administrator/getAllAuditingStudent?page=' + this.queryInfo.page + '&itemSize=' + this.queryInfo.itemSize)
          .then(function (response) {
          if (response.status === 200) {
            // console.log(response)
            that.registrationList = response.data.data.content
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
        this.getRegistration()
      },
      beforeApproval () {
        if (this.multipleSelection.length === 0) {
          this.$message({
            showClose: true,
            message: '请选择批量审核的学生注册申请',
            type: 'warning'
          })
        } else {
          this.sureApprovalDialog = true
        }
      },
      approvalRegistration () {
        this.sureApprovalDialog = false
        console.log(this.multipleSelection)
        this.multipleSelection.forEach(selectedItem => {
          this.ids.push(selectedItem.studentNum)
        })
        console.log(this.ids)
        var that = this
        this.$axios.post('/administrator/approveStudent?studentNums=' + this.ids)
          .then(function (response) {
            if (response.status === 200) {
              console.log(response)
              that.getRegistration()
              that.ids = []
              that.multipleSelection = []
              that.$refs.multipleTable.clearSelection()
              // that.unfreezeDialogVisible = false
              that.$message({
                message: '审核通过成功',
                type: 'success'
              })
            }
          }).catch(function (error) {
          console.log(error)
          return that.$message.error('审核通过失败！')
        })
      },
      handleClickPdf (row) {
        console.log(row)
        // console.log(this.global + row.imgUrl)
        console.log(this.global)
        window.open(this.global + row.imgUrl)
      }
    },
    created () {
      // 动态调整左侧菜单栏高度
      var docHeight = document.documentElement.clientHeight
      this.containerHeight.height = docHeight + 'px'
      this.userName = sessionStorage.getItem('userName')
      this.getRegistration()
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
