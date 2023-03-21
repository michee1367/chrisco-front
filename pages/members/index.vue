<template>
  <div>
    <h3>Membres</h3>
    <div class="text-center  ">
      <button class="me-btn-fluid me-btn-primary px-5">Ajouter un membre</button>
    </div>
    <div class="container">
        <div class="row">
          <div class="form-group col-md-4">
              <label for="address" class="">Province</label>
              <commons-searchableList
                @change="changeProvinces($event)"
                :multiselectable="false"
                :listDefault="optsProv"
              >

              </commons-searchableList>

          </div>

          <div class="form-group col-md-4">
            <label for="address" class="">Territoire</label>
            <commons-searchableList
              @change="changeTerritories($event)"
              :multiselectable="false"
              :listDefault="optsTerritories"
            >

            </commons-searchableList>

          </div>
          <div class="form-group col-md-4">
            <label for="address" class="">Ville</label>
            <commons-searchableList
              @change="changeCities($event)"
              :multiselectable="false"
              :listDefault="optsCities"
            >

            </commons-searchableList>

          </div>
          <div class="form-group col-md-4">
            <label for="address" class="">Commune</label>
            <commons-searchableList
              @change="changeTowns($event)"
              :multiselectable="false"
              :listDefault="optsTowns"
            >

            </commons-searchableList>

          </div>
            <div class="form-group col-md-4">
                  <label for="address" class="">Presbyterie</label>
                  <commons-searchableList
                    @change="changePresbyteries($event)"
                    :multiselectable="false"
                    :listDefault="optsPresbyteries"
                  >

                  </commons-searchableList>

              </div>
              <div class="form-group col-md-4">
                  <label for="address" class="">Paroisse</label>
                  <commons-searchableList
                    @change="changeParishes($event)"
                    :multiselectable="false"
                    :listDefault="optsParishes"
                  >

                  </commons-searchableList>

              </div>
        </div>
    </div>

    <div class="table-responsive mt-0 pt-3">

      <table class="table table-sm mt-0 pt-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Names</th>
            <th>Numéro téléphone</th>
            <th>Adresse</th>
            <th>Paroisse</th>
            <th>Province/Territoire ou ville</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.id">
            <td>{{ member.id }}</td>
            <td>{{ member.name }} {{ member.lastname }} {{ member.firstname }}</td>
            <td>{{ member.phoneNumber }}</td>
            <td>{{ member.address??"-" }} </td>
            <td>{{ member?.parish?.name }}</td>
            <td>{{ getProvinceTerritoryCity(member) }}</td>
            <td>
              <NuxtLink
                :to="{name :'members-id-update', params:{id:member.id}}"
                class="me-btn-fluid me-btn-primary"
                tag="button"
              >
                <i class="bi bi-eye"></i>&nbsp; Voir

              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  layout: 'admin',
  async asyncData({ env, $axios, store }) {
    (
      async function () {
        store.dispatch("members/load");
        await store.dispatch("provinces/load")
        await store.dispatch("territories/load",{})
        await store.dispatch("cities/load",{})
        await store.dispatch("towns/load",{})//
        await store.dispatch("presbyteries/load",{})//parishes
        await store.dispatch("parishes/load",{})//parishes
        //
      }
    )()
  },
  computed: {
    ...mapGetters({
        members: "members/all",
        provinces: 'provinces/all',
        territories: 'territories/all',//cities
        cities: 'cities/all',//cities
        towns: 'towns/all',//presbyteries
        presbyteries: 'presbyteries/all',//parishes
        parishes: 'parishes/all',//parishes
    }),
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
  },
  methods:{
    getProvinceTerritoryCity(member) {
      if (member.territory) {
        return member?.territory?.name + "/" + member?.territory?.province?.name
      }else if (member.town) {
        return member?.town?.city?.name + "/" + member?.town?.city?.province?.name
      }else {
        return "-"
      }
    },
    changeParishes(parish) {
        this.parish = parish;
        let me = this;
        (
          async function () {
            //
            await me.$store.dispatch(
              "members/load",
              {
                "key":"parish",
                "value":parish.id,
              }
            )
          }
        )()
      },
      changePresbyteries(presbytery) {
        this.presbytery = presbytery
        let me = this;
        (
          async function () {
            //
            await me.$store.dispatch(
              "members/load",
              {
                "key":"presbytery",
                "value":presbytery.id,
              }
            )
            await me.$store.dispatch(
              "parishes/load",
              {
                "key":"presbytery",
                "value":presbytery.id,
              }
            )
          }
        )()
      },
      changeTerritories(territory){
        this.territory = territory?.iri;
        let me = this;
        (
          async function () {
            //
            await me.$store.dispatch(
              "members/load",
              {
                "key":"territory",
                "value":territory.id,
              }
            )
          }
        )()
      },
      changeTowns(town) {
        this.town = town?.iri;
        let me = this;
        (
          async function () {
            //
            await me.$store.dispatch(
              "members/load",
              {
                "key":"town",
                "value":town.id,
              }
            )
          }
        )()
      },
      changeCities(city){
        this.city = city
        let me = this;
        (
          async function () {
            //members

            await me.$store.dispatch(
              "members/load",
              {
                "key":"city",
                "value":city.id,
              }
            )
            await me.$store.dispatch(
              "towns/load",
              {
                "key":"city",
                "value":city.id,
              }
            )
          }
        )()
      },
      changeProvinces(province) {
        this.province = province;
        let me = this;
        (
          async function () {
            await me.$store.dispatch(
              "members/load",
              {
                "key":"province",
                "value":province.id,
              }
            )
            await me.$store.dispatch(
              "territories/load",
              {
                "key":"province",
                "value":province.id,
              }
            )
            //
            await me.$store.dispatch(
              "cities/load",
              {
                "key":"province",
                "value":province.id,
              }
            )
            //
            await me.$store.dispatch(
              "towns/load",
              {
                "key":"province",
                "value":province.id,
              }
            )
          }
        )()
      },
  }
}
</script>
