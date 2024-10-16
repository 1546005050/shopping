import request from '@/utils/request'
// 加入购物车
// goodsid=>商品id
// goodsSkuId=>商品规格id
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车列表api
export const getCartList = () => {
  return request.get('/cart/list')
}

// 购物车商品数量更新
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId, goodsNum, goodsSkuId
  })
}

// 删除购物车的商品
export const delcart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
