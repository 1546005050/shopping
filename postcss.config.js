// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw适配的标准屏的宽度
      // 设计图是750，调成一倍图 =>适配375
      viewportWidth: 375
    }
  }
}
