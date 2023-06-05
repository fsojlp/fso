import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Blog } from './Blog'

test('<Blog /> verify that the component only renders the blog title and author', () => {
  const testBlog = {
    title: 'Test Blog',
    author: 'jlpalacios',
    likes: 0,
    url:'https://asdf.asdf'
  }

  const testFunc = () => {
    console.log('test')
  }

  const component = render(
    <Blog blog={testBlog} erase={testFunc} like={testFunc} username={'testUser'} />
  )

  expect(component.container).toHaveTextContent(
    'Test Blog'
  )

  expect(component.container).toHaveTextContent(
    'jlpalacios'
  )

  const likes= screen.queryByText(/likes/i)
  expect(likes).toBeNull()

  const url= screen.queryByText(/url/i)
  expect(url).toBeNull()
})