import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BlogForm } from './BlogForm'

test('props check on submit form', () => {
  const newBlog = {
    title:'TestBlog',
    author:'TestAuthor',
    url:'https://asdf.adsf'
  }

  const testFun = (e) => {
    e.preventDefault()
    console.log('asdf')
  }


  const component = render(
    <BlogForm handleCreate={testFun} title={newBlog.title} handleTitle={testFun} author={newBlog.author} handleAuthor={testFun} url={newBlog.url} handleUrl={testFun} />
  )

  const submit = component.getByText('create')
  fireEvent.click(submit)

  const author = component.container.querySelector('#Author')
  const title = component.container.querySelector('#Title')
  const url = component.container.querySelector('#Url')

  expect(author).toHaveValue('TestAuthor')
  expect(title).toHaveValue('TestBlog')
  expect(url).toHaveValue('https://asdf.adsf')
})