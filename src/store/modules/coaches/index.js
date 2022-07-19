import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const coachesModule = {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [
        {
          id: 'c1',
          firstName: 'Quyen',
          lastName: 'Dang',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Quyen Dang and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 99,
        },
        {
          id: 'c2',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: ['frontend', 'career'],
          description:
            'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30,
        },
      ],
    };
  },
  actions,
  getters,
  mutations,
};
export default coachesModule;
