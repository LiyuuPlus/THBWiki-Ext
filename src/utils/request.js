export class Request {
  /**
   * 初始化实例（全局配置一次）
   * @param {string} baseURL - 接口基础地址
   * @param {object} defaultHeaders - 全局默认 headers
   */
  constructor(baseURL = '', defaultHeaders = {}) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    }
    this.timeout = 15000 // 15秒超时
  }

  // 超时处理
  #timeoutPromise(ms) {
    return new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), ms)
    )
  }

  /**
   * 核心请求
   */
  async #request(url, options = {}) {
    const fullUrl = this.baseURL + url

    // 合并 headers：默认 + 本次传入
    const headers = {
      ...this.defaultHeaders,
      ...options.headers,
    }

    const fetchOptions = {
      ...options,
      headers,
    }

    return new Promise(async (resolve, reject) => {
      fetch(fullUrl, fetchOptions).then(response => {
        response.json().then(data => {
          if (!response.ok) {
            const errorMsg = data.message || '请求失败'
            console.error('请求失败：', errorMsg)
            reject(new Error(errorMsg))
          } else {
            resolve(data)
          }
        })
      }).catch(err => {
        console.error('请求异常：', err)
        reject(err);
      });
    });
  }

  /**
   * GET 请求
   * @param {string} url
   * @param {object} params - URL 参数
   * @param {object} headers - 追加的请求头（可选）
   */
  async get(url, params = {}, headers = {}) {
    const query = new URLSearchParams(params)
    const fullUrl = query.toString() ? `${url}?${query}` : url

    return this.#request(fullUrl, {
      method: 'GET',
      headers,
    })
  }

  /**
   * POST 请求
   * @param {string} url
   * @param {object} data - body 数据
   * @param {object} headers - 追加的请求头（可选）
   */
  async post(url, data = {}, headers = {}) {
    return this.#request(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
  }
}