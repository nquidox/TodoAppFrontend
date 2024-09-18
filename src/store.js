import Vuex from "vuex";
import axios from "axios";

export default new Vuex.Store({
    state: {
        isAuth: localStorage.getItem("isAuth") === "true",
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    },

    mutations: {
        SET_AUTH(state, payload) {
            state.isAuth = payload.isAuth;
            state.user = payload.user;

            if (payload.isAuth) {
                localStorage.setItem("user", JSON.stringify(payload.user));
                localStorage.setItem("isAuth", "true");
            } else {
                localStorage.removeItem("user");
                localStorage.removeItem("isAuth");
            }
        },
        LOGOUT(state) {
            state.isAuth = false;
            state.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem("isAuth");
        }
    },

    actions: {
        async login({ commit }, credentials) {
            try {
                const response = await axios.post("/login", credentials);
                const {resultCode, httpCode, messages, data} = response.data;

                if (httpCode === 200) {
                    console.log(response.data)
                    commit("SET_AUTH", {isAuth: true, user: data});
                } else {
                    console.log(messages);
                }
            }
            catch(err){
                console.log(err);
            }
        },

        logout({ commit }) {
            commit("LOGOUT");
        }
    },

    getters: {
        isAuth: (state) => state.isAuth,
        user: (state) => state.user,
    },
});