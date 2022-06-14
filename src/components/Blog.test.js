import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})

test('renders author', () => {
  const blog = {
    author: 'Component testing is done with react-testing-library'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})

test('does not render url', () => {
  const blog = {
    url: 'http://',
  }

  render(<Blog blog={blog} />)

  const element = screen.queryByText('do not want url to be rendered')
  expect(element).toBeNull()
})

test('does not render likes', () => {
  const blog = {
    likes: 100,
  }

  render(<Blog blog={blog} />)

  const element = screen.queryByText('do not want likes to be rendered')
  expect(element).toBeNull()
})