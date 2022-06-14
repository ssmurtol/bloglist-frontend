const BlogForm = ({addBlog}) => {

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
  
    return (

    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={newTitle}
          name="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={newAuthor}
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
          url:
          <input
          type="text"
          value={newUrl}
          name="Url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>  
  )
}

export default BlogForm