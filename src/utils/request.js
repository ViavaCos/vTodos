import qs from 'qs';

function request (method, url, data){
  const fetchConfig = {
    method: method.toUpperCase(),
  }

  // 设置请求头
  if(['POST', 'DELETE'].includes(fetchConfig.method)) {
    fetchConfig.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    fetchConfig.body = qs.stringify(data)
  }

  return new Promise((resolve, reject) => {
    fetch(url, fetchConfig)
    .then(response => {
      resolve(response.json())
    })
    .catch(error => {
      reject(error)
    })
  })
}

export default request
