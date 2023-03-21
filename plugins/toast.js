
import Vue from 'vue'
import Toasted from 'vue-toasted'



export default ({ app, env }, inject) => {

  Vue.use(Toasted)

  //console.log(Vue.toasted.show( 'my message', { /* some option */ }))
  // Inject $hello(msg) in Vue, context and store.
  inject(
      'getToast',
      () => {
          return Vue.toasted
      }
  )
}
