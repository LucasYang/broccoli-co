export const LANDING_INVITE_URL = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';

interface LandingFormRequestBody {
  name: string;
  email: string;
}

export const landingInviteDataFactory = (data: { [key: string]: any }): LandingFormRequestBody => {
  const landingInviteData = {
    name: '',
    email: '',
  };
  landingInviteData.name = data.name;
  landingInviteData.email = data.email;
  return landingInviteData;
}

export const postLandingForm = (data: LandingFormRequestBody): Promise<any> => {
  return fetch(LANDING_INVITE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
