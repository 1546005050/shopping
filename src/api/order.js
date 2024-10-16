import request from '@/utils/request'
// 订单结算确认
// mode:cart => obj cartId
// mode：buyNow => obj goods goodsNum goodsSkuid
export const chekorder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // cart buyNow
      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}

// 提交订单
// mode:cart => obj cartId remark
// mode：buyNow => obj goods goodsNum goodsSkuid,remark
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    payType: 10,
    ...obj
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
