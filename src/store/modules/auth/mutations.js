export default {
    SET_USER(state,payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.didAutoLogout = false;
        // state.tokenExpiration = payload.tokenExpiration;
    },
    SET_AUTO_LOGOUT(state) {
        state.didAutoLogout = true;
    }
};
