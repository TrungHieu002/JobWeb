// export const getIpAddress = async () => {
//   return await fetch("https://geolocation-db.com/json/", { method: "GET" })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`${response.status} ${response.statusText}`);
//       return response.json();
//     })
//     .then(data => {
//       return data.IPv4;
//     })
//     .catch(error => {
//       console.warn('Get IP failed: ', error);
//     });
// }