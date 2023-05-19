import React from 'react'

export const Blog = ({blog}) => {
  return (
    <div>
        {blog.title} {blog.author}
    </div>
  )
}
