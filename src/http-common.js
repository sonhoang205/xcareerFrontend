import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:9090/api/",
  params: {
    // userId: user.id,
  },
  headers: {
    "Content-type": "application/json",
    // 'Content-Type': 'multipart/form-data',
  },
});

http.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${user.token}`
    }
  }

  return config;
})

export default http;
// export default axios.create({
//   baseURL: "http://localhost:9090/api/", params: {
//     userId: user._id
//   },
//   headers: {
//     "Content-type": "application/json",
//     "Authorization": `Bearer ${token}`,

//   },
// });
