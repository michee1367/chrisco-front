<template>
  <SideBar class="account-sidebar" :showSidebar="showSidebar" @dimiss="toggleDimiss" :isReport="isReport">
      <!--LayoutsDashboardMobileMenu
          slot="content"
      >

      </LayoutsDashboardMobileMenu-->

      <template slot="items">
        <SideBarLink
          :to="{name:'members'}"
          :active="isActive('members')"
          :icon="faHome"
          :isShort="isShort"
        >
          Membres
        </SideBarLink>

        <SideBarLink
          :to="{name:'members-add'}"
          :active="isActive('members-add')"
          :icon="faUserPlus"
          :isShort="isShort"
        >
          Ajouter Membre
        </SideBarLink>
      </template>



      <template slot="report_part">


      </template>

      <template slot="logo_org">
        <div class="text-success text-left pl-3"></div>
      </template>


  </SideBar>
</template>
<script>

export default {
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
        default: true
      },
    },
    created() {
      ///console.log(SideBar)
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
    methods : {
      toggleDimiss() {
        this.$emit("dimiss")
      },
      /**
       * @param {String} name
       */
      isActive(name){
          console.log(this.$route)
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
  .items{
  }

  #sidebar ul li a {
    font-size: 13px !important;
  }
</style>
