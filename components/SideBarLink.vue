<template>

  <NuxtLink  @click.native="hideSidebar"
             v-bind="$attrs"
             :class="{'active': active, 'py-2': isShort}"
             tag="li">
    <a class="nav-link " :class="{'px-3': !isShort, 'px-5': isShort}" v-bind="$attrs">
      <!--font-awesome-icon :icon="icon"  size="lg" v-if="showIcon" /-->  &nbsp;
      <slot v-if="!isShort">
        {{name}}
      </slot>

    </a>
  </NuxtLink>
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
        type:Object
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
<style >
</style>
<style lang="scss">
</style>
