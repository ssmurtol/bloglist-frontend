const Blog = ({ blog, }) => (
  <div>
    {blog.title} {blog.author}
    <p>{blog.url}</p>
    <p>likes {blog.likes}</p>
  </div>
)

export default Blog