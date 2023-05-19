import React from 'react'
import { Blog } from './Blog'
import { UserInfo } from './UserInfo'
import { BlogForm } from './BlogForm'

export const BlogList = ({ blogs, username, handleLogout, handleCreate, title, handleTitle, author, handleAuthor, url, handleUrl }) => {
  return (
    <div>
        <h2>Blogs</h2>
        <UserInfo username={username} handleLogout={handleLogout} />
        <br/>
        <BlogForm title={title} handleTitle={handleTitle} author={author} handleAuthor={handleAuthor} url={url} handleUrl={handleUrl} handleCreate={handleCreate} />
        <br/>
        {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}
