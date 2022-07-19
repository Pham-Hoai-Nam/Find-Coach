import { APP_API } from '@/constants';
export default {
  async registerCoach(context, data) {
    // console.log(context)
    const userId = context.rootGetters['auth/userId'];
    const token = context.rootGetters['auth/token'];
    // console.log(context.rootGetters);
    // console.log(`🚀 - registerCoach - userId`, userId)
    // console.log(`🚀 - registerCoach - token`, token)


    const coachData = {
      id: userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const response = await fetch(
      `${APP_API}/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coachData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error...
    }

    context.commit('REGISTER_COACH', { ...coachData, id: userId });
  },

  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(`${APP_API}/coaches.json`);
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: responseData[key].id,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }
    context.commit('SET_COACHES', coaches);
    context.commit('SET_FETCH_TIMESTAMP');
  },
};
