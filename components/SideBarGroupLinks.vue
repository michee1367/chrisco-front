<template>
  <div>
    <div class="group-link">
      <div>
          <slot name="item"></slot>

      </div>

      <ul class="p-0" v-if="active">
          <slot name="sub-items"></slot>
      </ul>
    </div>
  </div>

</template>
<script>

  export default {
    inheritAttrs: false,
    inject: {
      autoClose: {
        default: true
      }
    },

    props: {
      isShort:{type:Boolean, default:false},
      active:{type:Boolean, default:false},
      showIcon:{type:Boolean, default:true},
      link: {
        type: [String, Object],
        default: () => {
          return {
            name: '',
            to: {
              name:'ot-overview'
            },
            imgName: '',
            short: false,
          }
        }
      },
      tag: {
        type: String,
        default: 'NuxtLink'
      },
      icon: {
        type:String
      }
    },
    computed:{
      name(){
        return this.link.name
      },
    },
    methods: {
      hideSidebar () {
        //console.log(this.$sidebar)
        if (this.autoClose && this.$sidebar && this.$sidebar.showSidebar === true) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }
</script>
<style>
</style>
