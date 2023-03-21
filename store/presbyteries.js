const mutationTypes = {
  PRESBYTERIES_RECORDS:"PRESBYTERIES_RECORDS"
}
export const state = () => ({
  records: [],
  uiFlags: {
    isFetching: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
  },
})

export const getters = {
  all(state) {
    return state.records;
  },
  getUIFlags(state) {
    return state.uiFlags;
  },
};

export const actions = {
  async load({commit, state}, param){
    //let route = this.$route
    //let id = this?.app?.context?.route?.params?.id
    //console.log(id)

    let config = {
      headers:{
        "Accept":"application/json"
      }
    }

    try {

      let data = await this.$getWHttp().$get(`/api/presbyteries`, config)

      commit(mutationTypes.PRESBYTERIES_RECORDS, data)

    } catch (error) {

      throw error
    }

  },
}

export const mutations = {
  [mutationTypes.PRESBYTERIES_RECORDS](state, data) {
    state.records = data
  }

}
