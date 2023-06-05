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
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
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
      setMessage({ text:'Wrong credentials',type:'error' })
      setUsername('')
      setPassword('')
      document.getElementById('Username').value=''
      document.getElementById('Password').value=''
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
        setMessage({ text:`${returnedBlog.title} added`,type:'success' })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const like = async (id) => {
    const blogToVote = blogs.filter(b => b.id === id)
    blogToVote[0].likes++
    try {
      blogService.vote(blogToVote[0])

      setMessage({ text:`voted from ${blogToVote[0].title}`,type:'success' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage({ text:`error voting ${blogToVote[0].title}`,type:'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const erase = (blog) => {
    try {
      blogService.erase(blog.id)
      const filtered = blogs.filter(b => b.id !== blog.id)
      setBlogs(filtered)
      setMessage({ text:`Blog ${blog.title} deleted`,type:'success' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage({ text:`Failed to delete blog ${blog.title}`,type:'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={message} />
      {user ?
        <>
          <BlogList blogs={blogs} username={user.username} handleLogout={handleLogout} title={title} handleTitle={handleTitle} author={author} handleAuthor={handleAuthor} url={url} handleUrl={handleUrl} handleCreate={handleCreate} handleShowForm={handleShowForm} showForm={showForm} like={like} erase={erase} />
        </>
        :
        <LoginForm handleLogin={handleLogin} username={username} password={password} handleUsername={handleUsername} handlePassword={handlePassword} />
      }
    </div>
  )
}

export default App