<template>
  <div class="login-bg">
    <div class="login-con">
      <el-row class="login-title">
        <el-col :span="24">
          <span class="head">欢迎光临</span>
        </el-col>
      </el-row>
      <el-row class="login-body">
        <el-col :span="24">
          <el-form ref="loginForm"
                   :model="form"
                   :rules="rules">
            <el-form-item prop="username">
              <el-input v-model="form.username">
                <template slot="prepend">
                  <span class="el-icon-user-solid"></span>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password"
                        show-password>
                <template slot="prepend">
                  <span class="el-icon-lock"></span>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="onSubmit"
                         class="login-submit">登录</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import loginService from '@/services/login/loginService'

export default {
  name: 'login',
  data: function () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            required: true,
            message: '必须以字母数字下划线开头，长度为6到15个字符，必须包含特殊字符_!%@&*#',
            validator: function (rule, password, callback) {
              const regPwd = /[a-z0-9_][a-z0-9_!%@&*#]{6,15}/
              if (regPwd.test(password)) {
                callback()
              }
              callback(rule)
            }
          }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs['loginForm'].validate((valid, event) => {
        if (valid) {
          loginService.login(this.form).then(token => {
            // 登录成功，使用cookie存一下token
            this.$cookies.set('token', token)
            // 跳转到首页
            this.$router.push({ name: 'overview' })
          }, response => {
            this.$cookies.remove('token')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
.login-bg {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../static/img/login-bg.jpg") no-repeat;
  background-size: cover;
  background-position: 50%;

  .login-con {
    position: absolute;
    right: 160px;
    top: 50%;
    -webkit-transform: translateY(-60%);
    transform: translateY(-60%);
    width: 300px;
    min-height: 280px;
    background: #fff;

    .login-title {
      border-bottom: 1px solid #e8eaec;
      padding: 14px 16px;
      line-height: 1;

      .head {
        line-height: 20px;
        font-size: 14px;
        color: #17233d;
        font-weight: 700;
      }
    }

    .login-body {
      padding: 25px 10px 0;
    }

    .login-submit {
      margin-top: 20px;
      width: 100%;
    }
  }
}
</style>
