import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    return (
      setNewTitle(event.target.value))
  }

  const handleAuthorChange = (event) => {
    return (
      setNewAuthor(event.target.value))
  }

  const handleUrlChange = (event) => {
    return (
      setNewUrl(event.target.value))
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      url: newUrl,
      author: newAuthor,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (

    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          value={newTitle}
          onChange={handleTitleChange}
          placeholder='write here blog title'
        />
      </div>
      <div>
        author:
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          value={newUrl}
          onChange={handleUrlChange}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm