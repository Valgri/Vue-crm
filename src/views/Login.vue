<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title" >{{'Buh' | localize}}</span>
            <div class="input-field">
                <input
                        id="email"
                        type="text"
                        v-model.trim="email"
                        :class="{invalid:( $v.email.$dirty && !$v.email.required) || ( $v.email.$dirty && !$v.email.email)}"
                >
                <label for="email">Email</label>
                <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">
                    Поле email не заполнено</small>
                <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">
                    Введите корректный email</small>
            </div>
            <div class="input-field">
                <input
                        id="password"
                        type="password"
                        class="validate"
                        v-model.trim="password"
                        :class="{invalid:( $v.password.$dirty && !$v.password.required) || ( $v.password.$dirty && !$v.password.minLength)}"
                >
                <label for="password">Пароль</label>
                <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">
                    Пароль не задан</small>
                <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">
                    Пароль должен состоять не менее {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}</small>
            </div>
        </div>
        <div class="card-action">
            <div>
                <button
                        class="btn waves-effect waves-light auth-submit"
                        type="submit"
                >
                    {{'Enter' | localize}}
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                {{'No_account' | localize}}
                <router-link to="/register">{{'Register' | localize}}</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import {email, required, minLength} from "vuelidate/lib/validators"
    import messages from "../utils/messages";

    export default {
        name: 'Login',
        data: () => ({
            email: '',
            password: ''
        }),
        metaInfo() {
                return {
                        title: this.$title('Enter')
                }
        },
        validations: {
            email: {email, required},
            password: {required, minLength: minLength(8)}
        },
        mounted(){
            if(messages[this.$route.query.message]){
                this.$message(messages[this.$route.query.message])
            }
            if (this.$route.query.locale) {
                    let info = {locale: this.$route.query.locale}
                    this.$store.commit('setInfo', info)
            }
        },
        methods: {
           async submitHandler(){
                if(this.$v.$invalid){
                    this.$v.$touch();
                    return
                }
                const formData = {
                    email: this.email,
                    password: this.password
                };
                try {
                   await this.$store.dispatch('login', formData);
                   this.$router.push('/');

                } catch (e) {}
           }
        }
    }
</script>