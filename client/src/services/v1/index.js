import axios from "@/services";

const version = "/api/v1";

const baseUrl = `${version}`;

// 注册
export const register = params => axios.$post(`${baseUrl}/register`, params);

// 发送验证邮件
export const sendEmail = params =>
  axios.$post(`${baseUrl}/sendVerifyEmail`, params);
  
// 验证邮箱
export const vertifyEmailAPi = params =>
  axios.$post(`${baseUrl}/verifyEmail`, params);

// 登录接口
export const loginApi = params => axios.$post(`${baseUrl}/login`, params)

export const todoFolderApi = `${baseUrl}/folder`;