<template>
  <div>
    <NuxtLink class="btn btn-sm me-btn-bleu" :to="{name:'finance-accounting-ohada-register'}">
      Retour
    </NuxtLink>
    <div class="w-form pt-3">
        <div class="container pt-0">

            <div class="row  justify-content-center ">
              <div class="me-card me-card-shadow pb-1 col-lg-5 col-md-7" v-if="member">

                <h3 class="text-center d-flex justify-content-center  pb-1 ">
                    <div class="w-50 me-modal-title py-2 me-small">
                        Ajout membre
                    </div>
                </h3>

                <validation-observer v-slot="{  handleSubmit }">
                  <fieldset v-show="payload.step == 0">
                    <legend class="me-legend me-form-title text-center">Identification</legend>

                    <div class="row">
                      <div class="form-group col-md-6">
                          <label for="name" class="">Nom</label>
                          <ValidationProvider ref="validation_name" rules="required" v-slot="{ errors }">
                              <input
                                  type="text"
                                  class="form-control form-control-sm me-field-form-rounded"
                                  :class="{'is-invalid':!!errors[0]}"
                                  id="name"
                                  placeholder="ex. Makolo"
                                  v-model="payload.name"
                                  @change="update(payload)"
                              >
                              <small class="text-danger">
                                  {{ errors[0] }}
                              </small>
                          </ValidationProvider>

                          <small id="emailHelp" class="form-text text-muted"></small>
                      </div>
                      <div class="form-group col-md-6">
                          <label for="lastname" class="">Postnom</label>
                          <ValidationProvider ref="validation_lastname" rules="required" v-slot="{ errors }">
                              <input
                                  type="text"
                                  class="form-control form-control-sm me-field-form-rounded"
                                  :class="{'is-invalid':!!errors[0]}"
                                  id="lastname"
                                  placeholder="ex. Tamba"
                                  v-model="payload.lastname"
                                  @change="update(payload)"
                              >
                              <small class="text-danger">
                                  {{ errors[0] }}
                              </small>
                          </ValidationProvider>

                          <small id="emailHelp" class="form-text text-muted"></small>
                      </div>
                      <div class="form-group col-md-6">
                          <label for="firstname" class="">Prénom</label>
                          <ValidationProvider ref="validation_firstname" rules="required" v-slot="{ errors }">
                              <input
                                  type="text"
                                  class="form-control form-control-sm me-field-form-rounded"
                                  :class="{'is-invalid':!!errors[0]}"
                                  id="firstname"
                                  placeholder="ex. Michée"
                                  v-model="payload.firstname"
                                  @change="update(payload)"
                              >
                              <small class="text-danger">
                                  {{ errors[0] }}
                              </small>
                          </ValidationProvider>

                          <small id="emailHelp" class="form-text text-muted"></small>
                      </div>
                      <div class="form-group col-md-6">
                          <label for="phoneNumber" class="">Numéro téléphone</label>
                          <ValidationProvider ref="validation_phoneNumber" rules="required" v-slot="{ errors }">
                              <input
                                  type="text"
                                  class="form-control form-control-sm me-field-form-rounded"
                                  :class="{'is-invalid':!!errors[0]}"
                                  id="phoneNumber"
                                  placeholder="ex. 0821049836"
                                  v-model="payload.phoneNumber"
                                  @change="update(payload)"
                              >
                              <small class="text-danger">
                                  {{ errors[0] }}
                              </small>
                          </ValidationProvider>

                          <small id="emailHelp" class="form-text text-muted"></small>
                      </div>
                      <div class="form-group col-md-12">
                          <label for="environment" class="">Sexe</label>
                          <ValidationProvider ref="validation_phoneNumber" rules="required" v-slot="{ errors }">
                              <select
                                  class="custom-select custom-select-sm"
                                  :class="{'is-invalid':errors[0]}"
                                  id="sexe"
                                  v-model="payload.sexe"
                                  @change="update(payload)"
                              >
                                  <option
                                    :value="'M'"

                                    >
                                      {{'Homme'}}
                                  </option>
                                  <option
                                    :value="'F'"
                                    >
                                      {{'Femme'}}
                                    </option>
                              </select>
                              <small class="text-danger">
                                  {{ errors[0] }}
                              </small>
                          </ValidationProvider>

                          <small id="emailHelp" class="form-text text-muted"></small>
                      </div>
                    </div>

                    <div class="row justify-content-between">
                      <div class=" text-center">
                        <button
                          class="btn btn-success btn-sm my-2 px-5"
                            :disabled="true"
                        >
                          Precedent
                        </button>
                      </div>
                      <div class=" text-center">
                        <button
                          class="btn btn-success btn-sm my-2 px-5"
                          @click="handleSubmit(gotoAddress)"
                            :disabled="disabledBtn"
                        >
                          Suivant
                        </button>
                      </div>
                    </div>
                  </fieldset>
                </validation-observer>

                <validation-observer v-slot="{  handleSubmit }">
                  <fieldset v-show="payload.step == 1">
                      <legend class="me-legend me-form-title text-center">Adresse</legend>

                      <div class="row">
                        <div class="form-group col-md-12">
                            <label for="address" class="">Province</label>
                            <commons-searchableList
                              @change="changeProvinces($event)"
                              :multiselectable="false"
                              :listDefault="optsProv"
                              :defaultSelectedOptions="payload.provinceObj"
                            >

                            </commons-searchableList>

                        </div>

                      <div class="form-group col-md-12">

                        <ValidationProvider ref="validation_phoneNumber" rules="required" v-slot="{ errors }">
                          <label for="environment" class="">Milieu</label>
                            <select
                                  class="custom-select custom-select-sm"
                                  :class="{'is-invalid':errors[0]}"
                                  id="environment"
                                  v-model="payload.environment"
                                  @change="update(payload)"
                              >

                                  <option
                                    :value="0"

                                    >
                                      {{'Urbain'}}
                                  </option>
                                  <option
                                    :value="1"
                                    >
                                      {{'Rural'}}
                                    </option>
                              </select>
                        </ValidationProvider>

                      </div>

                        <div class="form-group col-md-12" v-if="payload.environment == 1">
                            <label for="address" class="">Territoire</label>
                            <commons-searchableList
                              @change="changeTerritories($event)"
                              :multiselectable="false"
                              :listDefault="optsTerritories"
                              :defaultSelectedOptions="payload.territoryObj"
                            >

                            </commons-searchableList>

                        </div>
                        <div class="form-group col-md-12" v-if="payload.environment == 0">
                            <label for="address" class="">Ville</label>
                            <commons-searchableList
                              @change="changeCities($event)"
                              :multiselectable="false"
                              :listDefault="optsCities"
                              :defaultSelectedOptions="payload.cityObj"
                            >

                            </commons-searchableList>

                        </div>
                        <div class="form-group col-md-12" v-if="payload.environment == 0">
                            <label for="address" class="">Commune</label>
                            <commons-searchableList
                              @change="changeTowns($event)"
                              :multiselectable="false"
                              :listDefault="optsTowns"
                              :defaultSelectedOptions="payload.townObj"
                            >

                            </commons-searchableList>

                        </div>
                        <div class="form-group col-md-12">
                            <label for="address" class="">Adresse</label>
                            <ValidationProvider ref="validation_name" rules="required" v-slot="{ errors }">
                              <textarea
                                name="address"
                                id="address"
                                cols="15"
                                rows="3"
                                class="form-control form-control-sm me-field-form-rounded"
                                v-model="payload.address"
                                :class="{'is-invalid':!!errors[0]}"
                                @change="update(payload)"
                              >

                              </textarea>
                                <small class="text-danger">
                                    {{ errors[0] }}
                                </small>
                            </ValidationProvider>

                            <small id="emailHelp" class="form-text text-muted"></small>
                        </div>
                      </div>

                      <div class="row justify-content-between">
                        <div class=" text-center">
                          <button
                            class="btn btn-success btn-sm my-2 px-5"
                            @click=" gotoID()"
                              :disabled="disabledBtn"
                          >
                            Precedent
                          </button>
                        </div>
                        <div class=" text-center">
                          <button
                            class="btn btn-success btn-sm my-2 px-5"
                            @click="handleSubmit(gotoParish)"
                              :disabled="disabledBtn"
                          >
                            Suivant
                          </button>
                        </div>
                      </div>
                  </fieldset>
                </validation-observer>


                <validation-observer v-slot="{  handleSubmit }">
                  <fieldset v-show="payload.step == 2">
                      <legend class="me-legend me-form-title text-center">Paroisse</legend>
                      <div class="form-group col-md-12">
                            <label for="address" class="">Presbyterie</label>
                            <commons-searchableList
                              @change="changePresbyteries($event)"
                              :multiselectable="false"
                              :listDefault="optsPresbyteries"
                              :defaultSelectedOptions="payload.presbyteryObj"
                            >

                            </commons-searchableList>

                        </div>
                        <div class="form-group col-md-12">
                            <label for="address" class="">Paroisse</label>
                            <commons-searchableList
                              @change="changeParishes($event)"
                              :multiselectable="false"
                              :listDefault="optsParishes"
                              :defaultSelectedOptions="payload.parishObj"
                            >

                            </commons-searchableList>

                        </div>

                      <div class="row justify-content-between">

                        <div class=" text-center">
                          <button
                            class="btn btn-success btn-sm my-2 px-5"
                            @click=" gotoAddress()"
                              :disabled="disabledBtn"
                          >
                            Precedent
                          </button>
                        </div>
                        <div class="col-md-6 text-center">
                          <button
                            class="btn btn-success btn-sm my-2 px-5"
                            @click="handleSubmit(submit)"
                              :disabled="disabledBtn"
                          >
                            Soumettre
                          </button>
                        </div>
                      </div>
                  </fieldset>
                </validation-observer>

              </div>
            </div>
        </div>
    </div>


  </div>
