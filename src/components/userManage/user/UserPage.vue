<template>
  <div class="user-page">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/overview' }">总览</el-breadcrumb-item>
          <el-breadcrumb-item>会员目录</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="table-tool">
          <el-button type="primary" plain @click="showAddDialog">新增会员</el-button>
        </div>
        <div class="table-content">
          <el-table
            :max-height="tableData.maxHeight"
            :highlight-current-row="tableData.highlightCurrentRow"
            :data="tableData.data"
            border>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="openid"
              label="openid">
            </el-table-column>
            <el-table-column
              prop="nickname"
              label="昵称">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="age"
              label="年龄">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="手机">
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.currentPage"
              :page-sizes="pagination.pageSizes"
              :page-size="pagination.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total">
            </el-pagination>
          </div>
        </div>
        <add-user :isShow="isShowAddUserDialog" @closeDialog="closeAddDialog"></add-user>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AddUser from '@/components/userManage/user/add/AddUserModal'
  import UserService from '@/services/userService'
  import busService from '@/services/busService'

  export default {
    name: 'userPage',
    components: {
      AddUser
    },
    data() {
      return {
        pagination: {
          total: 0,
          currentPage: 1,
          pageSizes: [5, 10, 20, 50],
          pageSize: 5
        },
        tableData: {
          maxHeight: '420px',
          highlightCurrentRow: false,
          data: []
        },
        isShowAddUserDialog: false
      }
    },
    created() {
      this.userService = new UserService(this)
      busService.$on('addUserSuccess', () => {
        this.getUser()
      })
    },
    mounted() {
      this.getUser()
    },
    methods: {
      getUser() {
        const params = {
          size: this.pagination.pageSize,
          page: this.pagination.currentPage
        }
        this.userService.getMembers(params).then(data => {
          const membersData = data.data
          this.tableData.data = membersData.members
          // 分页
          this.pagination.total = membersData.count
        }).catch(response => {
          console.log(response)
        })
      },
      showAddDialog() {
        this.isShowAddUserDialog = true
      },
      closeAddDialog() {
        this.isShowAddUserDialog = false
      },
      handleSizeChange(pageSize) {
        this.pagination.pageSize = pageSize
        this.getUser()
      },
      handleCurrentChange(currentPage) {
        this.pagination.currentPage = currentPage
        this.getUser()
      }
    }
  }
</script>

<style lang="less">
  .user-page {
    .table-tool {
      height: 50px;
      padding-top: 20px;
    }

    .table-content {
      .pagination {
        padding-top: 20px;
      }
    }
  }
</style>
