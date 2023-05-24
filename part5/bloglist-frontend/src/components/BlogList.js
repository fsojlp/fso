import React from 'react'
import { Blog } from './Blog'
import { UserInfo } from './UserInfo'
import { BlogForm } from './BlogForm'

export const BlogList = ({ blogs, username, handleLogout, handleCreate, title, handleTitle, author, handleAuthor, url, handleUrl, handleShowForm, showForm }) => {

  return (
    <div>
        <h2>Blogs</h2>
        <UserInfo username={username} handleLogout={handleLogout} />
        <br/>
        {showForm 
          ?
            <>
              <BlogForm title={title} handleTitle={handleTitle} author={author} handleAuthor={handleAuthor} url={url} handleUrl={handleUrl} handleCreate={handleCreate} />
              <button onClick={handleShowForm}>cancel</button>
            </>
          : 
            <button onClick={handleShowForm}>new note</button>
        }
        {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}
