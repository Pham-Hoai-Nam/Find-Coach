import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const coachesModule = {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  actions,
  getters,
  mutations,
};
export default coachesModule;
