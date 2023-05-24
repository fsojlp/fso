import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { BlogList } from './components/BlogList'
import { LoginForm } from './components/LoginForm'
import loginService from './services/login'
import { Notification } from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => 
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBloglistAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      document.getElementById('Username').value=''
      document.getElementById('Password').value=''
    } catch (error) {
      setMessage({text:'Wrong credentials',type:'error'})
      setUsername('')
      setPassword('')
      document.getElementById('Username').value=''
      document.getElementById('Password').value=''
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleAuthor = (e) => {
    setAuthor(e.target.value)
  }

  const handleUrl = (e) => {
    setUrl(e.target.value)
  }

  const handleCreate = (e) => {
    e.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
    }

    blogService
      .create(blog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        document.getElementById('Title').value=''
        document.getElementById('Author').value=''
        document.getElementById('Url').value=''
        setShowForm(!showForm)
        setMessage({text:`${returnedBlog.title} added`,type:'success'})
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
  }

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  return (
    <div>
      <Notification message={message} />
      {user ?
      <>
        <BlogList blogs={blogs} username={user.username} handleLogout={handleLogout} title={title} handleTitle={handleTitle} author={author} handleAuthor={handleAuthor} url={url} handleUrl={handleUrl} handleCreate={handleCreate} handleShowForm={handleShowForm} showForm={showForm} />
      </>
         :
        <LoginForm handleLogin={handleLogin} username={username} password={password} handleUsername={handleUsername} handlePassword={handlePassword} />
      }
    </div>
  )
}

export default App