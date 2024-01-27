import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'
import { StoreContextProvider } from '../StoreContext'

jest.mock('../services/blogs', () => {
  return {
    __esModule: true,
    default: {
      createBlog: jest.fn(() => {
        // console.log('createBlog mock function called')
        const mockValue = {
          title: 'Goto considered useful',
          author: 'Edsger Dijkstra',
          url: 'acm.com/goto',
        }
        return Promise.resolve(mockValue)
      }),
    },
  }
})

describe('NewBlog', () => {
  let NewBlog
  let blogService

  const input = {
    title: 'Goto considered useful',
    author: 'Edsger Dijkstra',
    url: 'acm.com/goto',
  }

  const queryClient = new QueryClient()

  beforeAll(() => {
    queryClient.setQueryData('blogs', [])
  })

  beforeEach(async () => {
    const NewBlogModule = await import('./NewBlog')
    NewBlog = NewBlogModule.default

    const blogServiceModule = await import('../services/blogs')
    blogService = blogServiceModule.default

    const mockRef = {
      current: {
        toggleVisibility: jest.fn(),
      },
    }
    render(
      <QueryClientProvider client={queryClient}>
        <StoreContextProvider>
          <NewBlog blogFormRef={mockRef} />
        </StoreContextProvider>
      </QueryClientProvider>,
    )
  })

  test('Adding a new blog should invoke action', async () => {
    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('title')
    await user.type(titleInput, input.title)

    const authorInput = screen.getByPlaceholderText('author')
    await user.type(authorInput, input.author)

    const urlInput = screen.getByPlaceholderText('url')
    await user.type(urlInput, input.url)

    const showButton = screen.getByText('create')
    await user.click(showButton)

    expect(blogService.createBlog).toHaveBeenCalledWith(input)
  })
})
