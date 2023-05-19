import React from 'react'

export const BlogForm = ({ handleCreate, title, handleTitle, author, handleAuthor, url, handleUrl }) => {
  return (
    <form onSubmit={handleCreate}>
            <h1>Create new</h1>
          <div>
            title: <input type='text' value={title} id='Title' onChange={handleTitle} />
          </div>
          <div>
            author: <input type='text' value={author} id='Author' onChange={handleAuthor} />
          </div>
          <div>
            url: <input type='text' value={url} id='Url' onChange={handleUrl} />
          </div>
          <button type='submit'>create</button>
        </form>
  )
}
