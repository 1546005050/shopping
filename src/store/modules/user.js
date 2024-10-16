import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      //   个人权证相关
      userInfo: getInfo()
    }
  },
  mutations: {
    //   所有mutation第一个参数都是state
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {
    logOut (context) {
      // 个人信息要重置
      context.commit('setUserInfo', {})
      // 购物车信息要充值
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}
}
