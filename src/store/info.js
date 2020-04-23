import firebase from "firebase/app";


export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                console.log(info);
                commit('setInfo', info)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateInfo({commit, dispatch, getters}, toUpdate) {
            try {
                const uid = await dispatch('getUid')
                const updateData = {...getters, ...toUpdate}
                await firebase.database().ref(`/users/${uid}/info`).update(updateData)
                commit('setInfo', updateData)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    },
    getters: {
        info: s => s.info
    }
}