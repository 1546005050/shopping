// 存放所有登录相关的接口请求
import request from '@/utils/request'
// 获取图形验证码
export const getcaptchaCode = () => {
  return request.get('/captcha/image')
}

// 2.获取短信验证码
export const Dl = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 3.登录接口
export const Dl2 = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
}
