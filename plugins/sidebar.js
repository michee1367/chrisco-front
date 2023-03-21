
const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}


export default ({ app, env }, inject) => {
    // Inject $hello(msg) in Vue, context and store.
    inject(
        'sidebar',
        SidebarStore
    )
}

//export default SidebarPlugin
