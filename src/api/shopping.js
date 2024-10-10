import request from '@/utils/request'
export const Sp = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}
