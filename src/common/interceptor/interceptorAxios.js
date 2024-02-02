import axios from 'axios';



const serverIp = process.env.REACT_APP_SPRING_BOOT_IP;
const serverPort = process.env.REACT_APP_SPRING_BOOT_PORT;
// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: `http://${serverIp}:${serverPort}`
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('jwt');
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use((response) => {
  return response;
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = sessionStorage.getItem('refreshToken');
    return axiosInstance.post('/refresh-token',  { refreshToken: `Bearer ${refreshToken}` })
      .then(res => {
        if (res.status === 200) {
          // 새 토큰 저장
          sessionStorage.setItem('jwt', res.data.jwt);
          // 새 토큰으로 원래 요청 재시도
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.jwt;
          return axiosInstance(originalRequest);
        }
      });
  }
  return Promise.reject(error);
});


export default axiosInstance;