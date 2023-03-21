<template>
  <!-- Sidebar -->

    <nav
      id="sidebar"
      class="overflow-auto h-100"
      :class="{'active': showSidebar, 'report': isReport, 'not-report': !isReport}"
    >


        <div class="overflow-auto">
          <div id="dismiss" v-if="showSidebar" class="px-2 sidebar-header-text" >
            <a href="#" @click.prevent="toggleDimiss"> <i class="bi bi-x-lg"></i></a>
          </div>

          <div
            class="sidebar-header py-1 px-2"
          >
          <a class="navbar-brand font-weight-bold" href="#">
            <h1>CHRISCO</h1>
            <!--img
                :src="require(`~/assets/img/logo.png`)"
                width="150"
                height="35"
                class=""
                alt=""
            -->
          </a>
                <div
                  class=""
                  :class="{'text-left': isReport, 'text-left': !isReport} "
                >
                  <a class="my-0 py-0" v-if="false" href="#" ><img width="55"    class=" img-responsive" src="" alt="#"></a>
                </div>
          </div>
        </div>
        <div class="h-85  " :class="{'sidebar-grid-container':isReport}">
          <div class="h-100">

              <ul class="list-unstyled components part-1  overflow-auto h-75 pt-5">
                <slot name="items"></slot>
              </ul>

              <div class="text-center h-25">
                <slot name="logo_org"></slot>
              </div>

          </div>

          <div class="h-100  overflow-auto part-2 report-part p-2" v-if="isReport">
            <slot name="report_part"></slot>
          </div>

        </div>


    </nav>
</template>
<script>


export default {

  async mounted() {
    //console.log(this.$sidebar.showSidebar)
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      //console.log('collapseId:', collapseId)
      //console.log('isJustShown:', isJustShown)
    })
  },
  components: {
  },
  props: {
    isReport: {
      type: Boolean,
      default: false
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    showSidebar: {
      type: Boolean,
      default: false
    },
  },
   data() {
    return {

    }
  },
  computed: {

    isShort(){
      return this.isReport
    },
    /*isReport(){
      return true
    },*/
    homeRoute(){
          return {
              name:"index"
          }
    },
  },
  watch:{
      $sidebar(value){
          console.log(value)
      }
  },
  methods : {
    toggleDimiss() {
      this.$emit("dimiss")
    },
    /**
     * @param {String} name
     */
    isActive(name){
        //console.log(this.$route)
        //includes
        let routeName = this.$route.name
        if (typeof routeName == "string"  ) {
          return routeName.includes(name)
        }
        return false
    },
  }
}

</script>
<style lang="scss">

</style>
