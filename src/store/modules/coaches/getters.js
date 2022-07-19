export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state?.coaches?.length > 0;
  },
  isCoach(_, getters, __, rootGetters) {
    // _ : state
    // __ : rootState
    const coaches = getters.coaches;
    const userId = rootGetters['auth/userId'];
    return coaches.some((c) => c.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
