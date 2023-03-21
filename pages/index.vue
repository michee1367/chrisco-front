<template>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.authenticated) {
        return redirect({name:"members"})
      }
  },
}
</script>
