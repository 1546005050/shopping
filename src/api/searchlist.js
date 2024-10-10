import request from '@/utils/request'
export const Gl = (obj) => {
  const {
    sortType,
    sortPrice,
    categoryId,
    goodsName,
    page
  } = obj
  return request.get('/goods/list', {
    params: {
      sortType,
      sortPrice,
      categoryId,
      goodsName,
      page

    }
  })
}
