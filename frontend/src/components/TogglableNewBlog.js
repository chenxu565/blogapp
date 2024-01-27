import Togglable from './Togglable'
import NewBlog from './NewBlog'
import { useRef } from 'react'

const TogglableBlogForm = () => {
  const blogFormRef = useRef()

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <NewBlog blogFormRef={blogFormRef} />
    </Togglable>
  )
}

export default TogglableBlogForm
