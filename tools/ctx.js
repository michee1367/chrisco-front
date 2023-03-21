class IConfigAxios {
  /**
   * @returns {*}
   */
  get headers() {

  }
}


class IAxios {
  async $get(url, config) {

  }
  /**
   *
   * @param {String} url
   * @param {*} payload
   * @param {*} config
   */
  async $post(url, payload, config) {

  }
  /**
   *
   * @param {String} url
   * @param {*} config
   */
  async $delete(url, config) {

  }
  /**
   *
   * @param {String} key
   * @param {String} values
   * @param {String[]} methods
   */
  setHeader(key, values, methods) {

  }
}

class Route {

  /**
   * @returns {String}
   */
  get path() {

  }
  /**
   * @returns {*}
   */
  get query() {

  }
  /**
   * @returns {*}
   */
  get params() {

  }
}

export class Ctx {
  /**
   * @returns {IAxios}
   */
  get $axios() {

  }
  /**
   *
   * @param {String} url
   */
  redirect(url) {

  }
  /**
   *@returns {Route}
   */
  get route() {

  }
  /**
   *
   */
  get env() {

  }
}
