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
          <el-form ref="registerForm" :model="form" :rules="rules">
            <el-form-item prop="account">
              <el-input v-model="form.account">
                <template slot="prepend">
                  <span class="el-icon-user-solid"></span>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="secret">
              <el-input v-model="form.secret" show-password>
                <template slot="prepend">
                  <span class="el-icon-lock"></span>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="repeatSecret">
              <el-input v-model="form.repeatSecret" show-password>
                <template slot="prepend">
                  <span class="el-icon-lock"></span>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" class="login-submit">注册</el-button>
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
          account: '',
          secret: '',
          repeatSecret: ''
        },
        rules: {
          account: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          secret: [
            {required: true, message: '请输入密码', trigger: 'blur'},
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
          ],
          repeatSecret: [
            {required: true, message: '请输入密码', trigger: 'blur'},
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
      onSubmit() {
        this.$refs['registerForm'].validate((valid, event) => {
          if (valid) {
            const params = Object.assign({}, this.form, {
              type: 100
            })
            loginService.register(params).then(data => {
              this.$notify({
                title: '成功',
                message: '注册成功，请登录',
                type: 'success'
              })
              this.$router.push({name: 'login'})
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
