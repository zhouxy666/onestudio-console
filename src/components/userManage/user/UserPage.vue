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
            :data="tableData"
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
        tableData: [],
        isShowAddUserDialog: false
      }
    },
    created() {
      this.userService = new UserService(this)
      busService.$on('addUserSucess', () => {
        this.getUser()
      })
    },
    mounted() {
      this.getUser()
    },
    methods: {
      getUser() {
        this.userService.getMembers().then(data => {
          console.log(data)
          this.tableData = data.data
        }).catch(response => {
          console.log(response)
        })
      },
      showAddDialog() {
        this.isShowAddUserDialog = true
      },
      closeAddDialog() {
        this.isShowAddUserDialog = false
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
      max-height: 500px;
      overflow-y: scroll;
    }
  }
</style>
