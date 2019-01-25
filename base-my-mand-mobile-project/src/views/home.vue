<template>
  <div class="md-example-child md-example-child-input-item-1 login-title">
    <md-field title="登录界面">
      <md-input-item
        v-model="account"
        title="账号"
        placeholder="请输入账号"
        is-title-latent
        clearable
      ></md-input-item>

      <md-input-item
        v-model="password"
        title="密码"
        placeholder="请输入密码"
        is-title-latent
        clearable
        type="password"
        ></md-input-item>
        <md-button type="primary" round @click="login" class="login-btn">登录</md-button>
    </md-field>
  </div>
</template>

<script>
import {Button, InputItem, Field, Toast} from 'mand-mobile'

export default {
  name: 'input-item-demo',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  data() {
    return {
      account: "",
      password: "",
    }
  },
  methods: {
    login() {
      let _this = this;
      if (this.account == '' || this.password == '') {
        Toast.failed("必填项不能为空");
      } else {
        localStorage.setItem('token', "xxxxxxxx"); //存储token
        _this.$router.push({ name: "Index" });
      }

    }
  }
}

</script>

<style lang="stylus">
.md-example-child-input-item-1
  .md-field
    padding-bottom 40px

.login-btn{
  margin-top :100px
}

.login-title{
  margin-top :25vh;
  margin-bottom :30vh;
  border-radius :10px;
}

.login-title .md-field-title{
  text-align :center;
  font-size :20pt;
  font-weight :bolder;
  color :#23272C !important;
}
</style>