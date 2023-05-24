import React, { useState } from 'react'

export const Blog = ({blog, like}) => {
  const [show, setShow] = useState(false)

  const toogleShow = () => {
    setShow(!show)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
        {blog.title} <button onClick={toogleShow}>{show ? 'hide' : 'show'}</button><br/>
        {show 
        ?
          <>
          {blog.url}<br/>
          likes: {blog.likes} <button onClick={() => like(blog.id)}>like</button><br/>
          {blog.author}
          </>
        :
        <></>
        }
    </div>
  )
}