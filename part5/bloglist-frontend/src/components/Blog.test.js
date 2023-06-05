import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
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

test('<Blog /> show author and like number when click on show', () => {
  const testBlog = {
    title: 'Test Blog',
    author: 'jlpalacios',
    likes: 0,
    url:'https://asdf.asdf',
    user:{ username:'user' }
  }

  const testFunc = () => {
    console.log('test')
  }

  const component = render(
    <Blog blog={testBlog} erase={testFunc} like={testFunc} username={'testUser'} />
  )

  const button = component.getByText('show')
  fireEvent.click(button)

  const likes= screen.queryByText(/likes/i)
  expect(likes).toHaveTextContent(0)

  const url= screen.queryByText(/url/i)
  expect(url).toHaveTextContent('https://asdf.asdf')
})

test('<Blog /> button like calls 2 times the controller on 2 times click', () => {
  const testBlog = {
    title: 'Test Blog',
    author: 'jlpalacios',
    likes: 0,
    url:'https://asdf.asdf',
    user:{ username:'user' }
  }

  const testFunc = () => {
    console.log('test')
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={testBlog} erase={testFunc} like={mockHandler} username={'testUser'} />
  )

  const buttonShow = component.getByText('show')
  fireEvent.click(buttonShow)

  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)

})