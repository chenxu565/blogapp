import { useSetStorageUser, useNotifyWith } from '../StoreContext'
import loginService from '../services/login'
import storageService from '../services/storage'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username] = useField('username')
  const [password] = useField('password')
  const setStorageUser = useSetStorageUser()
  const notifyWith = useNotifyWith()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
      setStorageUser(user)
      storageService.saveUser(user)
      notifyWith('welcome!')
      navigate('/')
    } catch (e) {
      if (e.response.status === 401) {
        notifyWith('wrong username or password', 'error')
      } else {
        notifyWith('something went wrong', 'error')
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control {...username} />
        <Form.Label>password</Form.Label>
        <Form.Control {...password} />
      </Form.Group>
      <Button id="login-button" type="submit" variant="primary">
        login
      </Button>
    </Form>
  )
}

export default LoginForm
