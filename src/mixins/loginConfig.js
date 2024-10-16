export default {
  // 此处编写的就是vue组件实例的配置项，通过一定的语法，可以直接混入到组件内部
  // data methods computed 生命周期函数 ...
  // 注意：如果此处和组件内提供了同名的data methods computed，组件类优先级最高
  methods: {
    loginConfirm () {
      if (!this.$store.getters.token) {
      // 弹窗确认
        this.$dialog.confirm({
          title: '温馨提示',
          message: '需要登录才能继续操作哦',
          confirmButtonText: '去登录',
          cancelButtonText: '再看看'
        }).then(() => {
        // 如果希望，跳转到登录=>登录后再跳转回来，需要在跳转去携带参数（当前对的路径地址）
        // this.$route.fullPath(会包含查询参数)
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => {})
        return true
      }
      return false
    }
  }
}
