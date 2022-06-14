import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch{
      notify(
        `wrong username or password`, 'alert'
      )
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out with', user.username)

    try {
      window.localStorage.removeItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    } catch {
      notify(`logging out failed`)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      url: newUrl,
      author: newAuthor,
    }
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
    notify(`a new blog ${newTitle} by ${newAuthor} added`)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const blogForm = () => {
    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <h2>create new</h2>
        </div>
        <div style={showWhenVisible}></div>
        <BlogForm
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
          handleTitleChange={({ target }) => setNewTitle(target.value)}
          handleAuthorChange={({ target }) => setNewAuthor(target.value)}
          handleUrlChange={({ target }) => setNewUrl(target.value)}
          addBlog={addBlog}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in
            <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='create a new blog' ref={blogFormRef}>
            {blogForm()}
          </Togglable>

          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
          )}
        </div>
      }
    </div>
  )
}

export default App
