import React from 'react'
import { Blog } from './Blog'
import { UserInfo } from './UserInfo'

export const BlogList = ({blogs, username, handleLogout}) => {
  return (
    <div>
        <h2>Blogs</h2>
        <UserInfo username={username} handleLogout={handleLogout} />
        <br/>
        {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}
