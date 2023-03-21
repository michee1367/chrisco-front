import { Ctx } from "../ctx";

class WHttp {
  /**
   *
   * @param {Ctx} ctx
   */
  constructor(ctx) {
    this.ctx = ctx
  }
  /**
   *
   */
  get endPoint() {
    return this.ctx.env.endPoint
  }
  async $get(url, config) {
    try {
      return await this.ctx.$axios.$get(this.endPoint + url, config)

    } catch (error) {

      computeError(error, this.ctx)

    }
  }
  /**
   *
   * @param {String} url
   * @param {*} payload
   * @param {*} config
   */
  async $post(url, payload, config) {
    try {
      return await this.ctx.$axios.$post(this.endPoint + url, payload, config)

    } catch (error) {
      computeError(error, this.ctx)
    }
  }
  /**
   *
   * @param {String} url
   * @param {*} payload
   * @param {*} config
   */
  async $patch(url, payload, config) {
    try {
      return await this.ctx.$axios.$patch(this.endPoint + url, payload, config)

    } catch (error) {
      computeError(error, this.ctx)
    }
  }
  /**
   *
   * @param {String} url
   * @param {*} config
   */
  async $delete(url, config) {
    try {
      return await this.ctx.$axios.$delete(this.endPoint + url, config)

    } catch (error) {
      computeError(error, this.ctx)
    }
  }
  /**
   *
   * @param {String} key
   * @param {String} value
   * @param {String[]} methods
   */
  setHeader(key, value, methods) {
    if (!methods) {
      methods=[]
    }

    this.ctx.$axios.setHeader(key, value, methods)
  }
}
/**
 *
 * @param {*} err
 * @param {Ctx} ctx
 */
function computeError(err, ctx) {
  try {
    if(
      !!err.response &&
      !!err.response.status &&
      401 == err.response.status
    ) {
      console.log(`#################`)
      console.log(`${ctx.env.baadhiTeamsBaseUrl}?${ctx.env.baadhiTeamsPathAttName}=${path}`)
      let path = ctx.route.path
      //ctx.redirect("http://localhost:8000/?pwapath="+path)
      ctx.redirect(`${ctx.env.baadhiTeamsBaseUrl}?${ctx.env.baadhiTeamsPathAttName}=${path}`)
      //await store.dispatch("user/load")

    }else{
      throw err
    }

  } catch (error) {
    console.log(error)
    throw error
  }
}
/**
 *
 * @param {Ctx} ctx
 */
export function getWHttp(ctx) {
  return new WHttp(ctx)
}
