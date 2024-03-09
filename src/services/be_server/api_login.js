import config from 'config.json';

const serverUrl = config.be_rootUrl;

export const login = async (token) => {
  var urlString = serverUrl + "/account/login";
  var authToken = "Bearer " + token;

  return await fetch(urlString, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "omit",
    headers: {
      "Authorization": authToken,
    },
    redirect: "follow"
  })
    // await receiving response
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    // await getting response body
    .then(data => {
      return data;
    })
    // catch fail fetch
    .catch(error => {
      console.warn('Login failed: ', error);
      throw error;
    });
}