
import Vue from 'vue'
import fr from 'vee-validate/dist/locale/fr.json';
import { localize } from 'vee-validate';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
// No message specified.
localize({fr})
localize('fr')

extend('email', email);

// Override the default message.
extend('required', {
  ...required,
  //message: 'This field is required'
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
