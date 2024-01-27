import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useNotifyWith } from '../StoreContext'
import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ blogFormRef }) => {
  const [title, resetTitle] = useField('title')
  const [author, resetAuthor] = useField('author')
  const [url, resetUrl] = useField('url')
  const queryClient = useQueryClient()
  const notifyWith = useNotifyWith()

  const createBlogMutation = useMutation(blogService.createBlog, {
    onSuccess: (newBlog) => {
      // console.log('Returned from mock createBlog', newBlog)
      const blogs = queryClient.getQueryData('blogs') || []
      // console.log(blogs)
      // console.log(newBlog)
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
      notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
      blogFormRef.current.toggleVisibility()
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    // console.log('create new blog', title, author, url)
    createBlogMutation.mutate({
      title: title.value,
      author: author.value,
      url: url.value,
    })
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      <h4>Create a new blog</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control {...title} />
          <Form.Label>author</Form.Label>
          <Form.Control {...author} />
          <Form.Label>url</Form.Label>
          <Form.Control {...url} />
        </Form.Group>
        <Button id="create-blog-button" type="submit" variant="primary">
          create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
