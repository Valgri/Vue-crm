<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid:( $v.name.$dirty && !$v.name.required)}"
        >
        <label for="description">{{'Name' | localize}}</label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.email">
          {{'Message_entername' | localize}}</small>
      </div>
      <div class="switch">
        <label>
          En
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Ru
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>


<script>
  import {mapGetters, mapActions} from 'vuex'
  import {required} from "vuelidate/lib/validators"
  import localizeFilter from "../filters/localize-filter";
  export default {
    name: 'Profile',
    metaInfo() {
      return {
        title: this.$title('ProfileTitle')
      }
    },
    data() {
      return {
        name: '',
        isRuLocale: true
      }
    },
    computed: {
      ...mapGetters(['info'])
    },
    validations: {
      name: {required},
    },
    mounted() {
      this.name = this.info.name
      this.isRuLocale = this.info.locale === 'ru-Ru'
      setTimeout(() => {
        M.updateTextFields()
      }, 0)

    },
    methods: {
      ...mapActions(['updateInfo']),
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return
        }
        try {
          await this.updateInfo({
            name: this.name,
            locale: this.isRuLocale ? 'ru-Ru' : 'en-En'
          })
        } catch (e) {

        }
      }
    }
  }
</script>

<style>
  .switch{
    margin-bottom: 20px;
  }
</style>