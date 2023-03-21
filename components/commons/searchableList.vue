<template>
  <div>
    <div :class="{ 'invalid': isInvalid }">

      <ValidationProvider ref="validation_list" rules="required" v-slot="{ errors }">
        <multiselect
          v-if="list"
          v-model="selectedOptions"
          id="provinces"
          label="name"
          track-by="code"
          placeholder="Recherche..."
          open-direction="bottom"
          select-label="Cliquer ici!"
          :options="list"
          :searchable="true"
          :multiple="true"
          :loading="isLoading"
          :internal-search="false"
          :clear-on-select="false"
          :close-on-select="false"
          :options-limit="300"
          :limit="10"
          :limit-text="limitText"
          :max-height="600"
          :show-no-results="false"
          :hide-selected="true"
          @search-change="asyncFind"
          @select="selectOptions"
          @close="onTouch"
        >
          <template
            slot="tag"
            v-if="true"
            slot-scope="{ option, remove }"
          >
            <div class="me-modal-title p-1 mb-1 me-small d-inline-block">
              <span>{{ option.text }}</span>
              <a href="#" class="" @click.prevent="remove(option)">❌</a>
            </div>
          </template>
          <template slot="clear" slot-scope="props">
            <div
              class="multiselect__clear"
              v-if="selectedOptions.length"
              @mousedown.prevent.stop="clearAll(props.search)"
            >
            </div>
          </template>
          <span slot="noResult">Oops! Pas d'éléments selectionnés.</span>
          <span slot="noOptions">Oops! Pas d'option.</span>
        </multiselect>
        <small class="text-danger">
              {{ errors[0] }}
          </small>
          <input id="provinces" v-model="optionStr" type="hidden" name="">
      </ValidationProvider>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Multiselect from 'vue-multiselect'

export default {
    props:{
      multiselectable:{type:Boolean, default:true},
      listDefault:{
        type:Array,
        default() {
          return []
        }
      },
      defaultSelectedOptions:{
        type:String|Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
          selectedOptions: [],
          list: [],
          isLoading: false,
          isTouch: false,
      }
    },
    components: {
      Multiselect
      //BOverlay,
      //BModal
    },
    mounted(){
      this.loadList()
    },
    computed:{
      isInvalid() {
        return this.isTouch && !this.optionStr
      },
      optionStr() {
        if (this.selectedOptions instanceof Array) {
          return this.selectedOptions.length > 0 ? "ok" : "";
        }
        return this.selectedOptions
      }

    },
    methods:{
        onTouch() {
          //console.log("ok")
          this.isTouch = true
        },
        limitText (count) {
          return `et ${ count } autres provinces`
        },
        asyncFind (query) {
          this.isLoading = true
          query = query.trim()

          this.list = this.listDefault.filter(
              (option) => {

                return option.text.toLowerCase().includes(query.toLowerCase()) || query == ""
              }
            )
            this.isLoading = false
            //console.log(this.list)
        },
        clearAll () {
          this.selectedOptions = []
        },
        clear(){

        },
        loadList() {
          this.list = this.listDefault
          this.selectedOptions = this.defaultSelectedOptions instanceof Array ? this.defaultSelectedOptions : [this.defaultSelectedOptions]
          console.log(this.defaultSelectedOptions)
          //defaultSelectedOptions
          return this.list
        },
        selectOptions(selectedOption, id) {
          //console.log(selectedOption)
          if (!this.multiselectable) {

            setTimeout(
              (me) => {
                me.selectedOptions = [selectedOption];

              },
              200,
              this
            )
            //console.log( [selectedOption] )
          }
        //this.selectedOptions = []
        //this.$emit("change", selectedOptions)

        }

    },

    watch:{
      listDefault(values){
        //console.log(values)
        this.loadList()
      },
      selectedOptions(values){
        let selectedOptions = this.multiselectable ? values : values[values.length-1]
        console.log(values)

        //this.payload = {... this.payload}
        //this.selectedOptions = []
        this.$emit("change", selectedOptions)

      },
    }

}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
