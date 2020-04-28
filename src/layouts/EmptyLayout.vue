<template>
    <div class="grey darken-1 empty-layout" :key="locale">
        <router-view />
    </div>
</template>

<script>
    import messages from "../utils/messages";

export default {
    computed: {
        error(){
            return this.$store.getters.error
        },
        locale(){
                return this.$store.getters.info.locale
        }
    },
    watch: {
      error(fbError){
          console.log(fbError);
          this.$error(messages[fbError.code] || 'Что-то пошло не так')
      }
    }
}
</script>