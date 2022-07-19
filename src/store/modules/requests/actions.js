import { APP_API } from '@/constants';

export default {
  async contactCoach(context, payload) {
    const newRequest = {
      // id: new Date().toISOString(),
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `${APP_API}/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
      );
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = responseData.coachId;
    context.commit('ADD_REQUEST', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters['auth/userId'];
    const token = context.rootGetters['auth/token'];
    console.log(coachId);
    console.log(token);
    const response = await fetch(
      `${APP_API}/requests/${coachId}.json?auth=${token}`
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch request'
      );
      throw error;
    }
    console.log(responseData);
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        message: responseData[key].message,
        userEmail: responseData[key].userEmail,
      };
      requests.push(request);
    }
    console.log(requests);
    context.commit('SET_REQUESTS', requests);
  },
};
