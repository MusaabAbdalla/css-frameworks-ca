const API_BASE_URL = "https://api.noroff.dev/api/v1"
const loginEndpoint = "/social/auth/login"
const registerEndpoint ="/social/auth/register"
const allPostsEndpoint = "/social/posts"
export const loginUrl = `${API_BASE_URL}${loginEndpoint}`
export const registerUrl =`${API_BASE_URL}${registerEndpoint}`
export const postsUrl = `${API_BASE_URL}${allPostsEndpoint}`