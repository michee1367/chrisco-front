<template>

  <div class="">

      <nav class="navbar navbar-expand-lg navbar-light bg-white me-nav-bar navbar-fixed-top">
                  <div class="container-fluid ">
                      <div>
                        <a href="#" @click.prevent="toggleSidebar" class="pt-1 d-inline-block  "><i style="font-size:1.7em" class="bi bi-list"></i></a>
                        <a class="navbar-brand font-weight-bold " :href="baseUrl">
                          <h1 class="h1-logo">
                            CHRISCO
                          </h1>
                            <!--img
                                :src="require(`~/assets/img/logo.png`)"
                                width="200"
                                height="46"
                                class=""
                                alt=""
                            -->
                        </a>

                      </div>

                      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                      </button>
                      <div class="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul class="navbar-nav mr-auto">

                          </ul>
                          <ul class="navbar-nav text-right ">

                                  <li class="nav-item dropdown active font-weight-bold top-profile-dropdown">
                                    <button class="btn btn-sm btn-link" @click="changeProfileDropdownContent">
                                        <img class="top-bar-img m-0" :src="require(`~/assets/img/profile-default.jpg`)" alt="#">
                                        <i class="bi-caret-down-fill me-caret-down-fill m-0 " role="img" aria-label="GitHub"
                                            style="font-size: .7em; "></i>
                                    </button>
                                    <div class="top-profile-dropdown-content overflow-auto bg-white px-1 text-left" v-if="user">
                                        <div class="border-bottom">
                                            <a href="" @click.prevent="" class="py-1 btn me-small px-1  text-left">
                                                Connecter en tant que <br>
                                                <strong>{{ user.lastName }} {{ user.firstName }}</strong>
                                            </a>
                                        </div>

                                        <div class="py-1 border-bottom list me-small">
                                            <ul class="list-unstyled my-1">
                                                <li class="p-1">
                                                    <a href="#" @click.prevent="showProfil" class="">Mon profil</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="border-bottom">
                                            <a @click.prevent="logout" href="" class="py-1 btn me-small px-1  text-left">
                                                Deconnexion
                                            </a>
                                        </div>
                                    </div>
                                  </li>
                          </ul>

                      </div>
                  </div>
      </nav>

  </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
      vuelogo: {
          type: Boolean,
          default: false
      }
  },
  mounted() {
    console.log()
  },
  data() {
      return {
          enableSearchDropdownContent: false,
          enableProfileDropdownContent: false,
          showMenuRepport: false,
          user: {
              lastName: "MBUNGU",
              firstName: "Léon",
          }
      }
  },

  computed: {
      logoutUrl() {
        let envParams = this.$nuxt?.context?.env
        return `${envParams?.baadhiTeamsBaseUrl}${envParams?.baadhiTeamsLogoutPath}`;
      },
      baseUrl() {
        let envParams = this.$nuxt?.context?.env
        return envParams?.baadhiTeamsBaseUrl
      },
      ...mapGetters({
          // ...
      })
  },
  methods: {

      showProfil() {
          console.log()
          this.$refs.user_profil.showView(this.user)
      },
      toggleSidebar() {
          this.$emit("toggleSidebar")
      },
      showSearchDropdownContent() {
          this.enableSearchDropdownContent = true
      },
      hideSearchDropdownContent() {
          this.enableSearchDropdownContent = false
      },
      changeSearchDropdownContent() {
          this.enableSearchDropdownContent = !this.enableSearchDropdownContent
      },
      changeProfileDropdownContent() {
          this.enableProfileDropdownContent = !this.enableProfileDropdownContent
      },
      changeMenuRepportContent() {
          this.showMenuRepport = !this.showMenuRepport
      },
      logout() {
        //console.log(this.logoutUrl)
        //this.$nuxt?.context?.redirect(this.logoutUrl)
      },
      profile() {
          'http://localhost:8081/auth/realms/rna/account/'
      }
  }


}
</script>
<style>
.me-input-group {
  background: #f6f6f6;
  border-radius: 8px;
}

.me-input-group .form-control {
  background: #f6f6f6;
  border: 0px;
  border-radius: 8px;
}

.top-bar-img {
  vertical-align: middle;
  width: 35px;
  border-radius: 50%;
  border: 2px solid white;
}

.top-bar-grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: space-between;
  gap: 10px;
  /*border-bottom: 1px solid #2F8B60;*/
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  /*border-left: 1px solid rgba(0, 0, 0, 0.2);*/
}
.item-right h1 {
  font-size: 30px;
  font-weight: 700;
  color: #04158f;
  text-align: center;
}

@media (max-width: 768px) {
  .h1-logo {
    display: none;
  }
  .top-bar-grid-container .top-search-dropdown {
      width: 100%;
      grid-column: 2 / span 4;
      grid-row: 2;
  }

  .top-bar-grid-container {
      grid-template-columns: auto auto auto;
  }


  .top-bar-grid-container .item-right {
      width: 100%;
      /*grid-column: 1 / span 2;*/
      grid-row: 1;
      grid-column: 1 / span 4;
  }

  .top-bar-grid-container .item3 {
      grid-row: 2;
  }

  .top-bar-grid-container .item4 {
      grid-row: 1;
  }

  .top-profile-dropdown {
      width: 90pt;
  }
}

@media (min-width: 768px) {
  .h1-logo {
    display: block;
    font-size: 30px;
    font-weight: 700;
    color: #04158f;
    text-align: center;
  }
  .top-bar-grid-container .top-search-dropdown {
      width: 100%;
      grid-column: 3 / span 4;
      grid-row: 1;
  }


  .top-bar-grid-container .item-right {
      width: 100%;
      grid-column: 1 / span 2;
      grid-row: 1;
  }

  .top-bar-grid-container .item3 {
      grid-row: 1;
  }

  .top-bar-grid-container .item4 {
      grid-row: 1;
  }

  .top-profile-dropdown {
      width: 90pt;
  }


}

.me-caret-down-fill {
  color: rgba(0, 0, 0, 0.65);
  font-size: 0.9em;
  position: relative;
  top: 3px;
}


.top-search-dropdown {
  position: relative;
  display: block;
  z-index: 99;
}

.top-search-dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200pt;
  max-height: 200pt;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 99;
}

.top-search-dropdown:hover .top-search-dropdown-content {
  display: block;
}

.top-profile-dropdown {
  position: relative;
  display: block;
  z-index: 99;
}

.top-profile-dropdown:hover .top-profile-dropdown-content {
  display: block;
}

.top-profile-dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  max-height: 250pt;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 99;
}

.top-repport-menu-dropdown-content .list li:hover {
  background: #2F8B60;
  color: white;
}

.top-repport-menu-dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  max-height: 250pt;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 99;
  border-radius: 8px;
}

.top-repport-menu-dropdown:hover .top-repport-menu-dropdown-content {
  display: block;
}

.line-height-small-1 {
  line-height: 1.2;
  font-size: .7em;
  text-align: center;
}
</style>
