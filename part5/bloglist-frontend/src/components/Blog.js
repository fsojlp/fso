import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const Blog = ({blog, like, erase, username}) => {
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
          {blog.author}<br/>

          {blog.user[0] 
          ? blog.user[0].username === username
            ?
            <button onClick={() => {if(window.confirm(`Remove blog ${blog.title}?`)){erase(blog)}}}>remove</button>
            : <></>
          : <></>
          }
          </>
        :
        <></>
        }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  erase: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}