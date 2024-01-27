import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import userService from '../services/users'

const User = () => {
  const id = useParams().id
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery('users', userService.getAllUsers, {
    retry: 1,
    refetchOnWindowFocus: false,
  })
  if (isLoading) return 'Loading...'
  if (isError) return 'An error has occurred: ' + isError.message

  const user = users.find((user) => user.id === id)
  if (!user) return 'User not found'

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
