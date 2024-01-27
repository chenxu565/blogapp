import axios from 'axios'
import storageService from '../services/storage'
const baseUrl = '/api/blogs'

const getHeaders = () => {
  const user = storageService.loadUser()
  // console.log('getHeader , user', user)
  const headers = {
    Authorization: user ? `Bearer ${user.token}` : null,
  }
  // console.log('getHeader , headers', headers)
  return headers
}

const getAllBlogs = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async (object) => {
  const request = await axios.post(baseUrl, object, { headers: getHeaders() })
  return request.data
}

const updateBlog = async (object) => {
  const request = await axios.put(`${baseUrl}/${object.id}`, object, {
    headers: getHeaders(),
  })
  return request.data
}

const removeBlog = async (blog) => {
  const id = blog.id
  const res = await axios.delete(`${baseUrl}/${id}`, { headers: getHeaders() })
  if (res.status !== 204) {
    throw new Error('Error deleting blog')
  }
  return blog
}

const addCommentToBlog = async (blog, comment) => {
  const request = await axios.post(`${baseUrl}/${blog.id}/comments`, {
    comment,
  })
  return request.data
}

export default {
  getAllBlogs,
  createBlog,
  updateBlog,
  removeBlog,
  addCommentToBlog,
}
