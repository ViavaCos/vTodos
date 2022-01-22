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
    // 设置请求体传参(序列化参数)
    fetchConfig.body = qs.stringify(data)
  }
  // 设置地址栏传参
  if(['GET'].includes(fetchConfig.method)) {
    let query = ''
    for (const key in data) {
      query += key + '=' + data[key]  + '&'
    }
    query = query.substring(0, query.length - 1)
    url += '?' + query
  }


  return new Promise((resolve, reject) => {
    fetch(url, fetchConfig).then(response => {
      resolve(response.json())
    }).catch(error => {
    })
  })
}

export default request
