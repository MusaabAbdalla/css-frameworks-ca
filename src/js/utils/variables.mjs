const API_BASE_URL = "https://api.noroff.dev/api/v1"
const loginEndpoint = "/social/auth/login"
const registerEndpoint ="/social/auth/register"
const allPostsEndpoint = "/social/posts?_author=true&_comments=true&_reaction=true"
const posts = "/social/posts"
export const loginUrl = `${API_BASE_URL}${loginEndpoint}`
export const registerUrl =`${API_BASE_URL}${registerEndpoint}`
export const postsUrl = `${API_BASE_URL}${allPostsEndpoint}`
export const createPostUrl = `${API_BASE_URL}${posts}`