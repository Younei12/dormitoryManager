<template>
  <div class="login-page flex-center">
    <main class="login-main">
      <div class="login-title">
        <i class="iconfont icon-xuexiaogaikuang"></i>
        <div class="login-title__name">
          <p class="login-title__name--main">学生宿舍管理系统</p>
          <p class="login-title__name--sm">Dormitory Management System</p>
        </div>
      </div>
      <el-form :model="form"
               :rules="rules"
               @submit.native.prevent="onSubmit"
               class="login-form" element-loading-background="rgba(0, 0, 0, 0.5)"
               element-loading-spinner="el-icon-loading"
               element-loading-text="正在登录..."
               ref="form"
               v-loading.fullscreen.lock="isLoading"
      >
        <el-form-item prop="account">
          <el-input class="login-input"
                    placeholder="请输入用户名"
                    prefix-icon="el-icon-user"
                    v-model="form.account"/>
        </el-form-item>

        <el-form-item prop="password">
          <el-input class="login-input"
                    placeholder="请输入密码"
                    prefix-icon="el-icon-lock"
                    show-password
                    v-model="form.password"/>
        </el-form-item>

        <el-form-item>
          <div class="flex-center flex-column">
            <el-radio-group 
                            class="user-type-radio__group"
                            text-color=""
                            v-model="form.identity">
              <!-- <el-radio :label="2">学生</el-radio> -->
              <!-- <el-radio :label="1">管理员</el-radio> -->
              <!-- <el-radio :label="3">维修员</el-radio> -->
            </el-radio-group>
          </div>
        </el-form-item>
        
        <el-button class="login-btn--submit" native-type="submit">登录</el-button>
      </el-form>
    </main>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        isLoading: false,
        form: {
          account: "admin",
          password: "123456",
          identity: 1
        },
        rules: {
          account: [{required: true, message: "请输入用户名", trigger: 'blur'}],
          password: [{required: true, message: "请输入密码", trigger: 'blur'}]
        }
      }
    },
    methods: {
        // 登录
      async onSubmit() {
          // 调接口，查询到当前登录的用户名和密码再跳转页面，并提示登陆成功
          this.$root.$message.success('登录成功');
          this.$router.push('/home')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-page {
    // 满屏幕的宽高
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#293344;
  }

  .login-main {
    width: 250px;
    // margin: 0 auto;
  }

  .login-title {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 28px;

    i {
      font-size: 46px;
    }

    .login-title__name {
      font-size: 20px;
      margin-left: 10px;
    }

    .login-title__name--main {
      margin-bottom: 5px;
    }

    .login-title__name--sm {
      font-size: 12px;
    }
  }

  .user-type__title {
    font-size: 12px;
    color: #78808e;
    margin-bottom: 15px;
  }

  .user-type-radio__group {
    /*margin-bottom: 15px;*/
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

</style>

<style lang="scss">
  .login-page .login-form {
    .el-form-item {
      margin-bottom: 23px;
    }

    .el-input__inner {
      background-color: #212b3d;
      border-radius: 2px;
      border: none;
      color: #c9d1de;

      &::placeholder {
        color: #78808e;
      }

      /*&:focus {*/
      /*  border-color: #1362b5;*/
      /*}*/
    }

    .login-btn--submit {
      display: block;
      width: 100%;
      background: #3c4e69;
      border: none;
      color: #fff;

      &:hover {
        background: #2b88e7;
      }
    }

    .el-radio {
      margin-right: 0;
    }

    .el-radio__label {
      color: #78808e;
      padding-left: 6px;
    }

    .el-radio__inner {
      border: 1px solid #8f96a6;
      background-color: #293344;
    }

    .el-radio__input.is-checked + .el-radio__label {
      color: #e6e6e6;
    }

    /*.el-radio__input.is-checked .el-radio__inner{*/
    /*  border-color: #5191ff;*/
    /*  &:after{*/
    /*    background-color: #5191ff;*/
    /*  }*/
    /*}*/

    .el-form-item__error {
      color: #df4659;
    }
  }
</style>
