<template>
  <div class="add-user-wrapper">
    <el-dialog :visible="isShow"
               @close="close"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :destroy-on-close="true"
               top="8vh">
      <div slot="title">
        <div class="el-icon-user-solid title-icon">
          <span class="title-font">{{dialogTitle}}</span>
        </div>
      </div>
      <div class="user-form">
        <el-form ref="userForm"
                 :model="form"
                 :rules="rules"
                 :label-position="labelPosition"
                 :status-icon="true"
                 :label-width="'80px'">
          <el-form-item prop="openid"
                        label="openid">
            <el-input v-model="form.openid"></el-input>
          </el-form-item>
          <el-form-item prop="name"
                        label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="age"
                        label="年龄">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item prop="gender"
                        label="性别">
            <el-radio-group v-model="form.gender">
              <el-radio label='1'>男</el-radio>
              <el-radio label='2'>女</el-radio>
            </el-radio-group>

            <!-- <el-select v-model="form.gender"
                       placeholder="请选择">
              <el-option label="男"
                         value="male"></el-option>
              <el-option label="女"
                         value="female"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item prop="mobile"
                        label="电话">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="nickName"
                        label="小名">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer"
           class="footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary"
                   @click="submit">{{okBtnLabel}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UserService from '@/services/userService'
import busService from '@/services/busService'

export default {
  name: 'AddUser',
  data: () => {
    return {
      labelPosition: 'right',
      form: {
        id: '',
        openid: '',
        name: '',
        gender: '1',
        age: '',
        avatarurl: '',
        mobile: '',
        nickname: ''
      },
      rules: {
        openid: [
          { required: true, message: '请输入openid', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'change' },
          {
            message: '必须是1-120之间的正整数。',
            trigger: 'change',
            validator: function (rule, age, callback) {
              console.log(rule, age)
              if (/^(?:[1-9][0-9]?|1[01][0-9]|120)$/.test(Number(age))) {
                callback()
              }
              callback(rule)
            }
          }
        ],
        avatarurl: [],
        mobile: [],
        nickname: []
      }
    }
  },
  props: {
    isShow: false,
    isEdit: false,
    detail: null
  },
  watch: {
    detail (value) {
      if (!value) {
        Object.assign(this.form, {
          id: '',
          openid: '',
          name: '',
          gender: '1',
          age: '',
          avatarurl: '',
          mobile: '',
          nickname: ''
        })
        return
      }
      Object.assign(this.form, value, {
        gender: String(value.gender)
      })
    }
  },
  computed: {
    dialogTitle () {
      return this.isEdit ? '修改会员信息' : '添加会员'
    },
    okBtnLabel () {
      return this.isEdit ? '修改' : '添加'
    }
  },
  created () {
    console.log('created')
    this.userService = new UserService(this)
  },
  methods: {
    close (event) {
      this.$emit('closeDialog')
    },
    submit () {
      console.log('isEdit', this.isEdit)
      this.$refs['userForm'].validate((valid, event) => {
        if (valid) {
          console.log('form', this.form)
          // 发送请求
          const gender = this.getGender(this.form.gender)
          const params = { ...this.form, gender }
          if (!this.isEdit) {
            // 如果是新增会员
            this.userService.createMember(params).then(data => {
              this.$message('会员创建成功')
              this.close()
              busService.$emit('addUserSuccess')
            }).catch(response => {
              this.$message(response.data.msg)
            })
          } else {
            // 编辑会员信息
            this.userService.updateMember(params).then(data => {
              this.$message('会员信息更新成功')
              this.close()
              busService.$emit('addUserSuccess')
            }).catch(response => {
              this.$message(response.data.msg)
            })
          }
        }
      })
    },
    getGender (gender) {
      // const mapGender = {
      //   'male': 1,
      //   'female': 2
      // }
      // return mapGender[gender]
      return Number(gender)
    }
  }
}
</script>

<style lang="less">
.add-user-wrapper {
  .title-icon {
    color: #409eff;
    font-size: 20px;

    .title-font {
      padding-left: 10px;
      color: #333;
    }
  }

  .el-form-item {
    width: 600px;
  }

  .footer {
    text-align: center;
  }
}
</style>
