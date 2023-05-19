import React from 'react'
import { Blog } from './Blog'

export const BlogList = ({blogs}) => {
  return (
    <div>
        <h2>Blogs</h2>
        {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}
