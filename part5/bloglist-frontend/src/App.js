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
  const [errorMessage, setErrorMessage] = useState(null)

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
      setErrorMessage('Wrong credentials')
      setUsername('')
      setPassword('')
      document.getElementById('Username').value=''
      document.getElementById('Password').value=''
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user ?
        <BlogList blogs={blogs} /> :
        <LoginForm handleLogin={handleLogin} username={username} password={password} handleUsername={handleUsername} handlePassword={handlePassword} />
      }
    </div>
  )
}

export default App