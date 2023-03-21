<template>
  <div>
    <div>
      <Sidebars-Admin :showSidebar="showSidebar" @dimiss="sidebarChangeState">

      </Sidebars-Admin>
    </div>
    <div>

      <TopBar :vuelogo="true" @toggleSidebar="sidebarChangeState">

      </TopBar>

      <div class="container-fluid h-100 border-left me-main" >

        <div class="row h-100 ">
          <div class="col-md-2"></div>
          <div class="col-lg-10 col-md-12 pt-2 h-100">

            <transition name="fade" mode="out-in">
              <div class="">

                <Nuxt />

              </div>
            </transition>

          </div>
        </div>



      </div>
        <div class="overlay" :class="{ 'active': showSidebar }" @click="sidebarChangeState">
        </div>
    </div>

  </div>
</template>
<script>

export default {
  data() {
    return {
      showSidebar: false
    }
  },
  methods:{
    sidebarChangeState() {
      this.showSidebar = !this.showSidebar
    }
  }
}
</script>
<style>
</style>
