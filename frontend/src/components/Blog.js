// import { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useNotifyWith, useStoreValue } from '../StoreContext'
import { useParams, useNavigate } from 'react-router-dom'
import NewComment from './NewComment'

const Blog = () => {
  // const [visible, setVisible] = useState(false)
  const queryClient = useQueryClient()
  const notifyWith = useNotifyWith()
  const { storageUser: user } = useStoreValue()
  const id = useParams().id
  // const blogs = queryClient.getQueryData('blogs')

  const navigate = useNavigate()

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery('blogs', blogService.getAllBlogs, {
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const updateBlogMutation = useMutation(blogService.updateBlog, {
    onSuccess: (updatedBlog) => {
      const currentBlogs = queryClient.getQueryData('blogs')
      if (currentBlogs) {
        queryClient.setQueryData(
          'blogs',
          currentBlogs.map((blog) =>
            blog.id !== updatedBlog.id ? blog : updatedBlog,
          ),
        )
      }
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const deleteBlogMutation = useMutation(blogService.removeBlog, {
    onSuccess: (deletedBlog) => {
      const currentBlogs = queryClient.getQueryData('blogs')
      if (currentBlogs) {
        queryClient.setQueryData(
          'blogs',
          currentBlogs.filter((blog) => blog.id !== deletedBlog.id),
        )
        notifyWith(`Blog '${deletedBlog.title}' removed`)
      }
    },
    onError: (error) => {
      console.log(error)
      notifyWith('Error removing blog')
    },
  })

  const like = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlogMutation.mutate(updatedBlog, {
      onSuccess: () => {
        notifyWith(`Blog '${updatedBlog.title}' liked`)
      },
    })
  }

  const remove = async () => {
    // console.log('remove, user', user)
    // console.log('remove, chromeUser', chromeUser)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog, {
        onSuccess: () => {
          navigate('/')
        },
      })
    }
  }

  if (isLoading) return 'Loading...'
  if (isError) return 'An error has occurred: ' + isError.message

  const blog = blogs.find((b) => b.id === id)
  if (!blog) return 'Blog not found'
  const canRemove = user && user.username === blog.user.username
  const comments = blog.comments

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={like}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {canRemove && (
        <div>
          <button onClick={remove}>remove</button>
        </div>
      )}
      <h3>comments</h3>
      <NewComment blog={blog} />
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }),
}

export default Blog
