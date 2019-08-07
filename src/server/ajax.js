import axios from 'axios'
import port from './port'
import {Toast} from 'vant'

let instance = axios.create({
  baseURL: 'http://localhost:9000/api',
  timeout: 1200
})

const Ajax = {}
for (let k in port) {
  let _api = port[k]
  Ajax[k] = async function (params, isFormData = false, config = {}) {
    let _url = _api.url
    let _method = _api.method
    let newParams = {}
    let result = {}
    if (params && isFormData) {
      newParams = new FormData()
      for (let i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }

    if (_method === 'put' || _method === 'post' || _method === 'patch') {
      try {
        result = await instance[_method](_url, newParams, config)
      } catch (err) {
        result = err
      }
    } else if (_method === 'delete' || _method === 'get') {
      config.params = newParams
      try {
        result = await instance[_method](_url, config)
      } catch (err) {
        result = err
      }
    }
    return result
  }
}

instance.interceptors.request.use(config => {
  Toast.loading({
    mask: false,
    duration: 0,
    forbidClick: false,
    message: '正在加载'
  })
  return config
}, () => {
  Toast.clear()
  Toast('请求错误,请稍后重试')
})

instance.interceptors.response.use(res => {
  Toast.clear()
  return res.data
}, () => {
  Toast.clear()
  Toast('请求错误,请稍后重试')
})

export default Ajax
