/*import mutationTypes from '../shared/store/mutation-types';
import getterTypes from '../shared/store/getter-types';
import actionTypes from '../shared/store/action-types';
import * as tools from '../shared/tools/store';
const jsonToFormData = require("json-form-data")*/
const mutationTypes = {
  MEMBER_FORM_DATA:"MEMBER_FORM_DATA",
  CURRENCY_USD:"USD",
  CURRENCY_CDF:"CDF",
  OPT_TYPE_DEBIT:"DEBIT",
  OPT_TYPE_CREDIT:"CREDIT",
}


export const state = () => ({
    payload: {
      "name":"",
      "firstname":"",
      "lastname":"",
      "phoneNumber":"",
      "parish":null,
      "territory":null,
      "town":null,
      "address":"",
      "address":"",
      "sexe":"",
	    "environment":0,
      "step":0
    }
})

export const mutations = {

    [mutationTypes.MEMBER_FORM_DATA](state, payload) {
      //console.log(payload)
      state.payload = payload
    },

}

export const getters = {
    getPayload(state){
        return state.payload
    },
    getLogin(state){
        return state.login
    },
    currencies() {
      return {
        [MEMBER_FORM_DATA.CURRENCY_CDF]:MEMBER_FORM_DATA.CURRENCY_CDF,
        [MEMBER_FORM_DATA.CURRENCY_USD]:MEMBER_FORM_DATA.CURRENCY_USD,
      }
    }
}

export const actions = {
    async submit({commit, state}){

        let payload = {... state.payload}
        try {
          //console.log(body)
          this.$getWHttp().setHeader('Content-Type', 'application/json', [
            'post'
          ])

          let resp = await this.$getWHttp().$post("/api/users" , payload)

          return resp


        } catch (error) {
          console.log(error)
          throw error

        }

    },
    async submitUpdate({commit, state}, {id}){

      let payload = {... state.payload}
      try {
        //console.log(body)
        this.$getWHttp().setHeader('Content-Type', 'application/json', [
          'post'
        ])

        let resp = await this.$getWHttp().$patch(`/api/users/${id}` , payload)

        return resp


      } catch (error) {
        console.log(error)
        throw error

      }

  },
    update({commit}, payload){
        //console.log(payload)
        commit(
            mutationTypes.MEMBER_FORM_DATA,
            payload
        )
    },
    emptyForm({commit}){
        //console.log(payload)
        let payload = {
          "name":"",
          "firstname":"",
          "lastname":"",
          "phoneNumber":"",
          "parish":null,
          "territory":null,
          "town":null,
          "address":"",
          "address":"",
          "sexe":"",
          "environment":0,
          "step":0
        }
        commit(
            mutationTypes.MEMBER_FORM_DATA,
            payload
        )
    },

}
