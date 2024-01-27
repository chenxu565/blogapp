import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useQuery } from 'react-query'
import { StoreContextProvider } from '../StoreContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'
import Blog from './Blog'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}))

jest.mock('../services/blogs', () => ({
  getAllBlogs: jest.fn(),
  createBlog: jest.fn(),
  updateBlog: jest.fn(),
  removeBlog: jest.fn(),
  addCommentToBlog: jest.fn(),
}))

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: jest.fn(),
}))

describe('Blog', () => {
  const mockBlogId = '1'
  const mockBlogs = [
    {
      id: mockBlogId,
      title: 'Goto considered harmful',
      author: 'Edsger Dijkstra',
      url: 'google.com',
      likes: 1,
      user: {
        name: 'testuser',
      },
      comments: ['Fantastic!', 'Really good!', 'I also like it'],
    },
  ]

  const queryClient = new QueryClient()

  beforeEach(() => {
    // Mock useParams to return the mock blog ID
    useParams.mockReturnValue({ id: mockBlogId })

    // Mock useQuery to return the mock blogs data
    useQuery.mockImplementation(() => ({
      data: mockBlogs,
      isLoading: false,
      isError: false,
    }))

    render(
      <QueryClientProvider client={queryClient}>
        <StoreContextProvider>
          <Router>
            <Blog />
          </Router>
        </StoreContextProvider>
      </QueryClientProvider>,
    )
  })

  test('renders title, author, url, likes, and comments by default', () => {
    screen.getByText(mockBlogs[0].title, { exact: false })
    screen.getByText(mockBlogs[0].author, { exact: false })
    screen.getByText(mockBlogs[0].url, { exact: false })
    screen.getByText(`${mockBlogs[0].likes} likes`)

    mockBlogs[0].comments.forEach((comment) => {
      screen.getByText(comment)
    })
  })

  test('if liked twice, ', async () => {
    const user = userEvent.setup()
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(blogService.updateBlog.mock.calls).toHaveLength(2)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
