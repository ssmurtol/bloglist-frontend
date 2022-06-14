const Blog = ({ blog, }) => (
  <div>
    <p className='blog'>{blog.title} {blog.author}</p>
  </div>
)

export default Blog