import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('blog title')
  const inputAuthor = screen.getByPlaceholderText('blog author')
  const inputUrl = screen.getByPlaceholderText('blog url')
  const sendButton = screen.getByText('create')


  await user.type(inputTitle, 'testingTitle')
  await user.type(inputAuthor, 'testingAuthor')
  await user.type(inputUrl, 'testingUrl')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testingTitle')
  expect(createBlog.mock.calls[0][0].author).toBe('testingAuthor')
  expect(createBlog.mock.calls[0][0].url).toBe('testingUrl')
})