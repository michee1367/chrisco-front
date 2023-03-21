import { Ctx } from "../tools/ctx";
import { getWHttp } from "../tools/http/whttp";


/**
 * @param {Ctx} ctx
 */
export default (ctx, inject) => {

  //console.log(Vue.toasted.show( 'my message', { /* some option */ }))
  // Inject $hello(msg) in Vue, context and store.
  inject(
      'getWHttp',
      () => {
          return getWHttp(ctx)
      }
  )
}
