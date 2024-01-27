import { useQuery } from 'react-query'
import blogService from '../services/blogs'
import { useStoreValue } from '../StoreContext'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = () => {
  const { storageUser: user } = useStoreValue()
  const byLikes = (b1, b2) => b2.likes - b1.likes

  const {
    isLoading,
    isError,
    isSuccess,
    data: blogs,
  } = useQuery('blogs', blogService.getAllBlogs, {
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!user, // query will not run until user is truthy
  })

  if (isLoading) {
    return <div>loading...</div>
  }

  if (isError) {
    return <div>error...</div>
  }

  if (isSuccess) {
    return (
      <div>
        <h2>blogs</h2>
        <Table striped>
          <tbody>
            {blogs.sort(byLikes).map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>by {blog.author}</td>
                <td>{blog.user.username}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Blogs
