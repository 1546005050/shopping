// 约定一个通用键名
const INFO_KEY = 'vue_shopping_info'
const HISTORY_KEY = 'vue_history-list'
// 获取个人信息
export const getInfo = () => {
  const defaultObj = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}
// 设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}
// 获取搜索历史
export const gethistory = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}
// 设置搜索历史
export const sethistory = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