</template>
<script>
//import { BModal } from 'bootstrap-vue';
//import { BOverlay } from 'bootstrap-vue'
//import { faTimes } from '@fortawesome/free-solid-svg-icons'
//import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { mapGetters, mapActions } from "vuex";
//import mutationTypes from "../../../shared/store/mutation-types";
//import Multiselect from 'vue-multiselect'

export default {
  layout: 'admin',
  meta:{
    _roles:["ROLE_DANTIC"]
  },
  async asyncData({ env, $axios, store, route }) {
    (
      async function () {
        console.log("############")
        console.log(route.params.id)
        await store.dispatch("members/load")
        await store.dispatch("provinces/load")
        await store.dispatch("territories/load",{})
        await store.dispatch("cities/load",{})
        await store.dispatch("towns/load",{})//
        await store.dispatch("presbyteries/load",{})//parishes
        await store.dispatch("parishes/load",{})//parishes
        //
      }
    )()
    //store.dispatch("ohadaAccount/load");
    //provinces
  },
  props:{
    ot:{
        Object,
        default:() => {
            return {

            }
        }
      }
  },
  components: {
    //BOverlay,
    //BModal
  },
  mounted(){
    //this.loadOtsProvinces()
  },
  data() {
    return {
        loading:false,
        missions:[],
        selectedProvinces: [],
        provincesOptsBrut: [],
        //
        provincesOptsBrut: [],
        provincesOptsBrut: [],
        provincesOptsBrut: [],
        //
        isLoading: false,
        currentMission:"",
        showError:false,
        showSuccess:false,
        disabledBtn:false,
    }
  },
  computed:{
    ...mapGetters({
        storePayload: 'memberForm/getPayload',
        provinces: 'provinces/all',
        members: 'members/all',
        territories: 'territories/all',//cities
        cities: 'cities/all',//cities
        towns: 'towns/all',//presbyteries
        presbyteries: 'presbyteries/all',//parishes
        parishes: 'parishes/all',//parishes
      }),
      member() {
        let me = this
        let member = this.members.find(m => m.id == me.$route.params.id)
        if (member) {
          //console.log(member.territory)
          //prefix iri
          let parishIriPrefix = "/api/parishes/"
          let townIriPrefix = "/api/towns/"
          let territoryIriPrefix = "/api/territories/"
          //build object
          let presbytery = member?.parish?.presbytery;
          let presbyteryObj = presbytery? {text:presbytery.name,name:presbytery.name, code:presbytery.id, iri:townIriPrefix + presbytery.id, id:presbytery.id}: null;
          let parish = member.parish ? {text:member.parish.name,name:member.parish.name, code:member.parish.id, iri:parishIriPrefix + member.parish.id, id:member.parish.id} : null;
          let territory = member.territory ? {text:member.territory.name,name:member.territory.name, code:member.territory.id, iri:territoryIriPrefix + member.territory.id, id:member.territory.id} : null;
          let town = member.town ? {text:member.town.name,name:member.town.name, code:member.town.id, iri:townIriPrefix + member.town.id, id:member.town.id} : null;
          let city = member?.town?.city;
          let cityObj = city ? {text:city.name,name:city.name, code:city.id, iri:townIriPrefix + city.id, id:city.id} : null;
          let province = member.territory?.province ? member.territory?.province : city?.province;
          let provinceObj = province ? {text:province.name,name:province.name, code:province.id, iri:townIriPrefix + province.id, id:province.id} : null;

          this.payload = {
            "name":member.name,
            "firstname":member.firstname,
            "lastname":member.lastname,
            "phoneNumber":member.phoneNumber,
            "parish":parish?parish.iri: null,
            "parishObj":parish?parish: [],
            "territory":territory?territory.iri: null,
            "territoryObj":territory?territory: [],
            "town":town?town.iri: null,
            "townObj":town?town: [],
            "cityObj":cityObj?cityObj: [],
            "provinceObj":provinceObj?provinceObj: [],
            "presbyteryObj":presbyteryObj?presbyteryObj: [],
            "address":member.address,
            "sexe":member.sexe,
            "environment":territory?1:0,
            "step":0
          }
        }
        return member
      },
      payload:{
        get(){
          let payload = {...this.storePayload}
          return payload
        },
        set(payload){
          this.update(payload)
        }
      },
      form() {
          return {}
      },
      optsProv() {
        /**
         * @var {Array}
         */
        let items = this.provinces

        return items.map(
          (item) => {
            return {
              text:item.name,
              name:item.name,
              iri:item.id,
              id:item.id,
              code:item.id,
            }
          }
        )
      },
      optsTerritories() {
        /**
         * @var {Array}
         */
        let items = this.territories
        let prefixIri = "/api/territories/"

        return items.map(
          (item) => {
            return {
              text:item.name,
              name:item.name,
              iri:prefixIri + item.id,
              id:item.id,
              code:item.id,
            }
          }
        )
      },
      optsCities() {
        /**
         * @var {Array}
         */
        let items = this.cities

        return items.map(
          (item) => {
            return {
              text:item.name,
              name:item.name,
              iri:item.id,
              id:item.id,
              code:item.id,
            }
          }
        )
      },
      optsTowns() {
        /**
         * @var {Array}
         */
        let items = this.towns
        let prefixIri = "/api/towns/"

        return items.map(
          (item) => {
            return {
              text:item.name,
              name:item.name,
              iri:prefixIri + item.id,
              id:item.id,
              code:item.id,
            }
          }
        )
      },
      optsPresbyteries() {
        /**
         * @var {Array}
         */
        let items = this.presbyteries

        return items.map(
          (item) => {
            return {
              text:item.name,
              name:item.name,
              iri:item.id,
              id:item.id,
              code:item.id,
            }
          }
        )
      },
      optsParishes() {
        /**
         * @var {Array}
         */
        let items = this.parishes
        let prefixIri = "/api/parishes/"
        return items.map(
          (item) => {
            return {
              text:item.name,
              name:item.name,
              iri:prefixIri + item.id,
              id:item.id,
              code:item.id,
            }
          }
        )
      },
      faTrash(){
        return faTrash
      },
      provincesStr() {
        return this.selectedProvinces.length > 0 ? "ok" : "";
      }
  },
  methods:{
      changeParishes(parish) {
        let payload = {...this.payload}
        payload.parish = parish?.iri
        this.update(payload)
        this.parish = parish
      },
      changePresbyteries(presbytery) {
        this.presbytery = presbytery
        let me = this;
        (
          async function () {
            //
            await me.$store.dispatch(
              "parishes/load",
              {
                "key":"presbytery",
                "value":presbytery?.id,
              }
            )
          }
        )()
      },
      changeTerritories(territory){
        this.territory = territory?.iri
        let payload = {...this.payload}
        payload.territory = territory?.iri
        payload.town = null
        this.update(payload)
      },
      changeTowns(town) {
        this.town = town
        let payload = {...this.payload}
        payload.territory = null
        payload.town = town?.iri
        this.update(payload)
      },
      changeCities(city){
        this.city = city
        let me = this;
        (
          async function () {
            //
            await me.$store.dispatch(
              "towns/load",
              {
                "key":"city",
                "value":city?.id,
              }
            )
          }
        )()
      },
      changeProvinces(province) {
        //console.log(province)
        this.province = province;
        let me = this;
        (
          async function () {
            await me.$store.dispatch(
              "territories/load",
              {
                "key":"province",
                "value":province?.id,
              }
            )
            //
            await me.$store.dispatch(
              "cities/load",
              {
                "key":"province",
                "value":province?.id,
              }
            )
            //
            await me.$store.dispatch(
              "towns/load",
              {
                "key":"province",
                "value":province?.id,
              }
            )
          }
        )()
      },
      gotoAddress() {
        let payload = {... this.payload}
        payload.step = 1
        this.payload = payload
      },
      gotoParish() {
        let payload = {... this.payload}
        payload.step = 2
        this.payload = payload

      },
      gotoID() {
        let payload = {... this.payload}
        payload.step = 0
        this.payload = payload

      },
      limitText (count) {
        return `et ${count} autres provinces`
      },
      loadOtsProvinces() {
        /**
         * @type {Array}
         */
        let provinces = this.provincesBrut
        let prefixIri = "/api/provinces/"

        provinces = provinces.map(
          (province) => {
            return {
              text:province.name,
              name:province.name,
              iri:prefixIri + province.id,
              code:prefixIri + province.id,
            }
          }
        )

        this.provincesOptsBrut = provinces

        return provinces
      },
      asyncFind (query) {
        this.isLoading = true
        query = query.trim()

        this.provincesOptsBrut = this.provinces.filter(
            (province) => {

              return province.text.toLowerCase().includes(query.toLowerCase()) || query == ""
            }
          )
          this.isLoading = false
          console.log(this.provincesOptsBrut)
      },
      clearAll () {
        this.selectedProvinces = []
      },
      clear(){

      },
      async submit(){
        //console.log(this.$store.commit["otForm/getPayload"])

        try {
          //console.log(this.payload)
          this.disabledBtn = true
          let id = this.$route.params.id
          let data = await this.submitSore({id})
          //console.log(data)
          this.loading = true
          //this.$store.commit("ot/" + mutationTypes.ADD__OT, data)
          this.loading = false
          this.alertSuccess()
          this.emptyForm()
          this.disabledBtn = false

         this.$router.push({
            name:"members"
          })

        } catch (error) {
          console.log(error)
          this.disabledBtn = false
          this.loading = false
          this.alertError(error?.response?.data?.messageDetail)
        }


      },
      alertSuccess() {
        this.$getToast().show(
          'Enregistrement Succè.',
          {
            action : {
                text : 'Cancel',
                onClick : (e, toastObject) => {
                    toastObject.goAway(0);
                }
            },
            duration:3000,
            type:'success'
         })
      },
      alertError(message) {
        if(!message) {
          message = "Enregistrement erreur."
        }
        this.$getToast().show(
          message,
          {
            action : {
                text : 'Cancel',
                onClick : (e, toastObject) => {
                    toastObject.goAway(0);
                }
            },
            duration:3000,
            type:'error'
         })

      },
      ...mapActions({
        submitSore: 'memberForm/submitUpdate', // map `this.add()` to `this.$store.dispatch('increment')`
        update: 'memberForm/update', // map `this.add()` to `this.$store.dispatch('increment')`
        emptyForm: 'memberForm/emptyForm',
      })
  },
  watch:{
    provincesBrut(values){
      this.loadOtsProvinces()
    },
    selectedProvinces(values){
      //console.log(values)

      this.payload.selectedProvinces = values
      this.payload = {... this.payload}

    },
  }
}
</script>
