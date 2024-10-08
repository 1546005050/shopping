<template>
  <div class="login">
    <van-nav-bar title="用户登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="captchaCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="captchaUrl" :src="captchaUrl" @click="getcaptchaCode()" alt="">
        </div>
        <div class="form-item">
          <input v-model="smsCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">{{New===totalTwo?'获取验证':New+'秒后重新发送'}}</button>
        </div>
      </div>

      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { Dl2, Dl, getcaptchaCode } from '@/api/login'
import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  data () {
    return {
      captchaCode: '', // 用户输入的图形验证码
      captchaKey: '', // 将来请求传递的图形验证的唯一标识
      captchaUrl: '', // 存储请求渲染的图片地址
      totalTwo: 60, // 总秒数
      New: 60, // 当前秒速开定时器
      timer: null, // 定时器id
      mobile: '', // 手机号
      smsCode: ''// 短信变量
    }
  },
  async created () {
    this.getcaptchaCode()
  },
  methods: {
    // 获取图形验证码
    async getcaptchaCode () {
      const { data: { base64, key } } = await getcaptchaCode()
      this.captchaUrl = base64 // 存储地址
      this.captchaKey = key // 存储唯一标识
      Toast('获取图形验证码成功')
    },
    // 校验手机号和图形验证码是否合法
    XiaoYan () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        Toast.fail('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.captchaCode)) {
        Toast.fail('验证码输入错误')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getCode () {
      if (!this.XiaoYan()) {
        // 如果没有通过校验，直接结束
        return
      }
      // 没有定时器开启的时候，且定时秒数与开启时间一致时才可以倒计时
      if (!this.timer && this.New === this.totalTwo) {
        // 发送请求
        await Dl(this.captchaCode, this.captchaKey, this.mobile)
        Toast.success('验证码已发送')
        // 开启短信倒计时
        this.timer = setInterval(() => {
          this.New--

          if (this.New <= 0) {
            clearInterval(this.timer)
            this.timer = null // 重置定时器参数
            this.New = this.totalTwo
          }
        }, 1000)
      }
    },
    async  login () {
      if (!this.XiaoYan()) {
        return
      }
      if (!/^\d{6}$/.test(this.smsCode)) {
        Toast.fail('手机验证码输入错误')
        return
      }
      const res = await Dl2(this.mobile, this.smsCode)
      console.log(res)
      Toast.success('登陆成功')
      this.$router.push('/')
    }

  },
  destroyed () {
    clearInterval(this.timer)
  }

}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
