<template>
  <div>
    <div class="login-container d-flex align-items-stretch">
      <div class="login-row login-row-detail d-flex align-items-center justify-content-center">
        <div class="detail-container px-5 py-5">
          <h1 >
            <i class="bi bi-caret-right-fill"></i> EGLISE CHRIST ET COMPAGNONS <span>CHRISCO</span>
          </h1>

          <p class="pt-3">
            135, Avenue Songolo, Commue Kinshasa (Derrière le stade des martyrs)
          </p>
        </div>
      </div>
      <div class="login-row login-row-form  d-flex align-items-center justify-content-center">
        <div class="login-form-container ">
          <h1 class="text-center w-100 ">CHRISCO</h1>
          <h2 class="pt-4 text-center w-100"> Bienvenue</h2>
          <div class="text-center pt-4 w-100" v-if="false">
            <button class="me-btn">
              <i class="bi bi-google"></i> Se connecter avec Google
            </button>
          </div>
          <div class="separator pt-4 " v-if="false">
            <div class="text text-center"> <span> ou </span></div>
          </div>
          <form class="pt-4">
            <div class="form-group p-0">
              <label for="username" class="me-login-label">Numéro de téléphone ou adresse e-mail</label>
              <input id="username" type="text" class="me-login-input m-0">
            </div>
            <div class="form-group p-0">
              <label for="password" class="me-login-label" >Mot de Passe</label>
              <input id="password" type="password" class="me-login-input m-0">
            </div>
            <div class="text-center pt-4">
            <button  class="me-btn me-btn-primary">Se connecter</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>
<style lang="scss">

</style>
