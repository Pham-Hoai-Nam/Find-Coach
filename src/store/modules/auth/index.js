import actions from './actions';
import getters from './getters';
import mutations from './mutations';


const authModule = {
  namespaced: true,
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
      // tokenExpiration: null,
    };
  },
  actions,
  getters,
  mutations,
};
export default authModule;
