import config from 'config.json';

const tokenProvider = 'https://oauth2.googleapis.com/token';

// Lấy tokens từ GG Cloud bằng authorization code
export const getTokensByAuthCode = async (authCode) => {
  const params = `?code=${authCode}&client_id=${config.gg_cloud.client_id}&client_secret=${config.gg_cloud.client_secret}&redirect_uri=postmessage&grant_type=authorization_code`;

  return await fetch(tokenProvider+params, {
    method: 'POST'
  })
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.warn('getTokensByAuthCode failed: ', error);
      throw error;
    });
}

// Gọi làm mới tokens
export const refreshTokens = async (refreshToken) => {
  const params = `?client_id=${config.gg_cloud.client_id}&client_secret=${config.gg_cloud.client_secret}&refresh_token=${refreshToken}&grant_type=refresh_token`;

  return await fetch(tokenProvider+params, {
    method: 'POST'
  })
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.warn('refreshIdToken failed: ', error);
      throw error;
    });
}