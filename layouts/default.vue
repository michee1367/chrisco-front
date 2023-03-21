<template>
  <div>
            <transition name="fade" mode="out-in">
              <div class="">

                <Nuxt />

              </div>
            </transition>

  </div>
</template>
<script>

export default {
  data() {
    return {
      showSidebar: false
    }
  }
}
</script>
<style>
</style>
