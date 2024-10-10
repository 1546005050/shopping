import request from '@/utils/request'
export const Pl = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit

    }
  })
}
