<template>
  <div>
    <el-row style="margin-top: 8px">
      <el-col>
        <el-button type="primary" style="float: left" @click="exportExcel1">导出Excel</el-button>
<!--        <el-button type="primary" style="float: left" @click="xiazai">下载pdf</el-button>-->
<!--        <el-button type="danger" style="float: left" @click="cancel()">撤销通过</el-button>-->
        <el-input placeholder="快速搜索..." v-model="keywords" style="float: right; width: 35%">
          <el-button slot="append" icon="el-icon-search" @click="searchItemCertificates()"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-table
      ref="multipleTable"
      :row-key="handleReserve"
      @selection-change="handleSelectionChange"
      :data="allStudentList"
      style="width: 100%">
<!--      <el-table-column type="selection" reserve-selection width="50"></el-table-column>-->
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

    <el-pagination
      @current-change="handleCurrentChangeItemAllCertificate"
      :current-page="page"
      :page-size="20"
      layout="total, prev, pager, next, jumper"
      :total="total"
      v-if="active === 0">
    </el-pagination>

    <el-pagination
      @current-change="handleCurrentChangItemSearchCertificate"
      :current-page="searchPage"
      :page-size="20"
      layout="total, prev, pager, next, jumper"
      :total="searchTotal"
      v-if="active === 1">
    </el-pagination>

    <el-dialog
      title="提示"
      :visible.sync="toFailedDialogVisible"
      width="25%"
      center>
      <span>确定撤销通过所选荣誉证书吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="toFailedDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="repealOfpassage()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="撤销通过"
      :visible.sync="failedSuggestionDialogVisible"
      width="30%"
      center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="撤销通过原因" prop="suggestion">
          <el-input type="textarea" :rows="5" v-model="ruleForm.suggestion"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="failedSuggestionDialogVisible = false, ruleForm.suggestion = ''">取 消</el-button>
        <el-button type="primary" @click="failedSuggestionDialogVisible = false, toFailedDialogVisible = true">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        keywords: '',
        allStudentList: [],
        multipleSelection: [],
        downloadList: [],
        ids: [],
        page: 1, // 当前页数
        total: 0,
        searchPage: 1, // 模糊查询当前页数
        searchTotal: 0,
        toFailedDialogVisible: false,
        failedSuggestionDialogVisible: false,
        activeName: 'first',
        active: 0,
        itemId: 0,
        itemTitle: '',
        ruleForm: {
          suggestion: ''
        },
        rules: {
          suggestion: [
            { required: true, message: '请输入撤销通过原因及您的修改建议', trigger: 'blur' },
            { min: 1, message: '长度在至少1个字符', trigger: 'blur' }
          ]
        },
        recordId: ''
      }
    },
    methods: {
      // cancel () {
      //   if (this.multipleSelection.length !== 0) {
      //     this.failedSuggestionDialogVisible = true
      //   } else {
      //     alert('请选择撤销通过的证书')
      //   }
      // },
      getParams () {
        this.recordId = this.$route.query.recordId
      },
      // 取消选择
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      // 表格数据处理,保存上一页选中的数据
      // 返回的参数是每一行的值要指定表格数据的唯一值,一般是id
      handleReserve (row) {
        return row.id
      },
      // 获取到用户勾选的行
      handleSelectionChange (val) {
        this.downloadList = []
        for (var index in val) {
          this.downloadList.push(val[index].id)
        }
        this.multipleSelection = val
      },
      certificatesStatus (row) {
        return '审核通过'
      },
      // 监听页码值（获取对应事项全部审核已通过证书）
      handleCurrentChangeItemAllCertificate (newPage) {
        this.page = newPage
        this.getAllStudentList()
      },
      // 监听页码值（模糊查询对应事项审核已通过证书）
      handleCurrentChangItemSearchCertificate (newPage) {
        this.searchPage = newPage
        this.searchItemCertificates()
      },
      // 获取对应事项审核已通过的证书
      async getAllStudentList () {
        var that = this
        console.log('courseId=' + this.courseId)
        this.$axios.get('/studentCourse/getStudentByCourseId?courseId=' + this.courseId)
          .then(function (response) {
            if (response.status === 200) {
              console.log(response)
              that.allStudentList = response.data.data
              that.total = response.data.totalElements
            }
          }).catch(function (error) {
          console.log(error)
          that.$message.error('获取证书数据失败')
        })
      },
      // 模糊查询(对应事项已通过证书)
      async searchItemCertificates () {
        this.active = 1
        var that = this
        this.$http.get('/searchPassedCertificatesByItemId', {
          params: {
            itemId: this.itemId,
            search: this.keywords,
            page: this.searchPage
          }
        }).then(function (response) {
          if (response.status === 200) {
            console.log(that.keywords)
            console.log(response)
            that.allStudentList = response.data.content
            that.searchTotal = response.data.totalElements
          }
        }).catch(function (error) {
          console.log(error)
          that.$message.error('搜索失败')
        })
      },
      exportExcel1 () {
        console.log(this.multipleSelection)
        if (this.downloadList.length !== 0) {
          var params = {
            excelHeader: ['获奖者', '比赛', '作品', '奖项', '发布者', '颁奖部门', '颁奖时间'],
            excelFilterVal: ['ownerName', 'certSubtitle', 'work', 'remind', 'makerName', 'department', 'awardTime'],
            list: this.multipleSelection,
            fileName: this.itemTitle + '（已通过）'
          }
          this.exportExcel(params)
          this.$refs.multipleTable.clearSelection()
        } else {
          alert('请选择批量导出的证书')
        }
      },
      // xiazai () {
      //   if (this.downloadList.length !== 0) {
      //     window.open(this.$http.defaults.baseURL + 'pdfdownload?ids=' + this.downloadList)
      //     console.log(this.downloadList)
      //   } else {
      //     alert('请选择批量下载的证书')
      //   }
      // },
      // "撤销通过"按钮  将证书 "审核通过" 状态变成 "审核不通过"
      async repealOfpassage () {
        this.multipleSelection.forEach(selectedItem => {
          this.ids.push(selectedItem.id)
        })
        console.log(this.ids)
        var that = this
        this.$http.post('/disapproveCertificate', {
          ids: this.ids,
          signSuggestion: this.ruleForm.suggestion
        })
          .then(function (response) {
            if (response.status === 200) {
              console.log(response)
              that.getAllStudentList()
              that.multipleSelection = []
              that.ids = []
              that.$refs.multipleTable.clearSelection()
              that.toFailedDialogVisible = false
              // Utils.$emit('demoApprovalToFailed', 'msgApprovalToFailed') // 两个vue文件调用  调用方
              that.$message({
                message: '撤销通过成功',
                type: 'success'
              })
            }
          }).catch(function (error) {
          console.log(error)
          return that.$message.error('撤销通过失败！')
        })
      },
      handleClickPdf (row) {
        console.log(row)
        window.open(row.pdfUrl)
      },
      handleClickJpg (row) {
        console.log(row)
        window.open(row.jpgUrl)
      }
    },
    created () {
      this.getParams()
      this.getAllStudentList()
    },
    // mounted () {
    //   var that = this
    //   Utils.$on('demoUntreatedToApproval', function (msgUntreatedToApproval) {
    //     that.getAllStudentList()
    //   })
    // },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style scoped>

</style>
